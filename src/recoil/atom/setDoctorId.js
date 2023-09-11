import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist"
const { persistAtom } = recoilPersist();
export const setDoctorId = atom({
    key: 'setDoctorId', // unique ID (with respect to other atoms/selectors)
    default: [],
    effects_UNSTABLE: [persistAtom]
    // default value (aka initial value)
});  