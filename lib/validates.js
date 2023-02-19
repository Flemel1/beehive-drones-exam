import * as Yup from "yup"

const loginForm = {
  initialValue: {
    email: "",
    password: "",
  },
  validationSchema: Yup.object({
    email: Yup.string().email().required(),
    password: Yup.number().positive().integer().required(),
  }),
  validate: (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = "Email Required"
    }

    if (!values.password) {
      errors.password = "Password Required"
    }

    return errors
  },
}

const createPositionForm = {
  initialValues: {
    code: "",
    name: "",
  },
  validationSchema: Yup.object({
    code: Yup.string("Code is Empty").required(),
    name: Yup.string("Name is Empty").matches(/^\D+$/, "Name must be alphabet input").required(),
  }),
}

const createEmployeeForm = {
  initialValues: {
    nik: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    position_id: "",
  },
  validationSchema: Yup.object({
    nik: Yup.string()
      .min(16)
      .max(16)
      .matches(/^\d+$/, "NIK must be digit input")
      .required(),
    name: Yup.string().matches(/^\D+$/, "Name must be alphabet input").required(),
    address: Yup.string().required(),
    phone: Yup.string()
      .min(10)
      .max(12)
      .matches(/^\d+$/, "Phone Number must be digit input")
      .required(),
    email: Yup.string().email().required(),
    position_id: Yup.string().required("Select Position"),
  }),
}

const createSalaryForm = {
  initialValues: {
    basic_sallary: "",
    allowance: "",
    notes: "",
    employee_id: ""
  },
  validationSchema: Yup.object({
    basic_sallary: Yup.string()
      .matches(/^\d+$/, "Salary must be digit input")
      .required(),
    allowance: Yup.string()
      .matches(/^\d+$/, "Allowance must be digit input")
      .required(),
    notes: Yup.string().required(),
    employee_id: Yup.string().required("Select Employee"),
  }),
}

export { loginForm, createEmployeeForm, createPositionForm, createSalaryForm }
