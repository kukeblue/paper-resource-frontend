import { Form, Input, Button, Select } from 'antd';
import React from 'react';
import { ChUtils } from 'ch-ui';
import 'ch-ui/src/ChUtils/cache';
import { getObCache, setObCache } from 'ch-ui/src/ChUtils/cache';
import { useHistory } from 'umi';
const { Ajax } = ChUtils;
interface User {
  userName: String;
  passWord: String;
  token?: String;
}
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export default () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        return;
    }
  };

  const onFinish = (values: any) => {
    Ajax.request({
      url: '/api/user/login',
      data: {
        username: values.username,
        password: values.password,
      },
    }).then((res: any) => {
      if (res.status == 0) {
        const user: User = res.result;
        setObCache('user', user);
        history.replace('/grade');
      }
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <div className="m-t-50">
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.gender !== currentValues.gender
          }
        >
          {({ getFieldValue }) => {
            return getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
