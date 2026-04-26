import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const channelId = 'UC-SjVidMAjolfD6TswB3hMQ';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
      .then((res) => res.json())
      .then((data) => setVideos(data.items || []));
  }, []);

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{maxWidth:'1200px',margin:'auto',padding:'20px'}}>
      <h1 style={{textAlign:'center',background:'#d97706',color:'#fff',padding:'30px',borderRadius:'20px'}}>Sanatan Leela Katha</h1>
      <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search videos..."
        style={{width:'100%',padding:'12px',margin:'20px 0'}}
      />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'20px'}}>
        {filtered.map((v,i)=>(
          <a key={i} href={v.link} target="_blank" style={{textDecoration:'none',color:'#000',boxShadow:'0 0 10px #ccc',padding:'10px'}}>
            <img src={v.thumbnail} style={{width:'100%'}} />
            <h3>{v.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
