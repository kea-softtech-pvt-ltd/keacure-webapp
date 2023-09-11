import {atom} from 'recoil';
import { recoilPersist } from "recoil-persist"
const { persistAtom  } = recoilPersist();
export const setNewPatientId = atom({
    key : "setNewPatientId",
    effects_UNSTABLE: [persistAtom ]
});