import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, author, date, source } =
      this.props;
    // we can directy use this.props.title and so on if we don't use let.
    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>
            {source}
          </span>
          <img
            src={
              !imageUrl
                ? "https://www.coindesk.com/resizer/izJg6P2Q-QvYdSWyDW2v74satqw=/1200x628/center/middle/cloudfront-us-east-1.images.arcpublishing.com/coindesk/MK3VJMD7FJEM7N6BNQODR3OZIE.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}....</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown"} on date{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={url} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
