import React from 'react';
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { setDoctorEducation } from "../../../../recoil/atom/setDoctorEducation";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../../mainComponent/mainInput';
import { MainSelect } from '../../../../mainComponent/mainSelect';
import EducationalApi from '../../../../services/EducationalApi';

function EditEducation(props) {
    const { doctorId, EduId } = props;
    //for fetch specialization data
    const [drspecialization, setDrSpecialization] = useState([])
    // for fetch degrees
    const [drdegrees, setDrdegrees] = useState([])
    //for update data using recoil
    const [eduData, setEduData] = useRecoilState(setDoctorEducation)
    //for update education data
    const [updateEducation, setUpdateEducation] = useState([])
    const {
        fetchEditEducationData,
        fetchDrSpecialization,
        fetchDrDegree,
        updateEducationData
    } = EducationalApi();

    useEffect(() => {
        fetchSpecializations();
        fetchDegrees();
        fetchUpdateEducation();
    }, [])

    const fetchSpecializations = () => {
        fetchDrSpecialization()
            .then((result) => {
                setDrSpecialization(result);
            })
    }

    const fetchDegrees = () => {
        fetchDrDegree()
            .then((result) => {
                setDrdegrees(result);
            })
    }

    const fetchUpdateEducation = () => {
        fetchEditEducationData({ EduId })
            .then((result) => {
                setUpdateEducation(result)
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

    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateEducation({ ...updateEducation, [name]: value });
    };

    //for document onChange methods
    async function EditData(e) {
        e.preventDefault();
        const formData = new FormData(document.querySelector("#EditData"));
        formData.append('doctorId', doctorId);
        updateEducationData({ EduId, formData })
            .then(res => {
                const newEduData = eduData.map(function (d, index) {
                    if (EduId === d._id) {
                        return res
                    } else {
                        return d
                    }
                })
                setEduData(newEduData);
                props.onSubmit()
            });
    }

    return (
        <form onSubmit={EditData} id={"EditData"} encType='multipart/form-data'>
            <div className="row">
                <div className="col-md-6 ">
                    <label><b>Doctor Degree</b></label>
                    <MainSelect
                        name="degree"
                        value={updateEducation.degree}
                        onChange={handleInputChange} >
                        <option value="" >Select Degree</option>
                        {drdegrees.map((item, index) => (
                            <option key={index} className="form-control">{item.degree}</option>
                        ))}
                    </MainSelect>

                    <label><b>Doctor Collage/University</b></label>
                    <MainInput
                        type="text"
                        value={updateEducation.collage}
                        name="collage"
                        onChange={handleInputChange}
                        placeholder="Doctor Collage/University">
                    </MainInput>
                </div>

                <div className="col-md-6">
                    <label><b>Specialization</b></label>
                    <MainSelect
                        name="specialization"
                        value={updateEducation.specialization}
                        onChange={handleInputChange}>
                        <option value="" >Select specialization</option>
                        {drspecialization.map((special, index) => (
                            <option key={index}>{special.specialization}</option>
                        ))}
                    </MainSelect>
                    <label><b>Complition Year</b></label>
                    <MainSelect
                        value={updateEducation.comYear}
                        name="comYear"
                        onChange={handleInputChange}>
                        <option value="" >Select Year</option>
                        {options.map((option, index) => (
                            <option key={index}>{option}</option>
                        ))}
                    </MainSelect>

                </div>
            </div>

            <div className="text-center add_top_30">
                <MainButtonInput>Save</MainButtonInput>
            </div>
        </form>
    )
}
export { EditEducation }