import Helmet from "@/components/Helmet"
import { createEmployeeForm } from "@/lib/validates"
import axios from "axios"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import shortid from "shortid"

function CreateEmployeePage() {
  const router = useRouter()
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const formik = useFormik({
    initialValues: createEmployeeForm.initialValues,
    validationSchema: createEmployeeForm.validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const { nik, name, address, email, phone, position_id } = values
        const token = JSON.parse(
          localStorage.getItem("beehive_drone_user")
        ).token
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/employees/create`,
          {
            nik,
            name,
            address,
            email,
            phone,
            position_id: position_id,
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

  const fetchPositions = async (controller) => {
    try {
      const user = JSON.parse(localStorage.getItem("beehive_drone_user"))
      if (user == null) {
        router.push("/login")
      } else {
        const token = user.token
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/positions`,
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
    fetchPositions(controller)
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
            name="position_id"
            value={formik.values.position_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Position</option>
            {options.map((option) => {
              if (option.name != null && option.name != "")
                return (
                  <option key={shortid.generate()} value={option._id}>
                    {option.name}
                  </option>
                )
            })}
          </select>
          {formik.touched.position_id && formik.errors.position_id ? (
            <div className="text-red-600">{formik.errors.position_id}</div>
          ) : null}
          <input
            className="p-2 text-black border-2 border-black rounded-md focus:outline-none focus:border-2 focus:border-sky-500"
            type="text"
            name="nik"
            placeholder="Example NIK: 2141354353524561"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nik}
          />
          {formik.touched.nik && formik.errors.nik ? (
            <div className="text-red-600">{formik.errors.nik}</div>
          ) : null}
          <input
            className="p-2 text-black border-2 border-black rounded-md focus:outline-none focus:border-2 focus:border-sky-500"
            type="text"
            name="email"
            placeholder="Example Email: hrd@mail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}
          <input
            className="p-2 text-black border-2 border-black rounded-md focus:outline-none focus:border-2 focus:border-sky-500"
            type="text"
            name="name"
            placeholder="Example Name: Budiman"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-600">{formik.errors.name}</div>
          ) : null}
          <input
            className="p-2 text-black border-2 border-black rounded-md focus:outline-none focus:border-2 focus:border-sky-500"
            type="text"
            name="phone"
            placeholder="Example Phone: 08123456789"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-600">{formik.errors.phone}</div>
          ) : null}
          <input
            className="p-2 text-black border-2 border-black rounded-md focus:outline-none focus:border-2 focus:border-sky-500"
            type="text"
            name="address"
            placeholder="Example Address: Jl. Buntu"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="text-red-600">{formik.errors.address}</div>
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

export default CreateEmployeePage
