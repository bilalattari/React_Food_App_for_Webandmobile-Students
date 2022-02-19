import React, { useEffect, useState } from "react";
import './home.css'
import { getDocs, db, eventRef, auth, onAuthStateChanged } from '../firebase'
import Conatiner from "../component/Container";
import { Card, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;

function Home() {
    const [color, setColor] = useState('red')
    const [eve, setEve] = useState([])
    const navigate = useNavigate()

    useEffect(async () => {
        getAllEvent()
        onAuthStateChanged(auth, (user) => {
            if (user) {
            } else {
                navigate('/login')
            }
        })
    }, [])

    const getAllEvent = async () => {
        const querySnapshot = await getDocs(eventRef);
        let events = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            events.push({ id: doc.id, ...doc.data() })
        });
        setEve(events)
    }

    const goToEventPage = (event) => {
        console.log('event=>', event)
        navigate(`/event/${event.eventName}/${event.id}`)
    }



    return (
        <Conatiner>
            <div className="container_event">

                {
                    eve.map((data, index) => {
                        return (
                            <Card
                                onClick={() => goToEventPage(data)}
                                style={{ cursor: 'pointer', width: 300, margin: 12 }}
                                cover={
                                    <img
                                        alt="example"
                                        src={data.eventImg}
                                        className={'event_img'}
                                    />
                                }
                                actions={[
                                    <SettingOutlined key="setting" />,

                                    <EllipsisOutlined key="ellipsis" />,
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

export default Home