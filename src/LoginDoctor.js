import { Link} from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ShowLoginOtp}  from "./showLoginOtp";
import { useRecoilState } from "recoil";
import { setDoctorId }from "./recoil/atom/setDoctorId"
import { MainButtonInput} from "./mainComponent/mainButtonInput";
import { MainInput } from "./mainComponent/mainInput";

export default function LoginDoctor(){
    //for show otp input
    let history = useHistory()
    const [doctorId , setLDoctorId]  = useRecoilState(setDoctorId)
    const [mobile, setMobile]     = useState("");
    const [isError, setIsError]   = useState(false);
    const [showOTP ,setShowOTP]   = useState(false)    

    const getOTPSection = (e) => {
        e.preventDefault()
        if(mobile.length < 10) { 
            setIsError('Please Enter valid mobile number.')
        }
        else{
            try{
                fetch("http://localhost:9000/api/loginotp",{
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
                    setLDoctorId(data._id)
                    if(data.isLoggedIn){
                        history.push(`/dashboard/${data._id}`)
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
                                <form >
                                    <div className="box_form clearfix">
                                        <div className="box_login last">
                                            <div className="row">
                                                <div className="col-md-9 ">
                                                    <MainInput type="text" name="mobile" value={mobile.mobile} maxLength={10} pattern="[+-]?\d+(?:[.,]\d+)?"onChange={(e)=>setMobile(e.target.value)} placeholder="Phone Number (+XX)"></MainInput>
                                                    {<span className="validation">{isError}</span>}
                                                </div>    
                                                <div className="col-md-2 ">
                                                    <MainButtonInput onClick={getOTPSection}>Go</MainButtonInput>
                                                </div>
                                            </div>
                                            {showOTP === true?
                                                <ShowLoginOtp doctorId={doctorId}/>
                                            :null}
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