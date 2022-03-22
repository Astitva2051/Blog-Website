import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const fetchUrl = "http://localhost:8080";

function Read() {
  let navigate = useNavigate();
  const location = useLocation();
  const slug = location.state.slug;
  const [post, setpost] = useState("");

  const { username } = useAuth();

  function navHome() {
    navigate(`/home`);
  }

  function handleDelete() {
    fetch(`${fetchUrl}/articles/${slug}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((resp) => {
        toast.warning("Blog deleted");
        setTimeout(navHome, 1500);
      });
  }

  useEffect(() => {
    function getPost() {
      return fetch(`${fetchUrl}/articles/${slug}`)
        .then((res) => res.json())
        .then((data) => setpost(data));
    }
    getPost();
  }, [slug]);

  return (
    <>
      <Header />
      <Box sx={{ margin: 10, marginRight: 10 }}>
        <Typography variant="h6" display="inline" color="text.secondary">
          Author:{" "}
        </Typography>
        <Typography variant="h6" display="inline" color="text.secondary">
          {post.author}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {post.createdAt}
        </Typography>
        <br />

        {username === post.author || username === "admin" ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                navigate(`/update/${slug}`, {
                  state: {
                    slug: slug,
                    title: post.title,
                    desc: post.description,
                  },
                })
              }
            >
              Edit Blog
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{ marginLeft: 2 }}
            >
              Delete Blog
            </Button>
          </>
        ) : null}

        <br />
        <Typography variant="h3">{post.title}</Typography>
        <br />
        <Typography>{post.description}</Typography>
        <ToastContainer />
      </Box>
    </>
  );
}

export default Read;
