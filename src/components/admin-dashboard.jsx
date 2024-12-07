import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AdminDashboard() {
    const [videos, setVideos] = useState([
        { VideoId: 0, Title: "", Url: "", Description: "", Views: 0, Likes: 0, Dislikes: 0, CategoryId: 0 }
    ]);

    const apiUrl = process.env.REACT_APP_API_URL; 

    function LoadVideos() {
        axios
            .get(`${apiUrl}/get-videos`)  
            .then((response) => {
                setVideos(response.data);
            })
            .catch((error) => console.error("Error Fetching the Videos", error));
    }

    useEffect(() => {
        LoadVideos();
    }, []);

    return (
        <div className="container">
            <h5 className="bg-dark p-2 text-light text-center">Admin Dashboard</h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/add-video" className="btn btn-danger">
                    <i className="bi bi-camera-video-fill"></i> Add New
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Info</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video) =>
                            video.VideoId ? (<tr key={video.VideoId}><td className="h6">{video.Title}</td>
                            <td><iframe title="video" width="100%" height="200"src={video.Url} className="rounded border" style={{ maxWidth: "400px" }}></iframe>
                            </td>
                            <td className="h6">
                                <div>Views: {video.Views}</div>
                                <div>Likes: {video.Likes}</div>
                                <div>Dislikes: {video.Dislikes}</div>
                            </td>
                            <td>
                            <Link to={`/edit-video/${video.VideoId}`} className="btn btn-warning btn-sm me-2">
                            <i className="bi bi-pen"></i> Edit
                            </Link>
                            <Link to={`/delete-video/${video.VideoId}`} className="btn btn-danger btn-sm">
                             <i className="bi bi-trash-fill"></i> Delete
                            </Link>
                            </td>
                            </tr>
                            ) : null
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
