import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import './Form.css'

export default function Login() {

    const navigate = useNavigate()

    const request = async (user) => {
        if (user["tipo"] == "paciente") {
            try {
                const response = await fetch('http://localhost:5001/Auth/Paciente', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                const data = await response.json();
                if (data["id"] == 0) {
                    document.getElementById('error').innerHTML = "Email ou senha inválidos."
                } else {
                    localStorage.setItem("id", data["id"])
                    localStorage.setItem("tipo", "paciente")
                    localStorage.setItem("logado", "true")
                    navigate("/Conta")
                }


            } catch (error) {
                console.error('Erro ao logar:', error);
            }
        } else {
            try {
                const response = await fetch('http://localhost:5001/Auth/Medico', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });
                const data = await response.json();

                if (data["id"] == 0) {
                    document.getElementById('error').innerHTML = "Email ou senha inválidos."
                } else {
                    localStorage.setItem("id", data["id"])
                    localStorage.setItem("tipo", "medico")
                    localStorage.setItem("logado", "true")
                    navigate("/Conta")
                }

            } catch (error) {
                console.error('Erro ao logar:', error);
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

    const [user, setUser] = useState({});

    return (
        <>
            <section className="wrapper">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form">
                        <div className="inputBox">
                            <label htmlFor="email">Email:</label><br />
                            <input name='email' required placeholder="Exemplo@dominio.com" type="text" onChange={handleChange} /><br />
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

                        <span id="error"></span>
                    </div>

                    <button type="submit" className="button">Logar</button>
                </form>
                <Link to='/Cadastro' >Não tenho conta</Link>
            </section>
        </>
    )
}