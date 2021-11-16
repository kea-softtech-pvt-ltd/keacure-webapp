import { useHistory ,useParams} from "react-router-dom";
import { MainNav } from './mainComponent/mainNav';
import { MainCards } from './mainComponent/mainCards';
import { MainWrapper } from './mainComponent/mainWrapper';
  
export default function PatientDashboard(){
    const { patientId } = useParams();
    let history = useHistory();

    function handleClick() {
        history.push(`/appointment/${patientId}`);
    }

    function onClick() {
        history.push(`/patientinfo/${patientId}`);
    }

    function onPaymentClick() {
        history.push(`/doctorbooking/${patientId}`);
    }

    function onProfileClick() {
        history.push(`/patientprofile/${patientId}`);
    }
    
    return(
        <MainWrapper>
            <MainNav>Dashboard</MainNav>
            <div className="box_form">
                <div className="row">
                    <div className="col-lg-4 ">
                        <MainCards 
                            Typography="Appointment History" 
                            Typography1="adjective" 
                            Typography2="well meaning and kindly." 
                            onClick={handleClick}> Appointment
                        </MainCards>
                    </div>

                    <div className="col-lg-4">
                        <MainCards
                            Typography="Payment" 
                            Typography1="adjective" 
                            Typography2="well meaning and kindly." 
                            onClick={onPaymentClick}> Payment
                        </MainCards>
                    </div>

                    <div className="col-lg-4 ">
                        <MainCards
                            Typography="Profile" 
                            Typography1="adjective" 
                            Typography2="well meaning and kindly." 
                            onClick={onProfileClick}> Patient Profile
                        </MainCards>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-4 ">
                        <MainCards
                            Typography="Queue" 
                            Typography1="patient Information" 
                            Typography2="well meaning and kindly." 
                            onClick={onClick}> Patient Info
                        </MainCards>
                    </div>
                </div>
            </div>
        </MainWrapper>
    )
}