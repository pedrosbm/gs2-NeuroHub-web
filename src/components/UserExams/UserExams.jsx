import { useState } from "react"

function userExams() {

    const [exames, setExames] = useState([])

    const handleChange = e => {
        console.log(e.target.files)
        // setExames({...exames, [e.target.value]: e.target.name})
    }

    const handleSubmit = e =>{

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fotos">Envie suas tomografias</label><br />
                <input id="fotos" type="file" multiple accept=".jpg, .png. jpeg" onChange={handleChange}/>
            </form>
        </>
    )
}

export default userExams