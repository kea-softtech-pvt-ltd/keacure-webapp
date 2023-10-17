import { API } from "../config";
import { useHistory } from "react-router-dom";
import { LoginPatientOtp } from "../patient/loginPatientOtp";
import { useState } from "react";
import { MainInput } from "../mainComponent/mainInput";
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import axios from "axios";

function PatientLoginForm(props) {
    const { redirection } = props
    const [patientId, setPatientId] = useState(0);
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [showOTP, setShowOTP] = useState(false)
    const [loginData, setLoginData] = useState([])
    const [patientData, setPatientData] = useRecoilState(setNewPatientId);
    const history = useHistory()

    const getOTPSection = async (e) => {
        e.preventDefault()
        if (mobile.length < 10) {
            setIsError('Please Enter valid mobile number.')
        }
        else {
            try {
                await axios.post(`${API}/patientLogin`, {
                    mobile: mobile
                })

                    .then(data => {
                        setPatientId(data.data._id)
                        setPatientData(data.data._id)
                        alert(data.data.otp)
                        let item = data.data
                        setLoginData(item)
                        setShowOTP(true)

                    })
            }
            catch (e) {
            }
        }
    };

    return (
        <div className="bg_color_2">
            <div className="container margin_60_35">
                <div id="login-2">
                    <form>
                        <div className="box_form clearfix">
                            {/* We will send OTP to your mobile number */}
                            Please Enter Your Mobile Number
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
                                    <LoginPatientOtp patientId={patientId} loginData={loginData} redirection={redirection} />
                                    : null}
                            </div>
                        </div>
            </form>
                </div>
        </div>
        </div >
    )
}
export { PatientLoginForm }

