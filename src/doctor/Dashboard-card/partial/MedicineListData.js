import React, { useEffect, useState } from 'react';
import { MainButtonInput } from '../../../mainComponent/mainButtonInput';
import axios from 'axios';
import { API } from '../../../config';

export default function MedicineListData(props) {
    const { medicineId } = props
    const [getCSV, setCSV] = useState("")
    const saveData = async(e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", getCSV);
        data.append('medicines_code', medicineId);
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