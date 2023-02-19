import Helmet from "@/components/Helmet"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { createSalaryForm } from "@/lib/validates"
import axios from "axios"
import { useRouter } from "next/router"
import shortid from "shortid"

function CreateSalaryPage() {
  const router = useRouter()
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const formik = useFormik({
    initialValues: createSalaryForm.initialValues,
    validationSchema: createSalaryForm.validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const {
          allowance,
          basic_sallary: basicSallary,
          notes,
          employee_id,
        } = values
        const token = JSON.parse(
          localStorage.getItem("beehive_drone_user")
        ).token
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/sallarys/create`,
          {
            allowance,
            basic_sallary: basicSallary,
            notes,
            payday: Date.now(),
            employee_id: employee_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (res.status == 200) {
          setIsLoading(false)
          router.push("/")
        }
      } catch (error) {
        if (error.response.status == 401) {
          setIsLoading(true)
          router.push("/login")
        } else {
          setIsLoading(true)
          setErrorMessage(error.response.data.message)
        }
      }
    },
  })

  const fetchEmployees = async (controller) => {
    try {
      const user = JSON.parse(localStorage.getItem("beehive_drone_user"))
      if (user == null) {
        router.push("/login")
      } else {
        const token = user.token
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/employees`,
          {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (res.status == 200) {
          setOptions(res.data.data)
        }
      }
    } catch (error) {
      if (error.response.status == 401) {
        router.push("/login")
      } else {
        console.log(error.response)
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchEmployees(controller)
    return () => {
      controller.abort()
    }
  }, [])
  return (
    <>
      <Helmet />
      <div className="w-3/4 m-auto">
        <h1 className="my-4 text-3xl text-center font-bold">
          Create Employee Form
        </h1>
        {errorMessage && (
          <div className="my-4 text-red-600 font-bold">{errorMessage}</div>
        )}
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <select
            className="p-2 border-2 border-black rounded-md focus:outline-none focus:border-2 focus:border-sky-500"
            name="employee_id"
            value={formik.values.employee_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Position</option>
            {options.map((option) => {
              if (option.name != null && option.name != "" && option.nik != "")
                return (
                  <option key={shortid.generate()} value={option._id}>
                    {option.name}
                  </option>
                )
            })}
          </select>
          {formik.touched.employee_id && formik.errors.employee_id ? (
            <div className="text-red-600">{formik.errors.employee_id}</div>
          ) : null}
          <input
            className="p-2 text-black border-2 border-black rounded-md focus:outline-none focus:border-2 focus:border-sky-500"
            type="text"
            name="basic_sallary"
            placeholder="Example Basic Salary: 10000000"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.basic_sallary}
          />
          {formik.touched.basic_sallary && formik.errors.basic_sallary ? (
            <div className="text-red-600">{formik.errors.basic_sallary}</div>
          ) : null}
          <input
            className="p-2 text-black border-2 border-black rounded-md focus:outline-none focus:border-2 focus:border-sky-500"
            type="text"
            name="allowance"
            placeholder="Example Allowance: 10000000"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.allowance}
          />
          {formik.touched.allowance && formik.errors.allowance ? (
            <div className="text-red-600">{formik.errors.allowance}</div>
          ) : null}
          <input
            className="p-2 text-black border-2 border-black rounded-md focus:outline-none focus:border-2 focus:border-sky-500"
            type="text"
            name="notes"
            placeholder="Example Notes: This is Note"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.notes}
          />
          {formik.touched.notes && formik.errors.notes ? (
            <div className="text-red-600">{formik.errors.notes}</div>
          ) : null}
          {isLoading ? (
            <p className="text-black">Loading...</p>
          ) : (
            <button
              className="p-2 rounded-md text-white text-lg bg-black focus:bg-sky-500"
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  )
}

export default CreateSalaryPage
