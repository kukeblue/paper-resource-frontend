import React, { useState, useRef, MutableRefObject, useEffect } from 'react';
import './index.less';
import { ChTablePanel, FormItemType, ChUtils, ChForm } from 'ch-ui';
import { Modal, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getObCache } from 'ch-ui/src/ChUtils/cache';
import { createModel } from 'hox';

function usePageCounter() {
  const tableRef: MutableRefObject<any> = useRef();
  const [showImportPaper, setShowImportPaper] = useState(false);
  return {
    tableRef,
    showImportPaper,
    setShowImportPaper,
  };
}

const usePageCounterModel = createModel(usePageCounter);

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

// @type React Compontent | @dec 弹出智能上传
export const UploadModal = () => {
  const {
    showImportPaper,
    setShowImportPaper,
    tableRef,
  } = usePageCounterModel();
  const [uploadNumber, setUploadNumber] = useState(0);

  useEffect(() => {
    setUploadNumber(0);
  }, [showImportPaper]);

  return (
    <Modal
      destroyOnClose
      onCancel={() => {
        setShowImportPaper(false);
        tableRef.current.reload();
      }}
      onOk={() => {
        setShowImportPaper(false);
        tableRef.current.reload();
      }}
      visible={showImportPaper}
      footer={null}
    >
      <h3>快速导入试卷</h3>
      <div className="m-t-20">
        <Upload
          headers={{
            Auth: getObCache('user') && getObCache('user').token,
          }}
          multiple
          name={'files'}
          action={'/api/paper/smart_upload'}
          onChange={(info) => {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name}: 文件上传成功.`);
              setUploadNumber(uploadNumber + 1);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name}: 文件上传失败.`);
            }
          }}
        >
          <Button icon={<UploadOutlined />}>点击文件</Button>
        </Upload>
      </div>
      <div className="p-30">
        当前成功上传试卷<span className="">{uploadNumber}</span>张
      </div>
    </Modal>
  );
};

export default () => {
  const {
    showImportPaper,
    setShowImportPaper,
    tableRef,
  } = usePageCounterModel();
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
        return gradeOptionMap[text] && <span>{gradeOptionMap[text].name}</span>;
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
                tagOptionMap[tagId] && (
                  <span key={tagId}>{tagOptionMap[tagId].name || tagId}</span>
                )
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
      <UploadModal />
      <ChTablePanel
        ref={tableRef}
        actions={[
          {
            text: '直接导入试卷',
            onClick: () => {
              console.log('点击了action');
              setShowImportPaper(true);
            },
          },
        ]}
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
