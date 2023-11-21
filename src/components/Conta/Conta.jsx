import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import './Conta.css'

export default function conta() {
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5001/Paciente/Get/${parseInt(localStorage.getItem("id"))}`, {
            method: 'GET'
        }).then((Response) => {
            return Response.json()
        }).then((data) => {
            setUser(data)
        })
    }, [])

    const logout = e =>{
        localStorage.clear()
        localStorage.setItem("logado", "false")
        navigate("/")
    }

    const [user, setUser] = useState({})

    return (
        <>
            <section className="conta">
                <h3>Dados da conta:</h3>
                <ul className="contaDados">
                    <li>{user["nome"]}</li>
                    <hr />
                    <li>{user["email"]}</li>
                    <hr />
                    <li>{user["dtNasc"]}</li>
                </ul>
                <button onClick={logout} className="logout">Sair</button>
            </section>
        </>
    )
}