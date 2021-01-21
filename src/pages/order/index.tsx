import React from 'react';
import './index.less';
import { ChTablePanel, FormItemType, ChUtils } from 'ch-ui';

export default () => {
  const columns = [
    {
      title: '订单名称',
      dataIndex: 'orderName',
      key: 'orderName',
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'gradeId',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];
  return (
    <div>
      <ChTablePanel
        urlDelete="/api/order/delete"
        urlAdd="/api/order/add"
        urlUpdate="/api/order/edit"
        url="/api/order/page"
        columns={columns}
        searchFormData={[
          {
            placeholder: '请输入订单编号',
            layout: { span: 4 },
            type: FormItemType.input,
            label: '订单名称',
            name: 'orderName',
          },
          {
            placeholder: '请输入金额',
            layout: { span: 4 },
            type: FormItemType.input,
            label: '金额',
            name: 'name',
          },
        ]}
        formData={[
          {
            type: FormItemType.input,
            label: '订单名称',
            name: 'orderName',
            rules: [{ required: false, message: '请输入订单名称' }],
          },
          {
            type: FormItemType.input,
            label: '用户id',
            name: 'userId',
            rules: [{ required: false, message: '请输入用户id' }],
          },
          {
            type: FormItemType.input,
            label: '金额',
            name: 'amount',
            rules: [{ required: false, message: '请输入金额' }],
          },
        ]}
      />
    </div>
  );
};
