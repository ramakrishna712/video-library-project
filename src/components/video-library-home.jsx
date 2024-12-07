import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";

export function RegisterLink() {
    return (
        <div className="">
            <p>Create account</p>
            <Link to='/register-user' className="btn btn-warning">Register</Link>
        </div>
    );
}

export function PasswordComponent() {
    return (
        <div className="d-flex justify-content-center my-4">
            <div className="input-group col-12 col-sm-10 col-md-8 col-lg-6">
                <input
                    type="password"
                    placeholder="Your Password"
                    className="form-control text-center"
                />
                <Link to="/user-dashboard" className="btn btn-warning">Continue</Link>
            </div>
        </div>
    );
}

export function VideoLibraryHome() {
    const [view, setView] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL

    const formik = useFormik({
        initialValues: { UserId: "", UserName: '', Password: "", Email: "", Mobile: "" },
        onSubmit: (user) => {
            axios.get(`${apiUrl}/get-users`) 
                .then(response => {
                    var data = response.data.find(client => client.Email === user.Email);
                    if (data) {
                        setView(<PasswordComponent />);
                    } else {
                        setView(<RegisterLink />);
                    }
                })
        }
    });

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center px-3">
            <main>
                <h1 className="display-4 fw-bold">Watch Tech Videos</h1>
                <p className="lead">Anywhere, Anytime</p>
                <div className="w-100">
                    <form onSubmit={formik.handleSubmit} className="input-group mx-auto" style={{ maxWidth: "500px" }}>
                        <input type="email" onChange={formik.handleChange} name="Email" className="form-control" placeholder="Your email address" required />
                        <button type="submit" className="btn btn-danger">Get Started <span className="bi bi-chevron-right"></span> </button>
                    </form>
                </div>
                <div className="my-3">
                    {view}
                </div>
            </main>
        </div>
    );
}
