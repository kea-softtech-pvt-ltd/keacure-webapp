import { useHistory ,useLocation,useParams } from "react-router-dom";
import { MainCards } from '../../mainComponent/mainCards';
import { MainNav } from "../../mainComponent/mainNav";
import { MainWrapper } from "../../mainComponent/mainWrapper";
// import 'react-big-calendar/lib/sass/styles';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles';
export default function Dashboard(){
    const {state} = useLocation()
    const {helperId,accessModule} = state.state
    console.log("state----------", helperId,accessModule)
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
function handleSubscriptionClick(e){
    e.preventDefault()
    history.push(`/subscriptioncard`)
}
function handleAddHelper(e){
    e.preventDefault()
    history.push(`/addhelper/${doctorId}`)
}
    return(
        <MainWrapper>
            <MainNav>Dashboard</MainNav>
            <div className="box_form">
                <div className="row">
                <div className="col-lg-4 ">
                        <MainCards 
                            Typography={"Profile"} 
                            // Typography1={"-adjective"} 
                            Typography2={"well meaning and kindly."} 
                            onClick={handleOnProfileClick}>Doctor Profile
                        </MainCards>
                    </div>
                    <div className="col-lg-4 ">
                        <MainCards 
                            Typography={"Appointment"} 
                            // Typography1={"Booking"} 
                            Typography2={"well meaning and kindly."} 
                            onClick={handleClick}>Appointment
                        </MainCards>
                    </div>
                    <div className="col-lg-4 ">
                        <MainCards 
                            Typography={"Appointment History"} 
                            // Typography1={"-history"} 
                            Typography2={"well meaning and kindly."} 
                            onClick={handleClinicClick}>Patient History
                        </MainCards>
                    </div>
                    <div className="col-lg-4 ">
                        <MainCards 
                            Typography={"Calender"} 
                            // Typography1={"-history"} 
                            Typography2={"well meaning and kindly."} 
                            onClick={handleCalenderClick}>Calender
                        </MainCards>
                    </div>
                    <div className="col-lg-4 ">
                        <MainCards 
                            Typography={"subscription"} 
                            // Typography1={"-history"} 
                            Typography2={"Subscription"} 
                            onClick={handleSubscriptionClick}>Subscription
                        </MainCards>
                    </div>
                    <div className="col-lg-4 ">
                        <MainCards 
                            Typography={"Add Helper"} 
                            // Typography1={"-history"} 
                            Typography2={"Add Helper"} 
                            onClick={handleAddHelper}
                            >Add Helper
                        </MainCards>
                    </div>
                </div>
                
                {/* <div className="row">
                    <div className="col-lg-4 ">
                        <MainCards 
                            Typography={"Payment"} 
                            Typography1={"-adjective"} 
                            Typography2={"well meaning and kindly."} 
                            onClick={handlePaymentClick}>Patient Payment List
                        </MainCards>
                    </div>

                    <div className="col-lg-4">
                        <MainCards 
                            Typography={"Queue"} 
                            Typography1={"-Services"} 
                            Typography2={"well meaning and kindly."} 
                            onClick={handleClick}>Learn More
                        </MainCards>
                    </div>
                </div>     */}
            </div>
        </MainWrapper>
    )
}  
