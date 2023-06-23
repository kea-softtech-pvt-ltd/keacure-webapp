import { useHistory, useLocation, useParams } from "react-router-dom";
import { MainCards } from '../../mainComponent/mainCards';
import { MainNav } from "../../mainComponent/mainNav";
import { MainWrapper } from "../../mainComponent/mainWrapper";
export default function Dashboard() {
    const { ...state } = useLocation()
    const { ...data } = state
    const { helperId, accessModule } = data
    const { doctorId } = useParams();
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
        <MainWrapper>
            <MainNav>Dashboard</MainNav>
            <div className="box_form">
                <div className="row">
                    {!helperId ?
                        <div className="col-lg-4">
                            <MainCards
                                Typography={"Profile"}
                                Typography2={"well meaning and kindly."}
                                onClick={handleOnProfileClick}>Doctor Profile
                            </MainCards>
                        </div> :
                        <>
                            {
                                accessModule.map((item) => {
                                    return (
                                        (item.moduleName === "Profile") === true ?
                                            <MainCards
                                                Typography={"Profile"}
                                                Typography2={"well meaning and kindly."}
                                                onClick={handleOnProfileClick}>Doctor Profile
                                            </MainCards> :
                                            null
                                    )
                                })
                            }
                        </>
                    }
                    {!helperId ?
                        <div className="col-lg-4 ">
                            <MainCards
                                Typography={"Appointment"}
                                Typography2={"well meaning and kindly."}
                                onClick={handleClick}>Appointment
                            </MainCards>
                        </div> :
                        <>
                            {
                                accessModule.map((item) => {
                                    return (
                                        (item.moduleName === "Appointment") === true ?
                                            <div className="col-lg-4 ">
                                                <MainCards
                                                    Typography={"Appointment"}
                                                    Typography2={"well meaning and kindly."}
                                                    onClick={handleClick}>Appointment
                                                </MainCards>
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
                            <div className="col-lg-4 ">
                                <MainCards
                                    Typography={"Appointment History"}
                                    Typography2={"well meaning and kindly."}
                                    onClick={handleClinicClick}>Patient History
                                </MainCards>
                            </div> :
                            <>
                                {
                                    accessModule.map((item) => {
                                        return (
                                            (item.moduleName === "Appointment-History") === true ?
                                                <div className="col-lg-4 ">
                                                    <MainCards
                                                        Typography={"Appointment History"}
                                                        Typography2={"well meaning and kindly."}
                                                        onClick={handleClinicClick}>Patient History
                                                    </MainCards>
                                                </div>
                                                : null
                                        )
                                    })
                                }
                            </>
                    }

                    <div className="col-lg-4 ">
                        <MainCards
                            Typography={"Calender"}
                            Typography2={"well meaning and kindly."}
                            onClick={handleCalenderClick}>Calender
                        </MainCards>
                    </div>
                    {!helperId ?
                        <div className="col-lg-4">
                            <MainCards
                                Typography={"subscription"}
                                Typography2={"Subscription"}
                                onClick={handleSubscriptionClick}>Subscription
                            </MainCards>
                        </div> :
                        <>
                            {
                                accessModule.map((item) => {
                                    return (
                                        (item.moduleName === "Subscription") === true ?
                                            <div className="col-lg-4">
                                                <MainCards
                                                    Typography={"subscription"}
                                                    Typography2={"Subscription"}
                                                    onClick={handleSubscriptionClick}>Subscription
                                                </MainCards>
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
                            <div className="col-lg-4 ">
                                <MainCards
                                    Typography={"Helper"}
                                    Typography2={"Helper"}
                                    onClick={handleAddHelper}
                                >Helper
                                </MainCards>
                            </div>

                    }

                </div>
            </div>
        </MainWrapper >
    )
}  
