import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          setMovieList(response.data);
          console.log(response.data);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (movie) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    const savedArray = saved;
    const isAlreadySaved = savedArray.find((x) => x.id === movie.id);
    if (!isAlreadySaved) {
      savedArray.push(movie);
      setSaved([...savedArray]);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <KaydedilenlerListesi list={saved} />
        <Route exact path="/">
          <FilmListesi movies={movieList} />
        </Route>
        <Route path="/filmler/:id">
          <Film
            KaydedilenlerListesineEkle={KaydedilenlerListesineEkle}
            saved={saved}
          />
        </Route>
      </BrowserRouter>
    </div>
  );
}
