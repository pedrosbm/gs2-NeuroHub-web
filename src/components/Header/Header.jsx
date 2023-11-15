import logo from '../../assets/logo.jpg'

import './Header.css'

export default function Header() {
    return (
        <>
            <section className="header">
                <img src={logo} className="Logo" />
                <h1>Neuro Hub</h1>
            </section>
        </>
    )
}