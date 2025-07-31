import './Navbar.scss';

interface NavbarProps {
  user: {
    display_name: string;
    images: { url: string; height?: number; width?: number }[];
  };
}

function Navbar({ user }: NavbarProps) {
  return (
    <nav className="my-nav">
        <div className="icon-container-1">
            <i className="fa-solid fa-chevron-left icon"></i>
            <i className="fa-solid fa-chevron-right icon"></i>
            <i className="fa-solid fa-house icon-home"></i>
            <i className="fa-solid fa-magnifying-glass icon-home input"></i>
        </div>
        <div className="icon-container-2">
            <i className="fa-regular fa-bell icon"></i>
            <i className="fa-solid fa-users icon"></i>
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
