import { useState } from "react";
import "./Sidebar.scss";

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface SidebarProps {
  playlists: Playlist[];
  onSelect: (id: string) => void;
}

const Sidebar = ({ playlists, onSelect }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-header">
        <button onClick={() => setExpanded(!expanded)} className="toggle-btn" title="Toggle sidebar">
          <i className="fa-solid fa-swatchbook"></i>
        </button>
        <button className="add-btn" title="Crea playlist">
          <i className="fa-solid fa-plus plus"></i>
        </button>
      </div>

      <ul className="playlist-list">
        {playlists.map((pl) => (
          <li key={pl.id} className="playlist-item" onClick={() => onSelect(pl.id)}>
            {pl.images?.[0]?.url && (
              <img src={pl.images[0].url} alt={pl.name} className="playlist-cover" />
            )}
            {expanded && <span className="playlist-name">{pl.name}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
