import React, { useEffect, useState } from 'react';
import './VideoCardGrid.css';
import { FaEye } from 'react-icons/fa';
import socket from '../../socket'; 

const VideoCardGrid = () => {
  const [videos, setVideos] = useState([]);


  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/images/');
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

 useEffect(() => {
  fetchVideos();

  socket.on('video-updated', (data) => {
    console.log('Real-time update received!', data);

    setVideos((prevVideos) => {
      const index = prevVideos.findIndex((video) => video.id === data.id);

      if (index !== -1) {
        const updatedVideos = [...prevVideos];
        updatedVideos[index] = { ...updatedVideos[index], ...data };
        return updatedVideos;
      } else {
        return [...prevVideos, data];
      }
    });
  });

  return () => socket.off('video-updated');
}, []);


  return (
    <div className="video-grid">
      {videos.map((video, index) => (
        <div key={index} className="video-card">
          <img src={video.image} alt={video.title} className="thumbnail" />
          <div className="video-info">
            <div className="channel-image">
              <img src={video.channelImage} alt={video.channel} />
            </div>
            <div className="text-content">
              <h4 className="title">{video.title}</h4>
              <p className="channel">{video.channel}</p>
              <p className="details">
                <FaEye className="eye-icon" /> {video.views} • {video.timestamp}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoCardGrid;
