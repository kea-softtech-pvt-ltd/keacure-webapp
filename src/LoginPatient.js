import { Link ,useHistory ,useParams} from "react-router-dom";
import { DoctorBookingConfirmPay} from "./doctorBookingConfirmPay";
import { LoginPatientOtp} from "./loginPatientOtp";
import { useState } from "react";
import { setNewPatientId} from "./recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import { MainInput} from "./mainComponent/mainInput";
import { MainButtonInput} from "./mainComponent/mainButtonInput";

export default function LoginPatient(){
    //const {patientId} = useParams();
    const history = useHistory();
    const [patientId , setPatientId] = useRecoilState(setNewPatientId);
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [showOTP ,setShowOTP] = useState(false) 

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
                        history.push(`/PatientDashboard/${data._id}`)
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
        <div>
            <main>
                <div className="bg_color_2">
                    <div className="container margin_60_35">
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
                                            <LoginPatientOtp patientId={patientId}/>
                                        :null}
                                    </div>
                                </div>    
                            </form>
                        </div> 
                    </div>
                </div>
	        </main>
	    </div>
        
    )
}