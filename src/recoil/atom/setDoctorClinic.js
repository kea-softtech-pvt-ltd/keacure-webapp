import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist"
const { persistAtom } = recoilPersist();

export const setDoctorClinic = atom({
    key: 'setDoctorClinic', // unique ID (with respect to other atoms/selectors)
    effects_UNSTABLE: [persistAtom],
    default: [] // default value (aka initial value)

});  