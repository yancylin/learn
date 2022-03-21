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
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    // {
    //   title: 'markDown',
    //   path: '/markDown',
    // },
    {
      title: 'GitHub',
      path: 'https://github.com/yancylin/learn',
    },
  ],
  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/markdown': [
      // {
      //   title: '菜单项',
      //   path: '菜单路由（可选）',
      //   children: [
      //     // 菜单子项（可选）
      //     // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
      //     // 'markdown.md',
      //     // 'example.md',
      //   ],
      // },
    ],
  },
});
