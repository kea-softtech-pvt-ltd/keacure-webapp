import React from 'react';
import { API } from "../../../../config";
import { EditEducation } from "./EditEducation";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FetchImages } from "./fetchImages";
import { useRecoilState } from "recoil";
import { setDoctorEducation } from "../../../../recoil/atom/setDoctorEducation";
import axios from 'axios';
import AuthApi from '../../../../services/AuthApi';

function FetchEducation() {
    const { doctorId } = useParams();
    const [eduData, setEduData] = useRecoilState(setDoctorEducation);
    const [activeModal, setActiveModal] = useState();
    const {fetchAllEducations}=AuthApi();
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
        getAllEducations()
    }, [])

    const getAllEducations = async () => {
        const result = await fetchAllEducations({doctorId}, eduData)
        setEduData(result.data);
    }

    return (
        <>
            {eduData.length > 0 ?
                <>
                    {eduData.map((education, index) => {
                        return (
                            <div className="whiteBox" key={index}>
                                <Link onClick={e => handleShow(e, index)} to="#" className="editbutton"><i className="icon_pencil-edit" title="Edit profile"></i></Link>
                                <Modal show={activeModal === index} onHide={handleClose} id={`education-${education._id}`} key={education._id}>
                                    <Modal.Header closeButton >
                                        <Modal.Title>Edit Education Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <EditEducation imageData={education.document} doctorId={doctorId} EduId={education._id} onClick={handleClose} onSubmit={EditData} />
                                    </Modal.Body>
                                </Modal>

                                <div className="row" encType='multipart/form-data'>
                                    <div className="col-md-6 ">
                                        <div className="fetchedudata">
                                            <i className="\e6a0" title="Calender profile"></i>
                                            <div><b>Doctor Degree</b></div>
                                            <div>{education.degree}</div>
                                        </div>
                                        <div className="fetchedudata">
                                            <div>
                                                <span className="icon-icon">
                                                    <i className="icon_building" title="building"></i>
                                                </span>
                                                <b>Doctor Collage/University</b>
                                            </div>
                                            <div>{education.collage}</div>
                                        </div>
                                        <div className="fetchedudata">
                                            <div>
                                                <span className="icon-icon">
                                                <i className="icon_calendar" title="calendar"></i>
                                            </span>
                                                <b>Complition Year</b>
                                            </div>
                                            <div>{education.comYear}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ">
                                        <div className="fetchedudata">
                                            <div><b>Specialization</b></div>
                                            <div>{education.specialization}</div>
                                        </div>
                                        <FetchImages imageData={education.document} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </>
                : null}
        </>
    )
}
export { FetchEducation }