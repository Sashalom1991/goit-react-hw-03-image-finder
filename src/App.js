import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import pixabayAPI from './service/pixabayApi';
import Searchbar from './components/Searchbar';
import Loader from './components/Loader';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchName: '',
    items: [],
    page: 1,
    error: '',
    isLoading: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      this.fetchPic();
    }

    if (this.state.page !== 2 && prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchPic = () => {
    const { page, searchName } = this.state;
    const options = { page, searchName };

    this.setState({ isLoading: true });

    pixabayAPI(options)
      .then(items => {
        this.setState(prevState => ({
          items: [...prevState.items, ...items],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error: 'Picture not found' }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handelSearchInput = searchName => {
    this.setState({searchName: searchName, page: 1, items: [], error: null });
  };

  render() {
    const{items, showModal, error, isLoading} = this.state;

    return (
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handelSearchInput} />
        {error && toast.info(error)}
        <ImageGallery items={items} />
        {isLoading && <Loader />}
        {items.length > 11 && !isLoading && (
          <Button onClick={this.fetchPic} />
        )}
        {showModal && (
          <>
            <Modal></Modal>
          </>
        )}
      </div>
    );
  }
}

export default App;
