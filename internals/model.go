package internals

type Pokemon struct {
	Abilities              []string          `json:"abilities"`
	BaseExperience         int               `json:"base_experience"`
	Cries                  map[string]string `json:"cries"`
	Forms                  []string          `json:"forms"`
	GameIndices            []string          `json:"game_indices"`
	Height                 int               `json:"height"`
	HeldItems              []string          `json:"held_items"`
	Id                     int               `json:"id"`
	IsDefault              bool              `json:"is_default"`
	LocationAreaEncounters string            `json:"location_area_encounters"`
	Moves                  []string          `json:"moves"`
	Name                   string            `json:"name"`
	Order                  int               `json:"order"`
	PastAbilities          []string          `json:"past_abilities"`
	PastTypes              []string          `json:"past_types"`
	Species                map[string]string `json:"species"`
	Sprites                map[string]string `json:"sprites"`
	Stats                  []string          `json:"stats"`
	Types                  []TypeItem        `json:"types"`
	Weight                 int               `json:"weight"`
}

type TypeItem struct {
	Slot int               `json:"slot"`
	Type map[string]string `json:"type"`
}
