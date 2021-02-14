import { defineConfig } from 'umi';

export default defineConfig({
  title: '全科试卷后台',
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  
  styles: ['https://at.alicdn.com/t/font_2306248_2jnlso6p4uu.css'],
  scripts: [
    'https://api-paperfile.kukechen.top/js/base64.min.js',
  ],
  externals: {
    "Base64": "Base64"
  },
  proxy: {
    '/api': {
      // target: 'https://api-paper.kukechen.top',
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
  },
  theme: {
    '@primary-color': '#ff6a00',
  },
  dynamicImport: {},
});
