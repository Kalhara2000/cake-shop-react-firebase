// App.js
import React,{ useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CakeForm from './components/CakeForm';
import CakeTable from './components/CakeTable';
import logo from './assets/logo.png';
import './App.css';

const API_BASE_URL = 'https://cake-shop-backend-v02.vercel.app/api/cakes';

const App = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [editingCake, setEditingCake] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 4000);
  };

  const fetchCakes = useCallback(async () => {
    try {
      const { data } = await axios.get(API_BASE_URL);
      setCakes(data);
    } catch (error) {
      showNotification('Failed to fetch cakes', 'error');
      console.error('Fetch error:', error);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'view') {
      fetchCakes();
    }
  }, [activeTab, fetchCakes]);

  const handleAddOrUpdateCake = async (cakeData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(cakeData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (editingCake) {
        await axios.put(`${API_BASE_URL}/${editingCake.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showNotification('Cake updated successfully!');
      } else {
        await axios.post(API_BASE_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showNotification('Cake added successfully!');
      }

      setEditingCake(null);
      setActiveTab('view');
    } catch (error) {
      showNotification('Failed to submit cake', 'error');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCake = async (id) => {
    if (window.confirm('Are you sure you want to delete this cake?')) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        showNotification('Cake deleted successfully!');
        fetchCakes();
      } catch (error) {
        showNotification('Failed to delete cake', 'error');
        console.error('Delete error:', error);
      }
    }
  };

  const handleEditCake = (cake) => {
    setEditingCake(cake);
    setActiveTab('add');
  };

  return (
    <div className="admin-container">
      <header>
        <img src={logo} alt="Shop Logo" className="shop-logo" />
        <h1>The Cake House - Admin Panel</h1>
      </header>

      <div className="main-content">
        <nav className="tab-nav">
          <button onClick={() => setActiveTab('view')}>View Cakes</button>
          <button onClick={() => { setActiveTab('add'); setEditingCake(null); }}>
            Add Cake
          </button>
        </nav>

        <div className="content-area">
          {notification.message && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          <main>
            {activeTab === 'add' ? (
              <CakeForm
                onSubmit={handleAddOrUpdateCake}
                loading={loading}
                initialData={editingCake}
              />
            ) : (
              <CakeTable
                cakes={cakes}
                onDelete={handleDeleteCake}
                onEdit={handleEditCake}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;