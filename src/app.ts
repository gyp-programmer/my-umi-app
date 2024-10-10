/*
 * 主页面
 *
 * @Author: grayson<grayson.gao@bvox.com>
 * @Date: 2024-10-10 11:19:32
 *
 * Copyright © 2019-2024 bvox.com. All Rights Reserved.
 */

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '个人网站' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

export const modifyContextOpts = () => {
  return {
    basename: '/',
  };
};
