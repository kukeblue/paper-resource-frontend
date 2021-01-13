import React from 'react';
import './index.less';
import { ChTablePanel, FormItemType } from 'ch-ui';
import { Button, Tag } from 'antd';
import { termType, TermType } from '@/config/common.data';



export default () => {

    const columns = [
        {
            title: '标签名称',
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
            render: (text: string) => {
                return <Tag>{(termType as any)[text]}</Tag>
            }
        },
    ]
    return (
        <div>
            <ChTablePanel
                urlDelete='/api/tag/delete'
                urlAdd='/api/tag/add'
                urlUpdate='/api/tag/edit'
                url='/api/tag/page'
                columns={columns}
                formData={
                    [{
                        type: FormItemType.input,
                        label: '名称',
                        name: 'name',
                        rules: [{ required: true, message: '请输入标签名称' }],
                    }]
                } expandable={{
                    expandedRowRender: (record: any) => <div>
                        <ChTablePanel
                            onAddBefore={(item: any) => {
                                item.gradeId = record.id
                                console.log(item);
                            }}
                            urlDelete='/api/tagType/delete'
                            urlAdd='/api/tagType/add'
                            urlUpdate='/api/tagType/edit'
                            url='/api/tagType/page'
                            query={{ tagTypeId: record.id }}
                            columns={childColumns}
                            formData={
                                [
                                    {
                                        type: FormItemType.multipleSelect,
                                        label: '名称',
                                        name: 'name',
                                        rules: [{ required: true, message: '请输入年级名称' }],
                                    },
                                ]
                            }
                        />
                    </div>,
                }
                }



            />
        </div>
    );
}
