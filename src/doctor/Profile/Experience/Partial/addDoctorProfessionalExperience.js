import React from 'react';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { setDoctorExperience } from '../../../../recoil/atom/setDoctorExperience';
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../../mainComponent/mainInput';
import { MainMuiPickers } from '../../../../mainComponent/MainMuiPickers';
import ExperienceApi from '../../../../services/ExperienceApi';
import Toaster from '../../../Toaster';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function AddDoctorProfessionalExperience(props) {
    const { doctorId, addRecords } = props;
    const [coilDoctorExperience, setCoilDoctorExperience] = useRecoilState(setDoctorExperience)
    const [error, setError] = useState('')
    const [startYear, setStartYear] = useState(new Date())
    console.log('==startYear==',startYear)
    const [endYear, setEndYear] = useState(new Date())
    console.log('==endYear==',endYear)
    const [experienceData, setExperienceData] = useState([]);
    const { insertDrExperience } = ExperienceApi();
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
        // register("endYear", { required: true });
        // register("startYear", { required: true });
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
            insertDrExperience(newDoctorData)
                .then((res) => {
                    const reArrangedData = manipulateExperience(res)
                    setCoilDoctorExperience(coilDoctorExperience.concat(reArrangedData))
                })
                toast.success("Saved Successfully!")
                props.addRecords()
        }
    }

    function manipulateExperience(data) {
        const experiences = monthDiff(new Date(data.startYear), new Date(data.endYear))
        const month = experiences % 12
        let year = 0
        if (experiences > 11) {
            const exYear = experiences / 12
            year = exYear.toFixed(0)
        }

        data.totalExperience = `${year}.${month}`;
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
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-5 ">
                            <div className=" text-left">
                                <MainMuiPickers
                                    name="startYear"
                                    value={startYear}
                                    onChange={handleStartYearChange}>Start year
                                </MainMuiPickers>
                            </div>
                            {error && <span className="validation">select valid year</span>}
                        </div>
                        <div className="col-md-5">
                            <div className=" text-left">
                                <MainMuiPickers
                                    name="endYear"
                                    value={endYear}
                                    onChange={handleEndYearChange}>End Year
                                </MainMuiPickers>
                            </div>
                            {error && <span className="validation">select valid year</span>}
                        </div>
                    </div>
                    <div className="">
                        <div className=" text-left">
                            <label><b>Clinic/Hospital Name</b></label>
                        </div>
                        <MainInput
                            type="text"
                            name="clinicName"
                            value={experienceData.clinicName}
                            onChange={handleInputChange}
                            placeholder="clinic name">
                            {errors.clinicName && <span className="validation">Please enter clinic name</span>}
                        </MainInput>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className=" text-left">
                        <label><b>Description</b></label>
                        <div>
                            <textarea
                                type="text"
                                name="description"
                                value={experienceData.description}
                                onChange={handleInputChange}
                                className="textarea-ex form-control p-2 "
                                placeholder="description"
                            />
                        </div>
                    </div>
                    {errors.description && <span className="validation">Type something here</span>}
                </div>

            </div>

            <div className="text-center my-2">
                <MainButtonInput>Save</MainButtonInput>
            </div>
            <div className="row float-right toaster">
                <Toaster />
            </div>
        </form>
    )
}
export { AddDoctorProfessionalExperience }