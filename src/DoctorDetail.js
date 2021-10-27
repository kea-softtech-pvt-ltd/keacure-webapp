import React, {useState ,useEffect } from "react";
import { Link , useParams} from "react-router-dom";
import { DoctorDetailSection2} from "./doctorDetailsSection2";
import { AppointmentBookingSection} from "./appointmentBookingSection";
import { MainNav } from './mainComponent/mainNav';
import axios from 'axios';
import { DoctorDetailPersonalInfo } from './doctorDetailPersonalInfo';
import { DoctorDetailsProfessionalStatement} from "./doctorDetailsProfessionalStatement";
import { DoctorDetailsEducationalStatement} from "./doctorDetailsEducationalStatement";

export default function DoctorDetail () {
    const { doctorId} = useParams() ;
    console.log(doctorId)

    const [fetchProfileData , setFetchProfileData] = useState([]);
    console.log(fetchProfileData)

    useEffect(()=>{
        console.log("hiiii")
        getDoctorPersonalInfo();
        console.log("hiiii")
    },[])
    
    async function getDoctorPersonalInfo(){
        const result = await axios.get(`http://localhost:9000/api/doctor/${doctorId}`); 
        console.log(result)
        setFetchProfileData(result.data[0]);   
    }
    return(
        <main>
            <div id="breadcrumb">
                <div className="container">
                    <ul>
                        <li><Link to="#">Home</Link></li>
                        <li><Link to="#">Category</Link></li>
                        <li>Page active</li>
                    </ul>
                </div>
            </div>
    
            <div className="container margin_60">
                <div className="row">
                    <div className="col-xl-8 col-lg-8">
                        <MainNav>  
                            <ul className="clearfix">
                                <li><Link to="#section_1" className="active">General info</Link></li>
                                <li><Link to="#section_2">Reviews</Link></li>
                                <li><Link to="#sidebar">Booking</Link></li>
                            </ul>
                        </MainNav>
                        <div id="section_1">
                            <div className="box_general_3">
                                <DoctorDetailPersonalInfo educationData={fetchProfileData}/>
                                {fetchProfileData["educationList"]?
                                    (<>
                                        <DoctorDetailsProfessionalStatement educationData={fetchProfileData.educationList}/>
                                        <DoctorDetailsEducationalStatement educationData={fetchProfileData.educationList}/>
                                    </>)
                                :null}
                            </div>
                        </div>

                        <div id="section_2">
                            <DoctorDetailSection2/>
                        </div>
                    </div>
                    {fetchProfileData["clinicList"] || fetchProfileData["ownClinicList"]?
                       ( <AppointmentBookingSection clinicData={fetchProfileData.clinicList} ownClinicData={fetchProfileData.ownClinicList}/>)
                    :null}
                </div>
            </div>
	    </main>
    )
}