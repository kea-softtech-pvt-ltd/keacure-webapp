import { useHistory } from "react-router-dom";
import { useParams }from "react-router-dom";
import { MainCards } from './mainComponent/mainCards';
import { MainNav } from "./mainComponent/mainNav";
import { MainWrapper } from "./mainComponent/mainWrapper";

export default function Dashboard(){
    const { doctorId } = useParams();
    let history = useHistory();
    
    function handleClick(e) {
        e.preventDefault()
        history.push("/patientlist/:id");
    }

    function handleOnProfileClick(e) {
        e.preventDefault()
        history.push(`/doctorProfile/${doctorId}`);
    }

    function handlePaymentClick(e) {
        e.preventDefault()
        history.push("/PatientsPaymentHistory");
    }

    function handleClinicClick(e) {
        e.preventDefault()
        history.push("/PatientsClinicHistory");
    }

    return(
        <MainWrapper>
            <MainNav>Dashboard</MainNav>
            <div className="box_form">
                <div className="row">
                    <div className="col-lg-4 ">
                        <MainCards 
                            Typography={"patients List"} 
                            Typography1={"Booking"} 
                            Typography2={"well meaning and kindly."} 
                            onClick={handleClick}>patients List
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

                    <div className="col-lg-4 ">
                        <MainCards 
                            Typography={"History"} 
                            Typography1={"-adjective"} 
                            Typography2={"well meaning and kindly."} 
                            onClick={handleClinicClick}>Clinic History
                        </MainCards>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-4 ">
                        <MainCards 
                            Typography={"Payment"} 
                            Typography1={"-adjective"} 
                            Typography2={"well meaning and kindly."} 
                            onClick={handlePaymentClick}>Patient Payment List
                        </MainCards>
                    </div>

                    <div className="col-lg-4 ">
                        <MainCards 
                            Typography={"Profile"} 
                            Typography1={"-adjective"} 
                            Typography2={"well meaning and kindly."} 
                            onClick={handleOnProfileClick}>Doctor Profile
                        </MainCards>
                    </div>
                </div>    
            </div>
        </MainWrapper>
    )
}  