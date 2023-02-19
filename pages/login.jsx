import Helmet from "@/components/Helmet"
import { loginForm } from "@/lib/validates"
import axios from "axios"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

function LoginPage() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("")
  const formik = useFormik({
    initialValues: loginForm.initialValue,
    validationSchema: loginForm.validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            email: email,
            password: password,
          }
        )
        if (res.status == 200) {
          localStorage.setItem(
            "beehive_drone_user",
            JSON.stringify(res.data.data)
          )
          router.push("/")
        }
      } catch (error) {
        if (error.response.status == 400) {
          setErrorMessage(error.response.data.message)
        }
        if (error.response.status == 404) {
          setErrorMessage(error.response.data.message)
        } else {
          setErrorMessage(error.response.data.message)
        }
      }
    },
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("beehive_drone_user"))
    if (user) {
      router.push("/")
    }
  }, [])

  return (
    <>
      <Helmet />
      <div className="min-h-screen">
        <div className="lg:w-[25vw] lg:m-auto p-8 lg:relative lg:top-[20vh] sm:w-3/4 sm:m-auto sm:relative sm:top-[15vh] text-white bg-primary rounded-xl">
          <h1 className="mb-8 text-3xl font-bold text-center">Login</h1>
          {errorMessage && (
            <div className="text-red-600 font-bold">{errorMessage}</div>
          )}
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Email</label>
            <input
              className="p-2 text-black outline-transparent rounded-md"
              type="email"
              name="email"
              id="email"
              placeholder="Fill Your Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600">{formik.errors.email}</div>
            ) : null}
            <label htmlFor="password">Password</label>
            <input
              className="p-2 text-black outline-transparent rounded-md"
              type="password"
              name="password"
              id="password"
              placeholder="Fill Your Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600">{formik.errors.password}</div>
            ) : null}
            <button
              className="p-2 rounded-md text-white text-lg bg-black"
              type="submit"
            >
              Login
            </button>
            {/* {isLoading === false ? (
              <button
                className="p-2 rounded-md text-white text-lg bg-black"
                type="submit"
              >
                Login
              </button>
            ) : (
              <p className="text-white">Loading...</p>
            )} */}
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
