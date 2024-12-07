require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const conString = process.env.MONGO_URI;
console.log("MONGO URI:", conString);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const connectToDb = async () => {
    try {
        const client = await MongoClient.connect(conString, { useNewUrlParser: true, useUnifiedTopology: true });
        return client.db("react-video-library");
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Could not connect to the database");
    }
};

app.get("/get-users", async (req, res) => {
    try {
        const db = await connectToDb();
        const users = await db.collection("users").find({}).toArray();
        res.send(users);
    } catch (error) {
        res.status(500).send("Error fetching users");
    }
});

app.post("/register-user", async (req, res) => {
    const { UserId, UserName, Password, Email, Mobile } = req.body;
    const user = { UserId, UserName, Password, Email, Mobile };

    try {
        const db = await connectToDb();
        await db.collection("users").insertOne(user);
        console.log('User Registered');
        res.send('User registered successfully');
    } catch (error) {
        res.status(500).send("Error registering user");
    }
});

app.get("/get-categories", async (req, res) => {
    try {
        const db = await connectToDb();
        const categories = await db.collection("categories").find({}).toArray();
        res.send(categories);
    } catch (error) {
        res.status(500).send("Error fetching categories");
    }
});

app.get("/get-videos", async (req, res) => {
    try {
        const db = await connectToDb();
        const videos = await db.collection("videos").find({}).toArray();
        res.send(videos);
    } catch (error) {
        res.status(500).send("Error fetching videos");
    }
});

app.get("/get-videos/category/:CategoryId", async (req, res) => {
    const categoryId = parseInt(req.params.CategoryId);
    try {
        const db = await connectToDb();
        const videos = await db.collection("videos").find({ CategoryId: categoryId }).toArray();
        res.send(videos);
    } catch (error) {
        res.status(500).send("Error fetching videos for category");
    }
});

app.post("/saved-videos", async (req, res) => {
    const video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.Dislikes),
        Views: parseInt(req.body.Views),
        CategoryId: parseInt(req.body.CategoryId),
    };

    try {
        const db = await connectToDb();
        await db.collection("savedvideos").insertOne(video);
        console.log("Video saved to watch later");
        res.send("Video saved successfully");
    } catch (error) {
        res.status(500).send("Error saving video");
    }
});

app.get("/get-saved-videos", async (req, res) => {
    try {
        const db = await connectToDb();
        const savedVideos = await db.collection("savedvideos").find({}).toArray();
        res.send(savedVideos);
    } catch (error) {
        res.status(500).send("Error fetching saved videos");
    }
});

app.post("/add-video", async (req, res) => {
    const video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.Dislikes),
        Views: parseInt(req.body.Views),
        CategoryId: parseInt(req.body.CategoryId),
    };

    try {
        const db = await connectToDb();
        await db.collection("videos").insertOne(video);
        console.log("Video added successfully");
        res.send("Video added successfully");
    } catch (error) {
        res.status(500).send("Error adding video");
    }
});

app.put("/edit-video/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.Dislikes),
        Views: parseInt(req.body.Views),
        CategoryId: parseInt(req.body.CategoryId),
    };

    try {
        const db = await connectToDb();
        await db.collection("videos").updateOne({ VideoId: id }, { $set: video });
        console.log("Video updated successfully");
        res.send("Video updated successfully");
    } catch (error) {
        res.status(500).send("Error updating video");
    }
});

app.delete("/delete-video/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const db = await connectToDb();
        await db.collection("videos").deleteOne({ VideoId: id });
        console.log("Video deleted");
        res.send("Video deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting video");
    }
});

const PORT = process.env.PORT || 1304;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
