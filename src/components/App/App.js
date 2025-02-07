import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => {
      this.setState({ urls: data.urls })
    })
    .catch(error => this.setState({error: 'Something went wrong. Refresh, and try again.'}))
  }

  addNewURL = (newURL) => {
    postUrls(newURL)
    .then(data => {
      this.setState({
        urls: [...this.state.urls, data]
      })
    })
    .catch(error => this.setState({error: 'URL submission unsuccessful.'}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addNewURL={this.addNewURL}/>
        </header>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
