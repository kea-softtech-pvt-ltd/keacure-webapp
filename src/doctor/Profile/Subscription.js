import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubscriptionApi from '../../../src/services/SubscriptionApi'
import { Button, Modal } from "react-bootstrap";
import { FaRupeeSign } from "react-icons/fa";

export default function Subscription() {
    const { subscription, getSubscriptionPlan } = SubscriptionApi()
    const [show, setShow] = useState(false);
    const [getSubData, setGetSubData] = useState([])
    const [getSubscription, setGetSubscription] = useState([])
    const { doctorId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getSubscriptionPlans()
    }, [getSubscription])

    const handleShow = (item) => {
        setShow(true)
        setGetSubData(item)
    }

    const handleClose = () => setShow(false)

    const confirmInputHandler = (plan) => {
        const bodyData = {
            "doctorId": doctorId,
            "date": new Date(),
            "expiryDate": new Date(),
            "plan": plan.name,
            "duration": plan.frequency,
            "status": "Running"
        }
        subscription(bodyData)
            .then(() => {
                navigate(`/profile/${doctorId}/edit`)
            })
    }

    const getSubscriptionPlans = async() => {
        await getSubscriptionPlan()
        .then((res) => {
            const data = res.filter((sub) => {
                if (sub.status === true) {
                    return (sub)
                }
            })
            setGetSubscription(data)
        })
    }

    return (
        <main>
            <div className="bg_color_2">
                <div className="container ">
                    <div className="subscription ">
                        <h2>Ready to get Started?</h2>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            {getSubscription.map((item, i) => {
                                return (
                                    <div className="whiteCard  col-3" key={i}>
                                        <span>
                                            <h4 className="add_top_20">{item.name}</h4>
                                        </span>
                                        <h5> <FaRupeeSign />-{item.amount}</h5>
                                        <ul className=" card-text cardListScroll underline" >
                                            {item.features.map((data, i) => {
                                                return (
                                                    <li key={i} className="card-list">
                                                        <i className="icon-right-circled" title="right-tick"></i>
                                                        {data}
                                                    </li>
                                                )
                                            })}

                                        </ul>
                                        <button
                                            onClick={() => handleShow(item)}
                                            className=" sub-card-btn add_bottom_15 shadow-none btn btn-primary">
                                            Get Started
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-danger">You Want To Get This Subscription. </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" className='appColor' onClick={() => confirmInputHandler(getSubData)}>
                        Yes
                    </Button>
                    <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    )
}