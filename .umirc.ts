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
    "http://at.alicdn.com/t/font_2306248_t492ab6hzxd.css"
  ],
  proxy: {
    '/api' : {
      target: "http://api-paper.kukechen.top",
      changeOrigin: true,
    }
  },
  theme: {
    '@primary-color': '#ff6a00',
  },
});
