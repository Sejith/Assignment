import { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("Harry Potter");
  const [userData, setUserData] = useState({ items: [] });

  useEffect(() => {
    axios.get("https://www.googleapis.com/books/v1/volumes?q=Harry%20Potter")
      .then((res) => setUserData(res.data));
  }, []);

  useEffect(() => {
    fetchBooks(searchQuery);
  }, [searchQuery]);

  const fetchBooks = (query) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((res) => setUserData(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleSearch = () => {
    fetchBooks(searchQuery);
  };

  return (
    <div className="App">
      <header>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}required></input>
        <button onClick={handleSearch}>Search Book</button>
        <hr/>
      </header>
      <div className="book">
        {userData.items.map((item, index) => (
          <div className="books" key={index}>
            <img src={item.volumeInfo.imageLinks.smallThumbnail} alt="Book Thumbnail" />
            <h3>{item.volumeInfo.title}</h3>
            <h4>{item.volumeInfo.authors && item.volumeInfo.authors.join(', ')}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
