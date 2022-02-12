import react, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Image, Form, DatePicker, TimePicker,
    Upload,
    Button, Alert, Input
} from 'antd';
import { UploadOutlined , EditOutlined , DeleteOutlined  } from '@ant-design/icons';

import './login.css'
import {
    createUserWithEmailAndPassword,
    getStorage, uploadBytes, getDownloadURL,
    userRef, auth, addDoc, ref, eventRef
} from '../firebase'
import Conatiner from '../component/Container';

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
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};
const rangeConfig = {
    rules: [
        {
            type: 'array',
            required: true,
            message: 'Please select time!',
        },
    ],
};


const AddEvent = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };


    const onFinish = async (fieldsValue) => {
        // Should format date value before submit.
        setLoading(true)
        const values = {
            ...fieldsValue,
            'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
            'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
        };
        console.log('Received values of form: ', values);
        const eventImg = await uploadImageToFirebase(values.upload[0].originFileObj)
        if (eventImg) {
            let obj = {
                eventName: values.name,
                eventDesc: values.description,
                eventTime: values['time-picker'],
                eventDate: values['date-picker'],
                eventImg,
                uid: auth.currentUser.uid
            }
            addDoc(eventRef, obj).then(() => {
                navigate('/')
                setLoading(true)

            }).catch(() => setLoading(false))
        }
        setLoading(true)

        console.log('eventimg==>', eventImg)


    };

    const uploadImageToFirebase = async (file) => {

        let eventImg;
        try {
            const storage = getStorage()
            const storeageRef = ref(storage, file.name)
            const upload = await uploadBytes(storeageRef, file)
            console.log('file uploaded')
            const imageUrl = await getDownloadURL(storeageRef)
            eventImg = imageUrl
        } catch (err) {
            console.log(err.msg)
        }
        return eventImg

    }




    return (
        <Conatiner>
            {
                error !== '' &&
                <Alert message={error} type={'error'} />
            }


            <Form name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Event Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your event name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Event Description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input event description',
                        },
                    ]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>

                <Form.Item name="date-picker" label="DatePicker" {...config}>
                    <DatePicker />
                </Form.Item>


                <Form.Item name="time-picker" label="TimePicker" {...config}>
                    <TimePicker />
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="longgggggggggggggggggggggggggggggggggg"
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                    }}
                >
                    <Button loading={loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </Conatiner>
    )
}

export default AddEvent