import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    count: getMovies().length,
  };

  handleDelete = (id) => {
    let newMovieList = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({
      movies: newMovieList,
      count: newMovieList.length,
    });
  };

  render() {
    let { count } = this.state;
    return (
      <div>
        {count === 0 && "<h2>There are {count} movies in the database.</h2>"}
        <h2>There are {count} movies in the database.</h2>
        <table class="table">
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
            {this.state.movies.map((movie) => (
              <tr key="movie._id">
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
      </div>
    );
  }
}

export default Movies;
