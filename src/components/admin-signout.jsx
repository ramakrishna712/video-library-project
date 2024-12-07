import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";


export function Signout(){


    const[cookies,setCookie,removeCookie] = useCookies('admin-id');
    let navigate = useNavigate();


function hadleSignoutClick(){
    removeCookie('admin-id');
    navigate('/')
    window.location.reload();
}
return(
    <button onClick={hadleSignoutClick} className="btn btn-danger" ><span className="fw-bold">{cookies['admin-id']}</span> - Signout </button>
)
}