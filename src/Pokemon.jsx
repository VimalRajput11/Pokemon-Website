import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setloading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, seterror] = useState(null);
  const API = "https://pokeapi.co/api/v2/pokemon?limit=600";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data)

      const detailedPokemondata = data.results.map(async (currPokemon) => {
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemondata);
      setPokemon(detailedResponses);
      console.log(detailedResponses)
      setloading(false);
    } catch (error) {
      console.error(error);
      setloading(false);
      seterror(error);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  const SearchCard = pokemon.filter((currCard) =>
    currCard.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    <div className="loader">
        <h1>Loading...</h1>
    </div>

  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }
  return (
    <section className="container">
      <header>
        <h1>Lets Catch Favourite Pokemon</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <ul className="cards">
          {SearchCard.map((currPokemon) => {
            return (
              <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
            );
          })}
        </ul>
      </div>
    </section>
  );
};
