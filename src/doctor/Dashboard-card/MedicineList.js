import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { MainNav } from '../../mainComponent/mainNav';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from './partial/uselinks';
import Papa from 'papaparse'
import { makeStyles } from '@material-ui/core/styles';
import uuid from "uuid";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import ReportApi from '../../services/ReportApi';
import AuthApi from '../../services/AuthApi';
import { MainButtonInput } from '../../mainComponent/mainButtonInput';
import { toast } from "react-toastify";

export default function MedicineList() {
    const { doctorId } = useParams();
    const { getDrInfo } = AuthApi()
    const { saveMedicineList } = ReportApi()
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [saveMedicine, setSaveMedicine] = useState([])
    const [medicineId, setMedicineId] = useState('')
    const [getCSV, setCSV] = useState('')
    const fbStorage = getStorage()


    useEffect(() => {
        DrInfo()
    }, [])

    const handleFile = (event) => {
        setCSV(event.target.files[0].name)
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (result) {
                setSaveMedicine(result.data)
            }
        })
    }

    const DrInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setMedicineId(res[0].medicines_ID)
            })
    }

    const saveData = async () => {
        const storageRef = ref(fbStorage, `csvFiles/${medicineId}-${getCSV}`);
        const metadata = {
            contentType: "application/csv",
        };
        const snapshot = await uploadBytesResumable(storageRef, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const bodyData = {
            'medicineslist': saveMedicine,
            'medicines_code': medicineId
        }
        saveMedicineList(bodyData)
        
        toast.success("Saved Successfully!")
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
                    <MainButtonInput onClick={saveData}> Save</MainButtonInput>
                </div>
            </div>
        </Wrapper>
    )
}