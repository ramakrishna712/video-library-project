import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

export function AdminLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [cookies, setCookie] = useCookies(['admin-id']);
    let navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;
    console.log('API URL:', apiUrl); // Debugging

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: '',
        },
        validationSchema: Yup.object({
            UserId: Yup.string().required("Admin ID is required"),
            Password: Yup.string().required("Password is required"),
        }),
        onSubmit: (admin) => {
            console.log('Form Submitted:', admin); // Debugging
            setIsLoading(true);
            axios.get(`${apiUrl}/get-admin`)
                .then(response => {
                    console.log('API Response:', response.data); // Debugging
                    if (Array.isArray(response.data)) {
                        const isValidAdmin = response.data.some(
                            (adm) => adm.UserId === admin.UserId && adm.Password === admin.Password
                        );
                        console.log('isValidAdmin:', isValidAdmin); // Debugging
                        if (isValidAdmin) {
                            setCookie('admin-id', admin.UserId);
                            navigate("/admin-dashboard");
                        } else {
                            navigate('/admin-error');
                        }
                    } else {
                        console.error('Unexpected response format:', response.data); // Debugging
                        alert('Unexpected server response.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching admin data:', error); // Debugging
                    alert('An error occurred while logging in. Please try again.');
                })
                .finally(() => setIsLoading(false));
        },
    });

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <form className="form-control p-4" style={{ maxWidth: "400px" }} onSubmit={formik.handleSubmit}>
                <div className="text-center h3 fw-bold p-2 mb-4">Admin Login</div>
                <dl>
                    <dt>Admin ID</dt>
                    <dd>
                        <input
                            type="text"
                            name="UserId"
                            onChange={formik.handleChange}
                            value={formik.values.UserId}
                            className="form-control"
                            placeholder="Enter Admin ID"
                            required
                        />
                        {formik.errors.UserId && <small className="text-danger">{formik.errors.UserId}</small>}
                    </dd>
                    <dt>Password</dt>
                    <dd>
                        <input
                            type="password"
                            name="Password"
                            onChange={formik.handleChange}
                            value={formik.values.Password}
                            className="form-control"
                            placeholder="Enter Password"
                            required
                        />
                        {formik.errors.Password && <small className="text-danger">{formik.errors.Password}</small>}
                    </dd>
                </dl>
                <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
