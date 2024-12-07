
import { Link } from "react-router-dom"
export function UserLoginError(){
    return(
        <div className="container-fluid ">
            <h2 className="text-danger">Invalid Credentials</h2>
            <Link to="/user-login">Try Again</Link>
            
        </div>
    )
}