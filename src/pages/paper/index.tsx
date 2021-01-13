import React from 'react';
import './index.less';
import { ChTablePanel, FormItemType, ChUtils } from 'ch-ui';
import { Button, Tag } from 'antd';
import { termType, TermType } from '@/config/common.data';

const {chHooks} = ChUtils

export default () => {

  
  const { options: gradeOptions } = chHooks.useOptionFormListHook({url: 'http://api-paper.kukechen.top/api/grade/list'})
  const { options: gradeStepOptions } = chHooks.useOptionFormListHook({url: 'http://api-paper.kukechen.top/api/gradeStep/list'})
  
  const columns = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '文件类型',
      dataIndex: 'fileType',
      key: 'fileType',
    },
    {
      title: '学年',
      dataIndex: 'gradeId',
      key: 'gradeId',
    },
    {
      title: '学期',
      dataIndex: 'gradeStepId',
      key: 'gradeStepId',
    },
  ]
  return (
    <div>
      <ChTablePanel 
            onEditBefore={(item)=>{
                console.log('debug: 开始提交', item)
                item.file = item.file[0].response.result
            }}
            urlDelete='/api/paper/delete'
            urlAdd='/api/paper/add'
            urlUpdate='/api/paper/edit'
            url='/api/paper/page'
            columns={columns}
            formData={
              [{
                  type: FormItemType.input,
                  label: '名称',
                  name: 'name',
                  rules: [{ required: true, message: '请输入试卷名称' }],
              },
              {
                type: FormItemType.input,
                label: '文件名称',
                name: 'fileName',
                rules: [{ required: true, message: '请输入文件名称' }],
              },{
                type: FormItemType.select,
                label: '类目',
                name: 'gradeId',
                options: gradeOptions,
                rules: [
                  { required: true, message: '请输入类目名称' }
                ],
              },{
                type: FormItemType.select,
                label: '学期',
                name: 'gradeStepId',
                options: gradeStepOptions,
                rules: [
                  { required: true, message: '请输入学期名称' }
                ],
              },
              {
                type: FormItemType.upload,
                label: '上传接口',
                name: 'file',
                uploadUrl: '/api/upload/file',
                rules: [{ required: true, message: '文件上传失败', validator: 
                  (rule, value, callback) => {
                      try {
                          if(value[0].response)  {
                             if(value[0].response.status == 0) {
                               console.log('debug: 单文件上传成功！')
                               return Promise.resolve();
                             }else {
                               callback('文件上传失败！');
                             }
                          }
                      } catch (err) {
                          callback(err);
                      }
                  }
                }],
              }
              ]
            }
        />
    </div>
  );
}
