import './styles/postview.scss';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import axios from 'axios';
import { Context } from '../context/Context';
import Button from '../components/Button';

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
  const postId = location.pathname.split("/")[2].substring(0, 24);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategories, setNewCategories] = useState<any[]>([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(process.env.REACT_APP_API_URL + "posts/" + postId);
      setPost(response.data);
      setNewTitle(response.data.title);
      setNewDescription(response.data.description);
      setNewCategories(response.data.categories);
    }
    getPost();
  }, [postId, editMode]);

  // delete post
  const handleDelete = async () => {
    if (user.username === post.username) {
      try {
        await axios.delete(process.env.REACT_APP_API_URL + `posts/${post._id}`, {
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

  // edit post
  const handleEditSubmit = async () => {
    // const rootUrl = "http://localhost:5000/api/";
    try {
      await axios.put((process.env.REACT_APP_API_URL + `posts/${postId}`), {
        username: user.username,
        title: newTitle,
        description: newDescription,
        categories: newCategories
      });
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCancel = () => {
    setEditMode(false);
  }

  const handleNewTag = () => {
    const newTag = { name: tag };
    setNewCategories([...newCategories, newTag]);
  }

  function handleDeleteTag(tag: string) {
    const newCats = newCategories.filter(t => t.name !== tag);
    setNewCategories(newCats);
  }

  return (
    post &&
    <div className="postview">
      {editMode ?
        <div className="edit-mode">
          <div className="edit-form">
            <div className="edit-title edit-form-item">
              <input
                type="text"
                className='edit-title-input input-item'
                onChange={e => setNewTitle(e.target.value)}
                defaultValue={newTitle}
                placeholder="Title"
              >
              </input>
            </div>
            <div className="edit-form-item edit-tags">
              <ul>
                {newCategories?.map(t => (
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
                onChange={e => setNewDescription(e.target.value)}
                defaultValue={newDescription}
                placeholder="Text here..."
              >
              </textarea>
            </div>
            <Button className="edit-submit-button edit-form-item" onClick={handleEditSubmit}>Save</Button>
            <Button className="edit-cancel-button edit-form-item" onClick={handleCancel}>Cancel</Button>
          </div>
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