import React from "react";
import {ShowDoctorVideoAppointment} from "./showDoctorVideoAppointment";
import {ShowDoctorInClinicAppointment} from "./showDoctorInClinicAppointment";
import { MainAccordion } from "./mainComponent/MainAccordion";

function AppointmentBookingSection(props){
    const { clinicData , ownClinicData } = props;
    console.log(props)
    //const [fetchConsultationData , setFetchConsultationData] = useState([]);
    
    // useEffect(()=>{
    //     getDoctorConsultation();
    // },[])
    
    // async function getDoctorConsultation(){
    //     const result = await axios.get(`http://localhost:9000/api/fetcSessionSlots/${doctorId}/${id}`); 
    //     console.log(result)
    //     setFetchConsultationData(result.data);   
    // } 

    return(
        <aside className="col-xl-4 col-lg-4" id="sidebar">
            <div className="box_general_3 booking">
                <form>
                    <div className="title">
                        <h3>Book Video Appointment</h3>
                    </div>
                    <div>
                        {clinicData.map((clinicItem) =>(
                            <MainAccordion key={clinicItem.id} title={clinicItem.clinicName}>
                                <ShowDoctorVideoAppointment/>
                            </MainAccordion>
                        ))}
                        {ownClinicData.map((ownClinicItem) =>(
                            <MainAccordion title={ownClinicItem.clinicName}>
                                <ShowDoctorVideoAppointment/>
                            </MainAccordion>
                        ))}
                    </div>
                </form>
            </div>  

            <div className="box_general_3 booking">  
                <form>
                    <div className="title">
                        <h3>Book InClinic Appointment</h3>
                    </div>
                    {clinicData.map((clinicItem) =>(
                        <MainAccordion title={clinicItem.clinicName} fees={clinicItem.fees}>
                            <ShowDoctorInClinicAppointment/>
                        </MainAccordion>
                    ))}
                    {ownClinicData.map((ownClinicItem) =>(
                        <MainAccordion title={ownClinicItem.clinicName} fees={ownClinicItem.fees}>
                            <ShowDoctorInClinicAppointment/>
                        </MainAccordion>
                    ))}
                </form>
            </div>
            {/* <Link to={`/doctorbookingwithpatientlogin/${doctorId}`} className="btn_1 full-width">Book Appointment</Link> */}
        </aside>
    )
}
export {AppointmentBookingSection}