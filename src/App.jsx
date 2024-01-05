import supabase from "./utils/client"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function App() {

  const [password, setPassword] = useState("")
  const [ email, setEmail ] = useState("")

  const navigate = useNavigate()

  async function Login(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) return alert("Invalid Credentials")
    navigate("/admin")
  }
  return (
    <div className="container-fluid">
      <form onSubmit={Login}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )

}