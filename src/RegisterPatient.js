import React from "react";
import { useHistory } from "react-router-dom";
import{useState} from "react";
import {useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CryptoJS from 'crypto-js';

export default function RegisterPatient(){  
    let history = useHistory();
     //insert 
    const [input ,setInput]= useState({})
    function handleChange(event){
        const{name, value}= event.target;
            setInput(prevInput =>{
                return{
                    ...prevInput,
                    [name]:value
                }
            })
        }
    const[err ,setErr]=useState("") 

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = data => {
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data.password), 'my-secret-key@123').toString();
            const newUserdata ={
                name:data.name,
                email:data.email,
                password:ciphertext
                }
            axios.post("http://localhost:9000/api/create" , newUserdata)
            .then((response) => {
            const statusMsg = response.data
            if(statusMsg["status"] && statusMsg["status"]["error"] && statusMsg["status"]["error"].trim() == "email already exist") {
                setErr("email already exit");
                return true;
            }else {
                history.push(`/patientprofile/${response.data._id}`);
            }},(error) =>{
                console.log(error);
            });
    
    //log encrypted data
    console.log('Encrypt Data -')
    console.log(ciphertext);
  
    }

    return(
        <div>
            <main>
                <div className="bg_color_2">
                    <div className="container margin_60_35">
                        <div id="register">
                            <h1>Please register to Findoctor!</h1>
                            <div className="row justify-content-center">
                                <div className="col-md-5">
                                    <form  onSubmit={handleSubmit(onSubmit)}>
                                        <div className="box_form">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" onChange={handleChange}  name="name" value={input.name} className="form-control" {...register("name", { required: true })} placeholder="Your name" />
                                                {errors.name && <span className="validation">Please enter your name</span>}
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" onChange={handleChange}  name="email" value={input.email} className="form-control" {...register("email", { required: true })} placeholder="Your email address" />
                                                {errors.email && <span className="validation">Please enter your email address</span>}
                                                {err && (<span className="validation"> {err} </span>)}
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" onChange={handleChange}  name="password" value={input.ciphertext} className="form-control" id="password1" {...register("password", { required: true ,minLength: {
                                                value: 6,
                                                //message: "Password must have at least 6 characters"
                                                }})} placeholder="Your password"/>                        
                                                {errors.password && <span className="validation">Password must have at least 6 characters</span>}
                                            </div>
                                            <div className="form-group">
                                                <label>Confirm password</label>
                                                <input type="password" onChange={handleChange}  name="cpassword" value={input.cpassword} className="form-control" id="password2" {...register("cpassword", { required: true ,validate: value =>
                                                    value === password.current || "The passwords do not match" })}  placeholder="Confirm password" />
                                                {errors.cpassword && <span className="validation">{errors.cpassword.message}</span>}
                                            </div>
                                            <div id="pass-info" className="clearfix"></div>
                                            <div className="checkbox-holder text-left">
                                                <div className="checkbox_2">
                                                    <input type="checkbox" value="accept_2" id="check_2" name="check_2" checked/>
                                                    <label for="check_2"><span>I Agree to the <strong>Terms &amp; Conditions</strong></span></label>
                                                </div>
                                            </div>
                                            <div className="form-group text-center add_top_30">
                                                <input className="btn_1" type="submit" value="Submit"/> 
                                            </div>
                                        </div>
                                        <div className="text-center"><small>Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet. Eum no atqui putant democritum, velit nusquam sententiae vis no.</small></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}