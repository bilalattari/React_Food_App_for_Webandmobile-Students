import react, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword, userRef, auth, addDoc } from '../firebase'

import './login.css'
const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };


    const navigate = useNavigate()

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        signInWithEmailAndPassword(auth, values.email, values.password).then(() => {
            setSuccess('You are signed in')
            setTimeout(() => {
                setSuccess('')
                navigate('/')
            }, 2000);
        }).catch((err) => {
            setError(err.message)
            setTimeout(() => {
                setError('')
            }, 2000);
        })
    };

    return (
        <div>
            {
                error !== '' &&
                <Alert message={error} type={'error'} />
            }
            {
                success !== '' &&
                <Alert message={success} type={'success'} />
            }
            <div className='login_div'>
                <Form
                    name="normal_login"
                    className="login-form"
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
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>

                        Or
                        <Link to={'/register'} >
                            register now!
                        </Link>

                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}

export default Login