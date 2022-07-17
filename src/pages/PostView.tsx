import './styles/postview.scss';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import axios from 'axios';
import { Context } from '../context/Context';

function PostView() {
  const { state } = useContext(Context);
  const user = state.user;

  const [post, setPost] = useState({
    _id: null,
    title: "",
    username: "",
    description: "",
    createdAt: "",
    categories: []
  });
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get("/posts/" + postId);
      setPost(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setCategories(response.data.categories);
    }
    getPost();
  }, [postId]);

  const handleDelete = async () => {
    if (user.username === post.username) {
      try {
        await axios.delete(`/posts/${post._id}`, {
          data: { username: user.username },
        });
        window.location.replace("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  }

  const handleNewTag = () => {
    const newTag = { name: tag };
    setCategories([...categories, newTag]);
  }

  function handleDeleteTag(tag: string) {
    const newCats = categories.filter(t => t.name !== tag);
    setCategories(newCats);
  }

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        description,
        categories
      });
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }

  }

  return (
    post &&
    <div className="postview">
      {editMode ?
        <div className="edit-mode">
          <form className="edit-form" onSubmit={handleEditSubmit}>
            <div className="edit-title edit-form-item">
              <input
                type="text"
                className='edit-title-input input-item'
                onChange={e => setTitle(e.target.value)}
                defaultValue={title}
                placeholder="Title"
              >
              </input>
            </div>
            <div className="edit-form-item edit-tags">
              <ul>
                {categories?.map(t => (
                  <li key={t.name}>
                    {t.name}
                    <TiDeleteOutline className="icon" onClick={() => handleDeleteTag(t.name)} />
                  </li>
                ))}
              </ul>
              <div className="post-tags-right">
                <input
                  className="tag-input"
                  type="text"
                  placeholder="Tag"
                  onChange={e => setTag(e.target.value)}
                />
                <IoAddCircleOutline onClick={handleNewTag} className="icon" />
              </div>
            </div>
            <div className="edit-content edit-form-item">
              <textarea
                className='edit-content-input input-item'
                onChange={e => setDescription(e.target.value)}
                defaultValue={description}
                placeholder="Text here..."
              >
              </textarea>
            </div>
            <button className="edit-submit-button edit-form-item" type="submit">Save</button>
          </form>
        </div>
        :
        <div className="view-mode">
          <div className="view-title">{post.title}</div>
          <div className="view-icons">
            <div className="view-tags">
              {post.categories.map((category: any) => (
                <Link to={`/posts/?category=${category.name}`} className="link" key={category.name}>
                  <p className='tag'>{category.name}</p>
                </Link>
              ))}

            </div>
            {user ?
              <>
                {user.username === post.username ?
                  <div className="view-post-settings">
                    <AiOutlineEdit className='setting-icon' color='#659b48' onClick={handleEdit} />
                    <AiOutlineDelete className='setting-icon' color='#ce5656' onClick={handleDelete} />
                  </div>
                  :
                  <></>
                }
              </>
              :
              <></>
            }
          </div>
          <div className="view-content">
            {post.description}
          </div>
          <div className="view-footer">
            <Link to={`/posts/?user=${post.username}`} className="link">
              <div className="author">{post.username}</div>
            </Link>
            <div className="view-date">{new Date(post.createdAt).toDateString()}</div>
          </div>
        </div>
      }
    </div>
  )
};

export default PostView;