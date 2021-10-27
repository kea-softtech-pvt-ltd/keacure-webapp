import { useState } from "react";
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";

export default function LoginPatient(){
    const[email , setEmail] = useState('');
    const[password,setPassword]= useState('');
    const [error, setError] = useState('');

    let history = useHistory();
    const handleClick = async(e) =>{
        e.preventDefault();
        const res  = await fetch('http://localhost:9000/api/login',{
            method:"post",
            headers:{
            "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        });    
        const data = res.json();
        if(res.status === 400 || !data){
            setError('Please enter valid Email and Password!');
        }else{
            history.push("/patientdashboard");
        }
    }

    return(
        <div>
            <main>
                <div className="bg_color_2">
                    <div className="container margin_60_35">
                        <div id="login-2">
                            <h1>Please login to Findoctor!</h1>
                            <form method="POST" onSubmit={handleClick} >
                                <div className="box_form clearfix">
                                    <div className="box_login last">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="email" onChange={(e)=>setEmail(e.target.value)}  value={email}  placeholder="pleae enter your email address"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control"  name="password" onChange={(e)=>setPassword(e.target.value)}  value={password} placeholder="Your password"/>
                                            {error && (<span className="validation"> {error} </span>)}
                                            <Link to="#0" className="forgot"><small>Forgot password?</small></Link>
                                        </div>
                                        <div className="form-group">
                                            <input className="btn_1" type="submit" value="Login"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="text-center link_bright">Do not have an account yet? <Link to="/registerpatient"><strong>Register now!</strong></Link></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}