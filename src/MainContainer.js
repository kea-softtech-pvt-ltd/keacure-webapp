import {Switch,Route} from "react-router-dom";
import Home from "./common/Home";
import DoctorList from "./patient/DoctorList";
import DoctorDetail from "./doctor/Dashboard-card/DoctorDetail";
import DoctorBookingWithPatientLogin from "./patient/DoctorBookingWithPatientLogin";
import BookingConfirm from "./patient/BookingConfirm";
import LoginDoctor from "./doctor/Profile/LoginDoctor";
import LoginPatient from "./patient/LoginPatient";
//import RegisterPatient from "./RegisterPatient";
import DoctorProfile from "./doctor/Profile/DoctorProfile";
import EditDoctorProfile from "./doctor/Profile/EditDoctorProfile";
import PatientList from "./doctor/Dashboard-card/PatientList";
import Dashboard from './doctor/Dashboard-card/Dashboard';
import PatientDashboard from "./patient/PatientDashboard";
import PatientMedicalReport from "./doctor/Report/PatientMedicalReport";
import MedicineHistory from "./patient/MedicineHistory";
import PatientInfo from "./patient/PatientInfo";
import PatientProfile from "./patient/PatientProfile";
import PatientsPaymentHistory from "./patient/PatientsPaymentHistory";
import PatientsClinicHistory from "./doctor/Dashboard-card/PatientsClinicHistory";
import Appointment from "./patient/Appointment";
import SearchLocationInput from "./common/demo";
import CreatePatientProfile from "./patient/createPatientProfile";
import GetLoginPatientProfile from "./patient/getLoginPatientProfile";
import Calender from './doctor/Dashboard-card/Calender';
import User from "./user";
import PatientLogoutForm from "./patient/patientLogoutForm";
import SetUpdateTime from "./doctor/Profile/Clinic/Session/setUpdateTime";
import CalendarModalBox from "./doctor/Dashboard-card/partial/CalendarModalBox"
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
          <Route path="/updatesessiontime/:doctorId/:clinicId/:ItemId">
            <SetUpdateTime />
          </Route>
          <Route path="/doctorprofile/:doctorId">
            <DoctorProfile />
          </Route>
          <Route path="/calender/:doctorId">
            < Calender />
          </Route>
          {/* <Route path="/calendarModalBox/:patientId">
            <CalendarModalBox/>
          </Route> */}
          <Route exact path="/logindoctor">
            <LoginDoctor />
          </Route>

          <Route path="/editdoctorprofile/:doctorId">
            <EditDoctorProfile />
          </Route>
          <Route exact path="/patientlist/:doctorId">
            <PatientList />
          </Route>
          {/* <Route path="/patientlist">
            <OPD/>
          </Route> */}
          <Route path="/patientlist/consultation/:appointmentId">
            <PatientMedicalReport/>
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