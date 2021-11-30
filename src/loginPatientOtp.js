import { useState } from "react";
import { useHistory } from "react-router-dom";
import { MainButtonInput } from "./mainComponent/mainButtonInput";
import { MainInput } from "./mainComponent/mainInput";
import { setNewPatientId} from "./recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";

function LoginPatientOtp(props){
    const history = useHistory()
    const { patientId, redirection} = props;
    const [ patientData , setPatientData] = useRecoilState(setNewPatientId);
    const [ loginotp ,setLoginOtp] = useState('');
    
    const [ errormessage, setErrormessage] = useState(false);

    const handleSubmit =(e) => {
        const loggedIn = true;
        const loginOtp = loginotp
        e.preventDefault();
        if ( loginotp.length < 6  ) { 
            setErrormessage('Please Enter valid OTP.')
        } else {
            fetch("http://localhost:9000/api/patientLoginOtp",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    otp: loginotp,
                    _id: patientId
                })       
            })
            .then(res=>res.json())
            .then(function(response){
                if(response.otp !== loginOtp){
                    setErrormessage("wrong OTP");
                }else{
                    fetch(`http://localhost:9000/api/patientOtpIsLoggedIn/${patientId}`,{
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
                        setPatientData(patientId)
                        if(redirection == "dashboard") {
                            history.push(`/PatientProfile/${response._id}`);
                        } else {
                            history.push(`/createpatientprofile/${response._id}`);
                        }
                    })  
                }
            }) 
        }
    }
    return(
        <div className="row">
            <div className="col-md-6">    
                <MainInput type="text" name="otp" maxLength={6} onChange={(e)=>setLoginOtp(e.target.value)}  placeholder="6 digit OTP" ></MainInput>
                {errormessage&& (<span className="validation">{errormessage}</span>)}
            </div>
            
            <div className="col-md-2">
                <MainButtonInput onClick={handleSubmit}>Login</MainButtonInput>  
            </div>
        </div>
    )
}
export {LoginPatientOtp}