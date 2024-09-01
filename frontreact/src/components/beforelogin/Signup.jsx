// import Nav from "./Navbar"
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
import { Link } from "react-router-dom";

import { SIGNUP_MUTATION } from "../../graphql/mutations/userMutation";
import { useMutation } from "@apollo/client";
import google from "../../../../backnode/public/google.png";
import { useGoogleLogin } from "@react-oauth/google"
import { googleAuth } from "../../middleware/googleAuth";



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
  const [emailMessage, setEmailMessage] = useState('');
  const [signup] = useMutation(SIGNUP_MUTATION)
  console.log(signup,'sign-up')

  const onFinish = async(values) => {
    console.log(values,'console value')


    if (!imageFile) {
      message.error('Please upload an image');
      return;
    }
    // const values =  form.validateFields(); 


    const formData = {
      username: values.username,
      email: values.email,
      password: values.password,
      image: values.image
    };
    console.log(formData,'formdsdta')

    // try {
    //   const { data } = await signup({
    //     variables: { formData },
    //   });
    //   console.log('User created:', data);
    // } catch (error) {
    //   console.error('GraphQL Error:', error.message);
    //   if (error.graphQLErrors) {
    //     error.graphQLErrors.forEach(({ message, locations, path }) =>
    //       console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    //     );
    //   }
    //   if (error.networkError) {
    //     console.log(`[Network error]: ${error.networkError}`);
    //   }
    // }


    // axiosUrl.post("/user",formData).then((response)=>{
    //   console.log(response.data,'response signup')
    //   setEmailMessage(response.data.message)
    //   if(response.data.message){
    //     Swal.fire({
    //       icon: "success",
    //       title: response.data.message,
    //       timer: 1500
    //     });
    //   }
    // }).catch((err)=>{
    //   console.log(err,'errror ');
    // })
};

// const beforeUpload = (file) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   } else {
//     setImageFile(file);
//   }
//   return false; // Prevent automatic upload
// };

const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};


const responseGoogle = async (authResult) => {
  try{
    console.log(authResult,'authresult in responseGoogle')
    if(authResult['code']){
      console.log('came inside auth')
      const result = await googleAuth(authResult['code']);
      // console.log(result,'result')
      if(result.data.success === false){
        alert('Already login')
      }else{
      localStorage.setItem('user',result.data.data.token)
      window.location.href="/Mainpage";
      }
    }
  }catch(error){
    console.log(error,'error in client side')
  }
}

const googleLogin = useGoogleLogin({
  onSuccess: responseGoogle,
  onError: responseGoogle,
  flow:'auth-code'
})



  return (
    <>
    {/* <Nav to="true"/> */}
    <div className="px-10 py-10 md:flex md:justify-around">
      <div>

    <Form
    className="w-[90%] bg-stone-400 px-2 py-5 rounded-2xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
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

      {/* <Form.Item name="image" label="Image">
        <Upload
          beforeUpload={beforeUpload}
          maxCount={1}
          listType="picture"
          accept=".jpg,.jpeg,.png"
          showUploadList={false}
          fileList={imageFile}
        >
          <Button icon={<UploadOutlined />} className="bg-gray-400" >Click to upload</Button>
        </Upload>
      </Form.Item> */}

    <Form.Item
      name="upload"
      label="Upload"
      getValueFromEvent={normFile}
    >
      <Upload name="logo" listType="picture" maxCount={1} fileList={imageFile} accept=".jpg,.jpeg,.png">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item>
      

      <Form.Item {...tailFormItemLayout}>
        <Button className="bg-violet-600"  type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>

       <Link to="/login-form">
         <div className="text-center">
          <h1>
             Login
          </h1>
         </div>
       </Link>

      <div>
        <h1 className="text-2xl">{emailMessage}</h1>
      </div>
    </Form>
    <button
      onClick={googleLogin}
      className=" flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <img src={google} alt="Google Logo" width={40} height={40} />
      <span className="ml-4">Continue with Google</span>
    </button>
    </div>
    <div>
       <img src={signup} className="md:ml-5  rounded-2xl"/>
    </div>
    </div>
    </>
  );
};
export default App;