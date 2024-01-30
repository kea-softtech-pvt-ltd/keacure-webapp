import { Switch, Route } from "react-router-dom";
import DoctorDetail from "./doctor/Dashboard-card/DoctorDetail";
import LoginDoctor from "./doctor/Profile/LoginDoctor";
import DoctorProfile from "./doctor/Profile/DoctorProfile";
import EditDoctorProfile from "./doctor/Profile/EditDoctorProfile";
import Dashboard from './doctor/Dashboard-card/Dashboard';
import PatientMedicalReport from "./doctor/Report/PatientMedicalReport";
import MedicineHistory from "./patient/MedicineHistory";
import PatientsPaymentHistory from "./patient/PatientsPaymentHistory";
import PatientsClinicHistory from "./doctor/Dashboard-card/PatientsClinicHistory";
import CreatePatientProfile from "./patient/createPatientProfile";
import GetLoginPatientProfile from "./patient/getLoginPatientProfile";
import Calender from './doctor/Dashboard-card/Calender';
import User from "./user";
import SetUpdateTime from "./doctor/Profile/Clinic/Session/setUpdateTime";
import ViewMedicalReport from './doctor/Report/ViewMedicalReport';
import Logout from "./doctor/Profile/LogoutForm";
import Subscription from "./doctor/Profile/Subscription";
import LoginHelper from "./doctor/Profile/LoginHelper";
import SubscriptionCard from "./doctor/Dashboard-card/SubscriptionCard";
import Helper from "./doctor/helper/Helper";
import EditHelper from './doctor/helper/EditHelper';
import Patient from "./patient/patient";
import { AppointmentBookingSection } from "./patient/appointmentBookingSection";
import Report from "./doctor/Dashboard-card/Report";
import PatientData from "./doctor/Dashboard-card/partial/patientData";
import MedicineList from "./doctor/Dashboard-card/MedicineList";
import SubscriptionConfirmation from "./doctor/Dashboard-card/subscriptionConfirmation";

function MainContainer() {
  return (
    <Switch>
      <Route path="/doctordetail/:doctorId">
        <DoctorDetail />
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
      <Route exact path="/">
        <LoginDoctor />
      </Route>
      <Route path="/editdoctorprofile/:doctorId">
        <EditDoctorProfile />
      </Route>
      <Route path="/consultation/:reportId">
        <PatientMedicalReport />
      </Route>
      <Route path="/patient-history/:reportId">
        <ViewMedicalReport />
      </Route>
      <Route path="/dashboard/:doctorId">
        <Dashboard />
      </Route>
      <Route path="/subscription/:doctorId">
        <Subscription />
      </Route>
      <Route path="/medicinehistory">
        <MedicineHistory />
      </Route>
      <Route path="/patientspaymenthistory/:doctorId">
        < PatientsPaymentHistory />
      </Route>
      <Route path="/Patientsclinichistory/:doctorId">
        < PatientsClinicHistory />
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
        < Logout />
      </Route>
      <Route path="/helper/:doctorId">
        <Helper />
      </Route>
      <Route path="/edithelper/:helperId">
        <EditHelper />
      </Route>
      <Route path="/loginhelper">
        <LoginHelper />
      </Route>
      <Route path="/subscriptioncard/:doctorId">
        <SubscriptionCard />
      </Route>
      <Route path="/patient/:doctorId">
        <Patient />
      </Route>
      <Route path="/patientdata/:patientId">
        <PatientData />
      </Route>
      <Route path="/appointmentbookingsection/:doctorId">
        <AppointmentBookingSection />
      </Route>
      <Route path="/report/:doctorId">
        <Report />
      </Route>
      <Route path="/medicinelist/:doctorId">
       <MedicineList/>
      </Route>
      <Route path="/subscriptionconfirmation/:doctorId">
       <SubscriptionConfirmation/>
      </Route>
    </Switch>
  )
}
export default MainContainer;