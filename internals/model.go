package internals

type Pokemon struct {
	Abilities              []Ability         `json:"abilities"`
	BaseExperience         int               `json:"base_experience"`
	Cries                  map[string]string `json:"cries"`
	Forms                  []Form            `json:"forms"`
	GameIndices            []GameIndex       `json:"game_indices"`
	Height                 int               `json:"height"`
	HeldItems              []HeldItem        `json:"held_items"`
	Id                     int               `json:"id"`
	IsDefault              bool              `json:"is_default"`
	LocationAreaEncounters string            `json:"location_area_encounters"`
	Moves                  []Move            `json:"moves"`
	Name                   string            `json:"name"`
	Order                  int               `json:"order"`
	PastAbilities          []string          `json:"past_abilities"`
	PastTypes              []string          `json:"past_types"`
	Species                map[string]string `json:"species"`
	Sprites                map[string]string `json:"sprites"`
	Stats                  []Stat            `json:"stats"`
	Types                  []Type            `json:"types"`
	Weight                 int               `json:"weight"`
}

type Ability struct {
	Abiity   Form `json:"ability"`
	IsHidden bool `json:"is_hidden"`
	Slot     int  `json:"slot"`
}

type Form struct {
	Name string `json:"name"`
	Url  string `json:"url"`
}

type GameIndex struct {
	GameIndex int  `json:"game_index"`
	Version   Form `json:"version"`
}

type HeldItem struct {
	Item           Form            `json:"item"`
	VersionDetails []VersionDetail `json:"version_details"`
}

type VersionDetail struct {
	Rarity  int  `json:"rarity"`
	Version Form `json:"version"`
}

type Move struct {
	Move                Form                 `json:"move"`
	VersionGroupDetails []VersionGroupDetail `json:"version_group_details"`
}

type VersionGroupDetail struct {
	LevelLearnedAt  int  `json:"level_learned_at"`
	MoveLearnMethod Form `json:"move_learn_method"`
	VersionGroup    Form `json:"version_group"`
}

type Stat struct {
	BaseStat int  `json:"base_stat"`
	Effort   int  `json:"effort"`
	Stat     Form `json:"stat"`
}

type Type struct {
	Slot int  `json:"slot"`
	Type Form `json:"type"`
}
