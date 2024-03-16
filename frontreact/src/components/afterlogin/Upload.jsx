
import axiosUrl from "../url/Axiosurl";
import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import post from "../image/post.jpg"


const FormWithUpload = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  const onFinish = (values) => {
    if (!imageFile) {
      message.error('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('address', values.address);
    formData.append('age', values.age);
    formData.append('description', values.description);
    formData.append('image', imageFile);

    // Now you can send formData to the backend using fetch or any other method
    console.log('Data to send:', formData);
      axiosUrl.post("/upload",formData).then((response)=>{
    if(response){
      alert("datasend successfull");
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

     <div className=" mx-5 md:flex w-[100%]">
          <Form form={form} onFinish={onFinish}
            className=" mt-10 px-5 py-5 md:w-[60%] shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]"
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="age" label="age" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="description" rules={[{ required: true }]}>
              <Input />
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
            <Form.Item>
              <Button className="bg-red-600 flex ml-[50%]" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <div className="">
             <img src={post} className="w-[400px] m-[20px]"/>
          </div>
      </div>
    </>
  );
};

export default FormWithUpload;


