const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");
require('dotenv').config();

// Setup PostgreSQL connection
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route to display all posts
app.get('/', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posts ORDER BY id");
        const postListcur = {};
        result.rows.forEach(post => {
            postListcur[`post${post.id}`] = [post.author, post.title, post.content];
        });
        res.render("index.ejs", { postCnt: result.rowCount, postList: postListcur });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching posts");
    }
});

// Route to display contact page
app.get('/contact', (req, res) => {
    res.render("contact.ejs");
});

// Route to edit a specific post
app.get('/edit-post/:id', async (req, res) => {
    const postId = req.params.id;
    
    try {
        const result = await db.query('SELECT * FROM posts WHERE id = $1', [postId]);
        if (result.rowCount > 0) {
            const post = result.rows[0];
            res.render("editPost.ejs", { postkey: `post${post.id}`, author: post.author, title: post.title, content: post.content });
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching post for editing");
    }
});

// Route to handle post update
app.post('/editPost', async (req, res) => {
    const editedAuthor = req.body["author"];
    const editedTitle = req.body["title"];
    const editedContent = req.body["content"];
    const postKey = req.body["PostId"];
    const postId = postKey.replace("post", ""); 
    
    try {
        await db.query(
            'UPDATE posts SET author = $1, title = $2, content = $3 WHERE id = $4',
            [editedAuthor, editedTitle, editedContent, postId]
        );
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating post");
    }
});

// Route to create a new post
app.get('/new-post', (req, res) => {
    res.render("createPost.ejs");
});

app.post('/submitPost', async (req, res) => {
    const newAuthor = req.body["author"];
    const newTitle = req.body["title"];
    const newContent = req.body["content"];

    try {
        await db.query(
            'INSERT INTO posts (author, title, content) VALUES ($1, $2, $3)',
            [newAuthor, newTitle, newContent]
        );
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating post");
    }
});

// Route to display a specific post
app.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const result = await db.query('SELECT * FROM posts WHERE id = $1', [postId]);
        if (result.rowCount > 0) {
            const post = result.rows[0];
            res.render("post.ejs", { postTitle: post.title, postAuthor: post.author, content: post.content });
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching post");
    }
});

// Route to delete a specific post
app.get('/delete-post/:id', async (req, res) => {
    const postId = req.params.id;
    
    try {
        await db.query('DELETE FROM posts WHERE id = $1', [postId]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting post");
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
