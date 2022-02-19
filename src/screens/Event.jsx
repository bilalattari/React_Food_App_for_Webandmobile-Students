import react, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { ref, getDoc, db, doc, auth } from '../firebase'
import { Spin, Image, Row, Col } from 'antd';
import Conatiner from "../component/Container";

const Event = () => {
    const params = useParams()
    console.log(params)
    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState(null)

    useEffect(() => {
        getEvent()
    }, [])

    const getEvent = async () => {
        setLoading(true)
        const ref = doc(db, 'events', params.id)
        const event = await getDoc(ref)
        console.log('event.exists=>', event.exists())
        if (event.exists()) {
            setEvent(event.data())
        }
        setLoading(false)
    }


    return (
        <Conatiner>
            {
                loading ?
                    <div style={{
                        marginTop: 120
                    }}> <Spin /></div>
                    :
                    <h1>Event Detail</h1>
            }
            {
                event !== null ?
                    <Row justify={'start'}>
                        <Col span={12}> <Image
                            width={400}
                            src={event.eventImg}
                        /></Col>
                        <Col span={12} flex>

                            <h4>{event.eventName}</h4>
                            <h4>{event.eventDesc}</h4>
                            <h4>{event.eventDate}</h4>
                            <h4>{event.eventTime}</h4>
                        </Col>
                    </Row>


                    : !loading ?
                        <h1>No event found</h1> : null
            }
            <div>

            </div>

        </Conatiner>
    )
}

export default Event