"use strict"

const axios = require('axios').default;

/// SETUP ///
import './style.css';
import bug from './type_icons/bug.svg';
import dark from './type_icons/dark.svg';
import dragon from './type_icons/dragon.svg';
import electric from './type_icons/electric.svg';
import fairy from './type_icons/fairy.svg';
import fighting from './type_icons/fighting.svg';
import fire from './type_icons/fire.svg';
import flying from './type_icons/flying.svg';
import ghost from './type_icons/ghost.svg';
import grass from './type_icons/grass.svg';
import ground from './type_icons/ground.svg';
import ice from './type_icons/ice.svg';
import normal from './type_icons/normal.svg';
import poison from './type_icons/poison.svg';
import psychic from './type_icons/psychic.svg';
import rock from './type_icons/rock.svg';
import steel from './type_icons/steel.svg';
import water from './type_icons/water.svg';

const bugType = new Image();
bugType.classList.add('type_icon');
bugType.src = bug;
const darkType = new Image();
darkType.classList.add('type_icon');
darkType.src = dark;
const dragonType = new Image();
dragonType.classList.add('type_icon');
dragonType.src = dragon;
const electricType = new Image();
electricType.classList.add('type_icon');
electricType.src = electric;
const fairyType = new Image();
fairyType.classList.add('type_icon');
fairyType.src = fairy;
const fightingType = new Image();
fightingType.classList.add('type_icon');
fightingType.src = fighting;
const fireType = new Image();
fireType.classList.add('type_icon');
fireType.src = fire;
const flyingType = new Image();
flyingType.classList.add('type_icon');
flyingType.src = flying;
const ghostType = new Image();
ghostType.classList.add('type_icon');
ghostType.src = ghost;
const grassType = new Image();
grassType.classList.add('type_icon');
grassType.src = grass;
const groundType = new Image();
groundType.classList.add('type_icon');
groundType.src = ground;
const iceType = new Image();
iceType.classList.add('type_icon');
iceType.src = ice;
const normalType = new Image();
normalType.classList.add('type_icon');
normalType.src = normal;
const poisonType = new Image();
poisonType.classList.add('type_icon');
poisonType.src = poison;
const psychicType = new Image();
psychicType.classList.add('type_icon');
psychicType.src = psychic;
const rockType = new Image();
rockType.classList.add('type_icon');
rockType.src = rock;
const steelType = new Image();
steelType.classList.add('type_icon');
steelType.src = steel;
const waterType = new Image();
waterType.classList.add('type_icon');
waterType.src = water;

const KEY_ENTER = 13;
const container = document.getElementById('container');
const card = document.querySelector('.card');
const pic = document.getElementById('pic');
const header = document.getElementById('header');
const name = document.getElementById('name_of_pokemon');
const typeIcon = document.getElementById('type_icon');
const content = document.getElementById('poke-info');
const reload = document.getElementById('page-reloader');
const errorMessage = document.getElementById('error-message');
const searchButton = document.getElementById('poke-search');
const searchBar = document.getElementById('pokeSearchInput');
searchBar.style.display = 'none';
errorMessage.style.display = 'none';
container.appendChild(card);
card.appendChild(header);
header.appendChild(name);
card.appendChild(pic);
card.appendChild(content);

/**
 * Pokemon Object Contructor
 */
 function Pokemon(name, type, id) {
    this.name = name;
    this.type = type;
    this.id = id;
    content.innerText = 'ID: ' + id;
    this.pokemonTypeDisplay = function() {
        if (type === 'bug') {
            card.style.background = '#7dff00';
            card.style.color = 'black';
            typeIcon.appendChild(bugType);
        } else if (type === 'dark') {
            card.style.background = '#071416';
            card.style.color = 'white';
            typeIcon.appendChild(darkType);
        } else if (type === 'dragon') {
            card.style.background = '#4a4c09';
            card.style.color = 'black';
            typeIcon.appendChild(dragonType);
        } else if (type === 'electric') {
            card.style.background = '#e0d530';
            card.style.color = 'black';
            typeIcon.appendChild(electricType);
        } else if (type === 'fairy') {
            card.style.background = '#ff0698';
            card.style.color = 'black';
            typeIcon.appendChild(fairyType);
        } else if (type === 'fighting') {
            card.style.background = '#ff9c00';
            card.style.color = 'black';
            typeIcon.appendChild(fightingType);
        } else if (type === 'fire') {
            card.style.background = '#ff3b00';
            card.style.color = 'black';
            typeIcon.appendChild(fireType);
        } else if (type === 'flying') {
            card.style.background = '#8b8b93';
            card.style.color = 'black';
            typeIcon.appendChild(flyingType);
        } else if (type === 'ghost') {
            card.style.background = '#BC00E5';
            card.style.color = 'black';
            typeIcon.appendChild(ghostType);
        } else if (type === 'grass') {
            card.style.background = '#b1ff00';
            card.style.color = 'black';
            typeIcon.appendChild(grassType);
        } else if (type === 'ground') {
            card.style.background = '#e69138';
            card.style.color = 'black';
            typeIcon.appendChild(groundType);
        } else if (type === 'ice') {
            card.style.background = '#7FC8FF';
            card.style.color = 'black';
            typeIcon.appendChild(iceType);
        } else if (type === 'normal') {
            card.style.background = '#d6d6d6';
            card.style.color = 'black';
            typeIcon.appendChild(normalType);
        } else if (type === 'poison') {
            card.style.background = '#aa2fef';
            card.style.color = 'black';
            typeIcon.appendChild(poisonType);
        } else if (type === 'psychic') {
            card.style.background = '#a52ad2';
            card.style.color = 'black';
            typeIcon.appendChild(psychicType);
        } else if (type === 'rock') {
            card.style.background = '#b45f06';
            card.style.color = 'black';
            typeIcon.appendChild(rockType);
        } else if (type === 'steel') {
            card.style.background = '#6b6b6b';
            card.style.color = 'black';
            typeIcon.appendChild(steelType);
        } else if (type === 'water') {
            card.style.background = '#19d3ff';
            card.style.color = 'black';
            typeIcon.appendChild(waterType);
        } 
    }
}

