import { AddDoctorClinicInfo } from "./Partial/AddDoctorClinicInfo";
// import { AddDoctorOwnClinicInfo } from "./Partial/addDoctorOwnClinicInfo";

function DoctorClinic(props) {

    return (
        <>
            <div className="">
                <AddDoctorClinicInfo  doctorId={props.doctorId} />

                {/* <AddDoctorOwnClinicInfo /> */}
            </div>


        </>
    )
}
export { DoctorClinic }