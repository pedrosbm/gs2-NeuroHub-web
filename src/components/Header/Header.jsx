import logo from '../../assets/logo.jpg'
import userIcon from '../../assets/userIcon.jpg'

import { Link } from 'react-router-dom'

import './Header.css'

export default function Header() {
    return (
        <>
            <section className="header">
                <Link className='Logo' to='/'>
                    <img src={logo} />
                    <h1>Neuro Hub</h1>
                </Link>

                <Link to='/Conta' className='login'>
                    <img src={userIcon} />
                    <p>Sua conta</p>
                </Link>
            </section>
        </>
    )
}