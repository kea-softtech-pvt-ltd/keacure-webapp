import React from 'react';
import { EditEducation } from "./EditEducation";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { setDoctorEducation } from "../../../../recoil/atom/setDoctorEducation";
import EducationalApi from '../../../../services/EducationalApi';

function FetchEducation(props) {
    const { doctorId } = props;
    const [eduData, setEduData] = useRecoilState(setDoctorEducation);
    const [activeModal, setActiveModal] = useState();
    const { fetchAllEducations, deleteEducationData } = EducationalApi();
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

    const getAllEducations = () => {
        fetchAllEducations({ doctorId })
            .then((res) => {
                setEduData(res.data);

            })
    }
    const deleteEducation = (education) => {
        const id = education._id
        deleteEducationData(id)
        getAllEducations()
    }

    return (
        <>
            {eduData.length > 0 ?
                <>
                    {eduData.map((education, index) => {
                        return (
                            <div className="" key={index}>
                                <Link onClick={e => handleShow(e, index)} to="#" className="editbutton"><i className="icon_pencil-edit" title="Edit profile"></i></Link>
                                <Link onClick={e => deleteEducation(education, e)} to="#" className="editbutton"><i className="icon-trash-2" title="delete profile"></i></Link>
                                <Modal show={activeModal === index} onHide={handleClose} id={`education-${education._id}`} key={education._id}>
                                    <Modal.Header closeButton >
                                        <Modal.Title>Edit Education Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <EditEducation imageData={education.document} doctorId={doctorId} EduId={education._id} onClick={handleClose} onSubmit={EditData} />
                                    </Modal.Body>
                                </Modal>
                                <div className='bottomBorder'>
                                    <div className="row" encType='multipart/form-data'>
                                        <div className="col-md-6 ">
                                            <div className="fetchedudata">
                                                <i className="\e6a0" title="Calender profile"></i>
                                                <div><b>Doctor Degree</b></div>
                                                <div>{education.degree}</div>
                                            </div>
                                            <div className="fetchedudata">
                                                <span className="icon-icon">
                                                    <i className="icon_building" title="building"></i>
                                                </span>
                                                <b>Doctor Collage/University</b>
                                                <div>{education.collage}</div>
                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="fetchedudata">
                                                <div > <label><b>Specialization</b></label></div>
                                                <div >{education.specialization}</div>
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
                                            {/* <FetchImages imageData={education.document} /> */}
                                        </div>
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
