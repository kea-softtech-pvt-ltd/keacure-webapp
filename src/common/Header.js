import React from "react";
import { Link, } from "react-router-dom";
import { doctorIdState } from "../recoil/selector/doctorIdState"
import { useRecoilValue } from "recoil";
export default function Header() {
    const doctorId = useRecoilValue(doctorIdState)

    return (
        <header className="header_sticky">
            <Link to="#menu" className="btn_mobile">
                <div className="hamburger hamburger--spin" id="hamburger">
                    <div className="hamburger-box">
                        <div className="hamburger-inner"></div>
                    </div>
                </div>
            </Link>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div id="logo_home">
                            <h1><Link to="/">KeaCure</Link></h1>
                        </div>
                    </div>
                    <div className="col-lg-9 col-6">
                        <nav id="menu" className="main-menu">
                            {/* <ul id="top_access">
                                <li><span><Link to="#"><i className="pe-7s-user"></i></Link></span>
                                    <ul>
                                        <Link to="/dashboard">Dashboard</Link> 
                                        <Link to="/logout">Logout</Link>
                                    </ul>
                                </li>
                            </ul> */}
                            {doctorId ?
                                <li><span><Link to="/logout">Logout</Link></span></li>
                                :
                                <li><span><Link to="/">Login</Link></span></li>
                            }
                            <ul>

                                {/* <li><span><Link to="/loginpatient">Patients</Link></span></li> */}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}