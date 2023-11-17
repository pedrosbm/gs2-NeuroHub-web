import { useState } from "react"

export default function Exams() {

    const [exames, setExames] = useState()

    const handleSubmit = e => {
        console.log("Envio dos examos")
    }

    const handleChange = e => {
        setExames({ [e.target.name]: e.target.value })
    }

    return (
        <>
            <form action="">
                <label htmlFor="exames"></label>
                <input type="file" multiple accept=".jpg, .jpeg, .png" />
            </form>
        </>
    )
}