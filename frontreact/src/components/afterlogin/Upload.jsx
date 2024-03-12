import axiosUrl from "../url/Axiosurl";
import Topbar from "./bar/Top";
import Leftbar from "./bar/Leftbar"
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Upload } from 'antd';
import post from "../image/post.jpg"
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = (values) => {
  const data = values.user
  console.log('Received values of form: ', data);

  axiosUrl.post("/upload",data).then((response)=>{
    if(response){
      alert("datasend successfull");
    }
  }).catch((err)=>{
    console.log(err);
  })
};


const App = () => (
  <>
  <Topbar/>
  <div className="md:flex ">
  <Leftbar/>
  <div className="md:flex w-[100%]">
  <Form
  className="mt-5 py-5 md:w-[40%] shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]"
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 900,
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'name']}
      label="Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name={['user', 'address']}
      label="Address"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
  
    <Form.Item
      name={['user', 'age']}
      label="Age"
      rules={[
        {
          type: 'number',
          min: 0,
          max: 99,
        },
      ]}
    >
      <InputNumber />
    </Form.Item>
        <Form.Item name={['user', 'description']} label="Description">
        <Input.TextArea />
      </Form.Item>
 
  
    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
    </Form.Item>

    <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
      <Upload action="/upload.do" listType="picture-card">
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </Upload>
    </Form.Item>
      <Button className="bg-red-600 flex ml-[50%]" type="primary" htmlType="submit">
        Submit
      </Button>
  </Form>
  <div className="">
      <img src={post} className="w-[600px] m-[20px]"/>
    </div>
  </div>
  </div>
  </>
);
export default App;