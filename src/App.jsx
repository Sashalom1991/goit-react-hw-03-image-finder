import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PixabayApi from './services/PixabayApi';

import Modal from './components/Modal';
import Button from './components/Button/Button';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import CatchError from './components/ErrorViewApi/ErrorViewApi';
// import ReactLoading from 'react-loading';
import Loader from './components/Loader';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {
    images: [],
    page: 1,
    imagesLenght: [],
    searchQuery: '',
    isLoading: false,
    error: null,
    largeImage: '',
    showModal: false,
    urlModal: '',
    altToModal: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (prevState.page > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    const options = { searchQuery, page };

    this.setState({ loading: true });

    PixabayApi.fetchArticlesWithQuery(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
          imagesLenght: [...images],
        }));
        if (images.length === 0) {
          toast.error('Sorry, we didn it find anything. Try again!');
        }
      })
      .catch(error => this.setState({ error: !error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickImageGalleryItem = e => {
    this.setState({
      urlModal: e.currentTarget.getAttribute('url'),
      altToModal: e.currentTarget.getAttribute('alt'),
    });
    this.toggleModal();
    console.log(e);
  };

  render() {
    const {
      images,
      imagesLenght,
      isLoading,
      error,
      showModal,
      altToModal,
      urlModal,
    } = this.state;

    const style = {
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      margin: 10,
    };

    return (
      <>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && <CatchError />}
        <ImageGallery>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              alt={tags}
              src={webformatURL}
              url={largeImageURL}
              onClick={this.onClickImageGalleryItem}
            />
          ))}
        </ImageGallery>
        {isLoading && <Loader/>}

        {!(imagesLenght.length < 12) && (
          <div style={style}>
            <Button onClick={this.fetchImages} />
          </div>
        )}

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            src={urlModal}
            alt={altToModal}
          ></Modal>
        )}
      </>
    );
  }
}

export default App;