/// REQUEST ///

function generateRandomPokemon() {

    // initialize variables used in request
    let theChosenOne = '';
    let randomNumber = Math.floor(Math.random() * 1154);

    // make http request with axios
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then((res) => {

        const data = res.data.results;
        
        for (let pokemon of data) {
            
            if (data.indexOf(pokemon) === randomNumber) {
                theChosenOne += pokemon.name;
                name.innerText = theChosenOne;
                return axios.get('https://pokeapi.co/api/v2/pokemon/' + theChosenOne)
            }
        }
    
    }).then((res) => {
                            
        let pokeID = res.data.id;
        const pokemonInfo = res.data.types;
        const imageSrc = res.data.sprites.front_default;
        const pokePic = document.createElement('img')
        pokePic.src = imageSrc;
        pic.appendChild(pokePic);
            
        if (pokemonInfo.length === 1) {
    
            let pokeType = pokemonInfo[0];
            let pokemonType = pokeType.type.name;
            const currentPokemon = new Pokemon(theChosenOne, pokemonType, pokeID);
            currentPokemon.pokemonTypeDisplay();
    
        } else if (pokemonInfo.length === 2) {
    
            let type1 = pokemonInfo[0];
            let type2 = pokemonInfo[1];
    
            let pokemonType1 = type1.type.name;
            let pokemonType2 = type2.type.name;
            const currentPokemon = new Pokemon(theChosenOne, pokemonType1, pokeID);
            currentPokemon.pokemonTypeDisplay();
    
        }
    
    }).catch((err) => {
        console.log(err);
    })
    
    .catch((err) => {
         console.log(err);
    })
    
}

function generateFromSearch(searchedName) {
    
    axios.get('https://pokeapi.co/api/v2/pokemon/' + searchedName).then((res) => {
        
        name.innerText = searchedName;
        let pokeID = res.data.id;
        let pokemonInfo = res.data.types;
        const imageSrc = res.data.sprites.front_default;
        const pokePic = document.createElement('img')
        pokePic.src = imageSrc;
        pic.appendChild(pokePic);

        if (pokemonInfo.length === 1) {
    
            let pokeType = pokemonInfo[0];
            let pokemonType = pokeType.type.name;
            const currentPokemon = new Pokemon(searchedName, pokemonType, pokeID);
            currentPokemon.pokemonTypeDisplay();
    
        } else if (pokemonInfo.length === 2) {
    
            let type1 = pokemonInfo[0];
            let pokemonType1 = type1.type.name;
            const currentPokemon = new Pokemon(searchedName, pokemonType1, pokeID);
            currentPokemon.pokemonTypeDisplay();
    
        }
    }).catch((err) => {
        console.log(err);

        errorMessage.style.display = '';
        errorMessage.innerText = "That isn't a pokemon!";
        card.style.background = 'lightblue';
        name.innerText = '';
        content.innerText = '';
        if (pic.hasChildNodes()) {
            pic.removeChild(pic.firstElementChild);
        }

        setTimeout(() => {
            errorMessage.style.display = 'none';
            errorMessage.innerText = '';
        }, 2000)
        
    })
}

// call function on initial page load
generateRandomPokemon();


// event listeners
reload.addEventListener('click', () => {

    // reset card
    if (typeIcon.hasChildNodes()) {
        typeIcon.removeChild(typeIcon.firstElementChild);
    }
    if (pic.hasChildNodes()) {
        pic.removeChild(pic.firstElementChild);
    }
    generateRandomPokemon();
    
}) 

searchButton.addEventListener('click', () => {

    searchBar.style.display = '';
    searchButton.style.display = 'none';
    
}) 

searchBar.addEventListener('keypress', (event) => {

    if (event.key === 'Enter' && searchBar.value !== '') {

        event.preventDefault();

        // reset card
        if (typeIcon.hasChildNodes()) {
            typeIcon.removeChild(typeIcon.firstElementChild);
        }
       
        const searchValue = searchBar.value.toLowerCase();
        
        console.log(searchValue);

        searchBar.style.display = 'none';
        searchBar.value = '';
        searchButton.style.display = '';

        generateFromSearch(searchValue);
    }
}) 