package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/cswn/poke-generator/internals"
	"github.com/cswn/poke-generator/view/partial"
)

func GetRandomPokemonHandler(w http.ResponseWriter, r *http.Request) {
	pokemon := GetRandomPokemon()

	// use the response writer to write a templ component
	c := partial.Card(&pokemon)
	c.Render(context.Background(), w)
}

func GetRandomPokemon() internals.Pokemon {
	pokemonNumber := rand.Intn(1025)
	URL := fmt.Sprintf("https://pokeapi.co/api/v2/pokemon/%s", strconv.Itoa(pokemonNumber))

	// get http response
	resp, err := http.Get(URL)
	if err != nil {
		log.Fatalln(err)
	}

	// read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	// close the response body
	defer resp.Body.Close()

	// de-serialize JSON data to native pokemon struct
	var pokemonStruct internals.Pokemon
	err = json.Unmarshal(body, &pokemonStruct)

	if err != nil {
		fmt.Println("Couldn't unmarshal data into pokemon struct")
		fmt.Printf("%v", err)
	}

	return pokemonStruct
}
