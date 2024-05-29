package main

import (
	"log"
	"net/http"

	"github.com/a-h/templ"
	"github.com/cswn/poke-generator/handler"
	"github.com/cswn/poke-generator/web/template"
	"github.com/cswn/poke-generator/web/template/layout"
)

func main() {
	fs := http.FileServer(http.Dir("./web/static"))
	http.Handle("/web/static/", http.StripPrefix("/web/static/", fs))

	c := layout.Base(template.Index())
	http.Handle("/", templ.Handler(c))

	http.HandleFunc("/new", handler.GetRandomPokemonHandler)

	log.Fatal(http.ListenAndServe(":3000", nil))
}
