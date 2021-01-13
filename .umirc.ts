import { defineConfig } from 'umi';

export default defineConfig({
  title: "全科试卷后台",
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  styles: [
    "http://at.alicdn.com/t/font_2306248_2jnlso6p4uu.css"
  ],
  proxy: {
    '/api' : {
      // target: "http://api-paper.kukechen.top",
      target: "http://127.0.0.1:8080",
      changeOrigin: true,
    }
  },
  theme: {
    '@primary-color': '#ff6a00',
  },
});
