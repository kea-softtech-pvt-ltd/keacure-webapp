import { useState, useEffect } from "react";
import { API } from "../../../config";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from 'react';
import axios from 'axios';
import avatarImage from "../../../img/profile.png";
import { MainButtonInput } from "../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../mainComponent/mainInput';
import { PlacesAutocompleteInput } from "../Clinic/Partial/placesAutocomplete"
import { MainRadioGroup } from "../../../mainComponent/mainRadioGroup";
import AuthApi from "../../../services/AuthApi";
function DoctorPersonalInformation(props) {
    //const { data } = props
    const { doctorId } = useParams();
    const [updateData, setUpdateData] = useState([]);
    const { addDoctorInformation, submitDoctorInformation } = AuthApi()
    //for google map api autocomplete onChange method
    function handleChangeAddress(address) {
        setUpdateData(prevInput => {
            return {
                ...prevInput,
                ['address']: address
            }
        })
        setValue("address", address)
    }

    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setValue(name, value)
    };

    //for doctor profilephoto onChange method
    const [doctorPhoto, setDoctorPhoto] = useState(avatarImage);
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

    useEffect(() => {
        addDoctorInformation({ doctorId })
            .then(jsonRes => {
                const allKeys = Object.keys(jsonRes)
                allKeys.map(function (k, v) {
                    if (k === 'photo' && typeof jsonRes[k] === "object") {
                        setValue(k, jsonRes[k])
                        setUpdateData({ ...updateData, k: jsonRes[k] });
                    }
                    else if ((k !== 'photo')) {
                        setValue(k, jsonRes[k])
                        setUpdateData({ ...updateData, k: jsonRes[k] });
                    }
                })

                setUpdateData(jsonRes)

                if (jsonRes.photo) {
                    setDoctorPhoto(`../images/${jsonRes.photo}`)
                }
            });
        register("name", { required: true });
        register("gender", { required: true });
        register("officialEmail", { required: true });
        register("personalEmail", { required: true });
        register("address", { required: true });
        register("photo", { required: true });
    }, [])

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmit = async (e) => {
        e.preventDefault()
        const bodyData = {
            name: updateData.name,
            gender: updateData.gender,
            personalEmail: updateData.personalEmail,
            address: updateData.address,
            photo: doctorPhoto
        }
        await axios.post(`${API}/insertPersonalInfo/${doctorId}`, bodyData)
            .then(function (response) {
                //  setUpdateData(response.data)

            })
        // props.data();

    }

    return (
        <>
            {/* <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'> */}
            <div className="row">
                <div className="col-md-6 ">
                    <div className="">
                        <div className="col-4">
                            <div className="doctorphoto">
                                {updateData.photo > 0 ?
                                    <img
                                        src={updateData.photo}
                                        className="doctorphotoStyle"
                                        alt="doctorPhoto"
                                    />
                                    : <img
                                        ref={uploadedImage}
                                        src={doctorPhoto}
                                        alt="doctorPhoto"
                                        className="doctorphotoStyle"
                                    />
                                }
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="text-left">
                                <label><b>Doctor photo</b></label>
                                <MainInput
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={handlePhoto}
                                    name="photo">
                                </MainInput>
                            </div>
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="text-left">
                            <label><b>Gender</b></label>
                        </div>
                    </div>
                    <div className="">
                        {/* <div className="form-group"> */}
                        <div className="col-6">
                            <MainRadioGroup
                                name="gender"
                                value="female"
                                value1="male"
                                value2="other"
                                onChange={handleInputChange}
                                label="Female"
                                label1="male"
                                label2="other">
                            </MainRadioGroup>
                            {errors.gender && <span className="validation">Please Select your gender</span>}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="text-left">
                        <label><b>Full Name</b></label>
                    </div>
                    <MainInput
                        name="name"
                        value={updateData.name}
                        onChange={handleInputChange}
                        placeholder="Name">
                        {errors.name && <span className="validation">Please enter your first name</span>}
                    </MainInput>
                    <div className="text-left">
                        <label><b>Personal EmailId</b></label>
                    </div>
                    <MainInput
                        type="email"
                        value={updateData.personalEmail}
                        name="personalEmail"
                        onChange={handleInputChange}
                        placeholder="Personal EmailId">
                        {errors.personalEmail && <span className="validation">Please enter your personal Email</span>}
                    </MainInput>
                    <div align='left'>
                        <PlacesAutocompleteInput
                            value={updateData.address}
                            onChange={handleChangeAddress}>
                            <label ><b>City & Area</b></label>
                        </PlacesAutocompleteInput>
                    </div>
                    {errors.address && <span className="validation">Please enter your location</span>}
                </div>
            </div>

            <div className="text-center add_top_30">
                <MainButtonInput onClick={onSubmit}> Save</MainButtonInput>
            </div>
            <div className="text-right add_top_30">
                <MainButtonInput onClick={props.data}>Next</MainButtonInput>
            </div>
            {/* </form> */}
        </>
    )
}
export { DoctorPersonalInformation }