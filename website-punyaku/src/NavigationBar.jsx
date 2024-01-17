import React, { Component } from 'react';

class NewsPort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = (searchTerm = '') => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?q=${searchTerm}&apiKey=92027cca920944f39e287c73a559ef79`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then((data) => this.setState({ news: data.articles }))
      .catch((error) => console.error('Error fetching news:', error));
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchButtonClick = () => {
    const { searchTerm } = this.state;
    this.fetchNews(searchTerm);
  };

  render() {
    const { news, searchTerm } = this.state;

    return (
      <div className="container">
        <h1 className="my-4">Portal Berita</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Cari berita..."
            value={searchTerm}
            onChange={this.handleSearch}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleSearchButtonClick}
            >
              Cari
            </button>
          </div>
        </div>
        <div className="row">
          {news.map((article) => (
            <div key={article.title} className="col-md-4">
              <div className="card mb-4">
                <img src={article.urlToImage} className="card-img-top" alt={article.title} />
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Baca selengkapnya
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default NewsPort;
