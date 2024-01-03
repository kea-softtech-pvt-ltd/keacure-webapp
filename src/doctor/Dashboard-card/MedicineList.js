import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { MainNav } from '../../mainComponent/mainNav';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from './partial/uselinks';
import AuthApi from '../../services/AuthApi';
import MedicineListData from './partial/MedicineListData';
import ReportApi from '../../services/ReportApi';
import axios from 'axios';
import { API } from '../../config';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import { MainButtonInput } from '../../mainComponent/mainButtonInput';

export default function MedicineList() {
    const { doctorId } = useParams();
    const { getDrInfo } = AuthApi()
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [medicineId, setMedicineId] = useState('')
    const [medicineData, setMedicineData] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { getMedicineList } = ReportApi()
    const [getCSV, setCSV] = useState("")


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
    const classes = useStyles();



    const saveData = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", getCSV);
        data.append('medicines_code', medicineId);
        await axios({
            method: "POST",
            url: `${API}/add_mymedicines_list`,
            data: data,
        }).then((res) => {
        });
    };
    useEffect(() => {
        DrInfo(currentPage);
    }, [currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    function changeCPage() {
        setCurrentPage(currentPage * 15)
    }
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const DrInfo = (currentPage) => {
        getDrInfo({ doctorId })
            .then((res) => {
                const pageSize = 10;
                setMedicineId(res[0].medicines_ID)
                getMedicineList(res[0].medicines_ID, currentPage, pageSize)
                    .then((res, i) => {
                        const { totalPages } = res;
                        console.log('==', res)
                        setMedicineData(res.filteredData)
                        setTotalPages(totalPages);
                    })
            })
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
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Medicine List</li>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />

                <form onSubmit={saveData} className="common_box align-center">
                    <div className='row'>
                        <input
                            type='file'
                            name='file'
                            accept='.csv'
                            onChange={(event) => setCSV(event.target.files[0])}
                            className='add_bottom_15'
                            required
                        />
                        <div className='margin_left_15'>
                            <MainButtonInput > Save</MainButtonInput>
                        </div>
                    </div>
                    <TableContainer component={Paper} className=''>
                        <Table className={classes.table} size="large" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><b>Sr No.</b></TableCell>
                                    <TableCell align="center"><b>Medicine Name</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medicineData.map((data, i) => {
                                    return (
                                        <TableRow>
                                            <TableCell align="center">
                                                {i}
                                            </TableCell>
                                            <TableCell align="center">
                                                {data.medicineName}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ul className="pagination pagination-sm">
                        <li className="page-item">
                            <Link className="page-link"
                                to="#" onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Link>
                        </li>

                        <li className='page-item '>
                            <Link className="page-link"
                                to="#" onClick={() => changeCPage()}>
                                {currentPage}
                            </Link>
                        </li>

                        <li className="page-item">
                            <Link className="page-link"
                                to="#" onClick={handleNextPage}
                                disabled={currentPage === totalPages}>
                                Next
                            </Link>
                        </li>

                    </ul>
                </form>
            </div>
        </Wrapper >
    )
}