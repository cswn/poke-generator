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

	"github.com/cswn/poke-generator/cache"
	"github.com/cswn/poke-generator/internals"
	"github.com/cswn/poke-generator/web/template/partial"
)

func GetRandomPokemonHandler(w http.ResponseWriter, r *http.Request) {
	pokemon := GetRandomPokemonStruct()

	// use the response writer to write a templ component
	c := partial.Card(&pokemon)
	c.Render(context.Background(), w)
}

func GetRandomPokemonStruct() internals.Pokemon {
	id := rand.Intn(1025)
	// check if pokemon with this id already in cache, if so, return it
	var pokemonCache = cache.Init()
	if cachedPokemon, found := pokemonCache.Get(int64(id)); found {
		return cachedPokemon
	}

	URL := fmt.Sprintf("https://pokeapi.co/api/v2/pokemon/%s", strconv.Itoa(id))

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

	pokemonCache.Set(pokemonStruct)

	return pokemonStruct
}
