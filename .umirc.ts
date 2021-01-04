import { defineConfig } from 'umi';

export default defineConfig({
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
      target: "http://localhost:8080",
      changeOrigin: true,
    }
  },
  theme: {
    '@primary-color': '#ff6a00',
  },
});
