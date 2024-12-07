import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";

export function UserLogin() {
  const [cookies, setCookie, removeCookie] = useCookies('user-id');
  let navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL

  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
    },
    onSubmit: (user) => {
      
      axios.get(`${apiUrl}/get-users`)
        .then((response) => {
          var data = response.data.find((item) => item.UserId === user.UserId);
          if (data) {
            if (data.Password === user.Password) {
              setCookie('user-id', user.UserId);
              navigate("/user-dashboard");
            } else {
              navigate('/user-error');
            }
          } else {
            navigate("/user-error");
          }
        })
        .catch((error) => {
          console.error("Error during login:", error.message);
          navigate("/user-error");
        });
    },
  });

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center bg-light">
      <form className="form-control w-100 border border-black p-4" style={{ maxWidth: "400px" }} onSubmit={formik.handleSubmit}>
        <h2 className="bi bi-person-circle text-center mb-4">User Login</h2>
        <dl>
          <dt className="fw-bold">User Id</dt>
          <dd>
            <input
              className="form-control mb-3"
              type="text"
              name="UserId"
              placeholder="Enter your user ID"
              onChange={formik.handleChange}
              required
            />
          </dd>
          <dt className="fw-bold">Password</dt>
          <dd>
            <input
              className="form-control mb-4"
              type="password"
              name="Password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              required
            />
          </dd>
        </dl>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success me-2">Login</button>
          <Link to="/register-user" className="btn btn-warning">Register</Link>
        </div>
      </form>
    </div>
  );
}
