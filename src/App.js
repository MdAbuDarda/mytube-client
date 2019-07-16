import React, { Component } from "react";
import "./style/main.css";
import "bootstrap/dist/css/bootstrap.css";
import Video from "./components/video";
import axios from "axios";
const API_URL = "http://localhost/mytube/";

class App extends Component {
  state = {
    query: "",
    data: [],
    tagSearch: ""
  };

  componentDidMount() {
    const url = `${API_URL}?tag=${this.state.tagSearch}`;
    axios
      .get(url)
      .then(response => response.data)
      .then(json => {
        this.setState({ data: json });
      });
  }

  searchText = event => {
    if (event.target.value === "") {
      this.setState({
        query: event.target.value,
        tagSearch: ""
      });
    }
    this.setState({
      query: event.target.value
    });
  };

  tag = event => {
    if (event.target.title === "all") {
      this.setState({
        query: "",
        tagSearch: ""
      });
    } else {
      // console.log(event.target.title);
      this.setState({
        tagSearch: event.target.title
      });
    }
  };

  render() {
    let name = [];
    let tag = [];
    let count = 0;

    Object.keys(this.state.data).forEach(key => {
      name.push(this.state.data[key].title);
      tag.push(this.state.data[key].tag);
    });

    // console.log(name);
    // console.log(tag);

    return (
      <div className="container">
        <form className="form-inline mt-4 mb-4">
          <i className="fas fa-search" aria-hidden="true" />
          <input
            className="form-control form-control-sm ml-3 w-75"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onKeyUp={this.searchText}
          />
        </form>

        <div className="tag-container">
          <div>
            <ul className="tags">
              <li>
                <a href="#" onClick={this.tag} title="all" className="tag">
                  all
                </a>
              </li>
              <li>
                <a href="#" onClick={this.tag} title="anime" className="tag">
                  anime
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={this.tag}
                  title="tv series"
                  className="tag"
                >
                  tv series
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={this.tag}
                  title="movie clip"
                  className="tag"
                >
                  movie clip
                </a>
              </li>
              <li>
                <a href="#" onClick={this.tag} title="tutorial" className="tag">
                  tutorial
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={this.tag}
                  title="music video"
                  className="tag"
                >
                  music video
                </a>
              </li>
              <li>
                <a href="#" onClick={this.tag} title="gaming" className="tag">
                  gaming
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {this.state.data.map((video, i) => {
              if (
                this.state.query !== "" &&
                video.title
                  .toLowerCase()
                  .indexOf(this.state.query.toLowerCase()) !== -1 &&
                this.state.tagSearch === video.tag
              ) {
                return (
                  <Video
                    name={video}
                    description={video.description}
                    title={video.title}
                    tag={video.tag}
                    url={video.url}
                    key={i}
                  />
                );
              } else if (
                this.state.query !== "" &&
                video.title
                  .toLowerCase()
                  .indexOf(this.state.query.toLowerCase()) !== -1 &&
                this.state.tagSearch === ""
              ) {
                return (
                  <Video
                    name={video}
                    description={video.description}
                    title={video.title}
                    tag={video.tag}
                    url={video.url}
                    key={i}
                  />
                );
              } else if (
                this.state.tagSearch === video.tag &&
                this.state.query === ""
              ) {
                return (
                  <Video
                    name={video}
                    description={video.description}
                    title={video.title}
                    tag={video.tag}
                    url={video.url}
                    key={i}
                  />
                );
              } else if (
                this.state.query === "" &&
                this.state.tagSearch === ""
              ) {
                return (
                  <Video
                    name={video}
                    description={video.description}
                    title={video.title}
                    tag={video.tag}
                    url={video.url}
                    key={i}
                  />
                );
              } else {
                count++;
              }
            })}
            {this.state.data.length === count ? <p>No video found!!!</p> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
