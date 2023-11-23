import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import '../Login/Form.css'

export default function Cadastro() {
    const navigate = useNavigate()

    const request = async (user) => {
        if (user["tipo"] == "paciente") {
            try {
                const response = await fetch('http://localhost:5001/Paciente/New', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("id", data["id"])
                    localStorage.setItem("tipo", "paciente")
                    localStorage.setItem("logado", "true")
                    navigate("/Conta")

                } else {
                    console.error('Erro na requisição:', response.status, response.statusText);
                    throw new Error('Erro na requisição.');
                }
            } catch (error) {
                console.error('Erro ao cadastrar:', error);
            }
        } else {
            try {
                const response = await fetch('http://localhost:5001/Medico/New', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("id", data["id"])
                    localStorage.setItem("tipo", "medico")
                    localStorage.setItem("logado", "true")
                    navigate("/Conta")

                } else {
                    console.error('Erro na requisição:', response.status, response.statusText);
                    throw new Error('Erro na requisição.');
                }
            } catch (error) {
                console.error('Erro ao cadastrar:', error);
            }
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await request(user)
        } catch (error) {
            console.log("Erro ao logar - ", error)
        }
    }

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleDateChange = (e) => {
        const date = e.target.value.split("-")
        const ano = date[0]
        const mes = date[1]
        const dia = date[2]
        setUser({ ...user, [e.target.name]: `${dia}/${mes}/${ano}` })
    }

    const [user, setUser] = useState({
        "especialidade": "neurologista"
    });

    return (
        <>
            <section className="wrapper">
                <h2>Cadastro</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form">
                        <div className="inputBox">
                            <label htmlFor="nome">Nome:</label><br />
                            <input name='nome' required placeholder="Exemplo" type="text" onChange={handleChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="email">Email:</label><br />
                            <input name='email' required placeholder="Exemplo@dominio.com" type="text" onChange={handleChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="dtNasc">Data de nascimento:</label><br />
                            <input name='dtNasc' required placeholder="R.Exemplo" type="date" onChange={handleDateChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="senha">Senha:</label><br />
                            <input name='senha' required placeholder="***********" type="password" onChange={handleChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="type">Sou um:</label><br />
                            <select onChange={handleChange} type='text' name="tipo">
                                <option selected>Escolher</option>
                                <option value="paciente" >Paciente</option>
                                <option value="medico">Médico</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="button">Cadastrar</button>
                </form>
                <Link to='/Login' >Já tenho conta</Link>
            </section>
        </>
    )
}