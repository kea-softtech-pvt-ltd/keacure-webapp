import React, { useEffect, useState } from "react";
import AuthApi from "../../services/AuthApi";
import { useParams } from "react-router-dom";
import UserLinks from "./partial/uselinks";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useRecoilState } from "recoil";
import { setHelperData } from "../../recoil/atom/setHelperData";
import { Button, Modal } from "react-bootstrap";
import SubscriptionApi from "../../services/SubscriptionApi";
export default function SubscriptionCard() {
    const { updateSubscriptionData, getSubscriptionData } = SubscriptionApi();
    const [getSubData, setGetSubData] = useState(null);
    const [getPlan, setGetPlan] = useState(null);
    const [subscriptionId, setSubscriptionId] = useState([]);
    const { doctorId } = useParams();
    const [helpersData, setHelpersData] = useRecoilState(setHelperData);
    const [show, setShow] = useState(false);

    const history = useHistory();

    useEffect(() => {
        fetchSubscription()
    }, []);

    const fetchSubscription = () => {
        getSubscriptionData({ doctorId })
            .then((res) => {
                setGetSubData(res[0].selected_plan)
                setSubscriptionId(res[0]._id)
            })

    }
    const handleShow = (item) => {
        setGetPlan(item)
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }

    const confirmInputHandler = (plan) => {
        const _id = subscriptionId;
        const bodyData = {
            "doctorId": doctorId,
            "date": new Date(),
            "plan": plan,
        }
        updateSubscriptionData({ _id }, bodyData)
            .then(() => {
                history.push(`/doctorprofile/${doctorId}`)
                setGetSubData(plan)
            })
        handleClose()

    }

    return (
        <>
            <Wrapper>
                <MainNav>
                    <ul className="clearfix">
                        <li>
                            <Link to={`/dashboard/${doctorId}`}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </Link>
                        </li>
                        <li className='float-none' style={{ fontSize: 'inherit' }} >Subscription</li>

                    </ul>
                </MainNav>
                <div className="row ">
                    <UserLinks
                        doctorId={doctorId}
                        helperId={helpersData._id}
                        accessModule={helpersData.access_module}
                    />
                    <div className="col-md-10">
                        <div className="container ">
                            <div className="row">
                                <div className="card">
                                    <span>
                                        <h4 className=" card-title float-left">Free-Trial</h4>
                                    </span>
                                    <ul className="card-text" >
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Access All patients for FREE!
                                        </li>
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Create Profile
                                        </li>
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Add Multiple Clinic for FREE!
                                        </li>
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Try Many Features for FREE!
                                        </li>
                                    </ul>
                                    {getSubData === 'free-trial' ?
                                        <button
                                            onClick={handleClose}
                                            className="btn disabled-card shadow-none disabled"
                                        >Subscribed
                                        </button>
                                        : <button
                                            onClick={() => handleShow('free-trial')}
                                            className="sub-card-btn shadow-none btn btn-primary">
                                            Get Started
                                        </button>
                                    }
                                </div>
                                <div className="card">
                                    <span>
                                        <h4 className=" card-title float-left">6-Month</h4>
                                    </span>
                                    <ul className="card-text" >
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Access All patients for FREE!
                                        </li>
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Create Profile
                                        </li>
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Add Multiple Clinic for FREE!
                                        </li>
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Try Many Features for FREE!
                                        </li>
                                    </ul>
                                    {getSubData === '6-month' ?
                                        <button
                                            onClick={handleClose}
                                            className="btn disabled-card shadow-none disabled"
                                        >Subscribed
                                        </button>
                                        : <button
                                            onClick={() => handleShow('6-month')} className="sub-card-btn shadow-none btn btn-primary">
                                            Get Started
                                        </button>
                                    }
                                </div>
                                <div className="card">
                                    <span>
                                        <h4 className=" card-title float-left">Yearly</h4>
                                    </span>
                                    <ul className="card-text" >
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Access All patients for FREE!
                                        </li>
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Create Profile
                                        </li>
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Add Multiple Clinic for FREE!
                                        </li>
                                        <li className="card-list">
                                            <i className="icon-right-circled" title="right-tick"></i>
                                            Try Many Features for FREE!
                                        </li>
                                    </ul>
                                    {getSubData === "yearly" ?
                                        <button
                                            onClick={handleClose}
                                            className="btn disabled-card shadow-none disabled"
                                        >Subscribed
                                        </button>
                                        : <button
                                            onClick={() => handleShow('yearly')}
                                            className=" sub-card-btn shadow-none btn btn-primary">
                                            Get Started
                                        </button>
                                    }
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
                            <Button variant="default" className='appColor' onClick={() => confirmInputHandler(getPlan)}>
                                Yes
                            </Button>
                            <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={() => handleClose()}>
                                No
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </Wrapper>


        </>
    )
}