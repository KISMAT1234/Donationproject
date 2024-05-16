const Category = () => {
  return(
    <>
      <div className="flex justify-between px-2 py-2 rounded-2xl bg-stone-100 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">All</h1>
        </div>

        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">Accident</h1>
        </div>
        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">Disease</h1>
        </div>

        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">Animal</h1>
        </div>

        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">Environment</h1>
        </div>

        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">Orphange</h1>
        </div>


      </div>
    </>
  )
}
export default Category;
// import React, { useState } from 'react';
// import {
//   AppstoreOutlined,
//   ContainerOutlined,
//   DesktopOutlined,
//   MailOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   PieChartOutlined,
// } from '@ant-design/icons';
// import { Button, Menu } from 'antd';

// const items = [
//   {
//     key: '1',
//     label: 'All',
//   },
//   {
//     key: '2',
//     label: 'Accident',
//   },
//   {
//     key: '3',
//     label: 'children',
//   },
//   {
//     key: 'sub1',
//     label: 'diseases',
//   },
// ];

// const Category = () => {
//   const [collapsed, setCollapsed] = useState(true); // Initially collapsed
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div
//       style={{
//         width: 256,
//       }}
//     >
//       <Button
//         type="primary"
//         onClick={toggleCollapsed}
//         style={{
//           marginBottom: 16,
//         }}
//         className="bg-green-600 md:hidden"
//       >
//         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//       </Button>
//       {!collapsed && ( // Render the Menu only if it's not collapsed
//         <Menu
//           defaultSelectedKeys={['1']}
//           defaultOpenKeys={['sub1']}
//           mode="inline"
//           theme="dark"
//           inlineCollapsed={collapsed}
//           items={items}
//           className="md:hidden  bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out"
//         />
//       )}
//     </div>
//   );
// };

// export default Category;
