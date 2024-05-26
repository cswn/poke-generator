package main

import (
	"log"
	"net/http"

	"github.com/a-h/templ"
	"github.com/cswn/poke-generator/handler"
	"github.com/cswn/poke-generator/view"
	"github.com/cswn/poke-generator/view/layout"
)

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// data, _ := handler.GetRandomPokemon()
	c := layout.Base(view.Index())
	http.Handle("/", templ.Handler(c))

	http.HandleFunc("/new", handler.GetRandomPokemonHandler)

	log.Fatal(http.ListenAndServe(":3000", nil))
}
