import { useState } from 'react';
import './Navbar.scss';

interface NavbarProps {
  user: {
    display_name: string;
    images: { url: string; height?: number; width?: number }[];
  };
}

function Navbar({ user }: NavbarProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className={`my-nav ${showSearch ? 'search-active' : ''}`}>
      <div className="icon-container-1">
        <i className="fa-solid fa-chevron-left icon" title="Indietro"></i>
        <i className="fa-solid fa-chevron-right icon" title="Avanti"></i>
        <i className="fa-solid fa-house icon-home" title="Home"></i>

        <div className={`search-wrapper ${showSearch ? 'expanded' : ''}`}>
          <input
            type="text"
            className={`search-input ${showSearch ? 'visible' : ''}`}
            placeholder="Cosa vuoi ascoltare?"
          />
          <i
            className={`fa-solid fa-magnifying-glass search-icon icon-home input ${showSearch ? 'active' : ''}`}
            title={showSearch ? 'Chiudi ricerca' : 'Apri ricerca'}
            onClick={() => setShowSearch(prev => !prev)}
          ></i>
          {showSearch && (
            <div className="search-addon">
              <span className="divider"></span>
              <i className="fa-solid fa-box-archive archive-icon" title="Archivio"></i>
            </div>
          )}
        </div>
      </div>

      <div className="icon-container-2">
        <i className="fa-regular fa-bell icon" title="Notifiche"></i>
        <i className="fa-solid fa-users icon" title="Gruppi"></i>
        <div className="user-profile">
          {user.images?.[0]?.url && (
            <img
              src={user.images[0].url}
              alt={user.display_name}
              className="profile-img"
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
