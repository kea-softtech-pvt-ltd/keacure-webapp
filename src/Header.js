import { 
    Link,
   } from "react-router-dom";
export default function Header(){
    return(
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
                        <ul id="top_access">
                            <li><Link to="/logindoctor"><i className="pe-7s-user"></i></Link></li>
                        </ul>
                        <nav id="menu" className="main-menu">
                            <ul>
                                <li><span><Link to="/logindoctor">Doctor</Link></span></li>
                                <li><span><Link to="/loginpatient">Patients</Link></span></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}