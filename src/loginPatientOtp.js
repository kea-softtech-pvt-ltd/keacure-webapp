import { useState } from "react";
import { useHistory } from "react-router-dom";
import { MainButtonInput } from "./mainComponent/mainButtonInput";
import { MainInput } from "./mainComponent/mainInput";
import { setNewPatientId} from "./recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import axios from "axios";

function LoginPatientOtp(props){
    const history = useHistory()
    const { patientId, redirection} = props;
    console.log(patientId)
    const [ patientData , setPatientData] = useRecoilState(setNewPatientId);
    const [ loginotp ,setLoginOtp] = useState('');
    
    const [ errormessage, setErrormessage] = useState(false);

    const handleSubmit = (e) => {
        const loginOtp = loginotp
        e.preventDefault();
        if ( loginotp.length < 6  ) { 
            setErrormessage('Please Enter valid OTP.')
        } else {
            axios.post("http://localhost:9000/api/patientLoginOtp",{
                otp: loginotp,
                _id: patientId
            })
            .then(function(response){
                if(response.data.otp !== loginOtp){
                    setErrormessage("wrong OTP");
                }else{
                   axios.post(`http://localhost:9000/api/patientOtpIsLoggedIn/${patientId}`,{
                        isLoggedIn : true
                    })
                    .then(response =>{
                        console.log(response)
                        setPatientData(patientId)
                        if(redirection == "dashboard") {
                            history.push(`/PatientProfile/${response.data._id}`);
                        } else {
                            console.log(response.data._id)
                            history.push(`/createpatientprofile/${response.data._id}`);
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