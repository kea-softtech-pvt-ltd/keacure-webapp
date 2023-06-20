import React, { useEffect, useState } from "react";
import AuthApi from "../../services/AuthApi";
import { useParams } from "react-router-dom";
export default function SubscriptionCard() {
    const { updateSubscriptionData, getSubscriptionData } = AuthApi()
    const [getSubData, setGetSubData] = useState('')
    const [subscriptionId, setSubscriptionId] = useState([])
    const { doctorId } = useParams();
    const handlechecked = (event) => {
        setGetSubData(event.target.value)
    }
    useEffect(() => {
        fetchSubscription()
    }, [])

    const fetchSubscription = async () => {
        const result = await getSubscriptionData({ doctorId })
        setGetSubData(result[0].selected_plan)
        setSubscriptionId(result[0]._id)
    }

    const confirmInputHandler = async () => {
        const _id = subscriptionId;
        const bodyData = {
            "doctorId": doctorId,
            "date": new Date(),
            "plan": getSubData,
        }
        await updateSubscriptionData({ _id }, bodyData)
            
    }



    return (
        <div>
            <main>
                <div className="bg_color_2">
                    <div className="container ">
                        <div className="row">
                            <div className="card">
                                <span>
                                    <h4 className=" card-title float-left">Free-Trial</h4>
                                    <input
                                        onChange={handlechecked}
                                        className="float-right radio-input"
                                        value='free-trial'
                                        name="getSubData"
                                        type="radio"
                                        checked={getSubData === 'free-trial'}
                                    />
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
                                        onClick={confirmInputHandler}
                                        className="sub-card-btn shadow-none btn btn-primary"
                                    >Get Started
                                    </button>
                                    : <button
                                        className="btn disabled-card shadow-none disabled">
                                        Get Started
                                    </button>
                                }
                            </div>
                            <div className="card">
                                <span>
                                    <h4 className=" card-title float-left">6-Month</h4>
                                    <input
                                        className="radio-input float-right"
                                        onChange={handlechecked}
                                        value='6-month'
                                        name='getSubData'
                                        type="radio"
                                        checked={getSubData === '6-month'}
                                    />
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
                                        onClick={confirmInputHandler}
                                        className="sub-card-btn shadow-none btn btn-primary"
                                    >Get Started
                                    </button>
                                    : <button
                                        className="btn disabled-card shadow-none disabled">
                                        Get Started
                                    </button>
                                }
                            </div>
                            <div className="card">
                                <span>
                                    <h4 className=" card-title float-left">Yearly</h4>
                                    <input
                                        className=" radio-input float-right"
                                        onChange={handlechecked}
                                        value="yearly"
                                        name="getSubData"
                                        type="radio"
                                        checked={getSubData === "yearly"}

                                    />
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
                                        onClick={confirmInputHandler}
                                        className="sub-card-btn shadow-none  btn btn-primary"
                                    >Get Started
                                    </button>
                                    : <button
                                        className="btn disabled-card shadow-none disabled">
                                        Get Started
                                    </button>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}