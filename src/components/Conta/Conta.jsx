import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

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

    const logout = e => {
        localStorage.clear()
        localStorage.setItem("logado", "false")
        navigate("/")
    }

    const [user, setUser] = useState({})

    return (
        <>
            <section className="conta">
                <Link className='newchat' to='/Chat'>Envie seus exames</Link>
                <h2>Dados da conta:</h2>
                <ul className="contaDados">
                    <li>Nome - {user["nome"]}</li>
                    <hr />
                    <li>Email - {user["email"]}</li>
                    <hr />
                    <li>Data de nascimento - {user["dtNasc"]}</li>
                </ul>
                <button onClick={logout} className="logout">Sair</button>
            </section>
        </>
    )
}