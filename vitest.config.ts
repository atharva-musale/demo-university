import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  test: {
    globals: false,
    environment: 'jsdom'
  }
});
