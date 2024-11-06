/*
 * umi设置
 *
 * @Author: grayson<grayson.gao@bvox.com>
 * @Date: 2024-10-10 11:19:32
 *
 * Copyright © 2019-2024 bvox.com. All Rights Reserved.
 */

import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'gyp',
  },
  history: {
    type: 'memory',
  },
  routes: [
    {
      path: '/',
      component: './Home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '个人摘录',
      path: '/person-record',
      component: './Record',
    },
  ],
  npmClient: 'pnpm',
  // 引入qiankun
  qiankun: {
    slave: {},
  },
  // proxy: {
  //   '/api/12': {
  //     target: 'https://github.com/airuikun/technology-blog/issues/12',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api/12': '' },
  //   }
  // }
});
