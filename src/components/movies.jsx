import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";


class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: []
  };


  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres()

    })
  }

  handleDelete = (id) => {
    let newMovieList = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({
      movies: newMovieList,
    });
  };

  handlePageChange = (page) => {
    console.log("page", page);
    this.setState({
      currentPage: page,
    });
  };

  handleGenreSelect = (genre) => {
    console.log("genre selected", genre);

  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-xs-2 m-4">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            textProperty="name"
            valueProperty="_id"
          />
        </div>
        <div className="col-xs-10 m-4">

          {count === 0 && "<h2>There are {count} movies in the database.</h2>"}
          <h2>There are {count} movies in the database.</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie._id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Delete
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
