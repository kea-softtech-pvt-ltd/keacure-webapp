import { API } from "../../config";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import axios from 'axios';
import { TableContainer, TableHead, TableRow, Table, TableCell } from "@material-ui/core";
import moment from 'moment';
import AuthApi from "../../services/AuthApi";
// import { useRecoilState } from 'recoil';
// import { setPatientListHistory } from '../../recoil/atom/setPatientListHistory'
const useStyles = makeStyles((theme) => ({
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        //marginTop: theme.spacing(2)
    },
    table: {
        minWidth: 650
    }
}))

export default function PatientsClinicHistory() {
    const { doctorId } = useParams()
    const classes = useStyles()
    const [patientDetails, setPatientDetails] = useState([]);
    const [patientHistoryData, setPatientHistoryData] = useState([])
    const { getPatientListDetails } = AuthApi()

    useEffect(() => {
        getPatientHistory();
        date();
    }, [])

    async function getPatientHistory() {
        const result = await getPatientListDetails({doctorId});
        setPatientDetails(result)
    }
    const date = () => {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + (d.getDate()),
            year = '' + (d.getFullYear());
        console.log('day', day);
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        const newDate = [year, month, day].join('-');
        console.log('newDate', newDate);

        const data = patientDetails.filter((patientData) => {
            const selectedDate = moment(patientData.selectedDate)
            .format('YYYY-MM-DD').toString()
            if (selectedDate <= newDate) {
                return patientDetails;
            }
        })
        setPatientHistoryData(data)
    }

    return (
        <main>
            <div className="container margin_120_95">
                <div className="row">
                    <div className="col-lg-12 ml-auto">
                        <nav id="secondary_nav">
                            <div className="container">
                                <span>Patient History</span>
                            </div>
                        </nav>
                        <div className="box_form">
                            <TableContainer >
                                <Table className={classes.table} >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>Patient Name</b></TableCell>
                                            <TableCell align="center"><b>Appoinment Date & Time</b></TableCell>
                                            <TableCell align="center"><b>Mobile No.</b></TableCell>
                                            <TableCell align="center"><b>Age</b></TableCell>
                                            <TableCell align="center"><b>Clinic Name</b></TableCell>
                                            <TableCell align="center"><b>Paid Fees</b></TableCell>
                                            <TableCell align="center"><b>Veiw Details</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {patientHistoryData.map((details, id) => {
                                        console.log("patientHistoryData++++++++++++++++", patientHistoryData)
                                        return (
                                            <TableRow key={id}>
                                                <TableCell align="center">{details['patientDetails'][0].name}</TableCell>
                                                <TableCell align="center">{moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}</TableCell>
                                                <TableCell align="center">{details['patientDetails'][0].mobile}</TableCell>
                                                <TableCell align="center">{details['patientDetails'][0].age}</TableCell>
                                                <TableCell align="center">{details["clinicList"][0].clinicName}</TableCell>
                                                <TableCell align="center">{details.fees}</TableCell>
                                                <TableCell align="center">{<i className="icon_pencil-edit" title="print"></i>}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }

                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}