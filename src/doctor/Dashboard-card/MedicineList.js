import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { MainNav } from '../../mainComponent/mainNav';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from './partial/uselinks';
import Papa from 'papaparse'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import uuid from "uuid";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import ReportApi from '../../services/ReportApi';

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

export default function PatientsClinicHistory() {
    const { doctorId } = useParams();
    const { saveMedicineList } = ReportApi()
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [data, setData] = useState()
    console.log("====result", data)
    const [columnArray, setColumnArray] = useState([])
    const [saveMedicine, setSaveMedicine] = useState([])
    const [values, setValues] = useState([])
    const classes = useStyles();
    const handleFile = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (result) {
                setSaveMedicine(result.data)
                const columnArray = [];
                const valuesArray = [];
                result.data.map((d) => {
                    columnArray.push(Object.keys(d))
                    valuesArray.push(Object.values(d))
                })
                setData(result.data)
                setColumnArray(columnArray[0])
                setValues(valuesArray)
            }
        })
        saveData()
    }

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        const fileRef = ref(getStorage(), uuid.v4());
        const result = await uploadBytes(fileRef, blob);
        return await getDownloadURL(fileRef);
    }
    const saveData = async () => {
        const data = await uploadImageAsync(saveMedicine)
        const bodyData = {
            'medicineList': data,
        }
        saveMedicineList(bodyData)
    }
   

    return (
        <Wrapper>
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
                    <input
                        type='file'
                        name='file'
                        accept='.csv'
                        onChange={handleFile}
                        style={{ display: 'block', margin: "10px auto" }}
                    />
                    <div>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="medium" aria-label="a dense table">
                                {/* <TableHead>
                                    {saveMedicine.map((col, i) => (
                                        <>
                                            {console.log("=====col", col.ID)}
                                            <TableRow align="center" key={i}>
                                                <b key={i}>{col.ID}</b>
                                            </TableRow>
                                            <TableCell align="center" key={i}>
                                                <b key={i}>{col.MedicineName}</b>
                                            </TableCell>
                                        </>
                                    ))}

                                </TableHead> */}
                                <TableRow>
                                    <TableBody>
                                        {values.map((data, i) => (
                                            <>
                                                <TableRow >
                                                    {/* <TableCell align="center" key={i}>{data.ID}</TableCell> */}
                                                    <TableCell align="center" key={i}>{data}</TableCell>
                                                </TableRow>
                                            </>
                                        ))}
                                    </TableBody>
                                </TableRow>

                            </Table>
                        </TableContainer>
                    </div>

                </div>
            </div>
        </Wrapper>
    )
}