import { Link ,useHistory ,useParams} from "react-router-dom";
import { DoctorBookingConfirmation} from "./doctorbookingconfirmation";
import { LoginPatientOtp} from "./loginPatientOtp";
import { useState } from "react";

import { MainInput} from "./mainComponent/mainInput";
import { MainButtonInput} from "./mainComponent/mainButtonInput";
import { setNewPatientId} from "./recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";

function PatientLoginForm(props){
    const { redirection } = props
    const [patientId , setPatientId] = useState(0);
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [showOTP ,setShowOTP] = useState(false) 
    const [patientData , setPatientData] = useRecoilState(setNewPatientId);
    const history = useHistory()

    const getOTPSection = (e) => {
        e.preventDefault()
        if(mobile.length < 10) { 
            setIsError('Please Enter valid mobile number.')
        }
        else{
            try{
                fetch("http://localhost:9000/api/patientLogin",{
                    method: 'POST',
                    headers:{
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    mobile: mobile,
                    })       
                })
                .then(res=>res.json())
                .then(data=>{
                    setPatientId(data._id)
                    if(data.isLoggedIn){
                        console.log(data._id)
                       setPatientData(data._id)
                       if(redirection == "dashboard") {
                            history.push(`/patientdashboard/${data._id}`)
                       } else {
                        history.push(`/getLoginPatientProfile/${data._id}`)
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