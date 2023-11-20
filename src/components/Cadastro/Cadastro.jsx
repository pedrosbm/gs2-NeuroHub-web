import { useState } from "react"
import { Link } from "react-router-dom";

import '../Login/Form.css'

export default function Cadastro() {

    const request = async (patient) => {
        console.log(JSON.stringify(patient))
        // try {
        //     const response = await fetch('https://api-medico-wbg2ngsbaq-uc.a.run.app/patient', {
        //         mode: "no-cors",
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(patient),
        //     });

        //     if (response.ok) {
        //         const data = await response.json();
        //         console.log(data);
        //     } else {
        //         console.error('Erro na requisição:', response.status, response.statusText);
        //         throw new Error('Erro na requisição.');
        //     }
        // } catch (error) {
        //     console.error('Erro ao logar:', error);
        // }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await request(patient)
        } catch (error) {
            console.log("Erro ao logar - ", error)
        }
    }

    const handleChange = e => {
        setPatient({ ...patient, [e.target.name]: e.target.value })
    }

    const handleDateChange = e => {

    }

    const [patient, setPatient] = useState({});

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
                                <option value="paciente" selected>Paciente</option>
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