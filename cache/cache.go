package cache

import (
	"sync"

	"github.com/cswn/poke-generator/internals"
)

type PokemonCache struct {
	mu      sync.RWMutex
	pokemon map[int64]internals.Pokemon
}

func Init() *PokemonCache {
	pc := &PokemonCache{
		pokemon: make(map[int64]internals.Pokemon),
	}

	return pc
}

func (pc *PokemonCache) Get(id int64) (internals.Pokemon, bool) {
	pc.mu.Lock()
	defer pc.mu.Unlock()

	cachedPokemon, ok := pc.pokemon[id]

	if !ok {
		return internals.Pokemon{}, false
	}
	return cachedPokemon, true
}

func (pc *PokemonCache) Set(p internals.Pokemon) {
	pc.mu.Lock()
	defer pc.mu.Unlock()

	pc.pokemon[int64(p.Id)] = p
}
