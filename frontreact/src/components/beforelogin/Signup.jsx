import Nav from "./Navbar"
import axiosUrl from "../url/Axiosurl";
import React, { useState } from 'react';
import signup from "../image/signup.jpg"
import Swal from 'sweetalert2'
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
    console.log(values,'console value')
    // if (!imageFile) {
    //   message.error('Please upload an image');
    //   return;
    // }
    // const values =  form.validateFields(); 
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('confirmpassword', values.confirmpassword);
    formData.append('image', imageFile);

    console.log('data: ', formData);
    axiosUrl.post("/user",formData).then((response)=>{
      if(response.data.message){
        Swal.fire({
          icon: "success",
          title: response.data.message,
          timer: 1500
        });
      }
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
    <div className="px-10 py-10 md:flex md:justify-around">

    <Form
    className="w-[90%] px-2 py-5  shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"
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

    <div>
       <img src={signup} className="md:ml-5  rounded-2xl"/>
    </div>

    </div>
    </>
  );
};
export default App;