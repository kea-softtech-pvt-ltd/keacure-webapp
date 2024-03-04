import { Outlet, Route, Routes, redirect } from "react-router-dom";
import DoctorDetail from "./doctor/Dashboard-card/DoctorDetail";
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

  return (
    <Routes>
      <Route path="/" element={<LoginDoctor />} />

      <Route path="/dashboard/:doctorId" element={doctorId ? <Dashboard /> : redirect("/")} />

      <Route path="/doctorprofile/:doctorId" element={doctorId ? <DoctorProfile /> : redirect("/")}>
        <Route index path="edit" element={doctorId ? <EditDoctorProfile /> : redirect("/")} />
      </Route>

      <Route path="/appointments/:doctorId" element={doctorId ? <Patient /> : redirect("/")}  >
        {/* <Route path="consultation/:reportId" element={doctorId ? <PatientMedicalReport /> : redirect("/")} /> 
          <Route path="getloginpatientprofile/:patientId" element={doctorId ? < GetLoginPatientProfile /> : redirect("/")} />
          <Route path="appointmentbookingsection/:patientId" element={doctorId ? <AppointmentBookingSection /> : redirect("/")} />
          <Route path="createpatientprofile/:patientId" element={doctorId ? < CreatePatientProfile /> : redirect("/")} />
          <Route path="patientdata/:patientId" element={doctorId ? <PatientData /> : redirect("/")}/> */}
      </Route>

      <Route path="/history/:doctorId" element={doctorId ? < PatientsClinicHistory /> : redirect("/")}>
        {/* <Route path="medicalreport/:reportId" element={doctorId ? <ViewMedicalReport /> : redirect("/")} /> */}
      </Route>

      <Route path="/subscription/:doctorId" element={doctorId ? <Subscription /> : redirect("/")}>
        {/* <Route path="update" element={doctorId ? <SubscriptionCard /> : redirect("/")} />
            <Route path="confirmation" element={doctorId ? <SubscriptionConfirmation /> : redirect("/")}/> */}
      </Route>

      <Route path="/helper/:doctorId" element={doctorId ? <Helper /> : redirect("/")}>
        {/* <Route path="edit" element={doctorId ? <EditHelper /> : redirect("/")} />
           <Route path="login" element={doctorId ? <LoginHelper /> : redirect("/")} /> */}
      </Route>

      <Route path="/calender/:doctorId" element={doctorId ? < Calender /> : redirect("/")} />

      <Route path="/medicinelist/:doctorId" element={doctorId ? <MedicineList /> : redirect("/")} />

      <Route path="/logout" element={< Logout />} />

      {/* single route */}
      <Route path="/consultation/:reportId" element={doctorId ? <PatientMedicalReport /> : redirect("/")} ></Route>
      <Route path="/createpatientprofile/:patientId" element={doctorId ? < CreatePatientProfile /> : redirect("/")}></Route>
      <Route path="/getloginpatientprofile/:patientId" element={doctorId ? < GetLoginPatientProfile /> : redirect("/")}></Route>
      <Route path="/appointmentbookingsection/:patientId" element={doctorId ? <AppointmentBookingSection /> : redirect("/")}></Route>
      <Route path="/patientdata/:patientId" element={doctorId ? <PatientData /> : redirect("/")} />

      <Route path="/history/medicalreport/:reportId" element={doctorId ? <ViewMedicalReport /> : redirect("/")}></Route>

      <Route path="/edithelper/:helperId" element={doctorId ? <EditHelper /> : redirect("/")} />
      <Route path="/loginhelper" element={doctorId ? <LoginHelper /> : redirect("/")} />

      <Route path="/subscriptions/update/:doctorId" element={doctorId ? <SubscriptionCard /> : redirect("/")}></Route>
      <Route path="/subscriptionconfirmation/:doctorId" element={doctorId ? <SubscriptionConfirmation /> : redirect("/")}> </Route>

    </Routes>
  )
}
export default MainContainer;