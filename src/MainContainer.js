import {Switch,Route} from "react-router-dom";
import Home from "./Home";
import DoctorList from "./DoctorList";
import DoctorDetail from "./DoctorDetail";
import DoctorBookingWithPatientLogin from "./DoctorBookingWithPatientLogin";
import BookingConfirm from "./BookingConfirm";
import LoginDoctor from "./LoginDoctor";
import LoginPatient from "./LoginPatient";
import RegisterPatient from "./RegisterPatient";
import DoctorProfile from "./DoctorProfile";
import EditDoctorProfile from "./EditDoctorProfile";
import PatientList from "./PatientList";
import Dashboard from './Dashboard';
import PatientDashboard from "./PatientDashboard";
import OPD from "./OPD";
import MedicineHistory from "./MedicineHistory";
import PatientInfo from "./PatientInfo";
import PatientProfile from "./PatientProfile";
import PatientsPaymentHistory from "./PatientsPaymentHistory";
import PatientsClinicHistory from "./PatientsClinicHistory";
import Appointment from "./Appointment";
import SearchLocationInput from "./demo";
import CreatePatientProfile from "./createPatientProfile";
import GetLoginPatientProfile from "./getLoginPatientProfile";
import User from "./user";

function MainContainer() {
    return (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route  path="/home">
            <Home/>
          </Route>
          <Route  path="/demo">
            <SearchLocationInput />
          </Route>
          <Route path="/doctorlist">
            <DoctorList />
          </Route>
          <Route path="/doctordetail/:doctorId">
            <DoctorDetail />
          </Route>
          <Route path="/doctorbookingwithpatientlogin/:doctorId">
            <DoctorBookingWithPatientLogin />
          </Route>
          <Route path="/bookingconfirm">
            <BookingConfirm />
          </Route>
          <Route path="/loginpatient">
            <LoginPatient />
          </Route>
          <Route exact path="/registerpatient">
            <RegisterPatient />
          </Route>
          <Route path="/patientprofile/:registerId">
            < PatientProfile />
          </Route>
          <Route path="/doctorprofile/:doctorId">
            <DoctorProfile />
          </Route>
          <Route exact path="/logindoctor">
            <LoginDoctor />
          </Route>
          <Route path="/editdoctorprofile/:doctorId">
            <EditDoctorProfile />
          </Route>
          <Route exact path="/patientlist">
            <PatientList />
          </Route>
          <Route path="/patientlist/:patientId">
            <OPD/>
          </Route>
          <Route path="/Appointment/:patientId">
            <OPD/>
          </Route>
          <Route path="/dashboard/:doctorId">
            <Dashboard />
          </Route>
          <Route path="/patientdashboard">
            <PatientDashboard />
          </Route>
          <Route path="/medicinehistory">
            <MedicineHistory />
          </Route>
          <Route path="/patientinfo">
            < PatientInfo />
          </Route>
          <Route path="/patientspaymenthistory">
            < PatientsPaymentHistory />
          </Route>
          <Route path="/Patientsclinichistory">
            < PatientsClinicHistory />
          </Route>
          <Route path="/appointment">
            < Appointment />
          </Route>
          <Route path="/createpatientprofile/:patientId">
            < CreatePatientProfile />
          </Route>
          <Route path="/getloginpatientprofile/:patientId">
            < GetLoginPatientProfile />
          </Route>
          <Route path="/user">
            < User />
          </Route>
        </Switch>
  );
}
export default MainContainer;