import {
  Box,
  TextareaAutosize,
  Button,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const fetchUrl = "http://localhost:8080";

function Create() {
  let navigate = useNavigate();
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [category, setcategory] = useState("General");

  const {username} = useAuth();

  function changeCategory(event) {
    setcategory(event.target.value);
  }

  function changeTitle(e) {
    settitle(e.target.value);
  }

  function changeDesc(e) {
    setdesc(e.target.value);
  }

  function navHome(){
    navigate(`/home`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log({username})
    let blog = {
      title: title,
      author: username,
      description: desc,
      category: category,
    };
    toast("Proccessing your request")
    fetch(`${fetchUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => {
        res.json();
        console.log(res);
      })
      .then((resp) => {
        console.log(resp);
        toast.dismiss();
        toast.success("Blog Created");
        setTimeout(navHome, 1500);
      }).catch((err)=>toast(err.message));
  }

  return (
    <>
    <Header />
    <Box
      sx={{
        marginTop: 9,
        marginInline: 25,
        width: "50%",
      }}
    >
      <Typography variant="h1">Create Blog</Typography>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title : </label>
        <br />
        <TextField
          required
          placeholder="Blog title"
          name="title"
          small = "true"
          fullWidth
          value={title}
          onChange={changeTitle}
        />
        <br />
        <label htmlFor="blog">Blog : </label>
        <br />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={15}
          placeholder="Tell your story..."
          name="description"
          required
          value={desc}
          onChange={changeDesc}
          style={{ width: 750 }}
        />
        <br />
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={category}
          label="Category"
          placeholder="Category"
          onChange={changeCategory}
        >
          <MenuItem value="General">General</MenuItem>
          <MenuItem value="Technology">Technology</MenuItem>
          <MenuItem value="Music">Music</MenuItem>
          <MenuItem value="Fashion">Fashion</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
        </Select>
        <br />
        <br />

        <Button variant="contained" color="success" type="submit">
          Publish
        </Button>
        
        <Button variant="contained" color="error" onClick={() => navigate("/")} sx={{ marginLeft: 2 }}>
          Cancel
        </Button>
      </form>
      <ToastContainer />
    </Box>
    </>
  );
}

export default Create;
