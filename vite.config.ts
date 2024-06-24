import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: "微博默认按照最新时间排序",
        author: "kazoottt",
        description: "将网页版的微博自动设置为最新微博（按时间顺序）浏览",
        icon: 'https://weibo.com/favicon.ico',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://weibo.com/**'],
        version: '0.0.1',
        license: 'MIT',
      },
    }),
  ],
});
