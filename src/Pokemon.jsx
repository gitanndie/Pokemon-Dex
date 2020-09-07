import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);
  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Typography variant="h2" style= {{margin: "30px"}}>
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>
        <img style={{ width: "200px", height: "150px", margin: "30px"}} src={fullImageUrl} />
        <Typography variant="h4" style= {{margin: "30px"}}>Información</Typography>
        <Typography style= {{margin: "30px"}}>
          {"Species: "}
          <Link href={species.url}>{species.name} </Link>
        </Typography>
        <Typography style= {{margin: "10px"}}>Altura: {height} </Typography>
        <Typography style= {{margin: "10px"}}>Peso: {weight} </Typography>
        <Typography variant="h6" style= {{margin: "10px"}}>Tipo:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography style= {{margin: "20px"}} key={name}>{`${name}`}</Typography>;
        })}
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Button type="button" className="btn btn-outline-primary btn-lg center-block d-block mx-auto" variant="contained" onClick={() => history.push("/")}>
          Regresar
        </Button>
      )}
    </>
  );
};
export default Pokemon;
