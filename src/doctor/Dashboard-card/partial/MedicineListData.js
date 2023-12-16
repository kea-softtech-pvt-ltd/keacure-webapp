import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'
import { makeStyles } from '@material-ui/core/styles';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import ReportApi from '../../../services/ReportApi';
import { MainButtonInput } from '../../../mainComponent/mainButtonInput';
import { toast } from "react-toastify";
import axios from 'axios';
import { API } from '../../../config';

export default function MedicineListData(props) {
    const { medicineId, doctorId } = props

    const { saveMedicineList, getMedicineList } = ReportApi()
    const [saveMedicine, setSaveMedicine] = useState([])
    const [medicineList, setMedicineList] = useState()
    const [getCSV, setCSV] = useState("")
    console.log("getCSV-----------", getCSV)
    const saveData = async(e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", getCSV);
        data.append('medicines_code', medicineId);
        console.log("data-----------", data)

        await axios({
            method: "POST",
            url: `${API}/add_mymedicines_list`,
            data: data,
        }).then((res) => {
            console.log("res-----------", res)
        });
    };

    return (
        <form onSubmit={saveData} className="common_box ">
            <input
                type='file'
                name='file'
                accept='.csv'
                onChange={(event) => setCSV(event.target.files[0])}
                className='add_bottom_15'
                required
            />

            <MainButtonInput> Save</MainButtonInput>
        </form>
    )
}