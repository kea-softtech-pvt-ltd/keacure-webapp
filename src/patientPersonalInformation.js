import React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {StyledRadio} from "./radiobutton";
import PlacesAutocomplete from 'react-places-autocomplete';
import { handleSelect} from './googlemap';

function PatientPersonalInformation(props){
    //fetch data
    const { registerId } = props;
    const [fetchData , setFetchData] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:9000/api/fetch/${registerId}`).then(res =>{
            console.log(res)
            if(res){
                return res.json()
            }
        }).then(jsonRes => {
            setFetchData(jsonRes)
            setUpdateData(jsonRes)
            setPatientphoto(jsonRes.photo)
        });
    },[])

    //update data
    const [updateData ,setUpdateData]= useState({})
    const[patientphoto, setPatientphoto] = useState("");
    //location 
    const HandleChangeAddress =(address) =>{
    setUpdateData(prevInput =>{
        return{
            ...prevInput,
            ['address']:address
        }
    })
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
    };

    let history = useHistory();
    const { register, handleSubmit , formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('photo', data.photo);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('contact', data.contact);
        formData.append('bloodgroup', data.bloodgroup);
        formData.append('maritalstatus', data.maritalstatus);
        formData.append('height', data.height);
        formData.append('weight', data.weight);
        formData.append('gender', data.gender);
        formData.append('birthdate', data.birthdate);
        formData.append('emcontact', data.emcontact);
        formData.append('address', data.address);
        
        axios.post(`http://localhost:9000/api/update/${registerId}`, formData)
        .then(function(response){
            history.push("/patientdashboard");
        })

    }  
    //for image upload
    const handlePhoto = (e) => {
        setUpdateData({...updateData, photo:  e.target.files[0]});     
    }

    return(
        <form enctype='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-4">
                            <div
                                style={{
                                height: "130px",
                                width: "130px",
                                marginBottom:"43px"
                                }}
                                >
                                <img 
                                src={"/uploads/" + patientphoto}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                />
                            </div>
                        </div>
                        
                        <div className="col-8">
                            <div className="form-group">
                                <label><b>Patient photo</b></label>
                                <input type="file" accept=".png, .jpg, .jpeg"  onChange={handlePhoto} name="photo" {...register("photo", { required: true })} />                                                         
                                {errors.photo && <span className="validation">upload your photo</span>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label><b>Full Name</b></label>
                        <input type="text" value={updateData.name} onChange={handleInputChange}   className="form-control" placeholder="Name" name="name"  {...register("name", { required: true })}/>
                        {errors.name && <span className="validation">Please enter your first name</span>}
                    </div>
                    
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label><b>Height</b></label>
                                <input type="text" className="form-control" name="height"  onChange={handleInputChange}  value={updateData.height} {...register("height", { required: true })} placeholder="cm"/>
                                {errors.height && <span className="validation">Please enter your height</span>}
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="form-group">
                                <label><b>Weight</b></label>
                                <input type="text" className="form-control" name="weight" onChange={handleInputChange}  value={updateData.weight} {...register("weight", { required: true })} placeholder="kg"/> 
                                {errors.weight && <span className="validation">Please enter your Weight</span>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label><b>Gender</b></label>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <div className="col-6">
                            <FormControl component="fieldset">
                                <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios" {...register("gender", { required: true })}>
                                    <FormControlLabel name="gender" value="female" onChange={handleInputChange} control={<StyledRadio />} label="Female" />
                                    <FormControlLabel name="gender" value="male"   onChange={handleInputChange} control={<StyledRadio />} label="Male" />
                                    <FormControlLabel name="gender" value="other"  onChange={handleInputChange} control={<StyledRadio />} label="Other" />
                                </RadioGroup>
                                {errors.gender && <span className="validation">Please Select your gender</span>}
                            </FormControl>
                            </div>
                        </div>
                    </div>  
                    <div className="form-group">
                        <label><b>Date Of Birth</b></label>
                    </div>    
                    <div className="row">
                        <div className="col-6">
                        <input 
                            className="form-control"
                            type="date"
                            name="birthdate"
                            onChange={handleInputChange}
                            value={updateData.birthdate}
                            {...register("birthdate", { required: true })}
                        />
                        {errors.birthdate && <span className="validation">Please enter your BirthDate</span>}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="form-group">
                        <label><b>Contact Number</b></label>
                        <input type="text" className="form-control" name="contact"  onChange={handleInputChange} value={updateData.contact} {...register("contact", { required: true })} placeholder="Contact"/>
                        {errors.contact && <span className="validation">Please enter your contact</span>}
                    </div>
                    
                    <div className="form-group" >
                        <label><b> EmailId</b></label>
                        <input type="email" name="email" value={updateData.email} className="form-control" placeholder="Enter Your EmailId" onChange={handleInputChange}{...register("email", { required: true })} />
                        {errors.email && <span className="validation">Please enter your email</span>}
                    </div>
                    
                    <div className="form-group">
                        <label><b>Blood Group</b></label>
                        <input type="text" onChange={handleInputChange} name="bloodgroup" value={updateData.bloodgroup} className="form-control" {...register("bloodgroup", { required: true })} placeholder="Ex. O+ A B..."/>
                        {errors.bloodgroup && <span className="validation">Please enter your blood group</span>}
                    </div>

                    <div className="form-group">
                        <label><b>Marital Status</b></label>
                    </div>
                    <div className="form-group"> 
                        <div className="col-4">   
                        <FormControl component="fieldset">
                            <RadioGroup defaultValue="Single" aria-label="Marital Status" name="customized-radios" {...register("maritalstatus", { required: true })}>
                                    <FormControlLabel name="maritalstatus" value="Married" onChange={handleInputChange} control={<StyledRadio />} label="Married" />
                                    <FormControlLabel name="maritalstatus" value="Single" onChange={handleInputChange} control={<StyledRadio />} label="Single" />                                                        
                            </RadioGroup>
                            {errors.maritalstatus && <span className="validation">Please Select your marital status</span>}
                        </FormControl>
                        </div>
                    </div>
                    <div className="form-group">
                        <label><b>Emergency Contact</b></label>
                        <input type="text" name="emcontact" onChange={handleInputChange} value={updateData.emcontact} className="form-control" {...register("emcontact", { required: true })} placeholder="Emergency Contact"/>
                        {errors.emcontact && <span className="validation">Please enter your contact</span>}
                    </div>
                    <div className="form-group">
                        <label><b>Location</b></label>
                            <PlacesAutocomplete 
                                value={updateData.address}
                                onChange={HandleChangeAddress}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div {...register("address", { required: true })}>
                                    <input
                                    onSelect={handleSelect}
                                    {...getInputProps({
                                        placeholder: 'Search Places......',
                                        className:"form-control",
                                        name: "address"
                                    })}/>
                                    <div className="autocomplete-dropdown-container" >
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                            return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                                })}
                                                >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                        })}
                                    </div>
                                    {errors.address && <span className="validation">Please enter your location</span>}
                                </div>
                                )}
                            </PlacesAutocomplete>
                    </div>
                </div>
            </div>   
            <div className="text-center add_top_30"><input type="submit"  className="btn_1" value="Verify & Save"/></div> 
        </form>
    )
}
export {PatientPersonalInformation}