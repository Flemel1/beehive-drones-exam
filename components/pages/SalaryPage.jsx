import Table from "@/components/Table"
import { calculateRange } from "@/lib/helpers"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

function SalaryPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [data, setData] = useState({
    headers: [],
    data: [],
    range: [],
  })

  const handlePagination = (selectedPage) => {
    setPage(selectedPage)
  }

  const onDelete = async (salary) => {
    try {
      const controller = new AbortController()
      const token = JSON.parse(localStorage.getItem("beehive_drone_user")).token
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/sallarys/delete/${salary["_id"]}`,
        {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
    console.log(salary)
  }

  const fetchData = async (controller) => {
    try {
      const user = JSON.parse(localStorage.getItem("beehive_drone_user"))
      if (user == null) {
        router.push("/login")
      } else {
        const token = user.token
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sallarys/paging/${page}/10`,
          {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (res.status == 200) {
          const range = calculateRange(res.data.data.total, 10)
          setData({
            data: res.data.data.results,
            headers: ["basic_sallary", "allowance", "employee_id.name"],
            range: range,
          })
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
    fetchData(controller)
    return () => {
      controller.abort()
    }
  }, [page])
  return (
    <div className="w-[80%] relative left-[20%]">
      <Link href="/salaries/create">
        <button className="h-[40px] w-[200px] m-4 text-white bg-sky-600 rounded-xl">
          Create Salary
        </button>
      </Link>
      <Table
        headers={data.headers}
        data={data.data}
        range={data.range}
        page={page}
        handlePagination={handlePagination}
        handleDelete={onDelete}
      />
    </div>
  )
}

export default SalaryPage
