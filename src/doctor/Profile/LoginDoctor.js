// import { API } from "../../config";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ShowLoginOtp } from "./Partial/showLoginOtp";
// import { useRecoilState } from "recoil";
// import { setDoctorId } from "../../recoil/atom/setDoctorId"
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import AuthApi from "../../services/AuthApi";

export default function LoginDoctor() {
    //for show otp input
    // let history = useHistory()
    const [mobile, setMobile] = useState("");
    const [loginData, setLoginData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const { login } = AuthApi();

    const getOTPSection = (e) => {
        e.preventDefault()
        if (mobile.length < 10) {
            setIsError('Please Enter valid mobile number.')
        }
        else {
            login({ mobile: mobile })
                .then(response => {
                    alert(response.data.otp)
                    let item = response.data
                    setLoginData(item)
                    setShowOTP(true)
                })

        }
    };

    return (
        <div>
            <main>
                <div className="bg_color_2">
                    <div className="container margin_60_35">
                        <div id="login-2">
                            <h1> Please login to KeaCure</h1>
                            <form >
                                <div className="box_form clearfix">
                                    <div className="box_login last">
                                        <div className="row">
                                            <div className="col-md-9 ">
                                                <MainInput
                                                    type="text"
                                                    name="mobile"
                                                    value={mobile.mobile}
                                                    maxLength={10}
                                                    pattern="[+-]?\d+(?:[.,]\d+)?"
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    placeholder="Phone Number (+XX)">
                                                </MainInput>
                                                {<span className="validation">{isError}</span>}
                                            </div>
                                            <div className="col-md-2 ">
                                                <MainButtonInput onClick={getOTPSection}>Go</MainButtonInput>
                                            </div>
                                        </div>
                                        {showOTP === true ?
                                            <ShowLoginOtp loginData={loginData} />
                                            : null}
                                    </div>
                                </div>
                            </form>
                            <div className="text-center link_bright">Do not have an account yet? <Link to="/registerdoctor"><strong>Register now!</strong></Link></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}