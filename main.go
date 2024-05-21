package main

import (
	"log"
	"net/http"

	"github.com/a-h/templ"
	"github.com/cswn/poke-generator/view"
	"github.com/cswn/poke-generator/view/layout"
	"github.com/cswn/poke-generator/view/partial"
)

// func main() {
// 	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
// 		Card("Bulbasaur").Render(r.Context(), w)
// 	})

// 	fmt.Println("listening on 3000")
// 	http.ListenAndServe(":3000", nil)
// }

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	c := layout.Base(view.Index(partial.Card("Bulbasaur")))
	http.Handle("/", templ.Handler(c))

	log.Fatal(http.ListenAndServe(":8080", nil))
}
