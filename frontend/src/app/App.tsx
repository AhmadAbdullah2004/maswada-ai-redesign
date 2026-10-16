import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "@/app/layout/AppLayout"
import { HomePage } from "@/app/pages/HomePage"
import { NotFoundPage } from "@/app/pages/NotFoundPage"
import { SignInPage } from "./pages/SignInPage"
import { SignUpPage } from "./pages/SignUp"
import {Notepage} from "./pages/Notepage"
import RoutsProtection from "@/components/common/RoutsProtection"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route element={<RoutsProtection><AppLayout /></RoutsProtection>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes/:id" element={<Notepage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
