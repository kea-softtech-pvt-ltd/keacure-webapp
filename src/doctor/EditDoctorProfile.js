import React from 'react';
import { TabPanel } from "../common/tabpanel";
import { DoctorClinic}  from "../doctor/doctorClinic"
import { useState } from "react";
import { DoctorProfessionalExperience} from "../doctor/doctorProfessionalExperience"
import { DoctorEducation} from "../doctor/doctorEducation";
import { DoctorPersonalInformation} from "../doctor/DoctorPersonalInformation";
import { doctorIdState} from "../recoil/selector/doctorIdState";
import { useRecoilValue } from "recoil";
import { MainNav } from '../mainComponent/mainNav';
import { MainTabs } from '../mainComponent/mainTabs';
import { MainWrapper } from '../mainComponent/mainWrapper';

export default function EditDoctorProfile(){
    const doctorId =  useRecoilValue(doctorIdState);
    //for using tab
    const [tabValue, setTabValue] = useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const goToEducation=()=>{ 
        setTabValue(1)
    }
    const goToExperience=()=>{ 
        setTabValue(2)
    }
    const goToClinic=()=>{ 
        setTabValue(3)
    }

    return(
        <MainWrapper>
            <MainNav>Doctor Information</MainNav>
            <div className="box_form"> 
                <MainTabs 
                    value={tabValue} 
                    onChange={handleChange} 
                    label="Personal Information"
                    label1="Educational Details"
                    label2="Professional Experience"
                    label3="Clinic">
                </MainTabs> 
            
                <TabPanel value={tabValue} index={0}>
                    <DoctorPersonalInformation data={goToEducation} doctorId={doctorId}/>
                </TabPanel>
                
                <TabPanel value={tabValue} index={1}>
                    <DoctorEducation data={goToExperience} doctorId={doctorId}/>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <DoctorProfessionalExperience data={goToClinic} doctorId={doctorId}/>
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                    <DoctorClinic/>
                </TabPanel>
            </div>
        </MainWrapper>            
    )
}