import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

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
  const filtered = videos.filter(v=>v.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="container">
      <header className="hero">
        <h1>Sanatan Leela Katha</h1>
        <p>अनंत कथाएँ • दिव्य लीलाएँ • सनातन ज्ञान</p>
      </header>
      <div className="searchbox"><Search size={18}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search videos..."/></div>
      <div className="grid">
        {filtered.map((v,i)=><a key={i} href={v.link} target="_blank" className="card"><img src={v.thumbnail}/><h3>{v.title}</h3></a>)}
      </div>
    </div>
  )
}