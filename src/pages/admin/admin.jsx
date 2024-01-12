import "./admin.css"
import supabase from "../../utils/client"
import {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {

    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [edit, setEdit] = useState(false)
    const [balance, setBalance] = useState(0)
    const [id, setId] = useState("")
    const [transactions, setTransactions] = useState([])
    const [bonus, setBonus] = useState('')


    const getUsers = async function () {

        try {
            const { data, error } = await supabase
                .from("users")
                .select()
            if (error) return console.log(error.message)
            setUsers(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUsers() 
    },[])

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        localStorage.removeItem("auth")
        navigate("/")
    }

    async function updateBalance(e){
        e.preventDefault()
        try {
            const { error } = await supabase
                .from('users')
                .update({ balance: balance })
                .eq('id', id )
                if(error) return console.log(error.message)
        } catch (error) {
            console.log(error)
        }
        try {
            const { error } = await supabase
                .from('users')
                .update({ bonus: bonus })
                .eq('id', id)
            if (error) return console.log(error.message)
            toast.success("balance updated")
        } catch (error) {
            console.log(error)
        }
    }

    async function updateStatus(e) {

        const id = e.target.getAttribute("data-id")
        console.log(id)
        try {
            const { error } = await supabase
                .from('transactions')
                .update({ status: "complete" })
                .eq('id', id)
            if (error) return console.log(error.message)
            getUsers()
            toast.success("Transaction status updated")
        } catch (error) {
            console.log(error)
        }
    }

    async function fecthUser(e) {

        const id = e.target.getAttribute("data-id")

        setId(id)

        try {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", id)
            if (error) return console.log(error.message)
            setUser(data[0]);
            setEdit(true)
            setBalance(data[0].balance)
            setBonus(data[0].bonus)
        } catch (error) {
            console.log(error)
        }

        try {
            const { data, error } = await supabase
                .from("transactions")
                .select("*")
                .eq("user_id", id)
            if (error) return console.log(error.message)
            setTransactions(data)
            console.log(transactions)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className={edit == true ? "users-container hide-display" : ""}>
                <p style={{textAlign:"center", fontWeight: "bold", padding: "1rem"}}>All users</p>
                <div className={edit == true ? "users-container hide-display" : "users-container"}>
                    <ul className="list-group custom-list-group">
                       {users.map((user)=> (
                           <li key={user.id} className="list-group-item list-group-item-secondary d-flex custom-list-item justify-content-between align-items-center">
                               <span><i className="fa-solid fa-circle-user fa-2x"></i></span>
                               <span className="badge badge-primary pill-rounded">{user.full_name}</span>
                               <span className="badge badge-primary pill-rounded">${user.balance}</span>
                               <button data-id={user.id} onClick={fecthUser} className="btn-success user-btn">Edit</button>
                           </li>
                       ))}
                    </ul>
            </div>

                <nav>
                    <button onClick={signOut} style={{ textAlign: "center" }} className="btn btn-danger">logout</button>
                </nav>
            </div>
            {edit ? (<div className="control-panel bg-secondary text-light">

                <form className="control-panel-form">

                    <span><i className="fa-solid fa-circle-user fa-4x"></i></span> 
                    
                    <span>{user.full_name}</span>

                    <i className="badge badge-primary pill-rounded">{user.email}</i>

                    <div className="form-group">
                        <label htmlFor="">Balance</label>
                        <input onChange={(e)=> setBalance(e.target.value)} value={balance} type="text" />
                        <label htmlFor="">Bonus</label>
                        <input onChange={(e) => setBonus(e.target.value)} value={bonus} type="text" />
                    </div>

                    <button onClick={updateBalance} className="btn btn-success">update</button>
            
                    <h4>TRANSACTIONS</h4>
                    
                    <div style={{color: "#212121" }} className="transaction-list">
                        
                        <div className="row">
                            <div className="col-sm-12">
                               
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-striped">
                                        {
                                          transactions &&  transactions.map((transaction)=> (
                                              <tr key={transaction.id} className="table table-striped">
                                                  <td>${transaction.value}</td>
                                                  <td><span onClick={updateStatus} data-id={transaction.id} className={transaction.status === "complete" ? "badge badge-success" : "badge badge-danger"}>{transaction.status}</span></td>
                                              </tr>
                                          ))
                                        }
                                    </tbody>
                                </table>

                            </div>
                            
                        </div>
                    </div>

                    <button onClick={() => setEdit(false)} className="btn mb-4 btn-primary">done</button>
                    
                </form>

            </div>) : null}

        </div>
    )
}