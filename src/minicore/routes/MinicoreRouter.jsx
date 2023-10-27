import { Navigate, Route, Routes } from "react-router-dom"
import { SalesPage } from "../pages/SalesPage"
import { CreateSale } from "../pages/CreateSale"

export const MinicoreRouter = () => {
  return (
    <Routes>
      <Route path='/' element={ <SalesPage /> }/>
      <Route path='/createSale' element={ <CreateSale /> }/>
      <Route path='/*' element={ <Navigate to='/' /> }/>
    </Routes>
  )
}