import React, { useEffect, useState } from 'react';
import { IRouteComponentProps } from 'umi';
import { ChLayout } from 'ch-ui';
import './index.less';

export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  const [currentPathIndex, setCurrentPathIndex] = useState(1);
  const siderItemData = [
    {
      icon: <span className="paper_iconfont paper_iconnianjiguanli" />,
      path: '/grade',
      text: '年级管理',
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
  ];
  useEffect(() => {
    localStorage.clear();
  }, []);
  useEffect(() => {
    const index = siderItemData.findIndex((item) => {
      return item.path == location.pathname;
    });
    if (index > -1) {
      setCurrentPathIndex(index + 1);
    }
  }, [location.pathname]);

  return (
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
  );
}
