import React, { useEffect, useState } from 'react'
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4"
import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"
import save_icon from "../../assets/save.png"
import share from "../../assets/share.png"
import jack from "../../assets/jack.png"
import user_profile from "../../assets/user_profile.jpg"
import { API_KEY } from '../../data';
const PlayVideo = ({videoId}) => {
    const [apiData,setApiData] = useState(null)


    const fetchVideoData = async() =>{
        //Fetching video data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `
        await fetch(videoDetails_url).then(res=>res.json()).then(data=> setApiData(data.items[0]));

    }
    useEffect(()=>{
         fetchVideoData()
    },[])
    return (
    <div className='play-video'>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1 `}frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apiData?apiData.snippet.title: "Title here"}</h3>
      <div className="play-video-info">
      <p>15k views $=&bull; 2 days ago</p>
      <div>
        <span><img src={like} alt="" />125</span>
        <span><img src={dislike} alt="" />2</span>
        <span><img src={save_icon} alt="" />Share</span>
        <span><img src={share} alt="" />Save</span>
      </div>
      </div>
   <hr />
   <div className="publisher">
    <img src={jack} alt="" />
    <div>
        <p>GreatStack</p>
        <span>1M SUBSCRIBER</span>
    </div>
    <button>Subscribe</button>
   </div>
   <div className="vid-description">
    <p>Channel that makes learning Easy</p>
    <p>Subscribe GreatStack to watch more Web devolpment toturials</p>
    <hr />
    <h4>130 Comments</h4>
    <div className="comment">
        <img src={user_profile} alt="" />
        <div>
            <h1>Ahmad Hassan <span>2 days ago</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, amet inventore pariatur mollitia ullam earum!</p>
            <div className="comment-action">
                <img src={like} alt="" />
                <span>240</span>
                <img src={dislike} alt="" />
            </div>
        </div>

    </div>
    <div className="comment">
        <img src={user_profile} alt="" />
        <div>
            <h1>Ahmad Hassan <span>2 days ago</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, amet inventore pariatur mollitia ullam earum!</p>
            <div className="comment-action">
                <img src={like} alt="" />
                <span>240</span>
                <img src={dislike} alt="" />
            </div>
        </div>

    </div>
    <div className="comment">
        <img src={user_profile} alt="" />
        <div>
            <h1>Ahmad Hassan <span>2 days ago</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, amet inventore pariatur mollitia ullam earum!</p>
            <div className="comment-action">
                <img src={like} alt="" />
                <span>240</span>
                <img src={dislike} alt="" />
            </div>
        </div>

    </div>
    <div className="comment">
        <img src={user_profile} alt="" />
        <div>
            <h1>Ahmad Hassan <span>2 days ago</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, amet inventore pariatur mollitia ullam earum!</p>
            <div className="comment-action">
                <img src={like} alt="" />
                <span>240</span>
                <img src={dislike} alt="" />
            </div>
        </div>

    </div>
    <div className="comment">
        <img src={user_profile} alt="" />
        <div>
            <h1>Ahmad Hassan <span>2 days ago</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, amet inventore pariatur mollitia ullam earum!</p>
            <div className="comment-action">
                <img src={like} alt="" />
                <span>240</span>
                <img src={dislike} alt="" />
            </div>
        </div>

    </div>
   </div>
    </div>
  )
}

export default PlayVideo
