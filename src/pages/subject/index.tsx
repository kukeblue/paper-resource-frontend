import React from 'react';
import './index.less';
import { ChTablePanel, FormItemType } from 'ch-ui';
import { Button, Tag } from 'antd';
import { termType, TermType } from '@/config/common.data';



export default () => {

    const columns = [
        {
            title: '科目名称',
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
                urlDelete='/api/subject/delete'
                urlAdd='/api/subject/add'
                urlUpdate='/api/subject/edit'
                url='/api/subject/page'
                columns={columns}
                formData={
                    [{
                        type: FormItemType.input,
                        label: '名称',
                        name: 'name',
                        rules: [{ required: true, message: '请输入学科名称' }],
                    }]
                }

            />
        </div>
    );
}
