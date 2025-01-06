import React, { useState, useEffect, useCallback } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Pagination } from '@mui/material';
import axios from 'axios';

import './Dashboard.css';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [header, setHeader] = useState([]);
  const itemsPerPage = 10;
  const totalPages = 100;


  const accessToken = localStorage.getItem('accessToken');

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('https://api.github.com/search/repositories', {
        params: {
          q: 'created:>2024-07-15',
          sort: 'stars',
          order: 'desc',
          per_page: itemsPerPage,
          page: currentPage
        },
        headers: {
            Authorization:  `Bearer ${accessToken}`
        }
      });
      setItems(response.data.items);
      setHeader(response.headers);
    } catch (error) {
      console.log("Error: ", error);
    }
  }, [itemsPerPage, currentPage, accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData, currentPage]);


  // Handle page change
  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
    return num.toString();
  };

  return (
    <div className="app">
      <div className='header'>
        <h1>Trending Repos</h1>
      </div>
      <div className='content'>
        {items.map((item, index) => (
          <div key={index} style={{ padding: '2%' }}>
            <div style={{ marginBottom: '1%' }}>
              <h2>{item.name}</h2>
            </div>
            <div style={{ marginBottom: '1.5%' }}>
              <p>{item.description}</p>
            </div>
            <div style={{ marginBottom: '1%' }}>
              {item.topics.length > 0 && item.topics.slice(0,5).map((topic, i) => (
                <div key={i} className='topicsContainer'>
                  <p>{topic}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'çenter' }}>
                <img src={item.owner.avatar_url} style={{ width: '18px', height: '18px', marginRight: '5px' }} />
                <p>{item.full_name}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon style={{ color: 'orange' }} />
                <p style={{ color: '#814600' }}>{formatNumber(item.stargazers_count)}</p>
              </div>
            </div>
          </div>
        ))}
        {/* Pagination Control */}
        <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant='outlined'
            shape='rounded'
            color='primary'
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;