import axios from "axios";
import { API } from "../config";

export default function AppointmentsApi() {

    const getPatientListDetails = async ({ doctorId }, currentPage, pageSize) => {
        try {
            const result = await axios.get(`${API}/getBookingData/${doctorId}?page=${currentPage}&pageSize=${pageSize}`);
            console.log('--------------resultapi',result)
            return result.data;
        }
        catch (err) {
            return err
        }

    }
    const updateIncompleteStatus = async (patientAppointmentId, bodyData) => {
        try {
            const result = await axios.post(`${API}/updateIncompleteStatus/${patientAppointmentId}`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const UpdateStatusBookingdata = async ({ appointmentId }, bodyData) => {
        try {
            const result = await axios.post(`${API}/updateStatus/${appointmentId}`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }

    }
    const createPDF = async ({ reportId }) => {
        try {
            const result = await axios.post(`${API}/createprescriptionpdf/${reportId}`)
            return result.data
        }
        catch (err) {
            return err
        }

    };
    const downloadPrescription = async (reportId) => {
        try {
            const result = await axios.get(`${API}/download-prescription/${reportId}`);
            return result.data;
        }
        catch (err) {
            return err
        }

    }
    const cancelPatientAppointment = async (id) => {
        try {
            const result = await axios.delete(`${API}/cancelappointment/${id}`)
            return result
        }
        catch (err) {
            return err
        }

    }

    return {
        getPatientListDetails,
        UpdateStatusBookingdata,
        createPDF,
        downloadPrescription,
        cancelPatientAppointment,
        updateIncompleteStatus
    }
}

