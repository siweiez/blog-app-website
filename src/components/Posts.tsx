import Post from './Post';
import './styles/posts.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineMeh } from "react-icons/ai";
import Pagination from './Pagination';

function Posts() {
  const postsPerPage = 8;

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPagePosts, setCurrentPagePosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useLocation();
  // search can be:
  // "?user=user1"
  // "?category=cat"
  // "?search=helo"

  function sortByDate(itemA: any, itemB: any) {
    const dateA = new Date(itemA.createdAt), dateB = new Date(itemB.createdAt);
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  }

  useEffect(() => {
    const setTotalPosts = async () => {
      // const rootUrl = "http://localhost:5000/api/";
      const result = await axios.get((process.env.REACT_APP_API_URL + "posts/" + search));
      setPosts(result.data.sort(sortByDate));
      setCurrentPagePosts(result.data.sort(sortByDate).slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage));
      setLoading(false);
    }
    setTotalPosts();
  }, [search]);

  const slicePosts = (page: number) => {
    setCurrentPagePosts(posts.slice((page - 1) * postsPerPage, page * postsPerPage));
  };

  return (
    <div className="posts">
      {loading ?
        <div>
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
          <div className="posts-alert">Loading Posts...</div>
        </div>
        :
        <div>
          {
            (currentPagePosts.length > 0) ?
              currentPagePosts.map((post) => (
                <Post post={post} key={post._id} />
              ))
              :
              <div className='posts-alert'>
                <AiOutlineMeh className='icon' />
                <p>There is no any post...</p>
              </div>
          }
          <Pagination
            totalPostsAmount={posts.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            slicePosts={slicePosts} />
        </div>
      }
    </div>
  );
}

export default Posts;