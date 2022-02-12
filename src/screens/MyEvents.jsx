import React, { useEffect, useState } from "react";
import './home.css'
import { getDocs, db, eventRef, auth, query } from '../firebase'
import Conatiner from "../component/Container";
import { Card, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { where } from "firebase/firestore";
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

function MyEvents() {
    const [color, setColor] = useState('red')
    const [eve, setEve] = useState([])
    const navigate = useNavigate()

    useEffect(async () => {
        if (auth.currentUser == null) {
            navigate('/login')
        }
        getAllEvent()

    }, [])

    const getAllEvent = async () => {
        const q = query(eventRef, where("uid", "==", auth.currentUser.uid))
        const querySnapshot = await getDocs(q);
        let events = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            events.push({ id: doc.id, ...doc.data() })
        });
        setEve(events)
    }


    console.log('events==>', eve)

    return (
        <Conatiner>
            <div className="container_event">

                {
                    eve.map((data, index) => {
                        return (
                            <Card
                                style={{ width: 300, margin: 12 }}
                                cover={
                                    <img
                                        alt="example"
                                        src={data.eventImg}
                                        className={'event_img'}
                                    />
                                }
                                actions={[
                                    <EditOutlined color="blue" key="setting" />,

                                    <DeleteOutlined color="red" key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title={data.eventName}
                                    description={data.eventDesc}
                                />
                            </Card>
                        )
                    })
                }
            </div>

        </Conatiner>
    )
}

export default MyEvents