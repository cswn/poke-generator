"use strict"

/// SETUP ///
import './style.css';
import logo from './logo.jpg';
const axios = require('axios').default;

let randomNumber = Math.floor(Math.random() * 1154);
let theChosenOne = '';
const container = document.getElementById('container');
const pokeLogo = new Image();
pokeLogo.src = logo;



/// API REQUEST ///
axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')

    .then((res) => {

        const data = res.data.results;
        
        for (let pokemon of data) {
            if (data.indexOf(pokemon) === randomNumber) {

                theChosenOne += pokemon.name;

                axios.get('https://pokeapi.co/api/v2/pokemon/' + theChosenOne)

                    .then((res) => {

                        const pokemonInfo = res.data.types;
                        let pokeID = res.data.id;

                        if (pokemonInfo.length === 1) {

                            let pokeType = pokemonInfo[0];
                            let pokemonType = pokeType.type.name;

                            container.innerText = 'Pokemon: ' + theChosenOne + '\n ID: ' + pokeID + '\n Type: ' + pokemonType;
                            container.appendChild(pokeLogo);

                        } else if (pokemonInfo.length === 2) {

                            let type1 = pokemonInfo[0];
                            let type2 = pokemonInfo[1];

                            let pokemonType1 = type1.type.name;
                            let pokemonType2 = type2.type.name;

                            container.innerText = 'Pokemon: ' + theChosenOne + '\n ID: ' + pokeID + '\n Types: ' + pokemonType1 + ' and ' + pokemonType2;

                        }

                    })

                    .catch((err) => {
                        console.log(err);
                    });
            }
        }

    })

    .catch((err) => {
        console.log(err);
    });