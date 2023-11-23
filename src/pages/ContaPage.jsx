import Header from "../components/Header/Header"
import Conta from '../components/Conta/Conta'
import { Navigate } from "react-router-dom"
import Footer from "../components/Footer/Footer"

export default function ContaPage() {

    if (localStorage.getItem("logado") == "true") {
        return (
            <>
                <Header></Header>
                <Conta></Conta>
                <Footer></Footer>
            </>
        )
    } else  {
        return(
            <Navigate to='/Cadastro'></Navigate>
        )
    }
}