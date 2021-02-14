import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import _ from 'lodash';


class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {

    const genres = [{ _id: " ", name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres

    })
  }

  getPageData = () => {
    const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn } = this.state;


    const filtered = selectedGenre && selectedGenre._id !== " " ? allMovies.filter(movie => movie.genre._id === selectedGenre._id) : allMovies

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies }
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
    this.setState({
      selectedGenre: genre,
      currentPage: 1
    })
  };

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn
    })
  }

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: movies } = this.getPageData();


    return (
      <div className="row">
        <div className="col-xs-2 m-4">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col m-4">
          <h2>There are {totalCount} movies in the database.</h2>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div >
      </div>
    );
  }
}

export default Movies;
