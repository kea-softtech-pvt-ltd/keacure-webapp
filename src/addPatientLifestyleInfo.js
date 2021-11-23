import React from 'react';
import { useState, useEffect } from "react";
import { useHistory ,useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { PrettoSlider} from "./slider";
import { MainRadioGroup } from './mainComponent/mainRadioGroup';
import { MainInput } from './mainComponent/mainInput';
import { MainButtonInput } from './mainComponent/mainButtonInput';
import { useRecoilState } from 'recoil';
import {setPatientLifestyle} from "./recoil/atom/setPatientLifestyle";

function AddPatientLifestyleInfo(props){
    const { patientId} = props;
    const [ updateData ,setUpdateData]= useState({})
    const [ coilPatientLifeStyle , setCoilPatientLifeStyle] = useRecoilState(setPatientLifestyle)
    //fetch data
    useEffect(()=>{
        register("smokingHabits", { required: true });
        register("alcoholConsumption", { required: true });
        register("foodPreferences", { required: true });
        register("occupation", { required: true });
        //register("activityLevel", { required: true });
    },[])
    
    //for slider
    const [slider ,setSlider] = useState("20");
    const changeValue = (event, newValue) => {
        setSlider(newValue);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setValue(name , value)
    };

    let history = useHistory();
    const { register, handleSubmit ,setValue , formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const lifestyleData = {
            patientId         : patientId,
            smokingHabits     : data.smokingHabits,
            alcoholConsumption: data.alcoholConsumption,
            foodPreferences   : data.foodPreferences,
            occupation        : data.occupation,
            //activityLevel     : data.activityLevel
        }
        axios.post('http://localhost:9000/api/insertPatientLifestyleInfo', lifestyleData)
        .then(function(response){
            setCoilPatientLifeStyle(coilPatientLifeStyle.concat(response.data))
            props.addRecords()
            //history.push("/patientdashboard");
        })
    }  

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 ">
                    <div className="form-group">
                    <label><b>Smoking Habits</b></label></div>
                    <div className="form-group">
                        <div className="col-6">
                            <MainRadioGroup
                                name="smokingHabits"
                                value="regular"
                                value1="occasionally"
                                value2="NoSmoking"
                                onChange={handleInputChange}
                                label="regular"
                                label1="occasionally"
                                label2="NoSmoking">
                            </MainRadioGroup>
                        {errors.smokingHabits && <span className="validation">Select smoking habits</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label><b>Alcohol Cunsumption</b></label>
                        <MainInput 
                            type="text" 
                            name="alcoholConsumption" 
                            onChange={handleInputChange} 
                            value={updateData.alcoholConsumption} 
                            placeholder="Alcohol Cunsumption">
                        {errors.alcoholConsumption && <span className="validation">Please enter your alcohol consumption </span>}
                        </MainInput>
                    </div>
                    <div className="form-group">
                        <label><b>Activity Level</b></label>
                        <div>
                            <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={20}
                            value={slider.activityLevel}
                            onChange={changeValue}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="form-group">
                    <label><b>Food Preferences</b></label>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6">
                            <MainRadioGroup
                                name="foodPreferences"
                                value="Veg"
                                value1="NonVeg"
                                value2="Both"
                                onChange={handleInputChange}
                                label="Veg"
                                label1="NonVeg"
                                label2="Both">
                            {errors.foodPreferences && <span className="validation">Select Any one</span>}
                            </MainRadioGroup>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label><b>Occupation</b></label>
                        <MainInput 
                            type="text" 
                            name="occupation" 
                            onChange={handleInputChange} 
                            value={updateData.occupation} 
                            placeholder="occupation">
                        {errors.occupation && <span className="validation">Please enter your occupation</span>}
                        </MainInput>
                    </div>
                </div>
            </div>
            <div className="text-center add_top_30">
                <MainButtonInput>Save</MainButtonInput>
            </div>
        </form>
    )
}
export {AddPatientLifestyleInfo}