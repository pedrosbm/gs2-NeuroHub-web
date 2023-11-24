import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import normalImg from '../../assets/normal.jpg'
import alzheimerImg from '../../assets/alzheimer.jpg'
import tumorImg from '../../assets/tumor.jpg'
import brain from '../../assets/brain.jpg'

import './Chat.css'

function Exams() {
    const navigate = useNavigate();
    const [resultado, setResultado] = useState({
        idPaciente: parseInt(localStorage.getItem("id")),
    });

    const [medicos, setMedicos] = useState([]);

    const [exames, setExames] = useState([]);

    const [novo, setNovo] = useState({
        foto1: null,
        foto2: null,
        foto3: null,
    });

    const handleFileChange = (event, photoName) => {
        const file = event.target.files[0];
        if (file && file.type === "image/jpeg") {
            setNovo({ ...novo, [photoName]: file });
        } else {
            alert("Por favor, selecione um arquivo JPEG.");
        }
    };

    useEffect(() => {
        fetch(`http://localhost:5001/Medico/Get`, {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setMedicos(data)
        }).catch((error) => {
            console.error(error)
        })

        fetch(`http://localhost:5001/Exame/List`, {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setExames(data)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("foto1", novo.foto1);
        formData.append("foto2", novo.foto2);
        formData.append("foto3", novo.foto3);

        try {
            const response = await fetch("http://127.0.0.1:5000/classify", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição ${response.status}`);
            } else {
                alert("Seus exames foram enviados e serão avaliados.")
            }

            const data = await response.json();
            if (data.error) {
                console.error(data.error);
                alert("Erro ao processar as imagens. Por favor, tente novamente.");
                return;
            }

            // const data = {
            //     'success': true,
            //     'predictions': [
            //         { 'class_name': "Tumor", 'score': 1 },
            //         { 'class_name': "Tumor", 'score': 1 },
            //         { 'class_name': "tumor", 'score': 0.6 },
            //     ]
            // }

            setResultado({ ...resultado, data });

        } catch (error) {
            console.error("Erro ao enviar as imagens:", error);
            alert("Erro ao enviar as imagens. Por favor, tente novamente.");
        }
    };

    useEffect(() => {

        if (resultado["data"] != undefined) {
            const result = {
                "resultado": resultado["data"]["predictions"][0]["class_name"],
                "acuracia": resultado["data"]["predictions"][0]["score"],
                "idPaciente": parseInt(localStorage.getItem("id"))
            }

            try {
                const response = fetch('http://localhost:5001/Exame/New', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(result),
                });
            } catch (error) {
                console.error('Erro ao Enviar exames:', error);
            }
        }
    }, [resultado])

    const [comunicacao, setComunicacao] = useState({
        mensagem: null,
        idPaciente: null,
        idMedico: parseInt(localStorage.getItem("id"))
    })

    const handleChange = e => {
        setComunicacao({ ...comunicacao, [e.target.name]: e.target.value })
    }

    const msg = e => {
        e.preventDefault();
        const instance = comunicacao
        instance.idPaciente = parseInt(e.target.idPaciente.value)

        fetch(`http://localhost:5001/Comunicacao/New`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(instance),
        }).then((response) => {
            return response.json()
        }).then((data) => {
            alert("Mensagem retornada ao paciente")
            console.log(data)
        }).catch((error) => {
            console.error(error)
        })
    }

    if (localStorage.getItem("tipo") == "paciente") {
        return (
            <div className="envioExame">
                <form onSubmit={handleSubmit}>
                    <section className="formularioPaciente">
                        <div className="box">
                            <label htmlFor="">Selecione um médico:</label><br />
                            <select type="text" name="medico">
                                {medicos.map((medico, index) =>
                                    <option key={index} value={medico.id}>{medico.nome}</option>
                                )}
                            </select>
                        </div>

                        <div className="exames">
                            <h2>Selecione seus exames</h2>
                            <div className="box">
                                <input
                                    type="file"
                                    accept="image/jpeg"
                                    onChange={(e) => handleFileChange(e, "foto1")}
                                />
                            </div>
                            <div className="box">
                                <input
                                    type="file"
                                    accept="image/jpeg"
                                    onChange={(e) => handleFileChange(e, "foto2")}
                                />
                            </div>
                            <div className="box">
                                <input
                                    type="file"
                                    accept="image/jpeg"
                                    onChange={(e) => handleFileChange(e, "foto3")}
                                />
                            </div>
                        </div>
                        <button type="submit" className="button">
                            Enviar exames
                        </button>
                    </section>
                </form>
            </div>
        );
    } else if (localStorage.getItem("tipo") == "medico") {
        return (
            <section className="exames">
                <h2>Exames á verificar:</h2>
                {exames.map((exame, index) =>
                    <div key={index}>
                        <div className="exame">
                            <div>
                                <p>Você resebeu um exame</p><br />
                                <img className="brain" src={index == 1 ? tumorImg : index == 2 ? alzheimerImg : index == 3 ? normalImg : brain} alt="" />
                            </div>
                            <div className="result">
                                <p>Resultados da ia:</p><br />
                                <p>Resultado - {exame.resultado}</p><br />
                                <p>Acurácia - {exame.acuracia}</p><br />
                            </div>
                            <form onSubmit={msg}>
                                <div className="inputBox">
                                    <div>
                                        <input type="text" onChange={handleChange} name="mensagem" placeholder="Mensagem ao paciente" />
                                    </div><br />
                                    <input id="idPaciente" className="hide" name="idPaciente" type="number" value={exame.idPaciente} />

                                    <button type="submit" className="button">Enviar</button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <hr className="Examseparator" />
                        </div>
                    </div>
                )}
            </section>
        )
    }
}
export default Exams;