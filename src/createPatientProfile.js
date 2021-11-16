import { Link ,useParams} from "react-router-dom";
import {DoctorBookingConfirmPayment} from "./doctorBookingConfirmPay";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {MainInput} from "./mainComponent/mainInput";
import {MainButtonInput} from "./mainComponent/mainButtonInput";

export default function CreatePatientProfile(){
    const { doctorId } = useParams();
    const { patientId } = useParams()
    const [updatePatientData ,setUpdatePatientData] = useState([])
    console.log(updatePatientData)
    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdatePatientData({ ...updatePatientData, [name]: value });
        setValue(name, value)
    };
    useEffect(()=>{
        register("name", { required: true });
        register("age", { required: true });
        register("gender", { required: true });
        register("email", { required: true });
    },[])

    const { register, handleSubmit ,setValue, formState: { errors } } = useForm();
    const onSubmit= data => {
        const newPatientData = {
            name      :   data.name,
            gender    :   data.gender,
            age       :   data.age,
            email     :   data.email
        }
        axios.post(`http://localhost:9000/api/insertPatientDetails/${patientId}`, newPatientData)
        .then(function(response){
        })
    } 
    return(
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
                            <div className="message">
                                <div>Exisitng Customer? <Link to="/doctorBookingWithPatientLogin">Click here to login</Link></div>
                            </div>
                            <div className="form_title">
                                <h3>Your Details</h3>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <label>Full name</label>
                                        <MainInput 
                                            type="text" 
                                            name="name" 
                                            value={updatePatientData.name} 
                                            onChange={handleInputChange} 
                                            placeholder="Jhon">
                                        </MainInput>
                                        {errors.name && <span className="validation">Please enter your full name</span>}                                            
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 col-sm-3">
                                        <label>Age</label>
                                        <MainInput 
                                            type="text" 
                                            name="age" 
                                            value={updatePatientData.age} 
                                            onChange={handleInputChange} 
                                            placeholder="25">
                                        </MainInput>
                                        {errors.age && <span className="validation">Please enter your Age</span>}
                                    </div>

                                    <div className="col-md-3 col-sm-3">
                                        <label>Gender</label>
                                        <MainInput 
                                            type="text" 
                                            name="gender" 
                                            value={updatePatientData.gender} 
                                            onChange={handleInputChange} 
                                            placeholder="male">
                                        </MainInput>
                                        {errors.gender && <span className="validation">Please enter your gender</span>}
                                    </div>

                                    <div className="col-md-6 col-sm-6">
                                        <label>Email</label>
                                        <MainInput 
                                            type="email" 
                                            name="email" 
                                            value={updatePatientData.email} 
                                            onChange={handleInputChange} 
                                            placeholder="jhon@doe.com">
                                        </MainInput>
                                        {errors.email && <span className="validation">Please enter your email address</span>}
                                    </div>
                                </div>
                                
                                <div className="text-center add_top_30">
                                    <MainButtonInput>Verify & Save</MainButtonInput>
                                </div>
                            </form>
                        </div>
                    </div>
                    <DoctorBookingConfirmPayment doctorId={doctorId}/>
                </div>
            </div>
        </main>
    )
}