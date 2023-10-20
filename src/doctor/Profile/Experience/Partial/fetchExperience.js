import React from 'react';
import { API } from "../../../../config";
import { EditExperience } from "./editExperience";
import { Link, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { setDoctorExperience } from "../../../../recoil/atom/setDoctorExperience";
import { useRecoilState } from 'recoil';
import ExperienceApi from '../../../../services/ExperienceApi';

function FetchExperience() {
    const { doctorId } = useParams();
    const [fetchExperience, setFetchExperience] = useRecoilState(setDoctorExperience)
    const [activeModal, setActiveModal] = useState()
    const { fetchExperienceData, removeExperience } = ExperienceApi();
    const handleClose = () => {
        setActiveModal(null)
    }

    const handleShow = (e, index) => {
        setActiveModal(index)
    };

    const EditData = () => {
        handleClose(true);
    };

    useEffect(() => {
        getAllExperience()
    }, [fetchExperience])

    const getAllExperience = () => {
        fetchExperienceData({ doctorId })
            .then(jsonRes => {
                const exp = manipulateExperience(jsonRes)
                setFetchExperience(exp)
            });
    }

    function manipulateExperience(data) {
        return data.map(function (item, index) {
            const experiences = monthDiff(new Date(item.startYear), new Date(item.endYear))
            const month = experiences % 12
            let year = 0
            if (experiences > 11) {
                const exYear = experiences / 12
                year = exYear.toFixed(0)
            }
            item.totalExperience = `${year}.${month}`;
            return item;
        })
    }

    function monthDiff(start, end) {
        var months;
        months = (end.getFullYear() - start.getFullYear()) * 12;
        months -= start.getMonth();
        months += end.getMonth();
        return months <= 0 ? 0 : months;
    }
    const removeExperienceData =  (experience) => {
        const id = experience._id
         removeExperience(id)
         .then(()=>{
             getAllExperience()
         })
    }

    return (
        <>
            {fetchExperience.map((experience, index) => {
                return (
                    <div className="" key={index}>
                        <Link to="#" onClick={e => handleShow(e, index)} className="editbutton"><i className="icon_pencil-edit" title="Edit profile"></i></Link>
                        <Link to="#" onClick={e => removeExperienceData(experience, e)} className="editbutton"><i className="icon-trash-2" title="Delete profile"></i></Link>
                        <Modal show={activeModal === index} onHide={handleClose} id={`experience-${experience._id}`} key={experience._id}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Experience Data</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditExperience doctorId={doctorId} ExId={experience._id} onSubmit={EditData} />
                            </Modal.Body>
                        </Modal>
                        <div className='bottomBorder'>
                            <div className="row">
                                <div className="col-md-6 ">
                                    <div className="fetchedudata">
                                        <div>
                                            <span className="icon-icon">
                                                <i className="icon_calendar" title="Calender profile"></i>
                                            </span>
                                            <b>Start Year</b>
                                        </div>
                                        <div>
                                            {new Date(experience.startYear).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', timeZone: 'Asia/Kolkata' })}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="fetchedudata">
                                        <div className='marginLeft'>
                                            <span className="icon-icon">
                                                <i className="icon_calendar" title="Calender profile"></i>
                                            </span>
                                            <b>End Year</b>
                                        </div>
                                        <div className='marginLeft'>
                                            {new Date(experience.endYear).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', timeZone: 'Asia/Kolkata' })}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="fetchedudata">
                                        <div><b>Doctor Experience</b></div>
                                        <div>{experience.totalExperience} years</div>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="fetchedudata">
                                        <div className='marginLeft'>
                                            <span className="icon-icon">
                                                <i className="icon_building" title="Clinic"></i>
                                            </span>
                                            <b>Clinic/Hospital Name</b>
                                        </div >
                                        <div className='marginLeft'>{experience.clinicName}</div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="fetchedudata">
                                        <lable ><b>Description</b> </lable>
                                        <div>{experience.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
export { FetchExperience }