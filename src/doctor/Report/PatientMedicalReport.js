import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PatientPersonalInfo from './partial/PatientPersonalInfo';
import Investigation from './partial/Investigation'
import Premedication from './partial/Premedication'
import MedicinePrescription from './partial/MedicinePrescription';
import NewFollowup from './partial/NewFollowup';
import Symptoms from './partial/Symptoms';
import LabPrescription from './partial/LabPrescription';
import { MainNav } from '../../mainComponent/mainNav';
import AuthApi from '../../services/AuthApi';
function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div>
            {value === index && (
                <Box div={5}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

//for table
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    table: {
        minWidth: 650,
    },
}));

export default function PatientMedicalReport() {
    const { reportId } = useParams();
    const { getMedicineReport } = AuthApi()
    const classes = useStyles();
    const [doctorId, setDoctorId] = useState([])
    console.log('---------doctorID',doctorId)
    useEffect(() => {
        medicalReportData()
    }, [])
    //for tab
    const [value, setValue] = useState(0);
    const handleChange = (e, newValue) => {
        e.preventDefault();
        setValue(newValue);
    };

    function changeTab(tabIndex) {
        setValue(tabIndex);
    }
    const medicalReportData = async () => {
        await getMedicineReport({reportId})
            .then((res) => {
                // console.log("-========doctoraid", res)
                setDoctorId(res[0].doctorId)
            })
    }

    return (
        <div>
            <main>
                <div className="container margin_120_95">
                    <div className="row">
                        <div className="col-lg-12 ml-auto">
                            <MainNav>
                                <ul className="clearfix">
                                    <li><Link to={`/patientlist/${doctorId}`}><i className="arrow_back backArrow" title="back button"></i></Link></li>
                                    <li className='float-none' style={{ fontSize: 'inherit' }}>Consultation</li>
                                </ul>
                            </MainNav>
                            <div className="box_form">
                                <PatientPersonalInfo reportId={reportId} />
                                <Paper square>
                                    <Tabs value={value} onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary">
                                        <Tab label="Symptoms" />
                                        <Tab label="Investigation" />
                                        <Tab label="Premedication" />
                                        <Tab label="Medicine-Prescription" />
                                        <Tab label="Lab-Prescription" />
                                        <Tab label="New follow-up" />
                                    </Tabs>
                                </Paper>
                                <div className="tablecontent">
                                    <TabPanel value={value} index={0}>
                                        <Symptoms reportId={reportId} onChange={() => changeTab(1)} />
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <Investigation reportId={reportId} onChange={() => changeTab(2)} />
                                    </TabPanel>

                                    <TabPanel value={value} index={2}>
                                        <Premedication reportId={reportId} onChange={() => changeTab(3)} />
                                    </TabPanel>


                                    <div className="row">
                                        <TabPanel value={value} index={3}>
                                            <MedicinePrescription reportId={reportId} onChange={() => changeTab(4)} />
                                        </TabPanel>
                                    </div>

                                    <div>
                                        <TabPanel value={value} index={4}>
                                            <LabPrescription reportId={reportId} onChange={() => changeTab(5)} />
                                        </TabPanel>
                                    </div>
                                    <TabPanel value={value} index={5}>
                                        <NewFollowup reportId={reportId} onChange={() => changeTab(6)} />
                                    </TabPanel >


                                </div>
                                {/* <div className="text-right add_top_30"><input type="submit" className="btn_1" value="save" /></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}