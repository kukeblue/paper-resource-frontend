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
      title: '年级别名',
      dataIndex: 'alias',
      key: 'alias',
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
                    type: FormItemType.input,
                    label: '别名',
                    name: 'alias',
                    rules: [{ required: true, message: '请输入年级别名' }],
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
