import React, { useEffect, useState } from 'react';
import {styled} from "@mui/material/styles";
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';
import { Typography } from '@mui/material';

const LogoContainer=styled("div")(({theme})=>({
  padding:"0 5%",
  display:"flex",
  justifyContent:"space-around",
  alignItems:"center",
  width:"100%",
  [theme.breakpoints.down("sm")]:{
    flexDirection:"column-reverse",
    textAlign:"center",
  },

}));

 const InfoContainer=styled("div")(({theme})=>({
  display:"flex",
  alignItems:"center",
  justifyContent:"space-around",
  [theme.breakpoints.down("sm")]:{
    flexDirection:"column"
  }
 }));

 const Card=styled("div")(({theme})=>({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  width:"50%",
  padding:"3%",
  borderRadius:10,
  color:"white",
  backgroundColor:"rgba(3,101,192)",
  margin:"0 12px",
  textAlign:"center",
  height:"25vmin",
  [theme.breakpoints.down("sm")]:{
    flexDirection:"column-reverse",
    textAlign:"center",
    height:"initial",
    "&:nth-of-type(1)":{
      marginBottom:"12px"
    }
  }
}));



const LogoImg=styled("img")(({theme})=>({
  height:"27vmin",
  borderRadius:"15%",
  padding:"0 5%",
  margin:"3% 0",
  [theme.breakpoints.down("sm")]:{
    height:"35vmin",
  },

  
}));

const App = () => {
  const [activeArticle,setActiveArticle]=useState(0);
  const [newsArticles,setNewsArticles]=useState([]);

  useEffect(()=>{
    alanBtn({
      key:"28f5842195ad5ffad4506622d66dec792e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand:({command,articles,number})=>{
        if(command==='newHeadlines'){
          setNewsArticles(articles);
          setActiveArticle(-1)
        }
        else if(command==='highlight'){
          setActiveArticle((prev)=>prev+1);
        }
        else if(command==='open'){
          const parsedNumber=number.length>2 ? wordsToNumbers(number,{fuzzy:true}):number
          const article=articles[parsedNumber-1];
          if(parsedNumber>articles.length){
            alanBtn().playText('please ,try that again..');
          }
          else if(article){
            alanBtn().playText("opening...");
          }else{
            alanBtn().playText("please try that again");
          }
          
        }

      },
    });
  });
  return (
    <div>
      <LogoContainer>
        {newsArticles.length ?<InfoContainer>
          <Card>
            <Typography variant="h5" component="h2">
              Try saying :<br/>
              <br/>
              Open article number[4]
            </Typography>
          </Card>
          <Card>
            <Typography variant="h5" component="h2">
              Try saying :<br/>
              <br/>
              GO back
            </Typography>
          </Card>

        </InfoContainer>
        :null
          
         }
         <LogoImg
         src='https://th.bing.com/th/id/OIP.CJyCnZVdr-EfgC27MAdFUQHaE8?w=265&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
         alt='alanai'
        
         />

      </LogoContainer>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  )
};

export default App;