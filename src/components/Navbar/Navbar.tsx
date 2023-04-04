import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './navbar.css'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('todo List', '1', <PieChartOutlined />),
  getItem('Bill', '2', <DesktopOutlined />),
  getItem('Journal', '3', <ContainerOutlined />),

  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),

    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("1");
  useEffect(()=>{
    const storedValue = localStorage.getItem('selectedKey');
    if (storedValue && selected !== storedValue) {
       navigate('/todolist');
    }
  },[])
  function navi(e : MenuItem) : void {
    if(e != null){
      if(typeof e.key === "string" ){
        setSelected(e.key);
        localStorage.setItem('selectedKey',e.key);
      }
    }
  }
  function transform(e : MenuItem) : void {
    console.log(e);
    if(e !== null){
      if(e.key === '1') navigate('/todolist');
      else if(e.key === '2') navigate('/bill');
      else if(e.key === '3') navigate('/journal');
    }
  }
  //setSelected(localStorage.getItem('selectedKey') !== null ? localStorage.getItem('selectedKey') as string : "1");
  return (
    <div className='menu-box'>
      <div style={{width : 256}}>
      <Menu
        defaultSelectedKeys={[selected]}
        selectable={true}
        mode="inline"
        theme="light"
        items={items}
        onClick={(e)=>navi(e)}
        onSelect={(e)=>transform(e)}
      />
    </div>
    </div>
  );
};

export default Navbar;