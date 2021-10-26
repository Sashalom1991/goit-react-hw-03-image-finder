import { Component } from 'react';
import pixabayApi from '../service/pixabayApi';

import Loader from './Loader';
import { toast } from 'react-toastify';
import ImageGallery from './ImageGallery';

import 'react-toastify/dist/ReactToastify.css';

export default class ImageGalleryInfo extends Component {
  state = {
    items: [],
    currentPage: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevPros, prevState) {
    const prevName = prevPros.searchName;
    const nextName = this.props.searchName;
    if (prevName !== nextName) {
      this.fetchImages(nextName);
    }

    if (prevState.currentPage > 2) {
      this.scrollWindow();
    }
  }

  fetchImages = (nextName) => {
    pixabayApi
      .fetchArticlesWithQuery(nextName)
      .then(items => {
        this.setState(prevState => ({
          items: [...prevState.items, ...items],
          currentPage: prevState.currentPage + 1,
        }));
        console.log(items);        
      })
      .catch(error => {
        this.setState({ error, status: 'rejected' });
      }).finally(() =>{
        if (this.state.currentPage > 2) {
          this.scrollWindow();
        }

        if (this.state.items.length === 0) {
          return toast.warn('Sorry, но за Вашим запросом мы чего не нашли');
        }
      }
        
      );
  };

  scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { items, status } = this.state;
    // const { searchName } = this.props;

    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return toast.error('Huston we have problem!');
    }
    if (status === 'resolved') {
      return <ImageGallery items={items} />;
    }
  }
}
