import axios from 'axios';
import { API } from '../config';
import { useRecoilState } from 'recoil';
import { setSubscription } from '../recoil/atom/setSubscription';

export default function ClinicApi() {
    const [subscibed, setSubscribed] = useRecoilState(setSubscription)
    
    const insertClinicData = async ({ newClinicData }) => {
        if (subscibed === true) {
            try {
                const result = await axios.post(`${API}/insertclinic`, newClinicData)
                return result
            }
            catch (err) {
                return err
            }
        } else {
            return null
        }
    }

    const getAllClinicsData = async ({ doctorId }) => {
        if (subscibed === true) {
            try {
                const result = await axios.get(`${API}/fetchclinic/${doctorId}`)
                return result.data
            }
            catch (err) {
                return err
            }
        } else {
            return null
        }
    }
    const insertOwnClinics = async (newClinicData) => {
        if (subscibed === true) {
            try {
                const result = await axios.post(`${API}/insertownclinic`, newClinicData)
                return result
            }
            catch (err) {
                return err
            }
        } else {
            return null
        }
    }

    const getAllOwnClinic = async ({ doctorId }) => {
        if (subscibed === true) {
            try {
                const result = await axios.get(`${API}/fetchownclinic/${doctorId}`)
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
        insertClinicData,
        getAllClinicsData,
        insertOwnClinics,
        getAllOwnClinic,
    }
}