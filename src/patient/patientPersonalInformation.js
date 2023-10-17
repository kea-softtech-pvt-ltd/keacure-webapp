import { API } from "../config";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { PlacesAutocompleteInput } from "../doctor/Profile/Clinic/Partial/placesAutocomplete"
import { MainRadioGroup } from "../mainComponent/mainRadioGroup";
import { MainInput } from '../mainComponent/mainInput';
import avatarImage from "../img/profile.png";
import { MainButtonInput } from '../mainComponent/mainButtonInput';

function PatientPersonalInformation(props) {
    const { patientId, onChange } = props;
    //update data
    const [updateData, setUpdateData] = useState([])
    const [patientPhoto, setPatientPhoto] = useState(avatarImage);
    useEffect(() => {
        getPatientPersonalInfo();
        register("name", { required: true });
        register("gender", { required: true });
        register("email", { required: true });
        register("age", { required: true });
        register("address", { required: true });
        register("bloodgroup", { required: true });
        register("maritalstatus", { required: true });
        register("height", { required: true });
        register("weight", { required: true });
        register("birthdate", { required: true });
        register("emcontact", { required: true });
        register("address", { required: true });
    }, [])

    function getPatientPersonalInfo() {
        axios.get(`${API}/patientById/${patientId}`).then(jsonRes => {
            setUpdateData(jsonRes.data[0])

            // const allKeys = Object.keys(jsonRes)
            // allKeys.map(function(k,v) {
            //     if(k === 'photo' && typeof jsonRes[k] === "object") {
            //         setValue(k, jsonRes[k])
            //         setUpdateData({...updateData, k: jsonRes[k]});
            //     } 
            //     else if((k !== 'photo')) {
            //         setValue(k, jsonRes[k])
            //         setUpdateData({...updateData, k: jsonRes[k]});
            //     }
            // })
            // setUpdateData(jsonRes)
            // if(jsonRes.photo) {
            //     setPatientPhoto(`../patientImages/${jsonRes.photo}`)
            // }
        });
    }
    //location 
    const handleChangeAddress = (address) => {
        console.log("===>>>address", address)
        setUpdateData(prevInput => {
            return {
                ...prevInput,
                ['address']: address
            }
        })
        setValue('address', address)
    }

    //for doctor profilephoto onChange method
    const uploadedImage = React.useRef(null);
    const handlePhoto = (e) => {
        e.preventDefault();
        const [file] = e.target.files;
        setUpdateData({ ...updateData, photo: file });
        setValue("photo", file)
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setValue(name, value)
    };

    //let history = useHistory();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        // formData.append('photo', data.photo);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('mobile', updateData.mobile);
        formData.append('bloodgroup', data.bloodgroup);
        formData.append('maritalstatus', data.maritalstatus);
        formData.append('height', data.height);
        formData.append('weight', data.weight);
        formData.append('gender', data.gender);
        formData.append('age', data.age);
        formData.append('birthdate', data.birthdate);
        formData.append('emcontact', data.emcontact);
        formData.append('address', data.address);

        axios.post(`${API}/insertPatientDetails/${patientId}`, formData)
            .then(function (response) {
                props.personal();
            })
    }

    return (
        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-4">
                            <div className="doctorphoto">
                                <img
                                    ref={uploadedImage}
                                    src={patientPhoto}
                                    className="doctorphotoStyle"
                                    alt="doctorPhoto"
                                />
                            </div>
                        </div>

                        <div className="col-8">
                            <div align='left'><b>Patient photo</b></div>
                            <MainInput
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={handlePhoto}
                                name="photo">
                            </MainInput>
                        </div>
                    </div>

                    <div align='left'><b>Full Name</b></div>
                    <MainInput
                        type="text"
                        value={updateData.name}
                        onChange={handleInputChange}
                        placeholder="Name" name="name" >
                        {errors.name && <span className="validation">Please enter your first name</span>}
                    </MainInput>

                    <div className="row">
                        <div className="col-6">
                            <div align='left'><b>Height</b></div>
                            <MainInput
                                type="text"
                                name="height"
                                onChange={handleInputChange}
                                value={updateData.height}
                                placeholder="cm">
                                {errors.height && <span className="validation">Please enter your height</span>}
                            </MainInput>
                        </div>

                        <div className="col-6">
                            <div align='left'><b>Weight</b></div>
                            <MainInput
                                type="text"
                                name="weight"
                                onChange={handleInputChange}
                                value={updateData.weight}
                                placeholder="kg">
                                {errors.weight && <span className="validation">Please enter your Weight</span>}
                            </MainInput>
                        </div>
                    </div>
                    <div align='left'><b>Age</b></div>
                    <MainInput
                        type="text"
                        value={updateData.age}
                        onChange={handleInputChange}
                        placeholder="Age"
                        name="age" >
                        {errors.age && <span className="validation">Please enter your Age</span>}
                    </MainInput>

                    <div className="form-group">
                        <div align='left'><b>Gender</b></div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <div className="col-6">
                                <MainRadioGroup
                                    defaultValue="female"
                                    name="gender"
                                    value="female"
                                    value1="male"
                                    value2="other"
                                    onChange={handleInputChange}
                                    label="Female"
                                    label1="Male"
                                    label2="Other">
                                </MainRadioGroup>
                                {errors.gender && <span className="validation">Please Select your gender</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 ">
                    <div className="form-group">
                        <div align='left'><b>Date Of Birth</b></div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <MainInput
                                type="date"
                                name="birthdate"
                                onChange={handleInputChange}
                                value={updateData.birthdate}>
                                {errors.birthdate && <span className="validation">Please enter your BirthDate</span>}
                            </MainInput>
                        </div>
                    </div>
                    <div align='left'><b> EmailId</b></div>
                    <MainInput
                        type="email"
                        name="email"
                        value={updateData.email}
                        placeholder="Enter Your EmailId"
                        onChange={handleInputChange}>
                        {errors.email && <span className="validation">Please enter your email</span>}
                    </MainInput>

                    <div align='left'><b>Blood Group</b></div>
                    <MainInput
                        type="text"
                        onChange={handleInputChange}
                        name="bloodgroup"
                        value={updateData.bloodgroup}
                        placeholder="Ex. O+ A B...">
                        {errors.bloodgroup && <span className="validation">Please enter your blood group</span>}
                    </MainInput>

                    <div align='left'><b>Marital Status</b></div>
                    <div className="col-4">
                        <MainRadioGroup
                            defaultValue="Married"
                            name="maritalstatus"
                            value="Married"
                            value1="Single"
                            onChange={handleInputChange}
                            label="Married"
                            label1="Single">
                        </MainRadioGroup>
                        {errors.maritalstatus && <span className="validation">Please Select your marital status</span>}
                    </div>

                    <div align='left'><b>Emergency Contact</b></div>
                    <MainInput
                        type="text"
                        name="emcontact"
                        onChange={handleInputChange}
                        value={updateData.emcontact}
                        maxLength={10}
                        className="form-control"
                        placeholder="Emergency Contact">
                        {errors.emcontact && <span className="validation">Please enter your contact</span>}
                    </MainInput>
                    <div align='left'><b>City & Area</b></div>
                    <MainInput
                        onChange={(e)=>handleChangeAddress(e.target.value)}>
                    </MainInput>
                    {errors.address && <span className="validation">Please enter your location</span>}
                </div>
            </div>
            <div className="text-center add_top_30">
                <MainButtonInput>Verify & Save</MainButtonInput>
            </div>

            <div className="text-right">
                <input
                    type="submit"
                    onClick={onChange}
                    className="btn_1  medicinebtn"
                    value="Next"
                />
            </div>
        </form>
    )
}
export { PatientPersonalInformation }