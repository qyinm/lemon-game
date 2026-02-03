# 🍋 Lemon Game

A puzzle game Chrome extension where you drag lemons to make sums of 10.

## How to Play

1. Select lemons by dragging
2. If the selected lemons sum to 10, they disappear and you score points
3. Game ends when no more moves are available

## Game Modes

- **Infinite Mode** - Play at your own pace
- **Timer Mode** - 2 minutes to get the highest score

## Install

### From Chrome Web Store
Coming soon

### Manual Install
1. Clone this repo
2. `npm install`
3. `npm run build`
4. Go to `chrome://extensions/`
5. Enable "Developer mode"
6. Click "Load unpacked" and select `.output/chrome-mv3/`

## Development

```bash
npm install
npm run dev
```

## Tech Stack

- WXT (Chrome Extension Framework)
- React + TypeScript
- Chrome Storage API

## License

MIT
