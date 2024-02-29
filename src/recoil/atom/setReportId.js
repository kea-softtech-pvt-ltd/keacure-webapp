import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist"
const { persistAtom } = recoilPersist();

export const setReportsId = atom({
    key: "setReportsId",
    default: [],
    effects_UNSTABLE: [persistAtom]
});