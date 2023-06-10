import React from 'react';
import { API } from "../../../../config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRecoilState } from "recoil";
import { setDoctorEducation } from "../../../../recoil/atom/setDoctorEducation";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../../mainComponent/mainInput';
import { MainSelect } from '../../../../mainComponent/mainSelect';
import AuthApi from '../../../../services/AuthApi';
function AddDoctorEducation(props) {
    const { doctorId } = useParams();
    const [updateEduData, setUpdateEduData] = useState([])
    console.log("--updateEduData-----", doctorId)
    const [coilDoctorEducationData, setCoilDoctorEducationData] = useRecoilState(setDoctorEducation)
    //for fetch specialization data
    const [drspecialization, setDrSpecialization] = useState([])
    console.log("drspecialization", drspecialization)
    // for fetch degrees
    const [drdegrees, setDrdegrees] = useState([])
    const { fetchDrSpecialization, fetchDrDegree } = AuthApi();
    useEffect(() => {
        fetchSpecializations()
        fetchDegrees()
        register("degree", { required: true });
        register("collage", { required: true });
        register("comYear", { required: true });
        register("specialization", { required: true });
        register("document", { required: true });
    }, [])

    const fetchSpecializations = async () => {
        await fetchDrSpecialization()
            .then((res) => {
                setDrSpecialization(res);
            })
    }

    const fetchDegrees = async () => {
        await fetchDrDegree()
            .then((res) => {
                setDrdegrees(res);
            })
    }

    //for Year dropdownlist
    const currentYear = new Date().getFullYear();
    const options = [];
    const prevYear = currentYear - 50;
    let x = prevYear;
    while (x <= currentYear) {
        options.push(x);
        x++;
    }
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmit = async (e) => {
        e.preventDefault();
        const bodyData = {
            doctorId:doctorId,
            degree: updateEduData.degree,
            collage: updateEduData.collage,
            comYear: updateEduData.comYear,
            specialization: updateEduData.specialization,
            // document:document
        }
        console.log("--------------bodyData", bodyData)
        await axios.post(`${API}/education`, bodyData)
            .then(res => {
                setCoilDoctorEducationData(coilDoctorEducationData.concat(res.data))
                props.recordAdded();
            });
    }

    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateEduData({ ...updateEduData, [name]: value });
        setValue(name, value)
    };

    //for document onChange methods
    const onFileChange = (e) => {
        setUpdateEduData({ ...updateEduData, document: e.target.files })
        setValue("document", e.target.files)
    }

    return (
        // <form onSubmit={handleSubmit(onSubmit)} className="my-4" encType='multipart/form-data'>
        <>
            <div className="row">
                <div className="col-md-6 ">
                    <label><b>Doctor Degree</b></label>
                    <MainSelect
                        name="degree"
                        onChange={handleInputChange}
                        value={updateEduData.degree}>
                        <option>Select Degree</option>
                        {drdegrees.map((item, index) => (
                            <option className="form-control" key={index}>{item.degree}</option>
                        ))}
                    </MainSelect>
                    {errors.degree && <span className="validation">Please Select your degree</span>}

                    <label><b>Doctor Collage/University</b></label>
                    <MainInput
                        type="text"
                        value={updateEduData.collage}
                        name="collage" onChange={handleInputChange}
                        placeholder="Doctor Collage/University">
                        {errors.collage && <span className="validation">Please enter your collage</span>}
                    </MainInput>

                    <label><b>Complition Year</b></label>
                    <MainSelect
                        name="comYear"
                        value={updateEduData.comYear}
                        onChange={handleInputChange}>
                        <option >Select Year</option>
                        {options.map((option, index) => (
                            <option key={index}>{option}</option>
                        ))}
                    </MainSelect>
                    {errors.comYear && <span className="validation">Please select your complition Year</span>}
                </div>

                <div className="col-md-6 ">
                    <label><b>Specialization</b></label>
                    <MainSelect
                        name="specialization"
                        className="form-control"
                        value={updateEduData.specialization}
                        onChange={handleInputChange}>
                        <option>Select specialization</option>
                        {drspecialization.map((spe, index) => (
                            <option key={index}>{spe.specialization}</option>
                        ))}
                    </MainSelect>
                    {errors.specialization && <span className="validation">Please select your specialization</span>}

                    <label><b>Qualification Document Photo</b></label>
                    <MainInput
                        type="file"
                        name="document"
                        onChange={onFileChange}
                        placeholder="Document"
                        multiple={true}>
                        {errors.document && <span className="validation">Please upload your document</span>}
                    </MainInput>
                </div>
            </div>
            <div className="text-center add_top_30">
                <MainButtonInput onClick={onSubmit}>Save</MainButtonInput>
            </div>
            {/* </form> */}
        </>
    )
}
export { AddDoctorEducation }