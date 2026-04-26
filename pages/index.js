import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const apiKey = 'AIzaSyAV_WEwUMe8lp7pIEHeuCUl3QovsU2IRac';
    const channelId = 'UC-SjVidMAjolfD6TswB3hMQ';

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`)
      .then(res => res.json())
      .then(data => {
        const onlyVideos = (data.items || []).filter(item => item.id.kind === 'youtube#video');
        setVideos(onlyVideos);
      });
  }, []);

  const filtered = videos.filter(video =>
    video.snippet.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{maxWidth:'1300px',margin:'auto',padding:'20px'}}>
      <h1 style={{textAlign:'center',background:'#d97706',color:'white',padding:'30px',borderRadius:'20px'}}>
        Sanatan Leela Katha
      </h1>

      <div style={{textAlign:'center',margin:'20px'}}>
        <a href="https://www.youtube.com/@Sanatanleelakatha" target="_blank">
          Visit Official YouTube Channel
        </a>
      </div>

      <input
        type="text"
        placeholder="Search videos..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{width:'100%',padding:'12px',marginBottom:'20px'}}
      />

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'20px'}}>
        {filtered.map((video,index)=>(
          <a
            key={index}
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            style={{textDecoration:'none',color:'black',boxShadow:'0 0 10px #ccc',padding:'10px'}}
          >
            <img src={video.snippet.thumbnails.high.url} alt="" style={{width:'100%'}} />
            <h3>{video.snippet.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
