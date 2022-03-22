import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const fetchUrl = "http://localhost:8080";
function Posts(props) {
  const [posts, setposts] = useState([]);
  function getData() {
    return fetch(`${fetchUrl}/articles`).then((res) => res.json());
  }

  useEffect(() => {
    getData().then((data) => setposts(data));
  }, []);

  function CategoryPost(prop) {
    if (prop.post.category === props.category || props.category === "General" ) {
      return (
        <Grid item md={4} xs={12} sm={6} key={prop.post.slug}>
          <Post post={prop.post} />
        </Grid>
      );
    }
    return null;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <CategoryPost post={post} key={post.slug} />
        ))}
      </Grid>
    </Box>
  );
}

export default Posts;
