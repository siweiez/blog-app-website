import axios from "axios";
import { useContext, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import Header from "../components/Header";
import { Context } from "../context/Context";
import './styles/createpage.scss';

function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [tag, setTag] = useState("");
  const { state } = useContext(Context);
  const user = state.user;

  const handleNewTag = () => {
    const newTag = { name: tag };
    setCategories([...categories, newTag]);
  }

  function handleDeleteTag(tag: string) {
    const newCats = categories.filter(t => t.name !== tag);
    setCategories(newCats);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const post = {
      username: user.username,
      title,
      description,
      categories
    };
    try {
      const res = await axios.post("/posts", post);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-page">
      <Header className="header">
        Create Post...
      </Header>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="post-form-item">
          <input
            type="text"
            placeholder="Title"
            className="post-title input-item"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="post-form-item post-tags">
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
        <div className="post-form-item">
          <textarea
            placeholder="Text here..."
            className="post-decription input-item"
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button className="post-submit-button" type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreatePage;