import './styles/home.scss';
import Posts from '../components/Posts';
import Header from '../components/Header';

function Home() {
  return (
    <div className="home">
      <Header>This is my blog space...</Header>
      <Posts />
    </div>
  );
};

export default Home;

