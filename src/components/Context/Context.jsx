import axios  from 'axios';
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const SearchContext = createContext()
export default function Context(Props) {
    const [dataApi, setDataApi] = useState([]);
    const [dataApiTv, setDataApiTv] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
 // التحقق من صحة اسم الفيلم
    async function isNameValid(query) {
      const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ab6f02890a894dfd18b04c025b5de2eb&query=${query}`);
      setDataApi(data.results)  
      return dataApi !== null;  
};

// التحقق من صحة اسم المسلسل 
  async function tvShow(query) {
      const {data} = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=ab6f02890a894dfd18b04c025b5de2eb&query=${query}`);
      setDataApiTv(data.results)  
      return dataApiTv !== null; 
};

    async function handleInputChange(event){
      const value = event.target.value;
      setSearchQuery(value); 
      if (value.trim() === '') {
        navigate('/home');  
        return; 
    };
      setErrorMessage(''); 
      const isValid = await isNameValid(searchQuery);
      const allTvShow = await tvShow (searchQuery);
      if (isValid && allTvShow && searchQuery!=='' ) {
        localStorage.setItem('nameFood', searchQuery);  
        navigate('/search'); 
        // window.location.reload()
    };
  };

  async function getValue(){
    
    const isValid = await isNameValid(searchQuery);
    const allTvShow = await tvShow (searchQuery);
      if (isValid && allTvShow && searchQuery!=='' ) {
        localStorage.setItem('nameFood', searchQuery);  
        navigate('/search'); 
        // window.location.reload()
    } else {
        setErrorMessage('Please enter a valid food name and Do not leave the input empty.');
        alert("Please enter a valid food name and Do not leave the input empty.")
        navigate('/home');
    }
  };

return (
    <SearchContext.Provider value={{
        valueInput:handleInputChange,
        searchQuery:searchQuery,
        goToSearch:getValue,
        dataApi:dataApi,
        dataTv:dataApiTv

    }}>
        {Props.children}
    </SearchContext.Provider>
)
}
