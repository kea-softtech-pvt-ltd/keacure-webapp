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
    const [getCSV, setCSV] = useState()
    const fbStorage = getStorage()


    // const fetchMedicineList = () => {
    //     const medicine_Id = `medicines_${doctorId}`
    //     console.log('=medicineId==', medicine_Id)
    //     getMedicineList(medicine_Id)
    //         .then((res) => {
    //             if (res) {
    //                 console.log('=res==', res[0].medicineList)
    //                 setMedicineList(res[0].medicineList
    //                     )
    //             }
    //         })
    // }
    const saveData = () => {
        const formData = new FormData()
        formData.append('file', getCSV)
        // formData.append('medicines_code', medicineId)
        var options = { content: formData };
        console.log('---options', options)

        // axios.post(`${API}/add_mymedicines_list`, formData)
        // saveMedicineList(formData)
        toast.success("Saved Successfully!")

    }

    return (

        <div className="common_box ">
            <input
                type='file'
                name='file'
                accept='.csv'
                onChange={(event) => setCSV(event.target.files[0])}
                className='add_bottom_15'
            // style={{ display: 'block', margin: "10px auto" }}
            />

            <MainButtonInput onClick={saveData}> Save</MainButtonInput>
        </div>
    )
}