import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Lemon Game',
    description: '드래그로 숫자 합 10을 만드는 레몬 퍼즐 게임',
    version: '1.0.0',
    permissions: ['storage'],
    action: {
      default_title: 'Lemon Game 🍋'
    }
  }
});
