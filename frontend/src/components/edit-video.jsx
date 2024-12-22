import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditVideo() {
    const [videos, setVideo] = useState([{ VideoId: 0, Title: "", Url: "", Description: "", Views: "", Likes: "", Dislikes: "" }]);
    const [categories, setCategories] = useState([{ CategoryId: 0, CategoryName: "" }]);

    let params = useParams();
    let navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;  

    const formik = useFormik({
        initialValues: {
            VideoId: videos[0].VideoId,
            Title: videos[0].Title,
            Url: videos[0].Url,
            Description: videos[0].Description,
            Views: videos[0].Views,
            Likes: videos[0].Likes,
            Dislikes: videos[0].Dislikes,
            CategoryId: videos[0].CategoryId
        },
        onSubmit: (video) => {
            axios.put(`${apiUrl}/edit-video/${video.VideoId}`, video)
                .then(() => {
                    alert("Video Updated Successfully");
                    navigate("/admin-dashboard");
                })
                .catch((error) => {
                    console.error("Error updating video:", error);
                    alert("An error occurred while updating the video. Please try again.");
                });
        },
        enableReinitialize: true
    });

    function LoadVideo() {
        axios.get(`${apiUrl}/get-video/${params.id}`)
            .then(response => {
                setVideo(response.data);
            })
            .catch((error) => {
                console.error("Error loading video:", error);
            });
    }

    function LoadCategories() {
        axios.get(`${apiUrl}/get-categories`)
            .then(response => {
                response.data.unshift({ CategoryId: "-1", CategoryName: "Select Category" });
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error loading categories:", error);
            });
    }

    useEffect(() => {
        LoadVideo();
        LoadCategories();
    },[apiUrl]);

    return (
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
                <h3 className="bg-dark text-center p-2 text-white">Edit Video</h3>
                <dl className="row">
                    <dt className="col-3">VideoId</dt>
                    <dd className="col-9"><input type="number" name="VideoId" onChange={formik.handleChange} value={formik.values.VideoId} /></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input type="text" name="Title" onChange={formik.handleChange} value={formik.values.Title} /></dd>
                    <dt className="col-3">Url</dt>
                    <dd className="col-9"><input type="text" name="Url" onChange={formik.handleChange} value={formik.values.Url} /></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9"><input type="textarea" name="Description" onChange={formik.handleChange} value={formik.values.Description} /></dd>
                    <dt className="col-3">Views</dt>
                    <dd className="col-9"><input type="text" name="Views" onChange={formik.handleChange} value={formik.values.Views} /></dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input type="text" name="Likes" onChange={formik.handleChange} value={formik.values.Likes} /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input type="text" name="Dislikes" onChange={formik.handleChange} value={formik.values.Dislikes} /></dd>

                    <dt className="col-3">Category</dt>
                    <dd className="col-9">
                        <select name="CategoryId" onChange={formik.handleChange} value={formik.values.CategoryId}>
                            {categories.map(category => (
                                <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
                            ))}
                        </select>
                    </dd>
                </dl>
                <button type="submit" className="btn btn-success">Save</button>
                <Link className="btn btn-warning" to="/admin-dashboard">Cancel</Link>
            </form>
        </div>
    );
}
