import axios from "axios";

const KEY = '21948648-940e5752284e9bc56aa424f61';

const fetchArticlesWithQuery = ({searchQuery, page}) => {
    return axios
      .get(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => response.data.hits);
  };

const api = {
  fetchArticlesWithQuery,
}
  
  export default api;