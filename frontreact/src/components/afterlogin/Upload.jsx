
import axiosUrl from "../url/Axiosurl";
import React, { useState } from 'react';
import { Form, Input, Button, Upload, message,Select,DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import post from "../image/post.jpg"

const FormWithUpload = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="97">+97</Option>
      </Select>
    </Form.Item>
  );




  const token = localStorage.getItem("token") ?? "";

  const onFinish = (value) => {
    // console.log(value,'values data');
    const { prefix, phone, ...rest } = value; // Extract prefix and phone number
     // Combine prefix and phone number

    const values = {
      ...value,
      'start': value['start'].format('YYYY-MM-DD'),
      'end': value['end'].format('YYYY-MM-DD'),
      'phone': `+${prefix}${phone}`
    }
    // console.log(values,'date value')
    // if (!imageFile) {
    //   message.error('Please upload an image');
    //   return;
    // }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('address', values.address);
    formData.append('age', values.age);
    formData.append('phone', values.phone);
    formData.append('gender', values.gender);
    formData.append('startDate', values.start);
    formData.append('endDate', values.end);
    formData.append('topic', values.topic);
    formData.append('description', values.description);
    formData.append('image', imageFile);

    // Now you can send formData to the backend using fetch or any other method
    // console.log(formData,'form data to send backend');

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
            className="  px-5 py-5 md:w-[60%] shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]"
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="age" label="Age" rules={[{ required: true }]}>
              <Input />
            </Form.Item>  
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: 'Please select gender!',
                },
              ]}
           >
             <Select placeholder="select your gender">
                 <Option value="male">Male</Option>
                 <Option value="female">Female</Option>
                 <Option value="other">Other</Option>
              </Select>
           </Form.Item>

           <Form.Item name="start" label="Start Fund Raising">
             <DatePicker />
          </Form.Item>

           <Form.Item name="end" label="End Fund Raising">
             <DatePicker />
          </Form.Item>

           <Form.Item name="topic" label="Topic" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input.TextArea showCount maxLength={500} />
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


