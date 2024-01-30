import axios from 'axios';
import { API } from '../config';

export default function AuthApi() {
    const login = async ({ mobile }) => {
        try {
            const result = await axios.post(`${API}/loginotp`, { mobile })
            return result;
        }
        catch (err) {
            return err
        }
    };

    const loginOtp = async ({ getOTP, _id }) => {
        try {
            const result = await axios.post(`${API}/otp`, { getOTP, _id });
            return result;
        }
        catch (err) {
            return err
        }
    };

    const addDoctorInformation = async ({ doctorId }) => {
         
            try {
                const result = await axios.get(`${API}/fetchData/${doctorId}`);
                return result.data;
            }
            catch (err) {
                return err
            }
      
    };

    const submitDoctorInformation = async ({ doctorId, bodyData }) => {
     
            try {
                const result = await axios.post(`${API}/insertPersonalInfo/${doctorId}`, bodyData)
                return result
            }
            catch (err) {
                return err
            }
        
    }

    const getDrInfo = async ({ doctorId },currentPage, pageSize) => {
        try {
            const result = await axios.get(`${API}/doctor/${doctorId}?page=${currentPage}&pageSize=${pageSize}`);
            return result.data;
        }
        catch (err) {
            return err
        }
    }

    return {
        login,
        loginOtp,
        addDoctorInformation,
        submitDoctorInformation,
        getDrInfo
    }
}