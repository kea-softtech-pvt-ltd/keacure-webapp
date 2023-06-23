import React, { useEffect, useState } from 'react';
import AddHelper from './AddHelper';
import HelperList from './partial/helperList';
import { useParams, Link } from 'react-router-dom';
import AuthApi from '../../services/AuthApi';
import { MainNav } from '../../mainComponent/mainNav';
import { Icon } from '@material-ui/core';

export default function Helper() {
    const [helperList, setHelperList] = useState([]);
    const [active, setActive] = useState(false)
    const { doctorId } = useParams()
    let { getHelper } = AuthApi()
    useEffect(() => {
        getHelperDetails();
    }, [])

    async function getHelperDetails() {
        const result = await getHelper(doctorId);
        setHelperList(result)
    }

    return (
        <main>
            <div className="container margin_120_95">
                <div className="row ">
                    <div className="col-lg-12 ml-auto">
                        <MainNav>
                            <ul className="clearfix">
                                <li>
                                    <Link to={`/dashboard/${doctorId}`}>
                                        <i className="arrow_back backArrow" title="back button"></i>
                                    </Link>
                                </li>
                                <li className='float-none' style={{ fontSize: 'inherit' }} >Helper</li>
                                <li><Link onClick={() => setActive(true)} >
                                    <Icon className="addiconbutton " style={{ fontSize: 50 }}>add</Icon>
                                </Link></li>
                            </ul>
                        </MainNav>

                        <div>
                            <>
                                {!active && helperList.length > 0 ?
                                    <HelperList helperList={helperList} getHelperDetails={getHelperDetails()}  doctorId={doctorId} />
                                    : 
                                    <AddHelper doctorId={doctorId} />
                                }
                            </>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
} 