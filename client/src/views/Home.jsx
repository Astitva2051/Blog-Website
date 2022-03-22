import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import Posts from "../components/Posts";
import Header from "../components/Header";


function Home() {
  let navigate = useNavigate();
  const [category, setcategory] = useState("General");

  function changeCategory(newcategory) {
    setcategory(newcategory);
  }

  return (
    <>
    <Header />
      <Box sx={{ paddingLeft: 2, marginTop: 10 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/create")}
        >
          Write Blog
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: 2,
        }}
      >
        <Grid container spacing={2} sx={{ paddingInline: 2 }}>
          <Grid item md={2} xs={12} sm={3}>
            <Category callback={changeCategory} />
          </Grid>
          <Grid item md={10} xs={12} sm={8.5}>
            <Posts category={category} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
