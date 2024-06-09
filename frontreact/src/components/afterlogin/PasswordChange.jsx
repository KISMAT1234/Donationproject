import React, { useState } from 'react';
import {

  Form,
  Input,
  Button

} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const PasswordChange= () => {
  const [form] = Form.useForm();


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
 



  return (
    <div className="mx-10 my-10">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
         <Form.Item
        name="previouspassword"
        label="Previous-Password"
        rules={[
          {
            required: true,
            message: 'Please input your previous password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="password"
        label="New-Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm-New-Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
       >
        <Input.Password />
      </Form.Item>
        <Button type="primary" className="bg-gray-600 ml-10" htmlType="submit">
          Change Password
        </Button>

   
    </Form>
    </div>
  );
};
export default PasswordChange;