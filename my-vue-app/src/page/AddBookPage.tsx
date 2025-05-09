import AddBookForm from '../components/AddBookForm';
import Sidebar from '../components/Sidebar';
import '../csspage/home.css';

const AddBookPage: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <AddBookForm />
      </div>
    </div>
  );
};

export default AddBookPage;