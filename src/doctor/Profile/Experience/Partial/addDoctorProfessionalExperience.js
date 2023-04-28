import React from 'react';
import { API } from "../../../../config";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { setDoctorExperience } from '../../../../recoil/atom/setDoctorExperience';
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../../mainComponent/mainInput';
import { MainMuiPickers } from '../../../../mainComponent/MainMuiPickers';
import AuthApi from '../../../../services/AuthApi';
function AddDoctorProfessionalExperience(props) {
    const { doctorId } = useParams();
    const [coilDoctorExperience, setCoilDoctorExperience] = useRecoilState(setDoctorExperience)
    const [error, setError] = useState('')
    const [startYear, setStartYear] = useState(new Date())
    const [endYear, setEndYear] = useState(new Date())
    const [experienceData, setExperienceData] = useState([]);
    const { insertDrExperience } = AuthApi();
    const handleStartYearChange = (date) => {
        // const splitDate = date.split("")
        // const year = splitDate[0]
        // const month = splitDate[1]
        // const dateString =`${year}-${month}`
        setStartYear(date)
    }
    const handleEndYearChange = (date) => {
        setEndYear(date)
    }

    useEffect(() => {
        register("clinicName", { required: true });
        register("description", { required: true });
    }, [])

    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setExperienceData({ ...experienceData, [name]: value });
        setValue(name, value)
    };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const newDoctorData = {
            doctorId: doctorId,
            clinicName: data.clinicName,
            endYear: endYear,
            startYear: startYear,
            description: data.description
        }
        if (endYear < startYear) {
            setError("end year should be greater than start year")
        }
        else {
            // const res= axios.post(`${API}/insertExperience`, newDoctorData)
            insertDrExperience(newDoctorData)
                .then((res) => {
                    const reArrangedData = manipulateExperience(res.data)
                    setCoilDoctorExperience(coilDoctorExperience.concat(reArrangedData))
                    props.addRecords()
                })
        }
    }

    function manipulateExperience(data) {
        console.log("================", data)
        const experiences = monthDiff(new Date(data.startYear), new Date(data.endYear))
        const month = experiences % 12
        let year = 0
        if (experiences > 11) {
            const exYear = experiences / 12
            year = exYear.toFixed(0)
        }

        data.totalExperience = `${year}.${month}`;
        console.log("////////////////////", data)
        return data;

    }

    function monthDiff(start, end) {
        var months;
        months = (end.getFullYear() - start.getFullYear()) * 12;
        months -= start.getMonth();
        months += end.getMonth();
        return months <= 0 ? 0 : months;
    }

    return (
        <form className="my-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-3 ">
                    <MainMuiPickers
                        name="startYear"
                        value={startYear}
                        onChange={handleStartYearChange}>Start year
                    </MainMuiPickers>
                    {error && <span className="validation">select valid year</span>}
                </div>

                <div className="col-md-3">
                    <MainMuiPickers
                        name="endYear"
                        value={endYear}
                        onChange={handleEndYearChange}>End Year
                    </MainMuiPickers>
                </div>

                <div className="col-md-6 ">
                    <label><b>Clinic/Hospital Name</b></label>
                    <MainInput
                        type="text"
                        name="clinicName"
                        value={experienceData.clinicName}
                        onChange={handleInputChange}
                        placeholder="clinic name">
                        {errors.clinicName && <span className="validation">Please enter clinic name</span>}
                    </MainInput>
                </div>

                <div className="col-lg-12">
                    <div className="textarea">
                        <label><b>Description</b></label>
                        <textarea
                            type="text"
                            name="description"
                            value={experienceData.description}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="description"
                        />
                    </div>
                    {errors.description && <span className="validation">Type something here</span>}
                </div>
            </div>

            <div className="text-center add_top_30">
                <MainButtonInput>Verify & Save</MainButtonInput>
            </div>
        </form>
    )
}
export { AddDoctorProfessionalExperience }