import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Navigator.css';
import icon from '../Images/Main Icon.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drop, setDrop] = useState("none");
  

  
  const userId = sessionStorage.getItem('userid');
  const ProfilePic = sessionStorage.getItem('ProfilePic');
  const userName=sessionStorage.getItem('username');
  const token = sessionStorage.getItem('token');
  const allowedRoutes = useMemo(() => ["/", "/Register"], []);  


  const shouldRedirect = useMemo(() => {
    return !token && !allowedRoutes.includes(location.pathname);
  }, [token, location.pathname, allowedRoutes]);

  if (shouldRedirect) {
    navigate("/");
  }

  const toggleDropDown = () => {
    setDrop(drop === "none" ? "block" : "none");
  };

  const handleMouseLeave = () => {
    setDrop("none");
  };




  return (
    <>
      <div className="header-container">
        <div className="nav">
          <div className="logo-container">
            <img src={icon} alt="Logo" height={120} width={200} />
          </div>

          <ul>
            <li>
              <Link className="nav-link" to="/main">Home</Link>
            </li>
            <li>
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li>
              <Link className="nav-link" to="/Products/Grocery">Products</Link>
            </li>
            <li>
              <Link className="nav-link" to={`/ContactUs/${userId}`}>Contact Us</Link>
            </li>
          </ul>

          <div onMouseOver={toggleDropDown} className="profileMenu">
            <img width="30" height="30" src="https://img.icons8.com/material-two-tone/24/menu--v1.png" alt="menu" />
          </div>
        </div>
      </div>

      <div className="profile-dropdown" style={{ display: drop }} onMouseLeave={handleMouseLeave}>
        <ul>
          <Link to={`/adminP/${userId}`}>
            <li>
              {ProfilePic ? (
                <img style={{ borderRadius: '60rem' }}
                  width="20"
                  height="20"
                  src={ProfilePic}
                  alt="profile"
                />
              ) : (
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-filled/50/user-male-circle.png"
                  alt="default profile"
                />
              )}
                 {userName ? userName :'Profile Admin'}
           
            </li>
          </Link>

          <Link to={`${userId}/ShopingCart`}><li><img width="20" height="20" src="https://img.icons8.com/ios/50/shopping-mall.png" alt="orders" /> Cart</li></Link>
          <Link to={`${userId}/Favorites`}><li><img width="20" height="20" src="https://img.icons8.com/ios/50/favorites.png" alt="favorites" /> Favorites</li></Link>
          <Link to={'/'} >
          <li onClick={() => {
       sessionStorage.removeItem('token');
       sessionStorage.removeItem('userId');
       sessionStorage.removeItem('username');
       sessionStorage.removeItem('ProfilePic');

          }}>
            <img width="20" height="20" src="https://img.icons8.com/windows/32/exit.png" alt="logout" /> Log out
          </li>
        </Link>
        </ul>
      </div>

      <ul className='dropdown2'>
        <Link to={`/adminP/${userId}`}>
          <li>
            {ProfilePic ? (
              <img style={{ borderRadius: '60rem', marginRight: '5px' }}
                width="20"
                height="20"
                src={ProfilePic}
                alt="profile"
              />
            ) : (
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/ios-filled/50/user-male-circle.png"
                alt="default profile"
              />
            )}
                 {userName ? userName :'Profile Admin'}
          </li>
        </Link>
        <Link to={`${userId}/ShopingCart`}><li><img width="20" height="20" src="https://img.icons8.com/ios/50/shopping-mall.png" alt="orders" /> Cart</li></Link>
        <Link to={`${userId}/Favorites`}><li><img width="20" height="20" src="https://img.icons8.com/ios/50/favorites.png" alt="favorites" /> Favorites</li></Link>
        <Link to={'/'} >
          <li onClick={() => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('ProfilePic');
            

          }}>
            <img width="20" height="20" src="https://img.icons8.com/windows/32/exit.png" alt="logout" /> Log out
          </li>
        </Link>
      </ul>
    </>
  );
};

export default Header;
