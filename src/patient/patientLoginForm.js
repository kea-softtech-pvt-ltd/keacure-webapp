import { API } from "../config";
import { Link ,useHistory ,useParams} from "react-router-dom";
import { DoctorBookingConfirmation} from "../patient/doctorbookingconfirmation";
import { LoginPatientOtp} from "../patient/loginPatientOtp";
import { useState } from "react";

import { MainInput} from "../mainComponent/mainInput";
import { MainButtonInput} from "../mainComponent/mainButtonInput";
import { setNewPatientId} from "../recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import axios from "axios";

function PatientLoginForm(props){
    const { redirection } = props
    const [patientId , setPatientId] = useState(0);
    console.log("patientId---",patientId)

    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [showOTP ,setShowOTP] = useState(false) 
    const [patientData , setPatientData] = useRecoilState(setNewPatientId);
    console.log("patientData---",patientData)
    const history = useHistory()

    const getOTPSection = async (e) => {
        e.preventDefault()
        if(mobile.length < 10) { 
            setIsError('Please Enter valid mobile number.')
        }
        else{
            try{
                const res = await axios.post(`${API}/patientLogin`,{
                    mobile: mobile
                })
                .then(data=>{
                    setPatientId(data.data._id)
                    if(data.data.isLoggedIn){
                       setPatientData(data.data._id)
                        if(redirection == "dashboard") {
                            history.push(`/patientdashboard/${data.data._id}`)
                        } else {
                            history.push(`/getLoginPatientProfile/${data.data._id}`)
                       }
                    }else{
                        setShowOTP(true) 
                    }
                })
            }
            catch(e){
                console.log(e)
            }
        }
    };

    return(
        <>
            <div id="login-2">
                <h1> Please login to KeaCure</h1>
                <form>
                    <div className="box_form clearfix">
                        We will send OTP to your mobile number
                        <div className="box_login last">
                            <div className="row">
                                <div className="col-md-9 ">
                                    <MainInput 
                                        type="text" 
                                        name="mobile" 
                                        value={mobile.mobile} 
                                        maxLength={10} 
                                        pattern="[+-]?\d+(?:[.,]\d+)?"
                                        onChange={(e)=>setMobile(e.target.value)} 
                                        placeholder="Phone Number (+XX)">
                                    </MainInput>                                       
                                    {<span className="validation">{isError}</span>}
                                </div>

                                <div className="col-md-2 ">
                                    <MainButtonInput onClick={getOTPSection}>Go</MainButtonInput>
                                </div>
                            </div>
                            
                            {showOTP === true?
                                <LoginPatientOtp patientId={patientId} redirection={redirection}/>
                            :null}
                        </div>
                    </div>    
                </form>
            </div>
        </>
    )
}
export{PatientLoginForm}