import React, { useEffect, useState } from 'react';
import { MainAccordion} from "./mainComponent/MainAccordion";
import { useParams} from "react-router-dom";
import axios from 'axios';

export default function PatientsClinicHistory(){
    const {doctorId} = useParams()
    console.log(doctorId)
    const [fetchClinicData , setFetchClinicData] = useState([]);
    console.log(fetchClinicData)
    useEffect(()=>{
        getDoctorClinicInfo();
    },[])
    
    async function getDoctorClinicInfo(){
        const result = await axios.get(`http://localhost:9000/api/fetchclinic/${doctorId}`); 
        const data = await axios.get(`http://localhost:9000/api/fetchownclinic/${doctorId}`); 
        setFetchClinicData(result.data);   
        setFetchClinicData(data.data);   

    }
    return(
        <main>
            <div className="container margin_120_95">			
                <div className="row">
                    <div className="col-lg-12 ml-auto">
                        <nav id="secondary_nav">
                            <div className="container">
                                <span>Clinic History</span>
                            </div>
                        </nav>
                        <div className="box_form">
                        {fetchClinicData.map(item =>(
                            <div className="row">
                                <div className="col-lg-6 ">
                                    <MainAccordion title={item.clinicName}>
                                        <div className="accordian">
                                        <span>1.</span>Shubhangi Suryawanshi
                                        </div>
                                        <div className="accordian">
                                        <span>2.</span>Ravina Nikam
                                        </div>
                                        <div className="accordian">
                                        <span>3.</span>Karishma Kulkarni
                                        </div>
                                    </MainAccordion>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}