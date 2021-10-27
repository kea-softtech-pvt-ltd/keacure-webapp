import {  selector  } from 'recoil';
import {  setPatientId } from '../atom/setPatientId'

export const patientIdState = selector({
  key: 'patientIdState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const PatientId = get(setPatientId);
    return PatientId;
  },
});
