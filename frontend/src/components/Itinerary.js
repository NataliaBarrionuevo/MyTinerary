import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardMedia from '@mui/material/CardMedia';
import "../styles/details.css";
import { useDispatch, useSelector } from 'react-redux';
import itinerariesActions from '../redux/actions/itinerariesActions';
import { toast } from 'react-toastify';
import { useState } from 'react';
import commentsActions from '../redux/actions/commentsActions'
import { Link as LinkRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-grid-carousel'
import { CardActionArea } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Itinerary({ data, handleSetR }) {

  const [text, setText] = useState("")
  const [modify, setModify] = useState("")

  // console.log(data)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  

  const user = useSelector(store => store.usersReducer.user);

  async function likesOrDislikes() { //llega del boton, osea el boton del itinerario


    const res = await dispatch(itinerariesActions.likeDislike(data._id));
    // console.log(res)
    handleSetR();

    if (res.data.message) {
      toast.success("Thanks for your like!")
    } else {
      toast.error("Bad your dislike 😥")
    }


  }


  //Lo guardamos en una constante para poder usarlo:

  // const itineraries=useSelector(store=>store.itinerariesReducer.getItinerariesByCity);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  async function addComment() {
    const comment = {
      itinerary: data._id,
      comment: text
    }
    const res = await dispatch(commentsActions.addComment(comment));
    // console.log(res)
    setText("");
    handleSetR();
    document.querySelector("#newComment").textContent = "";
    // console.log(text)
    
    if (res.data.success) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }
  }


  async function modifyComment(comment) {
    const commentData = {
      commentID: comment._id,
      comment: modify
    }
    const res = await dispatch(commentsActions.modifyComment(commentData))
    // console.log(res)
    handleSetR();
    if (res.data.success) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }
  }

  async function removeComment(comment) {
    const res = await dispatch(commentsActions.removeComment(comment._id))
    // console.log(res)
    handleSetR();
    if (res.data.success) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }
  }


  return (
    <>

      <Card

        className="cardItinerary">

        <CardHeader

          avatar={
            <img src={data.personPhoto} style={{ "height": "6rem" }} alt="user" className='imagePerson' />

          }

          title={data.itineraryName}

        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Proposed by: {data.personName}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="typografyD">
            Price: {data.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="typografyD">
            Duration ⏲: {data.durationH}
          </Typography>

          <div className='likeDislike'>

            {user ?
              (<button className="btnLikesDislikes" onClick={likesOrDislikes}>{data.likes?.includes(user.id) ?
                <span id="likesSharp" style={{ color: "red", fontSize: "30" }} className="material-symbols-sharp">favorite</span> :
                <span style={{ fontSize: "30" }} className="material-symbols-sharp">favorite_border</span>}</button>)

              : (<button className="btnLikesDislikes" onClick={() => {
                toast.error("Please, Log in to Like")
                setTimeout(function () {
                  navigate("/login", { replace: true })
                }, 1500)

              }

              }><span style={{ fontSize: "30" }} className="material-symbols-sharp">favorite_border</span></button>)}

            <h3 className="likesCounter" style={{ color: "black", fontSize: "30" }}>{data.likes?.length} likes</h3>

          </div>
          
          <Typography variant="body2" color="text.secondary" className="typografyD">

            {data.hashtags.map((hashtag, index) => {
              return (
                <span key={index} className="hashtags">{hashtag}</span>
              )
            })}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>

          <CardContent>

           
<div className="container-activities">
        <Carousel cols={1} rows={1} gap={10} loop autoplay={2000}
          mobileBreakpoint={300}
          responsiveLayout={[
            {
              breakpoint: 760,
              cols: 1,
              rows: 1,
              gap: 5,
              loop: true
            },


          ]}
        >
          {data.activities.map((activity) => 
            <Carousel.Item key={activity._id}>
              <Card sx={{ Width: 100 }}>
                <CardActionArea>
                  <CardMedia
                    // className="cardsCarousel"
                    component="img"
                    height="250"
                    image={activity.image}
                    alt={activity.title}
                  />
                  <CardContent className='name'>
                    <Typography gutterBottom variant="h5" component="div">
                      {activity.title}
                    </Typography>

                  </CardContent>
                </CardActionArea>
              </Card>

            </Carousel.Item>
          )}

        </Carousel>
      </div>
  
            <div className='commentsDetails'>
              <h3>Comments</h3>
              <div>

                <div>
                  {data.comments?.map(comment =>
                    
                    <div key={comment._id}>
                      {/* {console.log(comment)} */}
                      {/* {console.log(user)} */}
                      {comment.userID._id !== user?.id ?

                        <div>
                          <div className='dateNamePhotoComment'>
                            <div className='dateComment'><p>{new Date(comment.date).toUTCString()}</p></div>
                            <div className='namePhoto'>
                              <img className="userImg" src={comment.userID.userPhoto} alt="user" />
                              <p>{comment.userID.firstName} {comment.userID.lastName}</p>
                            </div>

                          </div>
                          <div className='comment'>{comment.comment}</div>
                        </div> :
                        <div>
                          <div className='dateNamePhotoComment'>
                            <div className='dateComment'><p>{new Date(comment.date).toUTCString()}</p></div>
                            <div className='namePhoto'>
                              <img className="userImg" src={comment.userID.userPhoto} alt="user" />
                              <p>{comment.userID.firstName} {comment.userID.lastName}</p>
                            </div>
                          </div>
                          <div>
                            <div className="comment" type="text" contentEditable suppressContentEditableWarning={true} onInput={(event) => setModify(event.currentTarget.textContent)}>{comment.comment}</div>
                            <button className="buttonsDetails blue" onClick={() => modifyComment(comment)} >Edit</button>
                            <button className="buttonsDetails red" onClick={() => removeComment(comment)}>Delete</button>
                          </div>

                        </div>


                      }

                    </div>
                
                  )}
                </div>

                {user ?
                  <div>
                    <div className='leaveAComment'>Leave us your comment below!</div>

                    <div>
                      <div id="newComment" className="comment" type="text" placeholder='Enter your comment here...' contentEditable suppressContentEditableWarning={true} onInput={(event) => setText(event.currentTarget.textContent)} ></div>

                      <button className="buttonsDetails green" onClick={addComment}>Add</button>
                    </div>


                  </div> :
                  <h4 className='makeLogin'>Make <LinkRouter className='linkLoginToComment' to="/login">Log in</LinkRouter> and leave us your comment</h4>
                }

              </div>
            </div>


          </CardContent>
        </Collapse>
      </Card>


    </>
  );

}
