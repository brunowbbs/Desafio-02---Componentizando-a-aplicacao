import { useEffect, useState } from "react";

import { SideBar } from "./components/SideBar";
// import { Content } from './components/Content';

import { api } from "./services/api";

import { GenreResponseProps } from "./components/SideBar";
import { Content, MovieProps } from "./components/Content";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";

export function App() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        selectedGenreId={selectedGenreId}
        handleClickButton={handleClickButton}
      />
      <div className="container">
        <header>
          <span className="category">
            Categoria:<span> {selectedGenre.title}</span>
          </span>
        </header>
        <Content movies={movies} />
      </div>
    </div>
  );
}
