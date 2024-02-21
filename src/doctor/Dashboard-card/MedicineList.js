import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { MainNav } from '../../mainComponent/mainNav';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from './partial/uselinks';
import AuthApi from '../../services/AuthApi';
import ReportApi from '../../services/ReportApi';
import axios from 'axios';
import { API } from '../../config';
import Toaster from '../Toaster';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from '@material-ui/core/styles';
import ReactPaginate from 'react-paginate';
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

    useEffect(() => {
        DrInfo(currentPage);
    }, [currentPage]);

    const saveData = async (e) => {
        toast.success("Saved Successfully!")
        e.preventDefault();
        const data = new FormData();
        data.append("file", getCSV);
        data.append('medicines_code', medicineId);
        await axios({
            method: "POST",
            url: `${API}/add_mymedicines_list`,
            data: data,
        }).then((res) => {
        })
    };

    const pageSize = 10;
    const DrInfo = (currentPage) => {
        getDrInfo({ doctorId })
            .then((res) => {
                setMedicineId(res.result[0].medicines_ID)
                getMedicineList(res.result[0].medicines_ID, currentPage, pageSize)
                    .then((res, i) => {
                        const { totalPages } = res;
                        setMedicineData(res.filteredData)
                        setTotalPages(totalPages);
                    })
            })
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1)
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
                    <div className='row vitalSign' >
                        <input
                            align='center'
                            type='file'
                            name='file'
                            accept='.csv'
                            onChange={(event) => setCSV(event.target.files[0])}
                            className='add_bottom_15 '
                            required
                        />
                        <div className='margin_left_15'>
                            <MainButtonInput > Save</MainButtonInput>
                        </div>
                    </div>
                    <div className="clinicHistory" >
                        (Make Sure Your File  Format Will be '_id and medicineName')
                    </div>
                    <div className="row float-right ">
                        <Toaster />
                    </div>
                    <TableContainer component={Paper} className=''>
                        <Table className={classes.table} size="large" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell align="center"><b>Sr No.</b></TableCell> */}
                                    <TableCell align="center"><b>Medicine Name</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medicineData.map((data, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell align="center">
                                                {data.medicineName}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={totalPages}
                            previousLabel="< Previous"
                            renderOnZeroPageCount={null}
                            marginPagesDisplayed={2}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                        />
                    </div>
                </form>
            </div>
        </Wrapper >
    )
}