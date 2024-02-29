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
import { setDoctorId } from "./recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import { Redirect, useLocation } from "react-router-dom/cjs/react-router-dom.min";

function MainContainer() {
  const [doctorId, sestDoctorId] = useRecoilState(setDoctorId);
  const location = useLocation()
  return (
    <Switch>
      <Route path="doctor/doctordetail/:doctorId">
        <DoctorDetail />
      </Route>

      <Route path="/updatesessiontime/:doctorId/:clinicId/:ItemId">
        {doctorId ? <SetUpdateTime /> : <Redirect to="/" />}
      </Route>

      <Route path="/doctorprofile/:doctorId">
        {doctorId ? <DoctorProfile /> : <Redirect to="/" />}
      </Route>

      <Route path="/calender/:doctorId">
        {doctorId ? < Calender /> : <Redirect to="/" />}
      </Route>

      <Route exact path="/">
        <LoginDoctor />
      </Route>

      <Route path="/editdoctorprofile/:doctorId">
        <div >
          {doctorId ? <EditDoctorProfile /> : <Redirect to="/" />}
        </div>
      </Route>

      <Route path="/appointments/consultation/:reportId">
        {doctorId ? <PatientMedicalReport /> : <Redirect to="/" />}
      </Route>

      <Route path="/history/medicalreport/:reportId">
        {doctorId ? <ViewMedicalReport /> : <Redirect to="/" />}
      </Route>

      <Route path="/dashboard/:doctorId">
        {doctorId ? <Dashboard /> : <Redirect to="/" />}
      </Route>

      <Route path="/subscription/:doctorId">
        {doctorId ? <Subscription /> : <Redirect to="/" />}
      </Route>

      <Route path="/medicinehistory">
        {doctorId ? <MedicineHistory /> : <Redirect to="/" />}
      </Route>

      <Route path="/patientspaymenthistory/:doctorId">
        {doctorId ? < PatientsPaymentHistory /> : <Redirect to="/" />}
      </Route>

      <Route path="/history/:doctorId">
        {doctorId ? < PatientsClinicHistory /> : <Redirect to="/" />}
      </Route>

      <Route path="/createpatientprofile/:patientId">
        {doctorId ? < CreatePatientProfile /> : <Redirect to="/" />}
      </Route>

      <Route path="/getloginpatientprofile/:patientId">
        {doctorId ? < GetLoginPatientProfile /> : <Redirect to="/" />}
      </Route>

      <Route path="/user">
        {doctorId ? < User /> : <Redirect to="/" />}
      </Route>

      <Route path="/logout">
        < Logout />
      </Route>

      <Route path="/helper/:doctorId">
        {doctorId ? <Helper /> : <Redirect to="/" />}
      </Route>

      <Route path="/edithelper/:helperId">
        {doctorId ? <EditHelper /> : <Redirect to="/" />}
      </Route>

      <Route path="/loginhelper">
        {doctorId ? <LoginHelper /> : <Redirect to="/" />}
      </Route>

      <Route path="/subscriptions/update/:doctorId">
        {doctorId ? <SubscriptionCard /> : <Redirect to="/" />}
      </Route>

      <Route path="/appointments/:doctorId">
        {doctorId ? <Patient /> : <Redirect to="/" />}
      </Route>

      <Route path="/patientdata/:patientId">
        {doctorId ? <PatientData /> : <Redirect to="/" />}
      </Route>

      <Route path="/appointmentbookingsection/:patientId">
        {doctorId ? <AppointmentBookingSection /> : <Redirect to="/" />}
      </Route>

      <Route path="/report/:doctorId">
        <div>
          {doctorId ? <Report /> : <Redirect to="/" />}
        </div>
      </Route>

      <Route path="/medicinelist/:doctorId">
        {doctorId ? <MedicineList /> : <Redirect to="/" />}
      </Route>

      <Route path="/subscriptionconfirmation/:doctorId">
        {doctorId ? <SubscriptionConfirmation /> : <Redirect to="/" />}
      </Route>

    </Switch>
  )
}
export default MainContainer;