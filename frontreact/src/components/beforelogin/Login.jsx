
import Nav from "./Navbar"
import axiosUrl from "../url/Axiosurl";
import React,{useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
// import Swal from 'sweetalert2'
import login from "../image/login.jpeg"
const App = () => {

  const onFinish = (values) => {


    console.log('Received values of form: ', values);
    axiosUrl.post("/login",values).then((response)=>{
      // console.log(response.data.notfound);
      if(response.data.notfound){
        console.log(response.data.notfound)
        alert(response.data.notfound)
      }else{
 
        localStorage.setItem("token",response.data.token);
        window.location.href="/Mainpage";
        // if(response.data.token){
        //   Swal.fire({
        //     icon: "success",
        //     title: "Login Successfull",
        //     showConfirmButton: false,
        //     timer: 9000
        //   });
        // }
      }

    }).catch((err)=>{
      console.log(err)
    })
  };
  return (
    <>
    <Nav/>
    <div className="mx-10 md:mx-40  my-5 flex shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
      <Form
        name="normal_login"
        className="w-[70%] login-form  px-10 mt-5"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >

          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-600 login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>

      <div className="w-[30%]" >
        <img src={login} className=" rounded-2xl"/>
      </div>

    </div>
    </>
  );
};
export default App;