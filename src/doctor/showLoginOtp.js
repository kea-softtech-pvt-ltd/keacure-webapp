import { API } from "../config";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { MainButtonInput} from "../mainComponent/mainButtonInput";
import { MainInput } from "../mainComponent/mainInput";

function ShowLoginOtp (props) {
    
    const { doctorId } = props;
    let history = useHistory()
    const [ loginotp ,setLoginOtp] =useState('');
    const [ errormessage, setErrormessage] = useState(false);

    const handleSubmit =(e) => {
        const loggedIn = true;
        const loginOtp = loginotp
        e.preventDefault();
        if ( loginotp.length < 6  ) { 
            setErrormessage('Please Enter valid OTP.')
        } else {
            fetch(`${API}/otp`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    otp: loginotp,
                    _id: doctorId
                })       
            })
            .then(res=>res.json())
            .then(function(response){
                if(response.otp !== loginOtp){
                    setErrormessage("wrong OTP");
                }else{
                    fetch(`${API}/otpIsLoggedIn/${doctorId}`,{
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                        isLoggedIn : loggedIn
                    })       
                    })
                    .then(res=>res.json())
                    .then(response =>{
                        history.push(`/editdoctorprofile/${response._id}`);
                    })  
                }
            }) 
        }
    }

    return(
        <>
            <div className="row">
                <div className="col-md-6"> 
                    <MainInput type="text" name="otp" maxLength={6} onChange={(e)=>setLoginOtp(e.target.value)} placeholder="6 digit OTP" ></MainInput> 
                    {errormessage&& (<span className="validation">{errormessage}</span>)}
                </div>
                
                <div className="col-md-2">  
                    <MainButtonInput onClick={handleSubmit}>Login</MainButtonInput>
                </div>
            </div>
        </>
    )
}
export{ShowLoginOtp}