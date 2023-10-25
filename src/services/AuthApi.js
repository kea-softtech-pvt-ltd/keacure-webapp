import axios from 'axios';
import { API } from '../config';
import { useRecoilState } from 'recoil';
import { setSubscription } from '../recoil/atom/setSubscription';

export default function AuthApi() {
    const [subscibed, setSubscribed] = useRecoilState(setSubscription)
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
            setSubscribed(result.data.isSubscribed)
            return result;
        }
        catch (err) {
            return err
        }
    };

    const addDoctorInformation = async ({ doctorId }) => {
        if (subscibed === true) {
            try {
                const result = await axios.get(`${API}/fetchData/${doctorId}`);
                return result.data;
            }
            catch (err) {
                return err
            }
        } else {
            return null
        }
    };

    const submitDoctorInformation = async ({ doctorId, bodyData }) => {
        if (subscibed === true) {
            try {
                const result = await axios.post(`${API}/insertPersonalInfo/${doctorId}`, bodyData)
                return result
            }
            catch (err) {
                return err
            }
        } else {
            return null
        }
    }

    const getDrInfo = async ({ doctorId }) => {
        if (subscibed === true) {
            try {
                const result = await axios.get(`${API}/doctor/${doctorId}`);
                return result.data;
            }
            catch (err) {
                return err
            }
        } else {
            return null
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