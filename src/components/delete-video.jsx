import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function AdminDeleteVideo() {
    let params = useParams();
    let navigate = useNavigate();
    const [videos, setVideo] = useState([{ VideoId: 0, Title: "", Url: "", Description: "", Views: 0, Likes: 0, Dislikes: 0, CategoryId: 0 }]);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/get-video/${params.id}`)
            .then(response => {
                setVideo(response.data);
            })
            .catch(error => console.error("Error fetching video:", error));
    }, [params.id, apiUrl]);

    function handleYesClick() {
        axios.delete(`${apiUrl}/delete-video/${params.id}`)
            .then(() => {
                navigate('/admin-dashboard');
            })
            .catch(error => console.error("Error deleting video:", error));
    }

    return (
        <div className="container-fluid">
            <h3>Delete Video</h3>
            <p>Are you sure?</p>
            <div className="card w-25">
                <iframe src={videos[0].Url} width="100%" title="vidoes" ></iframe>
            </div>
            <div className="card-body">
                {videos[0].Title}
            </div>
            <div className="card-footer">
                <button className="btn btn-success me-2" onClick={handleYesClick}>Yes</button>
                <Link className="btn btn-danger" to="/admin-dashboard">No</Link>
            </div>
        </div>
    );
}
