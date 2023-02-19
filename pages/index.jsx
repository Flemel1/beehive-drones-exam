import Helmet from "@/components/Helmet"
import EmployeePage from "@/components/pages/EmployeePage"
import PostionPage from "@/components/pages/PositionPage"
import SalaryPage from "@/components/pages/SalaryPage"

import Sidebar from "@/components/Sidebar"
import { useState } from "react"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const pages = [<PostionPage />, <EmployeePage />, <SalaryPage />]
  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <>
      <Helmet />
      <div className="min-h-screen flex">
        <Sidebar onPageChange={handleChangePage} currentPage={currentPage} />
        {pages[currentPage]}
      </div>
    </>
  )
}
