
import {  selector  } from 'recoil';
import {  setDoctorBooking  } from "../atom/setDoctorBooking";

export const doctorBookingState = selector({

    key: 'doctorIdState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const booking= get(setDoctorBooking);
      return booking;
    },

  });
