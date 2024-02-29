import {  selector  } from 'recoil';
import { setReportsId } from '../atom/setReportId';
export const reportIdState = selector({
  key: 'reportIdState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const reportId = get(setReportsId);
    return reportId;
  },
});
