import React from 'react';
import './index.less';
import { ChTablePanel, FormItemType, ChUtils } from 'ch-ui';

interface Paper {
  id: string;
  name: string;
  fileName: string;
  fileType: string;
  gradeId: string;
  gradeStepId: string;
  tagIds: string[];
  previewLinks: string[];
  file: string;
}

const {chHooks} = ChUtils

export default () => {
  const { 
    options: gradeOptions,
    optionsMap: gradeOptionMap 
  } = chHooks.useOptionFormListHook({url: 'http://api-paper.kukechen.top/api/grade/list'})
  const { 
    options: gradeStepOptions,
    optionsMap: gradeStepOptionMap
   } = chHooks.useOptionFormListHook({url: 'http://api-paper.kukechen.top/api/gradeStep/list'})
  
   const { 
    options: tagOptions,
    optionsMap: tagOptionMap
   } = chHooks.useOptionFormListHook({url: 'http://api-paper.kukechen.top/api/tag/list'})
  

  const columns = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Paper)=>{
        return <a target="_blank" href={"http://api-paperfile.kukechen.top/onlinePreview?url=" + record.file}>{text}</a>
      }
    },
    {
      title: '文件地址',
      dataIndex: 'file',
      key: 'file',
    },
    {
      title: '类目',
      dataIndex: 'gradeId',
      key: 'gradeId',
      render: (text: string, record: object) =>{
        return <span>{gradeOptionMap[text] && gradeOptionMap[text].name}</span>
      }
    },
    {
      title: '学期',
      dataIndex: 'gradeStepId',
      key: 'gradeStepId',
      render: (text: string, record: object) =>{
        return <span>{gradeStepOptionMap[text] && gradeStepOptionMap[text].name}</span>
      }
    },
    {
      title: '标签',
      dataIndex: 'tagIds',
      key: 'tagIds',
      render: (text: string, record: Paper) =>{
        return <div>{record.tagIds.map(tagId=>{
          return <span key={tagId}>{tagOptionMap[tagId] && tagOptionMap[tagId].name}</span>
        })}</div>
      }
    },
  ]
  return (
    <div>
      <ChTablePanel
            onEditBefore={(item)=>{
                if(item.file instanceof Array) {
                    item.file = item.file[0].response.result[0]
                    const splitPath = item.file.split('/')
                    item.fileName = splitPath[splitPath.length - 1]
                    item.name = item.fileName.split('.')[0]
                    item.fileType = item.fileName.split('.')[1]
                    console.log('debug: 开始提交', item)
                }
            }}
            onEditFormat={(item: any)=>{
              item.file = []
            }}
            urlDelete='/api/paper/delete'
            urlAdd='/api/paper/add'
            urlUpdate='/api/paper/edit'
            url='/api/paper/page'
            columns={columns}
            searchFormData={[
              {
                  placeholder: "请输入名称",
                  layout: {span: 4},
                  type: FormItemType.input,
                  label: '名称',
                  name: 'name',
              },
              {
                placeholder: "请选择类目",
                layout: {span: 4, offset: 1},
                type: FormItemType.select,
                label: '类目',
                name: 'gradeId',
                options: gradeOptions,
              }, {
                placeholder: "请选择学期",
                layout: {span: 4, offset: 1},
                type: FormItemType.select,
                label: '学期',
                name: 'gradeStepId',
                options: gradeStepOptions,
              }, {
                placeholder: "请选择标签",
                layout: {span: 4, offset: 1},
                type: FormItemType.multipleSelect,
                label: '标签',
                name: 'tagIds',
                options: tagOptions,
              }
            ]}
            formData={
              [
                {
                  type: FormItemType.upload,
                  label: '上传试卷',
                  name: 'file',
                  uploadurl: '/api/paper/upload',
                  uploadname: 'files',
                  itemshow: (editor: Paper)=>{
                    if(editor.id) {
                      return false
                    }
                    return true
                  },
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
                },  
                {
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
                },{
                  type: FormItemType.multipleSelect,
                  label: '标签',
                  name: 'tagIds',
                  options: tagOptions,
                  rules: [
                    { required: true, message: '请选择标签' }
                  ],
                },
              ]
            }
        />
    </div>
  );
}
