import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function AddVideo() {

  const [categories, setCategories] = useState([{ CategoryId: 0, CategoryName: "" }]);

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: { VideoId: 0, Title: "", Url: "", Description: "", Views: 0, Likes: 0, Dislikes: 0, CategoryId: 0 },

    onSubmit: (video) => {
      const apiUrl = process.env.REACT_APP_API_URL;
      console.log("API URL:", apiUrl);
      
  
      axios.post(`${apiUrl}/add-video`, video)
        .then(() => {
          alert("Video Added Successfully...");
          navigate("/admin-dashboard");
        })
    }

  })

  function LoadCategories() {
    const apiUrl = process.env.REACT_APP_API_URL; 
    axios.get(`${apiUrl}/get-categories`)
      .then(response => {
        response.data.unshift({ CategoryId: "-1", CategoryName: 'Select Category' });
        setCategories(response.data);
      })
  }

  useEffect(() => {
    LoadCategories()
  }, [])

  return (
    <div className="container-fluid">
      <form className="form-control" onSubmit={formik.handleSubmit} >
        <h3 className="text-light bg-dark p-2 text-center">Add Video</h3>
        <dl className="row">
          <dt className="col-3">Video Id</dt>
          <dd className="col-9"><input type="number" onChange={formik.handleChange} name="VideoId" /></dd>
          <dt className="col-3">Title</dt>
          <dd className="col-9"><input type="text" onChange={formik.handleChange} name="Title" /></dd>
          <dt className="col-3">Url</dt>
          <dd className="col-9"><input type="text" name="Url" onChange={formik.handleChange} /></dd>
          <dt className="col-3">Description</dt>
          <dd className="col-9"><input type="text" name="Description" onChange={formik.handleChange} /></dd>
          <dt className="col-3">Views</dt>
          <dd className="col-9"><input type="text" name="Views" onChange={formik.handleChange} /> </dd>
          <dt className="col-3">Likes</dt>
          <dd className="col-9"><input type="text" name="Likes" onChange={formik.handleChange} /></dd>
          <dt className="col-3">Dislikes</dt>
          <dd className="col-9"><input type="text" name="Dislikes" onChange={formik.handleChange} /></dd>
          <dt className="col-3">Category</dt>
          <dd className="col-9">
            <select name="CategoryId" onChange={formik.handleChange}>
              {
                categories.map(category => <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>)
              }
            </select>
          </dd>
        </dl>
        <button type="submit" className="btn btn-primary">Add Video</button>
        <Link className="btn btn-warning" to="/admin-dashboard">Cancel</Link>
      </form>
    </div>
  )
}
