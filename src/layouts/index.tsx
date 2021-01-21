import React, { useEffect, useState } from 'react';
import { IRouteComponentProps } from 'umi';
import { ChLayout, ChUtils } from 'ch-ui';
import { AxiosError } from 'axios';
import { getObCache } from 'ch-ui/src/ChUtils/cache';
import './index.less';

// 去注册ajax错误处理的方法
ChUtils.Ajax.RequestConfig.onError = (error: AxiosError) => {
  if (error?.response?.status == 401) {
    console.log('登录过期了');
    location.replace('/login');
  }
};

export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  const isLogin = getObCache('user');
  const [currentPathIndex, setCurrentPathIndex] = useState(1);
  const siderItemData = [
    {
      icon: <span className="paper_iconfont paper_iconnianjiguanli" />,
      path: '/grade',
      text: '试卷阶段',
      click: () => {
        history.push('/grade');
      },
    },
    {
      icon: <span className="paper_iconfont paper_iconshijuan" />,
      path: '/paper',
      text: '试卷管理',
      click: () => {
        history.push('/paper');
      },
    },
    {
      icon: <span className="paper_iconfont paper_iconpingtai_kemu" />,
      path: '/subject',
      text: '学科管理',
      click: () => {
        history.push('/subject');
      },
    },
    {
      icon: <span className="paper_iconfont paper_iconbiaoqian" />,
      path: '/tag',
      text: '标签管理',
      click: () => {
        history.push('/tag');
      },
    },
    {
      icon: <span className="paper_iconfont paper_iconbiaoqian" />,
      path: '/order',
      text: '订单管理',
      click: () => {
        history.push('/order');
      },
    },
  ];
  useEffect(() => {
    const index = siderItemData.findIndex((item) => {
      return item.path == location.pathname;
    });

    if (index > -1) {
      setCurrentPathIndex(index + 1);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isLogin && !location.pathname.includes('login')) {
      history.replace('/login');
    }
  }, []);

  return !location.pathname.includes('login') ? (
    <ChLayout
      adminIcon={
        <div className="flex-center">
          <span className="paper_iconfont paper_iconxueyuan-fufeikecheng2"></span>
        </div>
      }
      sider={{
        siderItems: siderItemData,
        currentItem: currentPathIndex,
      }}
    >
      <div className="layout-content">{children}</div>
    </ChLayout>
  ) : (
    <div>{children}</div>
  );
}
