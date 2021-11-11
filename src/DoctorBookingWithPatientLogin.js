import { Link ,useHistory ,useParams} from "react-router-dom";
import { DoctorBookingConfirmPay} from "./doctorBookingConfirmPay";
import { ShowDoctorBookingLoginOtp} from "./showDoctorBookingLoginOtp";
import { useState } from "react";
import { setNewPatientId} from "./recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import { MainInput} from "./mainComponent/mainInput";
import { MainButtonInput} from "./mainComponent/mainButtonInput";

export default function DoctorBookingWithPatientLogin(){
    const {doctorId} = useParams();
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
                        history.push(`/getLoginPatientProfile/${data._id}`)
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
                <div id="breadcrumb">
                    <div className="container">
                        <ul>
                            <li><Link to="#">Home</Link></li>
                            <li><Link to="#">Category</Link></li>
                            <li>Page active</li>
                        </ul>
                    </div>
                </div>
                <div className="container margin_60">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8">
                            <div className="box_general_3 cart">
                                <div id="login-2">
                                    <h3> Please login to KeaCure</h3>
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
                                                    <ShowDoctorBookingLoginOtp patientId={patientId}/>
                                                :null}
                                            </div>
                                        </div>    
                                    </form>
                                </div> 
                            </div>
                        </div>
                        <DoctorBookingConfirmPay doctorId={doctorId}/>
                    </div>
                </div>
	        </main>
	    </div>
        
    )
}