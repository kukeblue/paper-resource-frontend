import React from 'react';
import './index.less';
import { ChTablePanel, FormItemType } from 'ch-ui';
import { Button, Tag } from 'antd';
import { termType, TermType } from '@/config/common.data';

export default () => {
  const columns = [
    {
      title: '类目',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  const childColumns = [
    {
      title: '学期名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '上下学期',
      dataIndex: 'term',
      key: 'term',
      render: (text: string) => {
        return <Tag>{(termType as any)[text]}</Tag>;
      },
    },
  ];
  return (
    <div>
      <ChTablePanel
        urlDelete="/api/grade/delete"
        urlAdd="/api/grade/add"
        urlUpdate="/api/grade/edit"
        url="/api/grade/page"
        columns={columns}
        formData={[
          {
            type: FormItemType.input,
            label: '名称',
            name: 'name',
            rules: [{ required: true, message: '请输入年级名称' }],
          },
        ]}
        expandable={{
          expandedRowRender: (record: any) => (
            <div>
              <ChTablePanel
                onEditBefore={(item: any) => {
                  item.gradeId = record.id;
                  console.log(item);
                }}
                urlDelete="/api/gradeStep/delete"
                urlAdd="/api/gradeStep/add"
                urlUpdate="/api/gradeStep/edit"
                url="/api/gradeStep/page"
                query={{ gradeId: record.id }}
                columns={childColumns}
                formData={[
                  {
                    type: FormItemType.input,
                    label: '名称',
                    name: 'name',
                    rules: [{ required: true, message: '请输入年级名称' }],
                  },
                  {
                    type: FormItemType.radioGroup,
                    label: '学期',
                    name: 'term',
                    rules: [{ required: false, message: '请选择学期' }],
                    options: [
                      { label: '默认', value: '' },
                      { label: '上学期', value: 'UP' },
                      { label: '下学期', value: 'DOWN' },
                    ],
                  },
                ]}
              />
            </div>
          ),
        }}
      />
    </div>
  );
};
