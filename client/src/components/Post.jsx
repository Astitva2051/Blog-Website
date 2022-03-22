import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { RWebShare } from "react-web-share";
import { toast, ToastContainer } from 'react-toastify';

function Post(props) {
  let navigate = useNavigate();
  let desc = props.post.description
  let intro = desc.substr(0,105)
  return (
    <>
    <Card sx={{
        
    }}>
    <CardContent>
      <Typography gutterBottom variant="h5" style={{wordWrap: "break-word"}} component="div">
        {props.post.title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {props.post.category}
      </Typography>
      <Typography variant="body2" color="text.secondary"  style={{wordWrap: "break-word"}}>
        {intro}...
      </Typography>
    </CardContent>
    <CardActions>
    <RWebShare
        sites={["facebook","twitter","copy ","whatsapp","linkedin", "mail"]}
        data={{
          // text: "Like humans, flamingos make friends for life",
          url: `http://localhost:3000/article/read/${props.post.slug}`,
          title: `Share this article on ${props.title}`
        }}
        onClick={() => toast.success("Shared succeefuly")}
      >
      <Button size="small">Share</Button>
      </RWebShare>
      <Button size="small" onClick={()=> navigate(`/read/${props.post.slug}`,{state:{slug: props.post.slug }})}>Read More</Button>
    </CardActions>
  </Card>
  <ToastContainer />
  </>
  )
}

export default Post