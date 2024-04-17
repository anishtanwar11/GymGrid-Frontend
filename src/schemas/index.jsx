import * as Yup from 'yup';

export const formSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required('Please enter your first name'),
    lastName: Yup.string().min(2).max(25).required('Please enter your last name'),
    userName: Yup.string().min(2).max(25).required("Please enter your username"),
    password: Yup.string().min(8).required('Please enter your password'),
    confirm_password: Yup.string().required().oneOf([Yup.ref("password"), null], "Password must matched"),
})