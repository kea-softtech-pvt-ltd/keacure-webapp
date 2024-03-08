import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setNewPatientId } from "../../../recoil/atom/setNewPatientId";
import { setDoctorId } from "../../../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import AppointmentsApi from "../../../services/AppointmentsApi";
import ControlPointRoundedIcon from '@material-ui/icons/ControlPointRounded';


export default function UserLinks(props) {
    const { helperId, accessModule } = props;
    const [patientId, setPatientsId] = useRecoilState(setNewPatientId)
    const [doctorId, setdoctorId] = useRecoilState(setDoctorId)
    console.log("doctorI=====>", doctorId)
    const { getPatientListDetails } = AppointmentsApi()
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        patientData()
    }, [location])

    const patientData = () => {
        getPatientListDetails({ doctorId })
            .then((res) => {
                res['test'].map((data) => {
                    if (data.status === "Ongoing") {

                    }
                })
            })
    }

    function handleClick(e) {
        e.preventDefault()
        navigate(`/appointments/${doctorId}`);
    }

    function handleOnProfileClick(e) {
        e.preventDefault()
        navigate(`/profile/${doctorId}`);
    }

    function handleCalenderClick(e) {
        e.preventDefault()
        navigate(`/calender/${doctorId}`);
    }

    function handleClinicClick(e) {
        e.preventDefault()
        navigate(`/history/${doctorId}`);
    }
    function handleSubscriptionClick(e) {
        e.preventDefault()
        navigate(`/subscription/${doctorId}`)
    }
    function handleAddHelper(e) {
        e.preventDefault()
        navigate(`/helper/${doctorId}`)
    }

    function handleMedicineList(e) {
        e.preventDefault()
        navigate(`/medicinelist/${doctorId}`)
    }
    return (
        <div className="col-sm-2 dashSpace" align='left'>
            {!helperId ?
                <div
                    className={location.pathname === `/profile/${doctorId}` ?
                        "Nav-active" :
                        null}
                >
                    <div className="dashboard">
                        <Link
                            onClick={handleOnProfileClick}>
                            <PersonIcon style={{ fontSize: 20 }} />
                            <b className='fontSize'>  Doctor Profile</b>
                        </Link>
                    </div>
                </div>
                :
                <>
                    {
                        accessModule.map((item) => {
                            return (
                                (item.moduleName === "Profile") === true ?
                                    <div className={location.pathname === `/profile/${doctorId}` ? "Nav-active" : null}>
                                        <div className="dashboard">
                                            <Link
                                                onClick={handleOnProfileClick}
                                            >
                                                <PersonIcon style={{ fontSize: 20 }} />
                                                <b className="fontSize">  Doctor Profile</b>
                                            </Link>
                                        </div>
                                    </div>
                                    : null
                            )
                        })
                    }
                </>
            }
            {
                !helperId ?
                    <div className={location.pathname === `/appointments/${doctorId}` ?
                        "Nav-active" :
                        null}>
                        <div className="dashboard ">
                            <Link
                                onClick={handleClick}>
                                <AccessTimeRoundedIcon style={{ fontSize: 20 }} />
                                <b className="fontSize">  Appointment</b>
                            </Link>
                        </div>
                    </div>
                    :
                    <>
                        {
                            accessModule.map((item) => {
                                return (
                                    (item.moduleName === "Appointment") === true ?
                                        <div className={location.pathname === `/appointments/${doctorId}` ? "Nav-active" : null}>

                                            <div className="dashboard">
                                                <Link
                                                    onClick={handleClick}>
                                                    {<AccessTimeRoundedIcon style={{ fontSize: 20 }} />}
                                                    <b className="fontSize">  Appointment</b>
                                                </Link>
                                            </div>
                                        </div>
                                        :
                                        null
                                )
                            })
                        }
                    </>

            }

            {
                !helperId ?
                    <div className={location.pathname === `/history/${doctorId}` ? "Nav-active" : null}>
                        <div className="dashboard">
                            <Link
                                onClick={handleClinicClick}>
                                <PeopleIcon style={{ fontSize: 20 }} />
                                <b className="fontSize">  Appoinment History</b>
                            </Link>
                        </div>
                    </div>
                    :
                    <>
                        {
                            accessModule.map((item) => {
                                return (
                                    (item.moduleName === "Appointment-History") === true ?
                                        <div className={location.pathname === `/history/${doctorId}` ? "Nav-active" : null}>
                                            <div className="dashboard">
                                                <Link
                                                    onClick={handleClinicClick}>
                                                    <PeopleIcon style={{ fontSize: 20 }} />
                                                    <b className="fontSize">  Appoinment History</b>
                                                </Link>
                                            </div>
                                        </div>
                                        : null
                                )
                            })
                        }
                    </>
            }

            <div className={location.pathname === `/calender/${doctorId}` ? "Nav-active" : null}>
                <div className="dashboard">
                    <Link
                        onClick={handleCalenderClick}>
                        <CalendarTodayIcon style={{ fontSize: 20 }} />
                        <b className="fontSize">  Calender</b>
                    </Link>
                </div>
            </div>

            {
                !helperId ?
                    <div className={location.pathname === `/subscription/${doctorId}` ? "Nav-active" : null}>
                        <div className="dashboard">
                            <Link
                                onClick={handleSubscriptionClick}>
                                <AttachMoneyRoundedIcon style={{ fontSize: 20 }} />
                                <b className="fontSize"> Subscription</b>
                            </Link>
                        </div>
                    </div>
                    :
                    <>
                        {
                            accessModule.map((item) => {
                                return (
                                    (item.moduleName === "Subscription") === true ?
                                        <div className={location.pathname === `/subscription/${doctorId}` ? "Nav-active" : null}>
                                            <div className="dashboard">
                                                <Link
                                                    onClick={handleSubscriptionClick}>
                                                    <AttachMoneyRoundedIcon style={{ fontSize: 20 }} />
                                                    <b className="fontSize"> Subscription</b>
                                                </Link>
                                            </div>
                                        </div>
                                        :
                                        null
                                )
                            })
                        }
                    </>
            }
            {
                helperId ? null :
                    <div className={location.pathname === `/helper/${doctorId}` ? "Nav-active" : null}>

                        <div className="dashboard">
                            <Link
                                onClick={handleAddHelper}
                            >
                                <ControlPointRoundedIcon style={{ fontSize: 20 }} />
                                <b className="fontSize">  Assistant</b>
                            </Link>
                        </div>
                    </div>

            }

            {
                !helperId ?
                    <div className={location.pathname === `/medicinelist/${doctorId}` ? "Nav-active" : null}>
                        <div className="dashboard">
                            <Link
                                onClick={handleMedicineList}>
                                <i className="icon-medkit" style={{ fontSize: 20 }} />
                                <b className="fontSize">  Medicine-List</b>
                            </Link>
                        </div>
                    </div>
                    :
                    <>
                        {
                            accessModule.map((item) => {
                                return (
                                    (item.moduleName === "Report") === true ?
                                        <div className={location.pathname === `/medicinelist/${doctorId}` ? "Nav-active" : null}>
                                            <div className="dashboard">
                                                <Link
                                                    onClick={handleMedicineList}>
                                                    <i className="icon-medkit" style={{ fontSize: 20 }} />
                                                    <b className="fontSize">  Medicine-List</b>
                                                </Link>
                                            </div>
                                        </div>
                                        : null
                                )
                            })
                        }
                    </>
            }
        </div >

    )
}  
