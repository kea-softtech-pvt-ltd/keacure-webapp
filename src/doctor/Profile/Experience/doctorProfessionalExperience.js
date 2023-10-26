import React from 'react';
import { useState, useEffect } from "react";
import Icon from '@material-ui/core/Icon';
import { FetchExperience } from "./Partial/fetchExperience";
import { AddDoctorProfessionalExperience } from "./Partial/addDoctorProfessionalExperience";
import { Link } from '@material-ui/core';
import { MainButtonInput } from "../../../mainComponent/mainButtonInput";

function DoctorProfessionalExperience(props) {
    //for add new fiels (experience)
    const [showExperience, setShowExperience] = useState(false);
    function handleAdd() {
        setShowExperience(!showExperience)
    }

    function handleRecordAdded() {
        setShowExperience(true)
    }

    return (
        <>
            <FetchExperience />
            <div className="row float-right">
                <div className="my-2 ">
                    <Link onClick={() => handleAdd()}>
                        <Icon className="addiconbutton">add</Icon>
                    </Link>
                </div>
                <div className="m-2 ">
                    <MainButtonInput onClick={props.data}>Next</MainButtonInput>
                </div>
            </div>
            <div className="my-5">
                {showExperience === false ? (
                    <div>
                        <AddDoctorProfessionalExperience addRecords={handleRecordAdded} />
                    </div>
                ) : null
                }
            </div>
        </>
    )
}
export { DoctorProfessionalExperience }