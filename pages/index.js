import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const channelId = 'UC-SjVidMAjolfD6TswB3hMQ';
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    fetch(feedUrl)
      .then(response => response.text())
      .then(str => {
        const parser = new window.DOMParser();
        const xml = parser.parseFromString(str, "text/xml");
        const entries = Array.from(xml.getElementsByTagName("entry"));

        const items = entries.map(entry => {
          const videoId = entry.getElementsByTagName("yt:videoId")[0]?.textContent;
          const title = entry.getElementsByTagName("title")[0]?.textContent;

          return {
            title: title,
            link: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          };
        });

        setVideos(items);
      });
  }, []);

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{maxWidth:'1300px',margin:'auto',padding:'20px'}}>
      <h1 style={{textAlign:'center',background:'#d97706',color:'#fff',padding:'30px',borderRadius:'20px',fontSize:'48px'}}>
        Sanatan Leela Katha
      </h1>

      <div style={{textAlign:'center',margin:'20px'}}>
        <a href="https://www.youtube.com/@Sanatanleelakatha" target="_blank" style={{background:'#b91c1c',color:'#fff',padding:'12px 25px',textDecoration:'none',borderRadius:'10px',fontSize:'18px'}}>
          Visit Official YouTube Channel
        </a>
      </div>

      <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search videos..."
        style={{width:'100%',padding:'14px',margin:'20px 0',fontSize:'16px'}}
      />

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'20px'}}>
        {filtered.map((v,i)=>(
          <a key={i} href={v.link} target="_blank" style={{textDecoration:'none',color:'#000',boxShadow:'0 0 10px #ccc',padding:'10px',background:'#fff'}}>
            <img src={v.thumbnail} style={{width:'100%'}} />
            <h3>{v.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
