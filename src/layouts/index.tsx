import React from 'react';
import { IRouteComponentProps } from 'umi'
import { ChLayout } from 'ch-ui';
import './index.less'
export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
  return <ChLayout 
            adminIcon={
                <div className="flex-center">
                    <span className='paper_iconfont paper_iconxueyuan-fufeikecheng2'></span>
                </div>
            }
            sider={{
                siderItems:[
                    {
                        icon: <span className='paper_iconfont paper_iconnianjiguanli'/>,
                        text: '年级管理',
                        click: ()=>{console.log('1')},
                    }
                ],
                currentItem: 1
            }}
            >
                 
                <div className='layout-content'>
                    {children}
                </div>
        </ChLayout>
}
