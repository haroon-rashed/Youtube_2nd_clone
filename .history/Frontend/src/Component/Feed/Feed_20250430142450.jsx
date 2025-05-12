import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_counter } from '../../data';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Add state for error handling

  const fetchData = async () => {
    const videoList_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    console.log("category:", category);
    try {
      const response = await fetch(videoList_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result.items || []);
      console.log(result, "Fetched Data");
    } catch (error) {
      setError('Error fetching data');
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  if (error) {
    return <div className="error-message">{error}</div>; // Display error message if there is an error
  }

  return (
    <div className='feed'>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card" key={index}>
            <img 
              src={item.snippet.thumbnails?.medium?.url || 'path/to/default/thumbnail.png'} 
              alt="thumbnail" 
            />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {value_counter(item.statistics.viewCount)} views &bull; 
              {new Date(item.snippet.publishedAt).toLocaleDateString()}
            </p>
          </Link>
        ))
      ) : (
        <p>Loading videos...</p> // Display loading message when data is still being fetched
      )}
    </div>
  );
};

export default Feed;
