import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'learn',
  favicon: '/images/logo.png',
  logo: '/images/logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/learn',
  publicPath: '/learn/',
  // exportStatic: {
  //   htmlSuffix: false,
  //   dynamicRoot: false,
  // },
  // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  // more config: https://d.umijs.org/config
});
