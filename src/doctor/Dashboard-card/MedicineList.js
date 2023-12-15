import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { MainNav } from '../../mainComponent/mainNav';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from './partial/uselinks';
import AuthApi from '../../services/AuthApi';
import MedicineListData from './partial/MedicineListData';

export default function MedicineList() {
    const { doctorId } = useParams();
    const { getDrInfo } = AuthApi()
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [medicineId, setMedicineId] = useState('')


    useEffect(() => {
        DrInfo()
    }, [])


    const DrInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setMedicineId(res[0].medicines_ID)
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
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Appoinment History</li>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <MedicineListData doctorId={doctorId} medicineId={medicineId} />
            </div>
        </Wrapper>
    )
}