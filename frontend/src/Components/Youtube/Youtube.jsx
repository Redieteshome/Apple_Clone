import React,{useEffect, useState}from 'react'
import {youTubeVideoData} from "./data"
import "./youtube.css"
function Youtube() {
    const [youTubeVideos,setVideo] = useState([])

    useEffect(()=>{
        // fetch(
        //   "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBI7vjtTYP2WBs0Z_Xg2j9_yzZxNv0sEso&channelId=UCE_M8A5yxnLfW0KghEeajjw&part=snippet,id&order=date&maxResults=8"
        // )
        //   .then((response) => response.json())
        //   .then((data) => {
        //     const videosData = data.items;

        //     setVideo(videosData);

            setVideo(youTubeVideoData)
          // })
        //   .catch((err) => console.log("Error fetching YouTube API:", err));
    },[])
    
    // console.log(youTubeVideos)
    return (
      <>
        <div className="allVideoContainer">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-12">
                <div className="title-wraper bold video-title-container">
                  Latest Video
                </div>
              </div>
              {youTubeVideos.map((singleVideo) => {
                let videoId = singleVideo.id.videoId;
                let videoLink = `https://www.youtube.com/watch?v=${videoId}`;

                let videoCover = (
                  <div key={videoId} className="col-sm-12 col-md-6">
                    <div className="singleVideo">
                      <div className="Thumbnail">
                        <a href={videoLink}>
                          <img
                            src={singleVideo.snippet.thumbnails.high.url}
                            alt="FrontPhoto"
                          />
                        </a>
                      </div>

                      <div className="videoInfoWrapper">
                        <div className="title">
                          <a href={videoLink}>{singleVideo.snippet.title}</a>
                        </div>

                        <div className="description p-3">
                          {singleVideo.snippet.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
                return videoCover;
              })}

          
            </div>
          </div>
        </div>
      </>
    );
}

export default Youtube