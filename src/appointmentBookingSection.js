import React from "react";
import { DoctorAppointmentType} from "./doctorAppointmentType";
import { MainAccordion } from "./mainComponent/MainAccordion";
import { FaClinicMedical} from "react-icons/fa";

function AppointmentBookingSection(props){
    const { clinicData , ownClinicData } = props;
    console.log(props)

    return(
        <aside className="col-xl-5 col-lg-5" id="sidebar">
            <div className="box_general_3 booking">
                <form>
                    <div className="title">
                        <h3>Book Appointment</h3>
                    </div>
                    <small><h5><FaClinicMedical/> Clinic List</h5></small>
                    <div>
                        {clinicData.map((clinicItem) =>(
                            <MainAccordion key={clinicItem.id} title={clinicItem.clinicName}>
                                <DoctorAppointmentType clinicData={clinicItem}/>
                            </MainAccordion>
                        ))}
                        {ownClinicData.map((ownClinicItem) =>(
                            <MainAccordion title={ownClinicItem.clinicName}>
                                <DoctorAppointmentType clinicData={ownClinicItem}/>
                            </MainAccordion>
                        ))}
                    </div>
                </form>
            </div>  

            {/* <Link to={`/doctorbookingwithpatientlogin/${doctorId}`} className="btn_1 full-width">Book Appointment</Link> */}
        </aside>
    )
}
export {AppointmentBookingSection}