
import React from 'react';
import { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {StyledRadio} from "./radiobutton";
import {PrettoSlider} from "./slider";

function PatientLifestyle(props){
    const { registerId } = props;

    //fetch data
    useEffect(()=>{
        fetch(`http://localhost:9000/api/fetch/${registerId}`).then(res =>{
        if(res){
            return res.json()
                }
            }).then(jsonRes => {
                setUpdateData(jsonRes)
            });
    },[])

    //update data
    const [updateData ,setUpdateData]= useState({})

    //for slider
    const [slider ,setSlider] = useState("20");
    const changeValue = (event, newValue) => {
        setSlider(newValue);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
    };

    let history = useHistory();
    const { register, handleSubmit , formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('smokinghabits', data.smokinghabits);
        formData.append('activitylevel', data.activitylevel);
        formData.append('alcoholconsumption', data.alcoholconsumption);
        formData.append('foodpreferences', data.foodpreferences);
        formData.append('occupation', data.occupation);
        axios.post(`http://localhost:9000/api/update/${registerId}`, formData)
        .then(function(response){
            history.push("/patientdashboard");
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
                            <FormControl component="fieldset">
                                <RadioGroup defaultValue="regular" aria-label="Smoking Habits" name="customized-radios" {...register("smokinghabits", { required: true })}>
                                    <FormControlLabel name="smokinghabits" value="regular" onChange={handleInputChange} control={<StyledRadio />} label="Regular" />
                                    <FormControlLabel name="smokinghabits" value="occasionally" onChange={handleInputChange} control={<StyledRadio />} label="Occasionally" />
                                    <FormControlLabel name="smokinghabits" value="NoSmoking" onChange={handleInputChange} control={<StyledRadio />} label="NoSmoking" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {errors.smokinghabits && <span className="validation">Select smoking habits</span>}
                    </div>
                    <div className="form-group">
                        <label><b>Alcohol Cunsumption</b></label>
                        <input type="text" name="alcoholconsumption" onChange={handleInputChange} value={updateData.alcoholconsumption} className="form-control" {...register("alcoholconsumption", { required: true })} placeholder=""/>
                        {errors.alcoholconsumption && <span className="validation">Please enter your alcohol consumption </span>}
                    </div>
                    <div className="form-group">
                        <label><b>Activity Level</b></label>
                        <div>
                            <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={20}
                            value={slider.activitylevel}
                            onChange={changeValue}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 ">
                <div className="form-group">
                    <label><b>Food Preferences</b></label></div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6">
                            <FormControl component="fieldset">
                                <RadioGroup defaultValue="Both" aria-label="Food preferences" name="customized-radios" {...register("foodpreferences", { required: true })}>
                                        <FormControlLabel name="foodpreferences" value="Veg" onChange={handleInputChange} control={<StyledRadio />} label="Veg" />
                                        <FormControlLabel name="foodpreferences" value="NonVeg" onChange={handleInputChange} control={<StyledRadio />} label="NonVeg" />
                                        <FormControlLabel name="foodpreferences" value="Both" onChange={handleInputChange} control={<StyledRadio />} label="Both" />
                                </RadioGroup>
                            </FormControl>
                            </div>
                            {errors.foodpreferences && <span className="validation">Select Any one</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label><b>Occupation</b></label>
                        <input type="text" name="occupation" onChange={handleInputChange} value={updateData.occupation} className="form-control" {...register("occupation", { required: true })} placeholder=""/>
                        {errors.occupation && <span className="validation">Please enter your occupation</span>}
                    </div>
                </div>
            </div>
            <div className="text-center add_top_30"><input type="submit"  className="btn_1" value="Save"/></div>
        </form>
    )
}
export {PatientLifestyle}