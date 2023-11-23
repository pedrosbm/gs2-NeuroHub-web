import Header from "../components/Header/Header"
import { Navigate } from "react-router-dom"
import Exams from "../components/Chat/Exams"
import Footer from "../components/Footer/Footer"

export default function ChatPage(){
    if(localStorage.getItem("logado") == "true"){
        return(
            <>
                <Header></Header>
                <Exams></Exams>
                <Footer></Footer>
            </>
        )
    } else  {
        return <Navigate to='/Cadastro' />
    }
}