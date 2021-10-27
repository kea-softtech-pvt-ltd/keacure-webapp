import React from 'react';
import { EditExperience} from "./editExperience";
import { Link } from "react-router-dom";
import { Modal} from "react-bootstrap";
import { useParams}from "react-router-dom";
import { useState , useEffect} from "react";
import { setDoctorExperience} from "./recoil/atom/setDoctorExperience";
import { useRecoilState } from 'recoil';

function FetchExperience(){
    const { doctorId } = useParams();
    const [ fetchExperience , setFetchExperience] = useRecoilState(setDoctorExperience)
    const [ activeModal, setActiveModal] = useState()

    const handleClose = () =>{
        setActiveModal(null)
    }

    const handleShow = (e ,index) =>{
        setActiveModal(index)
    };
    
    const EditData = () => {
        handleClose(true);
    };
    useEffect(() => {
        getAllExperience()    
    },[])

    const getAllExperience =() =>{
        fetch(`http://localhost:9000/api/fetchExData/${doctorId}`).then(res =>{
            if(res){
            return res.json()
                }
            }).then(jsonRes =>{
                const exp = manipulateExperience(jsonRes)
                setFetchExperience(exp)
            });
    }
   
    function manipulateExperience(data) {
        return data.map(function(item, index){
            const experiences =  monthDiff(new Date(item.startYear), new Date(item.endYear))
            const month = experiences%12
            let year = 0
            if(experiences > 11) {
                const exYear = experiences/12
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
    
    return(
        <>
        {fetchExperience.map((experience ,index) => {
            return(
                <div className="modal-border" key={index}>
                    <Link onClick={e => handleShow(e , index)} className="editbutton"><i className="icon_pencil-edit" title="Edit profile"></i></Link>
                    <Modal show={activeModal === index} onHide={handleClose} id={`experience-${experience._id}`} key={experience._id}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Experience Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditExperience doctorId={doctorId} ExId={experience._id} onSubmit={EditData} />
                        </Modal.Body>
                    </Modal>
                    <div className="row">
                        <div className="col-md-6 ">
                            <div className="fetchedudata">
                                <div><b>Start Year</b></div>
                                <div>
                                {new Date(experience.startYear).toLocaleDateString(undefined, {year: 'numeric', month:'2-digit',timeZone: 'Asia/Kolkata'})} 
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className="fetchedudata">
                                <div><b>End Year</b></div>
                                <div>
                                {new Date(experience.endYear).toLocaleDateString(undefined, {year: 'numeric', month:'2-digit',timeZone: 'Asia/Kolkata'})} 
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
                            <div><b>Clinic/Hospital Name</b></div>
                                <div>{experience.clinicName}</div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="fetchedudata">
                                <div><b>Description</b></div>
                                <div>{experience.description}</div>
                            </div> 
                        </div>  
                    </div>
                </div>
                ) 
            })}
        </>
    )
}
export {FetchExperience}