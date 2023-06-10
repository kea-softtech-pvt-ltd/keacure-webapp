import React from 'react';
import { TabPanel } from "../../common/tabpanel";
import { DoctorClinic } from "./Clinic/doctorClinic"
import { useState } from "react";
import { DoctorProfessionalExperience } from "./Experience/doctorProfessionalExperience"
import { DoctorEducation } from "./Education/doctorEducation";
import { DoctorPersonalInformation } from "./Personal/DoctorPersonalInformation";
import { doctorIdState } from "../../recoil/selector/doctorIdState";
import { useRecoilValue } from "recoil";
import { MainNav } from '../../mainComponent/mainNav';
import { MainTabs } from '../../mainComponent/mainTabs';
import { MainWrapper } from '../../mainComponent/mainWrapper';
import { Link, useParams } from 'react-router-dom';

export default function EditDoctorProfile() {
    const { doctorId } = useParams();

    //for using tab
    const [tabValue, setTabValue] = useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const goToEducation = () => {
        setTabValue(1)
    }
    const goToExperience = () => {
        setTabValue(2)
    }
    const goToClinic = () => {
        setTabValue(3)
    }

    return (
        <MainWrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/doctorprofile/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li><Link to="#section_1" className="active">Doctor Information</Link></li>
                    <li><Link to={`/dashboard/${doctorId}`}>Done</Link></li>
                </ul>

            </MainNav>

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
                    <DoctorPersonalInformation data={goToEducation} doctorId={doctorId} />
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <DoctorEducation data={goToExperience} doctorId={doctorId} />
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <DoctorProfessionalExperience data={goToClinic} doctorId={doctorId} />
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                    <DoctorClinic />
                </TabPanel>
            </div>
        </MainWrapper>
    )
}