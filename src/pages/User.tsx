import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Post from "../components/Post";
import { Context } from "../context/Context";
import { AiOutlinePlus } from "react-icons/ai";
import './styles/user.scss';
import { Link } from "react-router-dom";
import Header from "../components/Header";

function User() {
  const { state } = useContext(Context);
  const user = state.user;
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(process.env.REACT_APP_API_URL + "posts?user=" + user.username);
      setPosts(response.data);
    };
    fetchPosts();
  }, [user.username]);

  return (
    <div className="user-container">
      <Header>My Account</Header>
      {user ?
        <div className="user">
          <div className="user-info">
            <div className="info-item">
              <span>Email: </span>
              {user.email}
              </div>
            <div className="info-item">
              <span>Username: </span>
              {user.username}
              </div>
          </div>
          <div className="user-posts">
            {posts.length === 0
              ?
              <>
                <div className="posts-alert">You don't have any post yet.</div>
                <Link to='/create' className="link">
                  <Button className='new-btn'>Create New Post</Button>
                </Link>
              </>
              :
              <>
                <div className="posts-options">
                  <div className="posts-alert">
                    My Posts:
                  </div>
                  <Link to='/create' className="link">
                    <div className="new-btn">New<AiOutlinePlus /></div>
                  </Link>
                </div>
                {posts.map(post => (
                  <Post post={post} key={post._id} />
                ))}
              </>
            }
          </div>
        </div>
        :
        404
      }
    </div>
  );
};

export default User;