import {
  Route,
  Routes,
  redirect
} from "react-router-dom";
import LoginDoctor from "./doctor/Profile/LoginDoctor";
import DoctorProfile from "./doctor/Profile/DoctorProfile";
import EditDoctorProfile from "./doctor/Profile/EditDoctorProfile";
import Dashboard from './doctor/Dashboard-card/Dashboard';
import PatientMedicalReport from "./doctor/Report/PatientMedicalReport";
import PatientsClinicHistory from "./doctor/Dashboard-card/PatientsClinicHistory";
import CreatePatientProfile from "./patient/createPatientProfile";
import GetLoginPatientProfile from "./patient/getLoginPatientProfile";
import Calender from './doctor/Dashboard-card/Calender';
import ViewMedicalReport from './doctor/Report/ViewMedicalReport';
import Logout from "./doctor/Profile/LogoutForm";
import Subscription from "./doctor/Profile/Subscription";
import LoginHelper from "./doctor/Profile/LoginHelper";
import SubscriptionCard from "./doctor/Dashboard-card/SubscriptionCard";
import Helper from "./doctor/helper/Helper";
import EditHelper from './doctor/helper/EditHelper';
import Patient from "./patient/patient";
import { AppointmentBookingSection } from "./patient/appointmentBookingSection";
import PatientData from "./doctor/Dashboard-card/partial/patientData";
import MedicineList from "./doctor/Dashboard-card/MedicineList";
import SubscriptionConfirmation from "./doctor/Dashboard-card/subscriptionConfirmation";
import { setDoctorId } from "./recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";

function MainContainer() {
  const [doctorId, sestDoctorId] = useRecoilState(setDoctorId);
  console.log("doctorId--------", doctorId)

  return (
    <Routes>
      <Route path="/" element={<LoginDoctor />} />
      <Route path="/subscriptions/:doctorId" element={doctorId ? <Subscription /> : redirect("/")} />
      <Route path="/dashboard/:doctorId" element={doctorId ? <Dashboard /> : redirect("/")} />

      {/* doctor profile */}
      <Route path="/profile/:doctorId">
        <Route index element={doctorId ? <DoctorProfile /> : redirect("/")} />
        <Route path="edit" element={doctorId ? <EditDoctorProfile /> : redirect("/")} />
      </Route>

      {/* Appointments */}
      <Route path="/appointments/:doctorId" >
        <Route index element={doctorId ? <Patient /> : redirect("/")} />
        <Route path="consultation/:reportId" element={doctorId ? <PatientMedicalReport /> : redirect("/")} />
        <Route path="patientprofile/:patientId">
          <Route index element={doctorId ? < GetLoginPatientProfile /> : redirect("/")} />
          <Route path="booking/:patientId" element={doctorId ? <AppointmentBookingSection /> : redirect("/")} />
        </Route>
        <Route path="createprofile/:patientId" element={doctorId ? < CreatePatientProfile /> : redirect("/")} />
        <Route path="patientdata/:patientId" element={doctorId ? <PatientData /> : redirect("/")} />
      </Route>

      {/* Appointments history */}
      <Route path="/history/:doctorId" >
        <Route index element={doctorId ? < PatientsClinicHistory /> : redirect("/")} />
        <Route path="report/:reportId" element={doctorId ? <ViewMedicalReport /> : redirect("/")} />
      </Route>

      {/* calender */}
      <Route path="/calender/:doctorId" element={doctorId ? < Calender /> : redirect("/")} />

      {/* subscription */}
      <Route path="/subscription/:doctorId">
        <Route index element={doctorId ? <SubscriptionCard /> : redirect("/")} />
        <Route path="confirm" element={doctorId ? <SubscriptionConfirmation /> : redirect("/")} />
      </Route>

      {/* Assistant */}
      <Route path="/helper/:doctorId">
        <Route index element={doctorId ? <Helper /> : redirect("/")} />
        <Route path="update/:helperId" element={doctorId ? <EditHelper /> : redirect("/")} />
      </Route>

      {/* medicine List */}
      <Route path="/medicinelist/:doctorId" element={doctorId ? <MedicineList /> : redirect("/")} />

      <Route path="/logout" element={< Logout />} />
      <Route path="/helperlogin" element={<LoginHelper />} />
    </Routes>
  )
}
export default MainContainer;