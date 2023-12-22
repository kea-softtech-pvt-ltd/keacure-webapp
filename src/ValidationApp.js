import * as Yup from 'yup'

export const ValidationApp = Yup.object({
    timeSlot: Yup.required('Please Select Fees'),
    fees: Yup.required('Please Select Fees')
})