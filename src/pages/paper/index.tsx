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
  subjectId: string;
}

const { chHooks } = ChUtils;

export default () => {
  const {
    options: gradeOptions,
    optionsMap: gradeOptionMap,
  } = chHooks.useOptionFormListHook({
    url: 'http://api-paper.kukechen.top/api/grade/list',
  });
  const {
    options: gradeStepOptions,
    optionsMap: gradeStepOptionMap,
  } = chHooks.useOptionFormListHook({
    url: 'http://api-paper.kukechen.top/api/gradeStep/list',
  });

  const {
    options: tagOptions,
    optionsMap: tagOptionMap,
  } = chHooks.useOptionFormListHook({
    url: 'http://api-paper.kukechen.top/api/tag/list',
  });

  console.log('tagOptionMap', tagOptions, tagOptionMap);

  const {
    options: subjectOptions,
    optionsMap: subjectOptionMap,
  } = chHooks.useOptionFormListHook({
    url: 'http://api-paper.kukechen.top/api/subject/list',
  });

  const columns = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Paper) => {
        return (
          <a
            target="_blank"
            href={
              'http://api-paperfile.kukechen.top/onlinePreview?url=' +
              record.file
            }
          >
            {text}
          </a>
        );
      },
    },
    {
      title: '学科',
      dataIndex: 'subjectId',
      key: 'subjectId',
      render: (text: string, record: Paper) => {
        return (
          <div className="flex">
            <div>{subjectOptionMap[text] && subjectOptionMap[text].name}</div>
          </div>
        );
      },
    },
    {
      title: '类目',
      dataIndex: 'gradeId',
      key: 'gradeId',
      render: (text: string, record: object) => {
        return <span>{gradeOptionMap[text] && gradeOptionMap[text].name}</span>;
      },
    },
    {
      title: '学期',
      dataIndex: 'gradeStepId',
      key: 'gradeStepId',
      render: (text: string, record: object) => {
        return (
          <span>
            {gradeStepOptionMap[text] && gradeStepOptionMap[text].name}
          </span>
        );
      },
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: '标签',
      dataIndex: 'tagIds',
      key: 'tagIds',
      render: (text: string, record: Paper) => {
        return (
          <div>
            {record.tagIds.map((tagId) => {
              return (
                <span key={tagId}>
                  {tagOptionMap[tagId] && tagOptionMap[tagId].name}
                </span>
              );
            })}
          </div>
        );
      },
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
  ];
  return (
    <div>
      <ChTablePanel
        onEditBefore={(item) => {
          let results: string[] = [];
          let hasError = false;
          if (item.file) {
            const { fileList } = item.file;
            fileList.forEach((f: any) => {
              if (f.response && f.response.status == 0) {
                results.push(f.response.result[0]);
              } else {
                hasError = true;
              }
            });
          }
          if (hasError) {
            return true;
          } else {
            delete item.file;
            item.fileList = results;
          }
        }}
        onEditFormat={(item: any) => {
          item.file = [];
        }}
        urlDelete="/api/paper/delete"
        urlAdd="/api/paper/add_multiple"
        urlUpdate="/api/paper/edit"
        url="/api/paper/page"
        columns={columns}
        searchFormData={[
          {
            placeholder: '请输入名称',
            layout: { span: 4 },
            type: FormItemType.input,
            label: '名称',
            name: 'name',
          },
          {
            placeholder: '请选择类目',
            layout: { span: 4, offset: 1 },
            type: FormItemType.select,
            label: '类目',
            name: 'gradeId',
            options: gradeOptions,
          },
          {
            placeholder: '请选择学期',
            layout: { span: 4, offset: 1 },
            type: FormItemType.select,
            label: '学期',
            name: 'gradeStepId',
            options: gradeStepOptions,
          },
          {
            placeholder: '请选择标签',
            layout: { span: 4, offset: 1 },
            type: FormItemType.multipleSelect,
            label: '标签',
            name: 'tagIds',
            options: tagOptions,
          },
        ]}
        formData={[
          {
            type: FormItemType.upload,
            label: '上传试卷',
            name: 'file',
            uploadurl: '/api/paper/upload',
            uploadname: 'files',
            itemshow: (editor: Paper) => {
              if (editor.id) {
                return false;
              }
              return true;
            },
            rules: [
              {
                required: true,
                message: '文件上传失败',
                validator: (rule, value, callback) => {
                  try {
                    const { file } = value;
                    if (file && file.response) {
                      if (file.response.status == 0) {
                        console.log('debug: 单文件上传成功！');
                        return Promise.resolve();
                      } else {
                        callback('文件上传失败！');
                      }
                    }
                  } catch (err) {
                    callback(err);
                  }
                },
              },
            ],
          },
          {
            type: FormItemType.input,
            label: '价格',
            name: 'price',
            rules: [{ required: false, message: '请输入价格' }],
          },
          {
            type: FormItemType.select,
            label: '学科',
            name: 'subjectId',
            options: subjectOptions,
            rules: [{ required: false, message: '请选择学科' }],
          },
          {
            type: FormItemType.select,
            label: '类目',
            name: 'gradeId',
            options: gradeOptions,
            rules: [{ required: false, message: '请输入类目名称' }],
          },
          {
            type: FormItemType.select,
            label: '学期',
            name: 'gradeStepId',
            options: gradeStepOptions,
            rules: [{ required: false, message: '请输入学期名称' }],
          },
          {
            type: FormItemType.multipleSelect,
            label: '标签',
            name: 'tagIds',
            options: tagOptions,
            rules: [{ required: false, message: '请选择标签' }],
          },
          {
            key: 'region',
            type: FormItemType.regionSelect,
            label: '请选择地区',
            name: 'region',
          },
        ]}
      />
    </div>
  );
};
