import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Lemon Game',
    description: 'A puzzle game where you drag lemons to make sums of 10',
    version: '1.0.0',
    permissions: ['storage'],
    action: {
      default_title: 'Lemon Game 🍋'
    }
  }
});
