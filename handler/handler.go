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
	data, _ := GetRandomPokemon()

	// use the response writer to write a templ component
	c := partial.Card(data)
	c.Render(context.Background(), w)
}

func GetRandomPokemon() (internals.Pokemon, error) {
	pokemonNumber := rand.Intn(1025)
	URL := fmt.Sprintf("https://pokeapi.co/api/v2/pokemon/%s", strconv.Itoa(pokemonNumber))

	resp, err := http.Get(URL)
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	// Always close the response body
	defer resp.Body.Close()

	var pokemonStruct internals.Pokemon
	// this de-serializes JSON data to our native Golang data
	json.Unmarshal(body, &pokemonStruct)

	if err := json.NewDecoder(resp.Body).Decode(&pokemonStruct); err != nil {
		return pokemonStruct, err
	}

	return pokemonStruct, nil
}
