import React, { useState } from 'react';
import { MainButtonInput } from '../../../mainComponent/mainButtonInput';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { API } from '../../../config';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function MedicineListData(props) {
    const { medicineId, medicineData } = props;
    console.log('==medicineData', medicineData)
    const [getCSV, setCSV] = useState("")

    //For Pagination
    const [activePageNo, setActivePageNo] = useState(1)
    const recordsPerPage = 10;
    const lastIndex = activePageNo * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = medicineData.slice(firstIndex, lastIndex)
    console.log('==records',records)
    const nPage = Math.ceil(medicineData.length / recordsPerPage)
    const number = [...Array(nPage + 1).keys()].slice(1)

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

    //For Pagination
    function prePage() {
        if (activePageNo !== 1) {
            setActivePageNo(activePageNo - 1)
        }
    }
    function changeCPage(id) {
        setActivePageNo(id)
    }
    function nextPage() {
        if (activePageNo !== nPage) {
            setActivePageNo(activePageNo + 1)

        }
    }

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

    return (
        <>
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
                            {records.map((data, i) => {
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
                {/* {records ?
                <>
                    {
                        records.length > 0 ?
                            <nav aria-label="" className="add_top_20">
                                <ul className="pagination pagination-sm">
                                    <li className="page-item">
                                        <Link className="page-link"
                                            to="#" onClick={prePage}>
                                            Previous
                                        </Link>
                                    </li>
                                    {
                                        number.map((n, i) => {
                                            return (
                                                <li className={`page-item ${activePageNo === n ? 'active' : ""}`} key={i}>
                                                    <Link className="page-link"
                                                        to="#" onClick={() => changeCPage(n)}>
                                                        {n}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                    <li className="page-item">
                                        <Link className="page-link"
                                            to="#" onClick={nextPage}>
                                            Next
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            : <div className="clinicHistory" ><b>Loading...</b></div>
                    }
                </>
                 : <div className="clinicHistory" ><b>Data is not Available</b></div>
             } */}
              <nav aria-label="" className="add_top_20">
                                <ul className="pagination pagination-sm">
                                    <li className="page-item">
                                        <Link className="page-link"
                                            to="#" onClick={prePage}>
                                            Previous
                                        </Link>
                                    </li>
                                    {
                                        number.map((n, i) => {
                                            return (
                                                <li className={`page-item ${activePageNo === n ? 'active' : ""}`} key={i}>
                                                    <Link className="page-link"
                                                        to="#" onClick={() => changeCPage(n)}>
                                                        {n}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                    <li className="page-item">
                                        <Link className="page-link"
                                            to="#" onClick={nextPage}>
                                            Next
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
            </form>
         
        </>
    )
}