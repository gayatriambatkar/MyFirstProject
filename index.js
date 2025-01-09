const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Gayatri",
    content:
      "I love Myself and the things belogs to only me but love to help others !!",
  },
  {
    id: uuidv4(),
    username: "Gargii_.18",
    content: "Im a happy soul inspired by only me!!",
  },
  {
    id: uuidv4(),
    username: "YugalD",
    content: "I'm Searching for the job role in Software Engineering!!",
  },
  {
    id: uuidv4(),
    username: "Shradha Khapra",
    content:
      "I love to teach such people who are very intrested and always ready to learn!!",
  },
  {
    id: uuidv4(),
    username: "Gayatri Ambatkar",
    content: "I'm Starting new Position as backend developer in the AZLOGICS!!",
  },
  {
    id: uuidv4(),
    username: "Rahul Kumar",
    content: "Im The Rider of the Coding!!",
  },
  {
    id: uuidv4(),
    username: "Aman Bhaiiya",
    content: "I love Teaching!!",
  },
];

// restful API
// to Get IndexPage/or ALL post
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// To create new Post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// To accept the data and post it (to Add the new post)
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// Api To get One post using ID
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// PATCH to update specific post
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

// Route For Edit
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

//Destry/ Delete Operaton to delete specific post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Listening to port: 8080`);
});
