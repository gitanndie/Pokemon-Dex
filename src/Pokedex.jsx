import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    backgroundColor: "black",  
    paddingTop: "24px",
    paddingLeft: "50px",
    paddingRight: "50px",
    marginBottom: "10px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",  
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),                                           
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "56px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "300px",
    margin: "5px",
  },
  
}));
const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(25);
  function nextList() {
    setLimit(limit + 25);
  }
  function prevList() {
    if(limit === 25) return;
    setLimit(limit - 25);
  }
  useEffect(() => {
    function fetchData() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
        .then(function (response) {
          const { data } = response;
          const { results } = data;
          const newPokemonData = {};
          results.forEach((pokemon, index) => {
            newPokemonData[index + 1] = {
              id: index + 1,
              name: pokemon.name,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
            };
          });
          setPokemonData(newPokemonData);
        });
      }
      fetchData();
    }, [limit]);
    // console.log(pokemonData)
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };
  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={4} key={pokemonId}>
        <Card onClick={() => history.push(`/${id}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "230px", height: "230px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Pokemon"
              variant="standard"
            />
          </div>
        </Toolbar>
      </AppBar>
      {/* <button onClick={prevList}>prev</button> */}
      {pokemonData ? (
        <>
          <Grid container spacing={2} className={classes.pokedexContainer}>
            { pokemonData && Object.keys(pokemonData).map(
              (pokemonId) =>
                pokemonData[pokemonId].name.includes(filter) &&
                getPokemonCard(pokemonId)
            )}
          </Grid>
          <div class="continer-fluid"> 
            <div class="row"> 
              <button type="button" className="btn btn-outline-primary btn-lg center-block d-block mx-auto" onClick={prevList}>Anterior</button>
              <button type="button" className="btn btn-outline-primary btn-lg center-block d-block mx-auto" onClick={nextList}>Siguiente</button>
            </div>
          </div>  
      </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;