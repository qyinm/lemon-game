import { useState, useCallback, useRef, RefObject } from 'react';

export interface SelectionBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  height: number;
  left: number;
  top: number;
}

interface UseDragSelectionProps {
  containerRef: RefObject<HTMLElement>;
  onSelectionChange?: (box: SelectionBox | null) => void;
}

export function useDragSelection({ containerRef, onSelectionChange }: UseDragSelectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const startPoint = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    startPoint.current = { x, y };
    setIsDragging(true);
    setSelectionBox({
      startX: x,
      startY: y,
      endX: x,
      endY: y,
      width: 0,
      height: 0,
      left: x,
      top: y,
    });
  }, [containerRef]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const left = Math.min(startPoint.current.x, currentX);
      const top = Math.min(startPoint.current.y, currentY);
      const width = Math.abs(currentX - startPoint.current.x);
      const height = Math.abs(currentY - startPoint.current.y);

      const box: SelectionBox = {
        startX: startPoint.current.x,
        startY: startPoint.current.y,
        endX: currentX,
        endY: currentY,
        width,
        height,
        left,
        top,
      };

      setSelectionBox(box);
      onSelectionChange?.(box);
    },
    [isDragging, containerRef, onSelectionChange]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    setSelectionBox(null);
    onSelectionChange?.(null);
  }, [isDragging, onSelectionChange]);

  const reset = useCallback(() => {
    setIsDragging(false);
    setSelectionBox(null);
    onSelectionChange?.(null);
  }, [onSelectionChange]);

  return {
    isDragging,
    selectionBox,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    reset,
  };
}
