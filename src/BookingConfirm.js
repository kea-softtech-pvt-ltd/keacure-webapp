import { 
    Link,
   } from "react-router-dom";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
//import Button from "@material-ui/core/Button";
import axios from "axios";
import { useState , useEffect} from "react";
import constants from "./constant";
export default function BookingConfirm(){
    const [activePatient, setActivePatient] = useState(0);
    const [completed ,setCompleted] = useState(new Set());
    const [patient ,getPatient] = useState([])
    useEffect(()=>{
      const result =  axios(
        constants.PATIENTINFO_DATA
      );
      getPatient(result.data)
    },[])
  
    const totalPatient = () => patient.length;

    const completedPatient = () => completed.size;
  
   const allPatientCompleted = () => completedPatient() === totalPatient();
  
    const isLastPatient = () => 
    {
     return activePatient === totalPatient() - 1;
    }
  
    const handleNext = () => {
      const newActivePatient =
      isLastPatient() && !allPatientCompleted()
          ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          patient.findIndex((patients, i) => !completed.has(i))
          : activePatient + 1;
          setActivePatient(newActivePatient);
    };
  
    const handlePatient = (patients) => () => 
    setActivePatient(patients);
  
    const handleComplete = () => {
      const newCompleted = new Set(completed);
      newCompleted.add(activePatient);
      setCompleted(newCompleted);
        handleNext();
    };
  
    function isPatientComplete(patients) {
      return completed.has(patients);
    }

    return(
        <main>
          <div id="breadcrumb">
            <div className="container">
              <ul>
                  <li><Link to="#">Home</Link></li>
                  <li><Link to="#">Category</Link></li>
                  <li>Page active</li>
              </ul>
            </div>
          </div>
          <div className="container margin_120_95">
            <div className="col-lg-12 ml-auto">
              <div className="box_form">
                <Stepper alternativeLabel nonLinear activeStep={activePatient}>
                  {/* {patient.map((label, index) => {
                  const patientProps = {};
                    
                    return (
                      <Step key={label} {...patientProps}>
                        <StepButton
                          onClick={handlePatient(index)}
                          completed={isPatientComplete(index)}>
                            <div className="animation">
                              <div className="round round-circle">
                              </div>
                            </div>
                          {label.Patient}
                        </StepButton>
                      </Step>
                    );
                  })} */}
                </Stepper>
                    {/* <Button 
                        variant="contained"
                        color="primary"
                        onClick={handleComplete}>
                        Complete Checkup
                    </Button> */}

                <div className="container margin_120">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div id="confirm">
                        <div className="icon icon--order-success svg add_bottom_15">
                            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72">
                                <g fill="none" stroke="#8EC343" stroke-width="2">
                                    <circle cx="36" cy="36" r="35" ></circle>
                                    <path d="M17.417,37.778l9.93,9.909l25.444-25.393"></path>
                                </g>
                            </svg>
                        </div>
                        <h2>Thanks for your booking!</h2>
                        <p>You'll receive Link confirmation email at mail@example.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    )
}