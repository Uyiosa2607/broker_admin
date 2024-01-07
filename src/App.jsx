import supabase from "./utils/client"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function App() {

  const navigate = useNavigate()

  useEffect(()=> {
    const auth = localStorage.getItem("auth");
    if(auth) return navigate("/admin")
  },[])

  const [password, setPassword] = useState("")
  const [ email, setEmail ] = useState("")

  async function Login(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) return alert("Invalid Credentials")
    localStorage.setItem("auth", "authenticated")
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