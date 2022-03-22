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
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";

const fetchUrl = "http://localhost:8080";

function Update() {
  let navigate = useNavigate();
  const location = useLocation();
  const slug = location.state.slug;
  const prevtitle = location.state.title;
  const prevdesc = location.state.desc;

  console.log(prevtitle);
  console.log(prevdesc);

  const [title, settitle] = useState(prevtitle);
  const [desc, setdesc] = useState(prevdesc);
  const [category, setcategory] = useState("General");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function changeCategory(event) {
    setcategory(event.target.value);
  }

  function changeTitle(e) {
    settitle(e.target.value);
    console.log(title);
  }

  function changeDesc(e) {
    setdesc(e.target.value);
  }

  function navHome(){
    navigate(`/home`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let blog = { title: title, description: desc };

    toast("Proccessing your request")
    fetch(`${fetchUrl}/articles/${slug}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((resp) => {
        toast.dismiss();
        toast.success("Blog Updated")
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
      <Typography variant="h1">Edit Blog</Typography>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title : </label>
        <br />
        <TextField
          required
          placeholder="Blog title"
          name="title"
          small
          fullWidth
          value={title}
          onChange={changeTitle}
        />
        <br />
        <label htmlFor="blog">Blog : </label>
        <br />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={17}
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
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Blog Updated"
          action={action}
        />
        <Button variant="contained" color="success" type="submit">
          Update
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

export default Update;
