import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import normalImg from '../../assets/normal.jpg'
import alzheimerImg from '../../assets/alzheimer.jpg'
import tumorImg from '../../assets/tumor.jpg'
import brain from '../../assets/brain.jpg'

import './Conta.css'

export default function conta() {
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5001/Exame/List/${parseInt(localStorage.getItem("id"))}`, {
            method: 'GET'
        }).then((Response) => {
            return Response.json()
        }).then((data) => {
            setExames(data)
        })
    }, [])

    useEffect(() => {
        if (localStorage.getItem("tipo") == "paciente") {
            fetch(`http://localhost:5001/Paciente/Get/${parseInt(localStorage.getItem("id"))}`, {
                method: 'GET'
            }).then((Response) => {
                return Response.json()
            }).then((data) => {
                setUser(data)
            })

            fetch(`http://localhost:5001/Comunicacao/List/${parseInt(localStorage.getItem("id"))}`, {
                method: 'GET'
            }).then((Response) => {
                return Response.json()
            }).then((data) => {
                console.log(data)
                setMensagens(data)
            })
        } else {
            fetch(`http://localhost:5001/Medico/Get/${parseInt(localStorage.getItem("id"))}`, {
                method: 'GET'
            }).then((Response) => {
                return Response.json()
            }).then((data) => {
                setUser(data)
            })
        }
    }, [])

    const logout = e => {
        localStorage.clear()
        localStorage.setItem("logado", "false")
        navigate("/")
    }

    const [exames, setExames] = useState([])

    const [mensagens, setMensagens] = useState([])

    const [user, setUser] = useState({})

    if (localStorage.getItem("tipo") == "paciente") {
        return (
            <>
                <section className="conta">
                    <div>
                        <Link className='newchat' to='/Chat'>{localStorage.getItem("tipo") == "medico" ? "Conferir exames" : "Envie seus exames"}</Link>
                        <h2>Dados da conta:</h2>
                        <ul className="contaDados">
                            <li>Nome - {user["nome"]}</li>
                            <hr />
                            <li>Email - {user["email"]}</li>
                            <hr />
                            <li>Data de nascimento - {user["dtNasc"]}</li>
                        </ul>
                        <button onClick={logout} className="logout">Sair</button>
                    </div>
                    <div>
                        <h2>Exames</h2>
                        {exames.map((exame, index) =>
                            <div key={index}>
                                <div className="tomografia">
                                    <div>
                                        <p>id - {exame.id}</p>
                                        <p>Exame {index}</p>
                                    </div>
                                    <img className="brain" src={index == 1 ? tumorImg : index == 2 ? alzheimerImg : index == 3 ? normalImg : brain} alt="" />
                                </div>
                                <hr className="Examseparator" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h2>Resultado</h2>
                        {mensagens.map((mensagem, index) =>
                            <ul className="message" key={index}>
                                <li>
                                    <p>{mensagem.mensagem}</p>
                                    <span>eviado em: {mensagem.dtEnvio}</span>
                                    <hr className="Examseparator" />
                                </li>
                            </ul>
                        )}
                    </div>
                </section>
            </>
        )
    } else {
        return (
            <>
                <section className="conta">
                    <div>
                        <Link className='newchat' to='/Chat'>{localStorage.getItem("tipo") == "medico" ? "Conferir exames" : "Envie seus exames"}</Link>
                        <h2>Dados da conta:</h2>
                        <ul className="contaDados">
                            <li>Nome - {user["nome"]}</li>
                            <hr />
                            <li>Email - {user["email"]}</li>
                            <hr />
                            <li>Data de nascimento - {user["dtNasc"]}</li>
                        </ul>
                        <button onClick={logout} className="logout">Sair</button>
                    </div>
                </section>
            </>
        )
    }
}