import axios from "axios";
import { API } from "../config";

export default function EducationalApi() {
    const AddEducation = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/education`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const fetchAllEducations = async ({ doctorId }) => {
        try {
            const result = await axios.get(`${API}/fetchEduData/${doctorId}`);
            return result;
        }
        catch (err) {
            return err
        }
    }
    const fetchEditEducationData = async ({ EduId }) => {
        try {
            const result = await axios.get(`${API}/fetchEditEduData/${EduId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    }

    const deleteEducationData = async (id) => {
        try {
            const result = await axios.delete(`${API}/deleteeducation/${id}`)
            return result;
        }
        catch (err) {
            return err
        }
    }
    const fetchDrSpecialization = async () => {
        try {
            const result = await axios.get(`${API}/drspecialization`);
            return result.data
        }
        catch (err) {
            return err
        }
    }

    const fetchDrDegree = async () => {
        try {
            const result = await axios.get(`${API}/drdegrees`)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    return {
        AddEducation,
        fetchAllEducations,
        fetchEditEducationData,
        deleteEducationData,
        fetchDrSpecialization,
        fetchDrDegree,
    }
}