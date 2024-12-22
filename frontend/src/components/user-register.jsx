import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export function UserRegister() {
    let navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL

    const formik = useFormik({
        initialValues: {
            UserId: "",
            UserName: "",
            Password: "",
            Email: "",
            Mobile: ''
        },
        onSubmit: (user) => {
            axios.post(`${apiUrl}/register-user`, user)
                .then(() => {
                    alert("User Registered");
                    navigate('/user-login');
                })
        }
    });

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <form className="form-control border-2 p-4 shadow-sm" onSubmit={formik.handleSubmit} style={{ maxWidth: "500px", width: "100%" }}>
                <h3 className="bi bi-person-circle text-center mb-4"> User Register</h3>
                <dl>
                    <dt className="fw-bold">User Id</dt>
                    <dd>
                        <input className="form-control mb-3" type="text" onChange={formik.handleChange} name="UserId" placeholder="Enter your user ID" required />
                    </dd>
                    <dt className="fw-bold">User Name</dt>
                    <dd>
                        <input className="form-control mb-3" type="text" onChange={formik.handleChange} name="UserName" placeholder="Enter your user name" required />
                    </dd>
                    <dt className="fw-bold">Password</dt>
                    <dd>
                        <input className="form-control mb-3" type="password" onChange={formik.handleChange} name="Password" placeholder="Enter your password" required />
                    </dd>
                    <dt className="fw-bold">Email</dt>
                    <dd>
                        <input className="form-control mb-3" type="email" onChange={formik.handleChange} name="Email" placeholder="Enter your email" required />
                    </dd>
                    <dt className="fw-bold">Mobile</dt>
                    <dd>
                        <input className="form-control mb-4" type="text" onChange={formik.handleChange} name="Mobile" placeholder="Enter your mobile number" required />
                    </dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100"> Register </button>
                <Link to="/user-login">Existing user? Login</Link>
            </form>
        </div>
    )
}
