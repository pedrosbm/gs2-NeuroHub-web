import { useState } from "react"
import { Link } from "react-router-dom";

import '../Login/Form.css'

export default function Cadastro() {

    const request = async (patient) => {
        console.log(JSON.stringify(patient))
        try {
            const response = await fetch('https://api-medico-wbg2ngsbaq-uc.a.run.app/patient', {
                mode: "no-cors",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patient),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('Erro na requisição:', response.status, response.statusText);
                throw new Error('Erro na requisição.');
            }
        } catch (error) {
            console.error('Erro ao logar:', error);
        }
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
        const data = e.target.value.split("-")
        const objectDate = new Date(data[0], data[1] - 1, data[2], 0, 0, 0, 0)
        const date = objectDate.toISOString().replace("Z", "")
        setPatient({ ...patient, [e.target.name]: date})
    }

    const [patient, setPatient] = useState({});

    return (
        <>
            <section className="wrapper">
                <h2>Cadastro</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form">
                        <div className="inputBox">
                            <label htmlFor="name">Nome:</label><br />
                            <input name='name' required placeholder="Exemplo" type="text" onChange={handleChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="email">Email:</label><br />
                            <input name='email' required placeholder="Exemplo@dominio.com" type="text" onChange={handleChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="phone">Telefone:</label><br />
                            <input name='phone' required placeholder="11 00000-0000" type="text" onChange={handleChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="document">CPF:</label><br />
                            <input name='document' required placeholder="000.000.000-00" type="text" onChange={handleChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="address">Endereço:</label><br />
                            <input name='address' required placeholder="R.Exemplo" type="text" onChange={handleChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="city">Cidade:</label><br />
                            <input name='city' required type="text" onChange={handleChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="state">Estado:</label><br />
                            <input name='state' required type="text" onChange={handleChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="zip_code">CEP:</label><br />
                            <input name='zip_code' required placeholder="00000-000" type="text" onChange={handleChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="birthday">Data de nascimento:</label><br />
                            <input name='birthday' required placeholder="R.Exemplo" type="date" onChange={handleDateChange} /><br />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="password">Senha:</label><br />
                            <input name='password' required placeholder="***********" type="password" onChange={handleChange} /><br />
                        </div>
                    </div>

                    <button type="submit" className="button">Cadastrar</button>
                </form>
                <Link to='/Login' >Já tenho conta</Link>
            </section>
        </>
    )
}