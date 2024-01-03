import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { MainNav } from '../../mainComponent/mainNav';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from './partial/uselinks';
import { MainTabs } from '../../mainComponent/mainTabs';
import { TabPanel } from "../../common/tabpanel";
import CompletedAppointment from './partial/CompletedApt';
import CancelledAppointment from './partial/CancelledApt';
import IncompleteAppointment from './partial/IncompleteApt';



export default function PatientsClinicHistory() {
    const { doctorId } = useParams();
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [value, setValue] = useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Wrapper>
            <>
                <MainNav>
                    <ul className="clearfix">
                        <li>
                            <Link to={`/dashboard/${doctorId}`}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </Link>
                        </li>
                        <li className='float-none' style={{ fontSize: 'inherit' }}>Appoinment History</li>
                    </ul>
                </MainNav>
                <div className='row'>
                    <UserLinks
                        doctorId={doctorId}
                        helperId={helpersData._id}
                        accessModule={helpersData.access_module}
                    />
                    <div className="common_box">
                        <MainTabs
                            value={value}
                            onChange={handleChange}
                            label="Completed Appointment"
                            label1="Cancelled Appointment"
                            label2="InComplete Appointment"
                        >
                        </MainTabs>

                        <TabPanel value={value} index={0}>
                            <CompletedAppointment doctorId={doctorId} />
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <CancelledAppointment doctorId={doctorId} />
                        </TabPanel>

                        <TabPanel value={value} index={2}>
                            <IncompleteAppointment doctorId={doctorId} />
                        </TabPanel>

                    </div>
                </div>

            </>
        </Wrapper>
    )
}