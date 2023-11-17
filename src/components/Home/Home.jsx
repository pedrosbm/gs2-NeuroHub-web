import stockUser from '../../assets/stockUser.jpg'
import caduceus from '../../assets/caduceus.png'

import './Home.css'

export default function Home() {
    return (
        <>
            <section className="home">
                <div className="firstSection">
                    <div className="fs1">
                        <h2>Bem vindo(a)</h2>
                        <p>Nós somos a Neuro Hub, empresa dedicada a oferecer aos pacientes com doenças cerebrais, acompanhamento médico 100% digital! Nosso principal objetivo é trazer rapidez a comunicação do paciente e médico, além de uma solução para diagnosticos mais rápidos.</p>
                    </div>
                    
                    <div className="fs2">
                        <img src={stockUser} />
                    </div>
                </div>

                <div className='secondSection'>
                    <h2>ODS 2</h2>
                    <img src={caduceus} alt="" />
                    <h3>Surgimos em apoio á ODS 2 no combate as doenças mentais degenerativas.</h3><br />
                    <div className='quote'>
                        <i>"A Future Engineers visa enfrentar de frente a significativa problemática dos retornos de pacientes com seus resultados de exames, implementando uma solução inovadora e eficiente. Nosso objetivo central é oferecer aos pacientes a possibilidade de enviar seus exames diretamente pela plataforma, simplificando o processo e eliminando as barreiras que frequentemente levam a atrasos ou até mesmo a ausências nas consultas médicas."
                        </i>
                    </div>
                </div>
            </section>
        </>
    )
}