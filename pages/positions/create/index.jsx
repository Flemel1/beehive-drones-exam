import Helmet from "@/components/Helmet"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { createPositionForm } from "@/lib/validates"
import axios from "axios"
import { useRouter } from "next/router"

function CreatePositionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const formik = useFormik({
    initialValues: createPositionForm.initialValues,
    validationSchema: createPositionForm.validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const { code, name } = values
        const token = JSON.parse(
          localStorage.getItem("beehive_drone_user")
        ).token
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/positions/create`,
          {
            code,
            name,
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("beehive_drone_user"))
    if (user == null) {
      router.push('/login')
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
          <input
            className="p-2 text-black border-2 border-black rounded-md focus:outline-none focus:border-2 focus:border-sky-500"
            type="text"
            name="code"
            placeholder="Example Code: 002"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
          />
          {formik.touched.code && formik.errors.code ? (
            <div className="text-red-600">{formik.errors.code}</div>
          ) : null}
          <input
            className="p-2 text-black border-2 border-black rounded-md focus:outline-none focus:border-2 focus:border-sky-500"
            type="text"
            name="name"
            placeholder="Example Name: Manager"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-600">{formik.errors.name}</div>
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

export default CreatePositionPage
