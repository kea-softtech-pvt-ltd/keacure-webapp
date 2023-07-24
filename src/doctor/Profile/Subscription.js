import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AuthApi from "../../services/AuthApi";
export default function Subscription() {
    const { subscription } = AuthApi()
    const [checked, setChecked] = useState('')
    const { doctorId } = useParams();
    const  history = useHistory()

    const handlechecked = (event) => {
        setChecked(event.target.value)
    }

    const confirmInputHandler = async () => {
        const bodyData = {
            "doctorId": doctorId,
            "date": new Date(),
            "plan": checked
        }
        await subscription(bodyData)
        history.push(`/editdoctorprofile/${doctorId}`)

    }

    return (
        <div>
            <main>
                <div className="bg_color_2">
                    <div className="container ">
                        <div className="subscription ">
                            <h2>Ready to get Started?</h2>
                        </div>
                        <div className="row">
                            <div className="card">
                                <span>
                                    <h4 className=" card-title float-left">Free-Trial</h4>
                                    <input
                                        onChange={handlechecked}
                                        className="float-right radio-input"
                                        value="free-trial"
                                        name="checked"
                                        type="radio"
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
                                {checked === 'free-trial' ?
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
                                        value="6-month"
                                        name="checked"
                                        type="radio"

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
                                {checked === '6-month' ?
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
                                        name="checked"
                                        type="radio"
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
                                {checked === 'yearly' ?
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