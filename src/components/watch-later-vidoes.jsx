import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function WatchLater() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const apiUrl = process.env.REACT_APP_API_URL;

    function LoadVideos() {
        
        axios.get(`${apiUrl}/get-saved-videos`)
            .then(response => {
                setVideos(response.data);
                setLoading(false); 
            })
            .catch(error => {
                console.error("Error loading videos:", error);
                setError("Error loading videos. Please try again later.");
                setLoading(false); 
            });
    }

    useEffect(() => {
        LoadVideos();
    },[]);

    if (loading) return <div className="container-fluid py-2"><h3 className="text-center mb-4">Loading Saved Videos...</h3></div>;
    if (error) return <div className="container-fluid py-2"><h3 className="text-center mb-4">{error}</h3></div>;

    return (
        <div className="container-fluid py-2">
            <h3 className="text-center mb-4">Saved Videos</h3>

            <div className="gx-2 gy-4 justify-content-center align-items-center flex-wrap m-5">
                {videos.map((video, index) => (
                    <div className="" key={video.VideoId || index}>
                        <div className="card w-100 shadow-sm h-100" style={{ maxWidth: "500px" }}>
                            <div className="card-header p-0">
                                <iframe className="w-100" src={video.Url} height="200" style={{ border: "none" }} title={video.Title}></iframe>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-truncate">{video.Title}</h5>
                            </div>

                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <button className="btn btn-outline-primary btn-sm bi-eye-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Views"> {video.Views?.toLocaleString() || "0"}</button>
                                <button className="btn btn-outline-success btn-sm bi-hand-thumbs-up" data-bs-toggle="tooltip" data-bs-placement="top" title="Like"> {video.Likes?.toLocaleString() || "0"}</button>
                                <button className="btn btn-outline-danger btn-sm bi-hand-thumbs-down" data-bs-toggle="tooltip" data-bs-placement="top" title="Dislikes"> {video.Dislikes?.toLocaleString() || "0"}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="sticky-bottom float-end">
                <Link to="/user-dashboard" className="btn btn-dark text-center bi bi-arrow-left">Back</Link>
            </footer>
        </div>
    );
}
