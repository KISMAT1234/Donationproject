import Nav from "./Navbar"
import axiosUrl from "../url/Axiosurl";
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Upload,
  message
} from 'antd';


const App = () => {

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
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };


  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  const onFinish = (values) => {
    if (!imageFile) {
      message.error('Please upload an image');
      return;
    }
    // const values =  form.validateFields(); 
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('confirmpassword', values.confirmpassword);
    formData.append('image', imageFile);

    console.log('data: ', formData);
    axiosUrl.post("/user",formData).then((response)=>{
      alert("datasend successfull");
    }).catch((err)=>{
      console.log(err);
    })
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  } else {
    setImageFile(file);
  }
  return false; // Prevent automatic upload
};




  return (
    <>
    <Nav/>
    <Form
    className="mt-10"
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
        name="username"
        label="Username"
        rules={[
          {
            type: 'username',
            message: 'The input is not valid Username!',
          },
          {
            required: true,
            message: 'Please input your Username',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
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
        name="confirmpassword"
        label="Confirm Password"
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

      <Form.Item name="image" label="Image">
              <Upload
                beforeUpload={beforeUpload}
                maxCount={1}
                listType="picture"
                accept=".jpg,.jpeg,.png"
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} className="bg-gray-400" >Click to upload</Button>
              </Upload>
        </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button className="bg-violet-600 h"  type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};
export default App;