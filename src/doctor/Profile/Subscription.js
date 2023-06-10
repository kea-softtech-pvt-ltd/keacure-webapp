import React, { useState } from "react";
export default function Subscription() {
    const [radioButton, setRadioButton] = useState()
    const handleRadioButton = (event) => {
        event.preventDefault();
        setRadioButton(event.target.value)
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
                            {/* <div className="cards"> */}
                            <div className="card">
                                <span>
                                    <h4 className=" card-title float-left">Free-Trial</h4>
                                    <input onChange={handleRadioButton} className="float-right" value="free-trial" name="radioButton" type="radio" />
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
                                <button className="sub-card-btn btn btn-primary">Get Started</button>
                            </div>

                            <div className="card">
                                <span>
                                    <h4 className=" card-title float-left">6-Month</h4>
                                    <input className="float-right" onChange={handleRadioButton} value="6-month" name="radioButton" type="radio" />
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
                                <button className="sub-card-btn btn btn-primary">Get Started</button>
                            </div>
                            <div className="card">
                                <span>
                                    <h4 className=" card-title float-left">yearly</h4>
                                    <input className="float-right" onChange={handleRadioButton} value="yearly" name="radioButton" type="radio" />
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
                                <button className="sub-card-btn btn btn-primary">Get Started</button>
                            </div>

                            {/* </div> */}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}