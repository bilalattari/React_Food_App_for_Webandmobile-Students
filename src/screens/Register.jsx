import react, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Form,
    Input,
    Select,
    Button, Alert
} from 'antd';
import './login.css'
import { createUserWithEmailAndPassword, userRef, auth, addDoc } from '../firebase'
const { Option } = Select;

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
const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        createUserWithEmailAndPassword(auth, values.email, values.password).then((user) => {
            console.log('auth done')
            let obj = {
                uid: user.user.uid,
                nickname: values.nickname,
                phone: values.phone,
                email: values.email,
                intro: values.intro,
                gender: values.gender
            }

            addDoc(userRef, obj).then(() => {

                <Alert message="Success Text" type="success" />
                navigate('/')
            }).catch((err) => {
                setTimeout(() => {
                    setError('')
                }, 3000);
                setError(err.message)
                console.log(err)
            })

        }).catch((err) => {
            setTimeout(() => {
                setError('')
            }, 3000);
            setError(err.message)
            console.log(err)
        })

    };




    return (
        <div>
            {
                error !== '' &&
                <Alert message={error} type={'error'} />
            }
            <div className='login_div'>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}

                    scrollToFirstError
                >
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

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="nickname"
                        label="Nickname"
                        tooltip="What do you want others to call you?"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
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

                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>


                    <Form.Item
                        name="intro"
                        label="Intro"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Intro',
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={100} />
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



                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                    <Link to={'/login'} >
                        Do you have an account? Login
                    </Link>
                </Form>
            </div>

        </div>
    )
}

export default Register