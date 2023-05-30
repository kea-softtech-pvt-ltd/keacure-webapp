import { useHistory ,useParams } from "react-router-dom";
import { MainCards } from '../../mainComponent/mainCards';
import { MainNav } from "../../mainComponent/mainNav";
import { MainWrapper } from "../../mainComponent/mainWrapper";
// import 'react-big-calendar/lib/sass/styles';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles';
export default function Dashboard(){
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
function handleDemoClick(e){
    e.preventDefault()
    history.push(`/demoform`)
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
                            Typography={"Demo"} 
                            // Typography1={"-history"} 
                            Typography2={"Demo session."} 
                            onClick={handleDemoClick}>Demo
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
