import axios from 'axios';
import { API } from '../config';

export default function SessionApi() {
    const allSessions = async (dataId) => {
        try{
            const result = await axios.post(`${API}/fetchtime`, dataId)
            return result.data;
        }
      catch(err){
        return err
      }
    }
    const setSessionTimeData = async (setTimeData) => {
        const result = await axios.post(`${API}/setSession`, setTimeData)
        return result
    }
    const deleteSlot = async (slotId) => {
        const result = await axios.delete(`${API}/deleteSlots/${slotId}`)
        return result
    }
    const getUpdatedSessionSlotData = async ({  _id }) => {
        const result = await axios.get(`${API}/fetchsetSession/${_id}`)
        return result.data
    };
    const updateSessionData = async (_id, setTimeData) => {
        const result = await axios.post(`${API}/setSession/${_id}`, setTimeData)
        return result.data
    }
    // const setUpdateTimeData = async ({ doctorId, clinicId, _id }, setTimeData) => {
    //     const result = await axios.post(`${API}/setSession/${doctorId}/${clinicId}/${_id}`, setTimeData)
    //     return result
    // }
    return {
        allSessions,
        setSessionTimeData,
        deleteSlot,
        getUpdatedSessionSlotData,
        updateSessionData
    }
}