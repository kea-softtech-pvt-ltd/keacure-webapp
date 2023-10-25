import {  selector  } from 'recoil';
import {  setSubscription  } from "../atom/setSubscription";

export const doctorSubscription = selector({

    key: 'doctorSubscription', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const sub = get(setSubscription);
      return sub;
    },

  });
