import React,{useState,useEffect,createRef} from 'react';
import { Card,CardActionArea,CardActions,CardContent,CardMedia,Button,Typography } from '@mui/material';
import useStyles from "./style"




const NewsCard = ({article:{description,publishedAt,source,title,url,urlToImage},activeArticle,i}) => {
  const classes=useStyles()
  const [elRefs,setElRefs]=useState([]);
  const scrollToRef=(ref)=>window.scroll(0,ref.current.offsetTop-50)
  
  useEffect(()=>{
    window.scroll(0,0);
    setElRefs((refs)=>Array(20).fill().map((_,j)=>refs[j]|| createRef()))
  },[])

 useEffect(()=>{
  if(i===activeArticle && elRefs[activeArticle]){
    scrollToRef(elRefs[activeArticle])

  }
 },[i,activeArticle,elRefs])
  return <Card ref={elRefs[i]} className={activeArticle=== i ? classes.activeCard:classes.card}>
    <CardActionArea href={url} target='="_blank'>
      <CardMedia  className={classes.media} image={urlToImage|| "https://www.bing.com/images/search?view=detailV2&ccid=%2bdYCJ95D&id=A36B2990B2D9410922DBD6D11F6BC792A3EA62C2&thid=OIP.-dYCJ95Do3BKJt_c4kYVZgHaCP&mediaurl=https%3a%2f%2fwww.etontravel.com%2fimagic%2fuserfiles%2fnews-banner-cropped-6.jpg%3ftemplate%3dbanner&exph=1082&expw=3583&q=News+Banner&simid=607997276032796098&FORM=IRPRST&ck=DBA4389947E7EFF4261778DF9371ECEB&selectedIndex=110"
      } title={title} />
      <div className={classes.details}>
        <Typography variant="body2" color="GrayText" component="h2">
          {new Date(publishedAt).toDateString()}
        </Typography>
        <Typography variant="body2" color="GrayText" component="h2">
          {source.name}
        </Typography>

      </div>
      <Typography  className={classes.title} gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <CardContent>
        <Typography variant="body2" component="p">
          {description}
        </Typography>

      </CardContent>
    </CardActionArea>
    <CardActions className={classes.CardActions}>
      <Button size="small" color="primary" href={url}>
        Learn More
      </Button>
      <Typography variant="h5" component="h2">{i+1}</Typography>
    </CardActions>

  </Card>
    
  
};

export default NewsCard;