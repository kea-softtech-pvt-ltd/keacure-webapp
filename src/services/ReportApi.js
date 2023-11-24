import axios from 'axios';
import { API } from '../config';

export default function ReportApi() {

    const MedicineReportData = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/medicine_report`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const insertPatientVitalSignsData = async ({ reportId }, bodyData) => {
        try {
            const result = await axios.post(`${API}/add_vital_signs/${reportId}`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }

    };
    const insertSymptoms = async ({ reportId }, bodyData) => {
        try {
            const result = await axios.post(`${API}/add_symptoms/${reportId}`, bodyData)
            return result
        }
        catch (err) {
            return err
        }

    };
    const insertSymptom_masterTable = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/addsymptoms`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    };
    const symptomsData = async () => {
        try {
            const result = await axios.get(`${API}/fetchsymptoms`)
            return result.data
        }
        catch (err) {
            return err
        }

    }

    const getMedicine = async () => {
        try {
            const result = await axios.get(`${API}/fetchmedicines`)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const insertNewFollowUpDate = async ({ reportId }, bodyData) => {
        try {
            const result = await axios.post(`${API}/new_follw_up_date/${reportId}`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }

    };
    const insertInvestigationNote = async ({ reportId }, bodyData) => {
        try {
            const result = await axios.post(`${API}/add_investigation_note/${reportId}`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }

    };
    const insertPremedicationNote = async ({ reportId }, bodyData) => {
        try {
            const result = await axios.post(`${API}/add_premedication_note/${reportId}`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    };
    const getMedicineReport = async ({ reportId }) => {
        try {
            const result = await axios.get(`${API}/fetchMedicalReport/${reportId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };
    const getMedicinePrescriptionData = async (reportId) => {
        try {
            const result = await axios.get(`${API}/fetchmedicinePrescription/${reportId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };
    const insertMedicinePrescriptionData = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/add_medicinePrescription`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    };
    const getLabTestPrescriptionData = async ({ reportId }) => {
        try {
            const result = await axios.get(`${API}/fetch_LabTest_Prescription/${reportId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const insertLabPrescriptionData = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/add_Labprescription`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const getLabData = async () => {
        try {
            const result = await axios.get(`${API}/fetch_lab_test`)
            return result.data
        }
        catch (err) {
            return err
        }
    }

    return {
        MedicineReportData,
        insertPatientVitalSignsData,
        insertSymptoms,
        insertSymptom_masterTable,
        symptomsData,
        getMedicine,
        insertNewFollowUpDate,
        insertInvestigationNote,
        insertPremedicationNote,
        insertMedicinePrescriptionData,
        insertLabPrescriptionData,
        getMedicinePrescriptionData,
        getLabTestPrescriptionData,
        getMedicineReport,
        getLabData
    }
}