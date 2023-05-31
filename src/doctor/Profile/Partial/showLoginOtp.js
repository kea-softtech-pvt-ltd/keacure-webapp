import { API } from "../../../config";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { MainButtonInput } from "../../../mainComponent/mainButtonInput";
import { MainInput } from "../../../mainComponent/mainInput";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../../../recoil/atom/setDoctorId";
import AuthApi from "../../../services/AuthApi";

function ShowLoginOtp(props) {
    const { otp, _id, mobile, isLoggedIn } = props.loginData;
    const [id, setId] = useRecoilState(setDoctorId)
    console.log("id---------------", _id)
    const { loginOtp } = AuthApi()
    let history = useHistory()
    const [loginotp, setLoginOtp] = useState('');
    const [errormessage, setErrormessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginOtp({ otp, _id }) //axios call
            .then(response => {
                console.log("===============>",response)
                setId(_id)
                if (otp !== loginotp) {
                    setErrormessage("Please enter correct OTP");
                } else {
                    if (isLoggedIn === true) {
                        history.push(`/dashboard/${_id}`)
                    } else {
                        history.push(`/editdoctorprofile/${_id}`);
                    }
                }
            })
    }

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <MainInput type="text" name="otp" maxLength={6} onChange={(e) => setLoginOtp(e.target.value)} placeholder="6 digit OTP" ></MainInput>
                    {errormessage && (<span className="validation">{errormessage}</span>)}
                </div>

                <div className="col-md-2">
                    <MainButtonInput onClick={handleSubmit}>Login</MainButtonInput>
                </div>
            </div>
        </>
    )
}
export { ShowLoginOtp }