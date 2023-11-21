import Header from "../components/Header/Header"
import Chat from "../components/Chat/Chat"

export default function ChatPage(){
    if(localStorage.getItem("logado") == "true"){
        return(
            <>
                <Header></Header>
                <Chat></Chat>
            </>
        )
    }
}