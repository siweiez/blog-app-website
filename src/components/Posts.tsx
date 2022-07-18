import Post from './Post';
import './styles/posts.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineMeh } from "react-icons/ai";

function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const { search } = useLocation();
  // search can be:
  // "?user=user1"
  // "?category=cat"
  // "?search=helo"

  useEffect(() => {
    const fetchPosts = async () => {
      // const rootUrl = "http://localhost:5000/api/";
      const response = await axios.get((process.env.REACT_APP_API_URL + "posts/" + search));
      const sortedPosts = response.data.sort(function (a: any, b: any) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
        // Compare the 2 dates
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
      });
      setPosts(sortedPosts);
    };
    fetchPosts();
  }, [search]);

  return (
    <div className="posts">
      {posts.length !== 0
        ?
        posts.map((post) => (
          <Post post={post} key={post._id} />
        ))
        :
        <div className='empty-alert'>
          <AiOutlineMeh className='icon' />
          <p>There is no any post...</p>
        </div>
      }
    </div>
  );
}

export default Posts;