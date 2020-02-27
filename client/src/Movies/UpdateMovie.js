import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialItem);
  const { id } = useParams();
  console.log(props);
  useEffect(() => {
    const movieToUpdate = props.movieList.find(
      item => `${item.id}` === props.match.params.id
    );
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movieList, props.match.params.id]);

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log("response", res);
        document.querySelector("form").reset();
        props.history.push("/");
        window.location.reload(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2 className="h2title">Update the Movie</h2>
      <form className="editForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="name"
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="director"
          value={movie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="metascore"
          value={movie.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={handleChange}
          placeholder="stars"
          value={movie.stars}
        />
        <button>Update Movie</button>
      </form>
    </div>
  );
};
export default UpdateMovie;
