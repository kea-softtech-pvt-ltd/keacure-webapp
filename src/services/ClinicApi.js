import axios from 'axios';
import { API } from '../config';

export default function ClinicApi() {
    
    const insertClinicData = async ({ newClinicData }) => {
            try {
                const result = await axios.post(`${API}/insertclinic`, newClinicData)
                return result
            }
            catch (err) {
                return err
            }
    
    }

    const getAllClinicsData = async ({ doctorId }) => {
            try {
                const result = await axios.get(`${API}/fetchclinic/${doctorId}`)
                return result.data
            }
            catch (err) {
                return err
            }
     
    }
    const insertOwnClinics = async (newClinicData) => {
            try {
                const result = await axios.post(`${API}/insertownclinic`, newClinicData)
                return result
            }
            catch (err) {
                return err
            }
        
    }

    const getAllOwnClinic = async ({ doctorId }) => {
            try {
                const result = await axios.get(`${API}/fetchownclinic/${doctorId}`)
                return result.data;
            }
            catch (err) {
                return err
            }
        
    }
    const getServicess = async () => {
        try {
            const result = await axios.get(`${API}/clinicservicess`)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    return {
        insertClinicData,
        getAllClinicsData,
        insertOwnClinics,
        getAllOwnClinic,
        getServicess
    }
}