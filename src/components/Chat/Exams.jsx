import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Exams() {
    const navigate = useNavigate();
    const [resultado, setResultado] = useState(null);

    const [medicos, setMedicos] = useState([]);

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

            // Atualize o estado para exibir as informações na tela
            setResultado(data);

        } catch (error) {
            console.error("Erro ao enviar as imagens:", error);
            alert("Erro ao enviar as imagens. Por favor, tente novamente.");
        }
    };

    if (localStorage.getItem("tipo") == "paciente") {
        return (
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <section>
                        <fieldset className="verificacao">
                            <div className="box">
                                <label htmlFor="">Selecione um médico:</label><br />
                                <select type="text" name="medico">
                                    {medicos.map((medico, index) =>
                                        <option key={index} value={medico.id}>{medico.nome}</option>
                                    )}
                                </select>
                            </div>
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
                            <div className="box">
                                <label htmlFor="">Mensagem:</label>
                                <input type="text" />
                            </div>
                        </fieldset>
                        <button type="submit" className="Button">
                            Confirmar
                        </button>
                    </section>
                </form>

                {/* Exibir as informações de resultado se disponíveis */}
                {resultado && (
                    <div className="result-section">
                        <h2>Resultados</h2>
                        {resultado.predictions.map((prediction, index) => (
                            <div key={index} className="result-item">
                                {/* Exibir a imagem convertida em base64 */}
                                {/* <img src={data:image/jpeg;base64,${prediction.image}}/> */}
                                {/* Exibir informações da previsão */}
                                <p>Classe: {prediction.class_name}</p>
                                <p>Precisão: {prediction.score}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    } else if(localStorage.getItem("tipo") == "medico"){
        // Simulação médico
    }
}

export default Exams;