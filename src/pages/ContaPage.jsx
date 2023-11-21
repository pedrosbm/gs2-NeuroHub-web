import Header from "../components/Header/Header"
import Conta from '../components/Conta/Conta'
import { Navigate } from "react-router-dom"

export default function ContaPage() {

    if (localStorage.getItem("logado") == "true") {
        return (
            <>
                <Header></Header>
                <Conta></Conta>
            </>
        )
    } else  {
        return(
            <Navigate to='/Cadastro'></Navigate>
        )
    }
}