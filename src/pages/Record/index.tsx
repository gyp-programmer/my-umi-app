/*
 * 个人摘录主页
 *
 * @Author: grayson<grayson.gao@bvox.com>
 * @Date: 2024-11-06 14:58:12
 *
 * Copyright © 2019-2024 bvox.com. All Rights Reserved.
 */
import {
  GetComponentProps,
  PageContainer,
  ProList,
} from '@ant-design/pro-components';
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';

interface DataItem {
  title: string;
  link: string;
  content: JSX.Element;
  description: JSX.Element;
  extra: JSX.Element;
}

const defaultLink =
  'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png';

const parseWebSite = (url: string): Promise<string> => {
  /** 会有跨域的访问，设置默认图片 引用太多，不适合反向代理，考虑后续使用nextjs应用去存放数据 */
  return new Promise((resolve) => {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        // 获取页面中的第一个favicon链接
        const faviconElement =
          doc.querySelector('link[rel="icon"]') ||
          doc.querySelector('link[rel="shortcut icon"]');
        const faviconLink = faviconElement?.getAttribute('href') || defaultLink;
        // eslint-disable-next-line no-useless-escape
        const urlOrigin = url.match(/(?:https?:\/\/)?([^\/]+)/) || [''];

        resolve(
          faviconLink.includes('http')
            ? faviconLink
            : urlOrigin[0] + faviconLink,
        );
      })
      .catch(() => {
        resolve(defaultLink);
      });
  });
};

export const xhrParseWebSite = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xhr.responseText, 'text/html');

        // 获取页面中的第一个favicon链接
        const faviconElement =
          doc.querySelector('link[rel="icon"]') ||
          doc.querySelector('link[rel="shortcut icon"]');
        const faviconLink = faviconElement?.getAttribute('href') || defaultLink;
        resolve(faviconLink);
      }
    };
    xhr.onerror = function () {
      resolve(defaultLink);
    };
    xhr.send();
  });
};

const dataSource = [
  {
    title: 'seo优化了解',
    link: 'https://github.com/airuikun/technology-blog/issues/12',
    descriptions:
      '前端如何进行seo优化? 如果之前不太了解seo优化，那么这篇文章应该会帮助大家快速的进入一个初步认知的状态',
    tag: ['seo'],
  },
  {
    title: '最新技术信息差',
    link: 'https://gapis.money/weekly/2024-11-04_24',
    descriptions:
      'Knowledge is power, info-gap is money!「信息差——独立开发者出海周刊」是一个帮助独立开发者缩小信息差的技术周刊。',
    tag: ['信息差', '前端最新技术', '优质的开源项目'],
  },
  {
    title: '大厂项目复盘知识库',
    link: 'https://www.yuque.com/suoyibo/lk20w0/wntlcyaavb1ztxh3',
    descriptions:
      '大厂项目复盘知识库，本知识库内汇总了各大厂项目复盘文章，通过文章我们可以学到产品角度思考问题和用户设计相关的知识',
    tag: ['UI设计', '产品思维'],
  },
  {
    title: '细致的前端解说家',
    link: 'http://www.csayc.com/catogary',
    descriptions:
      '收集的个人博客，看起来挺不错的，里面讲解的一些前端技术点相对市面上很多的文章来说，是优秀无比的',
    tag: ['前端', '前端学习'],
  },
];

const AccessPage: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    const realData = await Promise.all(
      dataSource.map(async (item) => {
        const faviconLink = await parseWebSite(item.link);

        return {
          title: item.title,
          link: item.link,
          content: <div>{item.descriptions}</div>,
          description: (
            <>
              {item.tag.map((o) => (
                <Tag key={o}>{o}</Tag>
              ))}
            </>
          ),
          extra: <img src={faviconLink} alt="logo" width={80} height={80} />,
        };
      }),
    );
    return realData;
  };

  useEffect(() => {
    setLoading(true);
    getData().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const handleOnItem: GetComponentProps<DataItem> = (item) => {
    return {
      onClick: () => {
        window.open(item.link, '_blank');
      },
    };
  };

  return (
    <PageContainer
      ghost
      header={{
        title: '个人摘录',
      }}
    >
      <ProList<DataItem>
        toolBarRender={() => {
          return [];
        }}
        itemLayout="vertical"
        rowKey="id"
        headerTitle=""
        dataSource={data}
        loading={loading}
        onItem={handleOnItem}
        metas={{
          title: {},
          description: {},
          actions: {},
          extra: {},
          content: {},
        }}
      />
    </PageContainer>
  );
};

export default AccessPage;
