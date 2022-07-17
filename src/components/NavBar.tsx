import './styles/navbar.scss';
import { IoSearchOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';

function NavBar() {
  const { state, dispatch } = useContext(Context);
  const user = state.user;
  const [searchInput, SetSearchInput] = useState("");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="bar-left">
        <Link to='/' className="link">
          <p className="bar-item">Siwei's Blog</p>
        </Link>
        <div className="bar-item search-bar">
          <input
            className='search-input'
            type='text'
            placeholder='Search posts...'
            onChange={e => SetSearchInput(e.target.value)}
          />
          <Link to={`/posts/?search=${searchInput}`} className="link">
            <IoSearchOutline className='icon-search' />
          </Link>

        </div>
      </div>
      <div className='bar-right'>
        <Link to='/posts' className="link">
          <div className="bar-item bar-right-item">Posts</div>
        </Link>
        <Link to='/about' className="link">
          <div className="bar-item bar-right-item">About</div>
        </Link>
        {user ?
          <div className="bar-item bar-right-item bar-account-container" >
            <div className="bar-account-item">{user.username}</div>
            <div className="dropdown-menu">
              <ul>
                <Link to='/user' className="link">
                  <li>Profile</li>
                </Link>
                <Link to='/create' className="link">
                  <li>Create Post</li>
                </Link>
                <li onClick={handleLogout}>Log out</li>
              </ul>
            </div>
          </div>
          :
          <Link to='/login' className="link">
            <div className="bar-item bar-right-item">Login</div>
          </Link>
        }
      </div>
    </div>
  );
}

export default NavBar;