import React, { useState } from 'react';
import ViewURL from './viewURL';

function SearchPage() {

  const [searchInput, setSearchInput] = useState("https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json");
  const [images, setImages] = useState([]);
  
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };




  const handleSumbit = async (e) => {
    e.preventDefault();
    try {    
      const response = await fetch(searchInput)
      let image = await response.json();
        console.log('image', image)
        setImages(image.groups)
        var topicBox = document.getElementById("topic");
        topicBox.style.display = "inline";

    } catch (error) {
        console.log("Not expected URL");
    }
  }
  

  return (
    <div className="search-page">
      <p id='comment'>You need to provide a link to retrieve tissue digital images!</p>
      <form onSubmit={handleSumbit}>
        <input
        id="search-box"
        type="text"
        placeholder="https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json"
        onChange={handleChange}
        defaultValue={"https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json"}
        value={searchInput} 
        />

        <button id="search-button" type='submit'> search</button>

      </form>
      
      <div id="topic">
        <ViewURL images={images} />
      </div>


    </div>

    
  );
}



export default SearchPage;
