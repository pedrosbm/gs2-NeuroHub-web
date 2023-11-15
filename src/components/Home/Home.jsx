import stockUser from '../../assets/stockUser.jpg'

import './Home.css'

export default function Home() {
    return (
        <>
            <section className="home">
                <div className="firstSection">
                    <div className="fs1">
                        <h2>Bem vindo(a)</h2>
                        <p>Nós somos a Neuro Hub, empresa dedicada a oferecer aos pacientes com transtornos mentais, acompanhamento médico 100% digital! Nosso principal objetivo é trazer rapidez a comunicação do paciente e médico, além de uma solução para diagnosticos mais rápidos.</p>
                    </div>

                    <div className="fs2">
                        <img src={stockUser} />
                    </div>
                </div>
            </section>
        </>
    )
}