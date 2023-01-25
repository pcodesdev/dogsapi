import React, { useState, useEffect } from 'react';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import './AppCss.css';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setError(null);
      setIsLoading(true);
      try {
        const apiKey = 'live_8sFMyoQXQv3E4cftXew2YADaWgwwFAjlmfYwBvvja7gsNm3oeqPZcjoM7gkoMnRf';
        const url = `https://api.thedogapi.com/v1/images/search?limit=100&page=${currentPage}&api_key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        setImages(data);
        setTotalPages(Math.ceil(data.length / 10));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [currentPage]);

  const handlePageClick = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className='main__div'>
      {isLoading && <p>Loading dog images...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className='dogs__div-container'>
        {images.slice((currentPage - 1) * 10, currentPage * 10).map((image) => (
          <div className='dogs__div'>
            <img key={image.id} src={image.url} alt={image.id} />
          </div>
        ))}
      </div>
      <div className='main__btn'>
        <button onClick={() => handlePageClick('prev')} disabled={currentPage === 1}><GrLinkPrevious /></button>
        <button onClick={() => handlePageClick('next')} disabled={currentPage === totalPages}><GrLinkNext /></button>
      </div>
    </div>
  );
}

export default App;
