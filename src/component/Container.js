import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import '../screens/home.css'
import { signOut, auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'

const { Header, Content, Footer } = Layout;

function Conatiner({ children, }) {
    const [color, setColor] = useState('red')
    const navigate = useNavigate()

    const onClickLogout = () => {
        signOut(auth).then(() => navigate('/login'))
    }

    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />

                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Link to={'/'}>
                        <Menu.Item key="1">All Events</Menu.Item>
                    </Link>
                    <Link to={'/myEvents'}>
                        <Menu.Item key="2">My Events</Menu.Item>
                    </Link>

                    <Link to={'/add'}>
                        <Menu.Item key="3">Add Event</Menu.Item>
                    </Link>

                    <Menu.Item onClick={onClickLogout} key="4">Logout</Menu.Item>
                </Menu>

            </Header>

            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default Conatiner