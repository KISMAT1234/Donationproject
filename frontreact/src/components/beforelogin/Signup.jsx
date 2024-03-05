// import {Link } from "react-router-dom"
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import axiosUrl from "../url/Axiosurl";

// const Signupschema = yup.object().shape({
//     username: yup.string().required(),
//     email: yup.string().required().email(),
//     password: yup.string().required(),
//     confirmpassword: yup.string().required().oneOf([yup.ref('password'),null],'password not match'),
//   })
//   .required();


// function Signup(){

//   const {setValue, register,  reset,  handleSubmit, formState: {errors} } = useForm({
//     resolver: yupResolver(Signupschema),
//   });
  
//   const errorColor = {
//     color:"white"
//   }



//   const unReload = (data) => {

//     let sendData = new FormData();
//     sendData.append("username", data.username);
//     sendData.append("email", data.email);
//     sendData.append("password", data.password);
//     console.log(sendData);
   
//     axiosUrl.post("/user", sendData).then((response)=>{
//       alert('register succesfull')
//         reset();
//     }).catch((err)=>{
//       console.log(err);
//     })
//   }

//   return(
//     <>
//     <Nav/>
//     <div className="border-2 border-green-400 h-[120vh] w-[100%] bg-red-600 ">
//     <h1 className="text-6xl text-blue-400 font-bold ml-10 mt-2 mb-5" >SIGNUP FORM</h1>
//       <form onSubmit={handleSubmit(unReload)}>
//         <div className="mx-10 text-2xl font-thin">
//         {errors.username?.message && <a style ={errorColor}> <p>{errors.username?.message}</p></a>}
//         </div>
//         <input type="text" {...register("username")}  name="username" className=" mt-2 border-b-2 border-blue-900 w-[80%] text-3xl  mx-10" placeholder=" UserName " />
//         <div className="mx-10 text-2xl font-thin">
//         {errors.email?.message && <a style ={errorColor}> <p>{errors.email?.message}</p></a>}
//         </div>
//         <input type="email" {...register('email')} name="email" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="Email"/>
//         <div className="mx-10 text-2xl font-thin">
//         {errors.password?.message && <a style ={errorColor}> <p>{errors.password?.message}</p></a>}
//         </div>
//         <input type="password" {...register("password")} name="password" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="Password"/>
//         <div className="mx-10 text-2xl font-thin">
//         {errors.confirmpassword?.message && <a style ={errorColor}> <p>{errors.confirmpassword?.message}</p></a>}
//         </div>
        
//         <input type="password" {...register('confirmpassword')} name="confirmpassword" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="Confirm Password"/>

//         {/* <input type="file" className="mx-10 mt-4 text-2xl" name="image" placeholder="profile photo" onChange={(e)=>{setValue("image", e.target.files[0])}}/> */}
//         <div className="flex justify-between">
//            <button className="hover:bg-orange-600 bg-green-900  w-[30%] text-3xl mx-10 mt-4 text-amber-50"> Signup </button>
//            <Link to="/login-form">
//            <button className="hover:bg-orange-600 bg-green-900  w-[70%] text-3xl mr-40 text-amber-50  mt-4"> Login </button>
//            </Link>
//          </div>      
//       </form>
      
//     </div>
//     </>
//   )
// }
// export default Signup;




import { useForm } from 'react-hook-form';
import Nav from "./Navbar"
import React, { useState } from 'react';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';

const { Option } = Select;
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
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
const App = () => {
  const [form] = Form.useForm();
const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const onSubmit = (data) =>{
    console.log(data);
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <>
    <Nav/>
    <Form
    onSubmit={handleSubmit(onSubmit)}
    className="mt-10"
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
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
        name="confirm"
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
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button className="bg-violet-600" type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};
export default App;