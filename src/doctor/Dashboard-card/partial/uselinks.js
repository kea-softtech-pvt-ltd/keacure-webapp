import { useHistory } from "react-router-dom";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import ControlPointRoundedIcon from '@material-ui/icons/ControlPointRounded';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function UserLinks(props) {
    const { doctorId, helperId, accessModule } = props
    let history = useHistory();
    function handleClick(e) {
        e.preventDefault()
        history.push(`/patientlist/${doctorId}`);
    }

    function handleOnProfileClick(e) {
        e.preventDefault()
        history.push(`/doctorProfile/${doctorId}`);
    }

    function handleCalenderClick(e) {
        e.preventDefault()
        history.push(`/calender/${doctorId}`);
    }

    function handleClinicClick(e) {
        e.preventDefault()
        history.push(`/PatientsClinicHistory/${doctorId}`);
    }
    function handleSubscriptionClick(e) {
        e.preventDefault()
        history.push(`/subscriptioncard/${doctorId}`)
    }
    function handleAddHelper(e) {
        e.preventDefault()
        history.push(`/helper/${doctorId}`)
    }
    return (

        <div className="col-sm-2" align='left'>
            {!helperId ?
                <div className="dashboard">
                    <Link
                        onClick={handleOnProfileClick}
                    >
                        <PersonIcon style={{ fontSize: 20 }} />
                        Doctor Profile
                    </Link>
                </div> :
                <>
                    {
                        accessModule.map((item) => {
                            return (
                                (item.moduleName === "Profile") === true ?
                                    <div className="dashboard">
                                        <Link
                                            onClick={handleOnProfileClick}
                                        >
                                            <PersonIcon style={{ fontSize: 20 }} />
                                            Doctor Profile
                                        </Link></div> :
                                    null
                            )
                        })
                    }
                </>
            }
            {!helperId ?
                <div className="dashboard">
                    <Link
                        onClick={handleClick}>
                        <AccessTimeRoundedIcon style={{ fontSize: 20 }} />
                        Appointment
                    </Link>
                </div> :
                <>
                    {
                        accessModule.map((item) => {
                            return (
                                (item.moduleName === "Appointment") === true ?
                                    <div className="dashboard">
                                        <Link
                                            onClick={handleClick}>
                                            {<AccessTimeRoundedIcon style={{ fontSize: 20 }} />}
                                            Appointment
                                        </Link>
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
                    <div className="dashboard">
                        <Link
                            onClick={handleClinicClick}> <PeopleIcon style={{ fontSize: 20 }} />
                            Patient History
                        </Link>
                    </div> :
                    <>
                        {
                            accessModule.map((item) => {
                                return (
                                    (item.moduleName === "Appointment-History") === true ?
                                        <div className="dashboard">
                                            <Link
                                                onClick={handleClinicClick}><PeopleIcon style={{ fontSize: 20 }} />
                                                Patient History
                                            </Link>
                                        </div>
                                        : null
                                )
                            })
                        }
                    </>
            }

            <div className="dashboard">
                <Link
                    onClick={handleCalenderClick}><CalendarTodayIcon style={{ fontSize: 20 }} />
                    Calender
                </Link>
            </div>
            {!helperId ?
                <div className="dashboard">
                    <Link
                        onClick={handleSubscriptionClick}>
                        <AttachMoneyRoundedIcon style={{ fontSize: 20 }} />
                        Subscription
                    </Link>
                </div> :
                <>
                    {
                        accessModule.map((item) => {
                            return (
                                (item.moduleName === "Subscription") === true ?
                                    <div className="dashboard">
                                        <Link
                                            onClick={handleSubscriptionClick}>
                                            <AttachMoneyRoundedIcon style={{ fontSize: 20 }} />
                                            Subscription
                                        </Link>
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
                    <div className="dashboard">
                        <Link
                            onClick={handleAddHelper}
                        >
                            <ControlPointRoundedIcon style={{ fontSize: 20 }} /> Assistant
                        </Link>
                    </div>

            }

        </div>

    )
}  
