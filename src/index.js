"use strict"

/// SETUP ///
import './style.css';
import picture from './logo.jpg';
const axios = require('axios').default;

let randomNumber = Math.floor(Math.random() * 1154);
let theChosenOne = '';
const container = document.getElementById('container');
const card = document.querySelector('.card');
const pic = document.getElementById('pic');
const header = document.getElementById('header');
const content = document.getElementById('poke-info');
container.appendChild(card);
card.appendChild(header);
card.appendChild(pic);
card.appendChild(content);

// const pokeLogo = new Image();
// pokeLogo.src = logo;



/// API REQUEST ///
axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')

    .then((res) => {

        const data = res.data.results;
        
        for (let pokemon of data) {
            if (data.indexOf(pokemon) === randomNumber) {

                theChosenOne += pokemon.name;
                const name = document.createElement('h3');
                name.innerText = theChosenOne;

                axios.get('https://pokeapi.co/api/v2/pokemon/' + theChosenOne)

                    .then((res) => {

                        let pokeID = res.data.id;
                        const pokemonInfo = res.data.types;
                        // const pics = res.data.sprites;
                        // const pokePic = pics.front_default;
                        // pic.innerHTML(<img src="pokePic"></img>);
                        
                        if (pokemonInfo.length === 1) {

                            let pokeType = pokemonInfo[0];
                            let pokemonType = pokeType.type.name;

                            content.innerText = 'ID: ' + pokeID + '\n Type: ' + pokemonType;
                            header.appendChild(name);

                        } else if (pokemonInfo.length === 2) {

                            let type1 = pokemonInfo[0];
                            let type2 = pokemonInfo[1];

                            let pokemonType1 = type1.type.name;
                            let pokemonType2 = type2.type.name;

                            content.innerText = 'ID: ' + pokeID + '\n Types: ' + pokemonType1 + ' and ' + pokemonType2;
                            header.appendChild(name);

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