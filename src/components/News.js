import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  static defaultProps = {
    country : 'in',
    pageSize: '6',
    category : 'sports'
  }

  // static propsTypes = {
  //   country : propTypes.string,
  //   pageSize: propTypes.number,
  //   category : propTypes.string
  // }

  // async updateNews(){
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93e26a75a6124555a6df55b8ead5d3ba&page=${
  //     this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedata = await data.json();
  //   console.log(parsedata);
  //   this.setState({
  //     articles: parsedata.articles,
  //     loading: false,
  //   });
  // }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93e26a75a6124555a6df55b8ead5d3ba&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
  }

  prevPageHandler = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93e26a75a6124555a6df55b8ead5d3ba&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      page: this.state.page - 1,
      loading: false,
    });
    // this.setState({page:this.state.page - 1});
    // this.updateNews();
  };

  nextPageHandler = async () => {
    console.log("next");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93e26a75a6124555a6df55b8ead5d3ba&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedata = await data.json();
      console.log(parsedata);
      this.setState({
        articles: parsedata.articles,
        page: this.state.page + 1,
        loading: false,
      });
      // this.setState({page:this.state.page + 1});
      // this.updateNews();
  };

  render() {
    return (
      <div className="container-lg my-3">
        <h1 className="text-center" style={{margin: '20px'}}>News headline</h1>
        {this.state.loading && <Spinner />}
        <div className="row ">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className=" col-md-4 " key={element.url}>
                <NewsItem
                  // title={element.title ? element.title.slice(0, 30) : ""}
                  // if there is no slice error will not come for the null title.
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container">
          <div className="d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.prevPageHandler}
            >
              &larr; Previus
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.nextPageHandler}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
