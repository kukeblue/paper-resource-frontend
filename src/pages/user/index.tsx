import React from 'react';
import './index.less';
import { ChTablePanel } from 'ch-ui';
import { Button } from 'antd';

export default () => {

  const columns = [
    {
      title: '年级名称',
      dataIndex: 'name',
      key: 'name',
    },
  ]
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
      },
  ]
  return (
    <div>
      <ChTablePanel 
            urlDelete='/api/grade/delete'
            urlAdd='/api/grade/add'
            urlUpdate='/api/grade/edit'
            url='/api/grade/list'
            columns={columns}
            formData={
                [{
                  type: 'input',
                  label: '名称',
                  name: 'name',
                  rules: [{ required: true, message: '请输入年级名称' }],
               }]
            }
            expandable={{
                expandedRowRender: (record:any) => <div>
                 <ChTablePanel 
                    onAddBefore={(item:any)=>{
                        item.gradeId = record.id
                        console.log(item);
                    }}
                    urlDelete='http://localhost:3000/api/gradeStep/delete'
                    urlAdd='http://localhost:3000/api/gradeStep/add'
                    urlUpdate='http://localhost:3000/api/gradeStep/edit'
                    url='http://localhost:3000/api/gradeStep/list'
                    query={{gradeId: record.id}}
                    columns={childColumns}
                    formData={
                        [
                            {
                                type: 'input',
                                label: '名称',
                                name: 'name',
                                rules: [{ required: true, message: '请输入年级名称' }],
                            },{
                                type: 'radio-group',
                                label: '学期',
                                name: 'term',
                                rules: [{ required: true, message: '请选择学期' }],
                                initialValue: 'UP',
                                options: [
                                        { label: '上学期', value: 'UP' },
                                        { label: '下学期', value: 'DOWN' },
                                ]
                            }
                        ]
                    }/>
                </div>,
            }}
        />
    </div>
  );
}
