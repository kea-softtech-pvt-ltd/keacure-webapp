import React from "react";
import { NavLink } from "react-router-dom";
import { setDoctorId } from "../../../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import ControlPointRoundedIcon from '@material-ui/icons/ControlPointRounded';

export default function UserLinks(props) {
    const { helperId, accessModule } = props;
    const [doctorId, setdoctorId] = useRecoilState(setDoctorId)

    return (
        <div className="col-sm-2 dashSpace" align='left'>
            {!helperId ?
                <NavLink
                    className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                    to={`/profile/${doctorId}`}>
                    <div className="dashboard">
                        <PersonIcon style={{ fontSize: 20 }} />
                        <b className='fontSize'>  Doctor Profile</b>
                    </div>
                </NavLink>
                :
                <>
                    {
                        accessModule.map((item) => {
                            return (
                                (item.moduleName === "Profile") === true ?
                                    <NavLink
                                        className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                                        to={`/profile/${doctorId}`}>
                                        <div className="dashboard">
                                            <PersonIcon style={{ fontSize: 20 }} />
                                            <b className="fontSize">  Doctor Profile</b>
                                        </div>
                                    </NavLink>
                                    : null
                            )
                        })
                    }
                </>
            }
            {
                !helperId ?
                    <NavLink
                        className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                        to={`/appointments/${doctorId}`}>
                        <div className="dashboard ">
                            <AccessTimeRoundedIcon style={{ fontSize: 20 }} />
                            <b className="fontSize">  Appointment</b>
                        </div>
                    </NavLink>
                    :
                    <>
                        {
                            accessModule.map((item) => {
                                return (
                                    (item.moduleName === "Appointment") === true ?
                                        <NavLink
                                            className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                                            to={`/appointments/${doctorId}`}>
                                            <div className="dashboard">
                                                {<AccessTimeRoundedIcon style={{ fontSize: 20 }} />}
                                                <b className="fontSize">  Appointment</b>
                                            </div>
                                        </NavLink>
                                        :
                                        null
                                )
                            })
                        }
                    </>

            }

            {
                !helperId ?
                    <NavLink
                        className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                        to={`/history/${doctorId}`}>
                        <div className="dashboard">
                            <PeopleIcon style={{ fontSize: 20 }} />
                            <b className="fontSize">  Appoinment History</b>
                        </div>
                    </NavLink>
                    :
                    <>
                        {
                            accessModule.map((item) => {
                                return (
                                    (item.moduleName === "Appointment-History") === true ?
                                        <NavLink
                                            className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                                            to={`/history/${doctorId}`}>
                                            <div className="dashboard">
                                                <PeopleIcon style={{ fontSize: 20 }} />
                                                <b className="fontSize">  Appoinment History</b>
                                            </div>
                                        </NavLink>
                                        : null
                                )
                            })
                        }
                    </>
            }

            <NavLink
                className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                to={`/calender/${doctorId}`}
            >
                <div className="dashboard">
                    <CalendarTodayIcon style={{ fontSize: 20 }} />
                    <b className="fontSize">  Calender</b>
                </div>
            </NavLink>

            {
                !helperId ?
                    <NavLink
                        className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                        to={`/subscription/${doctorId}`}
                    >
                        <div className="dashboard">
                            <AttachMoneyRoundedIcon style={{ fontSize: 20 }} />
                            <b className="fontSize"> Subscription</b>
                        </div>
                    </NavLink>
                    :
                    <>
                        {
                            accessModule.map((item) => {
                                return (
                                    (item.moduleName === "Subscription") === true ?
                                        <NavLink
                                            className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                                            to={`/subscription/${doctorId}`}
                                        >
                                            <div className="dashboard">
                                                <AttachMoneyRoundedIcon style={{ fontSize: 20 }} />
                                                <b className="fontSize"> Subscription</b>
                                            </div>
                                        </NavLink>
                                        :
                                        null
                                )
                            })
                        }
                    </>
            }
            {
                helperId ? null :
                    <NavLink
                        className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                        to={`/helper/${doctorId}`}
                    >
                        <div className="dashboard">
                            <ControlPointRoundedIcon style={{ fontSize: 20 }} />
                            <b className="fontSize">  Assistant</b>
                        </div>
                    </NavLink>

            }

            {
                !helperId ?
                    <NavLink
                        className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                        to={`/medicinelist/${doctorId}`}
                    >
                        <div className="dashboard">
                            <i className="icon-medkit" style={{ fontSize: 20 }} />
                            <b className="fontSize">  Medicine-List</b>
                        </div>
                    </NavLink>
                    :
                    <>
                        {
                            accessModule.map((item) => {
                                return (
                                    (item.moduleName === "Report") === true ?
                                        <NavLink
                                            className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                                            to={`/medicinelist/${doctorId}`}
                                        >
                                            <div className="dashboard">
                                                <i className="icon-medkit" style={{ fontSize: 20 }} />
                                                <b className="fontSize">  Medicine-List</b>
                                            </div>
                                        </NavLink>
                                        : null
                                )
                            })
                        }
                    </>
            }
        </div >

    )
}  
