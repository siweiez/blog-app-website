import { Link } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import './styles/post.scss';

function Post({ post }: any) {
  return (
    <div className="post">
      <Link to={`/posts/${post._id}`} className="post-link">
        <div className='post-title'>{post.title}</div>
        <div className='post-description'>
          <ReactMarkdown>
          {post.description}
          </ReactMarkdown>
        </div>
      </Link>
      <div className="post-footer">
        <div className='post-footer-left'>
          {post.categories?.map((category: any) => (
            <Link to={`/posts/?category=${category.name}`} className="link" key={category.name}>
              <p className='tag'>{category.name}</p>
            </Link>
          ))}
        </div>
        <div className="post-footer-right">
        <Link to={`/posts/?user=${post.username}`} className="link">
          <div className='post-author'>{post.username}</div>
        </Link>
        <p>&nbsp;|&nbsp;</p>
        {new Date(post.createdAt).toDateString()}
        </div>
      </div>
    </div>
  );
}

export default Post;