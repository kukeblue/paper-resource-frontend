import React from 'react';
import './index.less';
import { ChTablePanel, FormItemType } from 'ch-ui';
import { Button, Tag } from 'antd';
import { termType, TermType } from '@/config/common.data';
import { ChUtils } from 'ch-ui'
const { chHooks } = ChUtils

interface Tag {
    id: string;
    name: string;
    tagTypeId: string;
    gradeIds: string[];
    subjectIds: string[];
}

export default () => {
    const { 
        options: gradeOptions,
        optionsMap: gradeOptionsMap, 
     } = chHooks.useOptionFormListHook({url:"/api/grade/list"})
    const { 
        options: subjectOptions,
        optionsMap: subjectOptionsMap,
    } = chHooks.useOptionFormListHook({url:"/api/subject/list"})

    const columns = [
        {
            title: '标签类型',
            dataIndex: 'name',
            key: 'name',
        },
    ]

    const childColumns = [
        {
            title: '标签名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '所属类目',
            dataIndex: 'gradeIds',
            key: 'gradeIds',
            render: (_: string ,record: Tag)=>{
                console.log('gradeOptionsMap', gradeOptionsMap)
                return <div className='flex'>
                    {record.gradeIds.map(gradeId=>{
                        return <div className='m-r-5' key={gradeId}>{gradeOptionsMap[gradeId].name}</div>
                    })}
                </div>
            }
        },
        {
            title: '学科',
            dataIndex: 'subjectIds',
            key: 'subjectIds',
            render: (_: string ,record: Tag)=>{
                console.log('gradeOptionsMap', gradeOptionsMap)
                return <div className='flex'>
                    {record.subjectIds.map(subjectId=>{
                        return <div className='m-r-5' key={subjectId}>{subjectOptionsMap[subjectId].name}</div>
                    })}
                </div>
            }
        },
    ]
    return (
        <div>
            <ChTablePanel
                urlDelete='/api/tagType/delete'
                urlAdd='/api/tagType/add'
                urlUpdate='/api/tagType/edit'
                url='/api/tagType/page'
                columns={columns}
                formData={
                    [{
                        type: FormItemType.input,
                        label: '名称',
                        name: 'name',
                        rules: [{ required: true, message: '请输入标签名称' }],
                    }]
                }
                expandable={{
                    expandedRowRender: (record: any) => <div>
                      <ChTablePanel
                        onEditBefore={(item: any) => {
                          item.tagTypeId = record.id
                        }}
                        urlDelete='/api/tag/delete'
                        urlAdd='/api/tag/add'
                        urlUpdate='/api/tag/edit'
                        url='/api/tag/page'
                        query={{ tagTypeId: record.id }}
                        columns={childColumns}
                        formData={
                            [
                              {
                                type: FormItemType.input,
                                label: '名称',
                                name: 'name',
                                rules: [{ required: true, message: '请输名称' }],
                              },
                              {
                                type: FormItemType.multipleSelect,
                                label: '资源类目',
                                name: 'gradeIds',
                                options: gradeOptions,
                                rules: [{ required: true, message: '请选择资源类目' }],
                              },
                              {
                                type: FormItemType.multipleSelect,
                                label: '资源类目',
                                name: 'subjectIds',
                                options: subjectOptions,
                                rules: [{ required: true, message: '请选择资源类目' }],
                              }
                            ]
                          }
                      />
                    </div>,
                  }}
            />
        </div>
    );
}
