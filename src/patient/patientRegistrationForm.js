import { API } from "../config";
import React ,{ useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MainInput} from "../mainComponent/mainInput";
import { MainButtonInput} from "../mainComponent/mainButtonInput";
import { Link ,useParams } from "react-router-dom";

function PatientRegistrationForm(props){
    const { patientId } = props;
    console.log(props)
    const [updatePatientData ,setUpdatePatientData] = useState({})
    console.log(updatePatientData)
    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdatePatientData({ ...updatePatientData, [name]: value });
        setValue(name, value)
    };
    useEffect(()=>{
        getPatientDetails()
        register("name", { required: true });
        register("age", { required: true });
        register("gender", { required: true });
        register("email", { required: true });
    },[])

    async function getPatientDetails() {
        const result = await axios.get(`${API}/patientById/${patientId}`)
        .then(function(response){
            console.log(response.data)
            setUpdatePatientData(response.data)
        })
    }

    const { register, handleSubmit ,setValue, formState: { errors } } = useForm();
    const onSubmit= data => {
        const newPatientData = {
            mobile    :   updatePatientData.mobile,
            name      :   data.name,
            gender    :   data.gender,
            age       :   data.age,
            email     :   data.email
        }
        axios.post(`${API}/insertPatientDetails/${patientId}`, newPatientData)
        .then(function(response){
            console.log(response)
            props.handalChange()
        })
    }

    return(
        <>
        <div className="message">
            <div>Exisitng Customer? <Link to={`/loginPatient/${patientId}`}>Click here to login</Link></div>
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
        </>
    )
}
export {PatientRegistrationForm}