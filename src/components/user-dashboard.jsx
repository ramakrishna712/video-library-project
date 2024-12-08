import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToSaveList } from "../slicers/video-slicer";
import { Link } from "react-router-dom";

export function UserDashBoard() {
  const [cookies] = useCookies(['user-id']);
  const [categories, setCategories] = useState([{ CategoryId: 0, CategoryName: "" }]);
  const [videos, setVideos] = useState([
    { VideoId: 0, Title: "", Url: "", Description: "", Views: 0, Likes: 0, Dislikes: 0, CategoryId: 0 }
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [savedVideos, setSavedVideos] = useState([])
  const apiUrl = process.env.REACT_APP_API_URL;

 
  const dispatch = useDispatch();

  function LoadCategories() {
    axios.get(`${apiUrl}/get-categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error loading categories:", error.message);
      });
  }

  function LoadVideos(CategoryId) {
    axios.get(`${apiUrl}/get-videos/category/${CategoryId}`)
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error("Error loading videos:", error.message);
      });
  }

  function LoadAllVideos() {
    axios.get(`${apiUrl}/get-videos`)
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error("Error loading all videos:", error.message);
      });
  }

  function LoadSavedVideos() {
    axios.get(`${apiUrl}/get-saved-videos`)
      .then(response => {
        setSavedVideos(response.data);
      })
      .catch(error => {
        console.error("Error loading saved videos:", error.message);
      });
  }

  function WatchLater(video) {
    if (savedVideos.some(saved => saved.VideoId === video.VideoId)) {
      alert("This video is already in your Watch Later List.");
      return;
    }
    dispatch(addToSaveList(video));

    axios.post(`${apiUrl}/saved-videos`, video)
      .then(() => {
        alert("Video saved to Watch Later.");
        setSavedVideos(prev => [...prev, video]);
      })
      .catch(error => {
        console.error("Error saving video to Watch Later:", error.message);
      });
  }

  useEffect(() => {
    LoadCategories();
    LoadAllVideos();
  },[]);

  useEffect(() => {
    LoadSavedVideos(); 
  },[]);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      LoadVideos(selectedCategoryId);
    } else {
      LoadAllVideos();
    }
  }, [selectedCategoryId]);

  return (
    <div className="container-fluid">
      <header className="d-flex p-2 bg-dark text-light justify-content-between align-items-center">
        <div className="h3 ms-3">User Dashboard</div>
        <div className="h5 text-danger me-3 bi bi-person"> User-{cookies["user-id"]}</div>
        <Link to="/watch-later" className="btn tex btn-light btn-sm bi-clock"> Watch Later</Link>
      </header>

      <div className="d-flex justify-content-around col-12 mt-3 mb-4">
        {
          categories.map(category => (
            <div
              className={`w-100 btn  btn-outline-light   p-2 ${selectedCategoryId === category.CategoryId ? "bg-danger" : "border"} text-dark`}
              key={category.CategoryId}
              onClick={() => setSelectedCategoryId(category.CategoryId)}
            >
              {category.CategoryName}
            </div>
          ))
        }
      </div>

      <main className="row">
        {videos.map((video) => (
          <div key={video.VideoId} className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
            <div className="card">
              <div className="card-header p-0" style={{ height: "220px" }}>
                <iframe src={video.Url} width="100%" height="200" title="videos" allowFullScreen></iframe>
              </div>
              <div className="fw-bold card-body text-center">{video.Title}</div>
              <div className="card-footer d-flex justify-content-around">
                <button className="bi bi-eye btn btn-light">{video.Views}</button>
                <button className="bi bi-hand-thumbs-up btn btn-light">{video.Likes}</button>
                <button className="bi bi-hand-thumbs-down btn btn-light">{video.Dislikes}</button>
                <button className="btn btn-info btn-sm" onClick={() => WatchLater(video)}>Watch Later</button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
