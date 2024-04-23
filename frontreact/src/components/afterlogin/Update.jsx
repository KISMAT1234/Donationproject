import React from 'react';
import { Button, Form, Input } from 'antd';
import axiosUrl from '../url/Axiosurl';
import { useParams } from 'react-router-dom';



const Update = () => {
   let slugValue = useParams();
   slugValue = slugValue.slug
  //  console.log(slugValue,"slug")


const MyFormItemContext = React.createContext([]);
function toArr(str) {
  return Array.isArray(str) ? str : [str];
}
const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};
const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

  
  const onFinish = (value) => {
    const updateInformation = value.user.name;
    // console.log(updateInformation,"update info")
    axiosUrl.patch(`/user/${slugValue}`,updateInformation).then((response) => {
      // console.log(response);
      if(response.data.success == true){
        alert("Update successfully")
      }else{
        alert("Failed to update");
      }
    }).catch((error) => {
      console.log(error);``
    });
  };
  return (
    <>
    <div className="px-5 py-5 mx-5 h-[80vh] bg-green-400 rounded-2xl">
    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
      <MyFormItemGroup prefix={['user']}>
        <MyFormItemGroup prefix={['name']}>
          <MyFormItem name="username" label=" username">
            <Input />
          </MyFormItem>
          <MyFormItem name="email" label="Email">
            <Input />
          </MyFormItem>
        </MyFormItemGroup>
      </MyFormItemGroup>

      <Button type="primary" htmlType="submit" className="bg-red-400">
        Update
      </Button>
    </Form>
    </div>
    </>
  );
};
export default Update;
