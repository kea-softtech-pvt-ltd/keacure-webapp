import {Switch,Route} from "react-router-dom";
import Home from "./common/Home";
import DoctorList from "./doctor/DoctorList";
import DoctorDetail from "./doctor/DoctorDetail";
import DoctorBookingWithPatientLogin from "./patient/DoctorBookingWithPatientLogin";
import BookingConfirm from "./patient/BookingConfirm";
import LoginDoctor from "./doctor/LoginDoctor";
import LoginPatient from "./patient/LoginPatient";
//import RegisterPatient from "./RegisterPatient";
import DoctorProfile from "./patient/DoctorProfile";
import EditDoctorProfile from "./doctor/EditDoctorProfile";
import PatientList from "./patient/PatientList";
import Dashboard from './doctor/Dashboard';
import PatientDashboard from "./patient/PatientDashboard";
import OPD from "./patient/OPD";
import MedicineHistory from "./patient/MedicineHistory";
import PatientInfo from "./patient/PatientInfo";
import PatientProfile from "./patient/PatientProfile";
import PatientsPaymentHistory from "./patient/PatientsPaymentHistory";
import PatientsClinicHistory from "./patient/PatientsClinicHistory";
import Appointment from "./patient/Appointment";
import SearchLocationInput from "./common/demo";
import CreatePatientProfile from "./patient/createPatientProfile";
import GetLoginPatientProfile from "./patient/getLoginPatientProfile";
import User from "./user";
import PatientLogoutForm from "./patient/patientLogoutForm";

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
          {/* <Route exact path="/registerpatient">
            <RegisterPatient />
          </Route> */}
          <Route path="/patientprofile/:patientId">
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
          <Route exact path="/patientlist/:doctorId">
            <PatientList />
          </Route>
          <Route path="/patientlist">
            <OPD/>
          </Route>
          <Route path="/Appointment/:patientId">
            <OPD/>
          </Route>
          <Route path="/dashboard/:doctorId">
            <Dashboard />
          </Route>
          <Route path="/patientdashboard/:patientId">
            <PatientDashboard />
          </Route>
          <Route path="/medicinehistory">
            <MedicineHistory />
          </Route>
          <Route path="/patientinfo">
            < PatientInfo />
          </Route>
          <Route path="/patientspaymenthistory/:doctorId">
            < PatientsPaymentHistory />
          </Route>
          <Route path="/Patientsclinichistory/:doctorId">
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
          <Route path="/logout">
            < PatientLogoutForm/>
          </Route>
        </Switch>
  );
}
export default MainContainer;