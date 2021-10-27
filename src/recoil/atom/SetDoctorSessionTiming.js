import { atom } from 'recoil';

export const SetDoctorSessionTiming= atom({
    key: 'SetDoctorSessionTiming', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  