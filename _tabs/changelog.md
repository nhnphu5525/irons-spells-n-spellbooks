---
layout: post
icon: fa-solid fa-list-ul
order: 12
toc: true
---
<style>
.yellow {
color:rgba(255, 194, 41, 0.5);
}
</style>

<hr>

## <span class="yellow"> [3.14.6] (1.21.1) 2025-10-16</span>
### Additions
- Added Create compat for fluid filters, allowing you to use bottled items to filter fluids (Ink Bottles, Blood Vials, etc)
- Added camera shake command (/ironsSpellbooks camera_shake <pos> <radius> <ticks>)

### Changes
- Removed cooldown from Infernal Sorcerer Chestplate passive ability
- Passive Ability tooltips now use a purple color scheme instead of a green-yellow color scheme
- Cursor homing will no longer allow interference of friendly targets

### Fixes
- Fixed log complaining about Patchouli recipe if Patchouli is not installed
- Fixed Ice Tomb being subject to friendlyfire
- Fixed CME with camera shake manager
- Fixed camera shakes ignoring dimension
- Fixed other visual issues with camera shaking

### API
- Creating a camera shake data now requires a level to be passed in
  - Deprecated `CameraShakeData(int, Vec3, float)`, which now only adds the camera shake instance to the overworld
  - Added `CameraShakeData(Level, int, Vec3, float)`, which adds the camera shake to the given level instead of all dimensions

## <span class="yellow"> [3.14.5] (1.21.1) 2025-10-09</span>
### Additions
- Added The Chronicle
  - A craftable book commemorating the names of all past and present Patrons
  - Can be read in game
  - Can be placed on a lectern

### Changes
- Buffed Electrocute's base damage in absence of breath effects
- Reworked Flaming Barrage Spell:
  - Recasts no longer select targets
  - Fireballs no longer home on preset entities
  - Recast to fire individual fireballs
  - The fireballs now home towards your cursor, or the entity targeted by your cursor
- Small Fireballs now emit particles and sounds on impact
- Small Fireballs now emit trail particles after 3 ticks of being alive

### Fixes
- Fixed Ice Tomb not being able to be crit
- Fixed Counterspell hit registration breaking in a previous update
- Fixed Breath attack spells having inconsistent base damage
  - Electrocute now has intentionally higher base damage
- Fixed Electrocute rendering
- Fixed Zap particle rendering in certain circumstances when the particle atlas wasn't active

### API
- Removed all special features out of AbstractMagicProjectile child classes, and integrated them into AbstractMagicProjectile for generic use by all children.
  - These features currently include: Piercing, Ricocheting, Entity homing, and Cursor homing
  - The goal is that all magic projectiles can be modified or utilize these special behaviors. The system is still WIP, so they are all considered "unstable" for addon use.
  - (API Unstable) Added `AbstractMagicProjectile#setPierceLevel`
  - (API Unstable) Added `AbstractMagicProjectile#getPierceLevel`
  - (API Unstable) Added `AbstractMagicProjectile#getHomingTarget`
  - (API Unstable) Added `AbstractMagicProjectile#setHomingTarget`
  - (API Unstable) Added `AbstractMagicProjectile#isCursorHoming`
  - (API Unstable) Added `AbstractMagicProjectile#setCursorHoming`
  - (API Unstable) Added `AbstractMagicProjectile#canRicochet`
  - (API Unstable) Added `AbstractMagicProjectile#setCanRicochet`
  - (API Unstable) Added `AbstractMagicProjectile#handleCursorHoming`
  - (API Unstable) Added `AbstractMagicProjectile#handleEntityHoming`
  - (API Unstable) Added `AbstractMagicProjectile#rotateWithMotion`
  - (API Unstable) Added `AbstractMagicProjectile#discardHelper`

## <span class="yellow"> [3.14.4] (1.21.1) 2025-09-26</span>
### Changes
- Neutral Wizard anger/aggro is now tracked per-player
- Adjust Pyromancer trade balance
  - Buy Candle trade: now requires 4 candles (instead of 1), and gives 1 emerald (instead of 2)
  - Buy Honey trade: now requires 2 bottles (instead of 1)
  - Buy Blaze rods trade: now requires 3 blaze rods (instead of 1)
- Adjust Pyromancer tower structure
  - Now uses Wisewood bookshelves, and new decoration blocks
- Potion Fluid tooltips now include duration, if applicable

### Fixes
- Fixed Twilight Gale missing better combat support
- Summon Ender Chest now consumes scrolls properly
- Fixed armor cape physics when multiple entities are preset
- Frost Field more strictly respects friendlyfire
- Fixed merchant wizard's not preventing interactions when hostile on the client
- Fixed merchant wizards not properly looking at trading player
- Fixed client desync of guiding bolt homing effect
- Fixed entities summoned by mobs potentially unloading into broken state

### API
- Added `IMerchantWizard#stopTrading` helper
- Added `FocusOnTradingPlayerGoal`
- Added `NeutralWizard#increaseAngerLevel(Player, int, boolean)`
- Deprecated `NeutralWizard#inreaseAngerLevel(int, boolean)`
  - Use player-sensitive version instead
- Note: the fixes for merchant wizards listed above need to be implemented on a per-entity basis. [See commit details here](https://github.com/iron431/irons-spells-n-spellbooks/commit/c8349f9b6afc6ef25e3a8302efd182b93ebda8a4#diff-e2c10ac92eb7764ce0290bb54a244538cf6cbf247f8309ab2d0d97a621657b5d)

## <span class="yellow"> [3.14.3] (1.21.1) 2025-08-26</span>
### Additions
- Added Fire Artifact: the Infernal Sorcerer's Chestplate
  - Has normal Artifact attributes
  - Has passive ability: Immolation
- Added the Twilight Gale, a crystalline spear enthralled with lightning magic
  - Imbued with Volt Strike 5
  - Can be thrown with enhanced trident-like mechanics
    - Item is not consumed to throw, but goes on 10s cooldown
    - Picking up thrown item immediately resets cooldown
    - Throw damage scales with attack damage and enchantments
    - Can be enchanted as a Sword
    - Can be enchanted with Loyalty
    - Can be enchanted with Channeling, which empowers all throws with lightning, making thrown damage scale off of Lightning Spell Power
- Added Config for disabling Ice Spider Patrols

### Changes
- Adjusted new School Armor Smithing Recipes to avoid recipe viewer conflict
  - Recipes now require Arcane Essence as an additional material, because the missing slot bugged out non-JEI recipe viewers
  - Added a crafting recipe variant to make the change more intuitive (although Smithing Table is still required to transfer enchantments/imbues/others)
  - May be revisited in the future
- Rebalanced Ice Spider Patrol spawnrate
  - Delay range increased from 4-5 minutes to 8-11 minutes
  - Player count less significantly reduces delay
  - Spawn chance increased from 25% to 50%, reducing inconsistency in spawnrates
  - Added config for disabling partrols
  - Fixed events not firing, preventing certain compatibilities between mods
- Improved Spell Wheel text display
  - Now displays cooldown, if the cooldown is greater than zero
  - Mana cost line is no longer displayed if the mana cost is zero
  - Fixed visual bug with line separator
- Pocket Dimension now prevents all types of teleportation
- Overhauled Ice Spike visuals

### Fixes
- Fixed Ice Spider Patrol not firing associated spawning events, breaking compatibility with some mods
- Fixed spectators being able to be hit by raycast spells
- Fixed casting Pocket Dimension while riding a mob desyncing the player
- Fixed Chain Lightning entities persisting longer than they should
- Fixed Ice Tomb collision preventing Ice Blocks from hitting/proccing them
- Fire Fields more strictly respects friendlyfire
- Snowball more strictly respects friendlyfire
- Fixed Pocket Dimension blocks from being destroyed by the Wither
- Fixed Ice Spikes from clipping through the ground
- Fixed Ice Tomb collision from blocking certain raycasts
- Fixed Cursed Armor Stands from not have persistence in the Citadel structure
- Fixed incompatibility with some shaders playing mob animations during different render passes

### API
- Removed deprecated `SyncedSpellData` effect flags system (replaced by api-friendly `ISyncedMobEffect`)
  - Removed SyncedSpellData  static fields `ANGEL_WINGS`, `EVASION`, `HEARTSTOP`, `ABYSSAL_SHROUD`, `ASCENSION`, `TRUE_INVIS`, `CHARGED`, and `PLANAR_SIGHT`
  - Removed `SyncedSpellData#hasEffect`, `SyncedSpellData#hasLocalEffect`, `SyncedSpellData#addEffect`, `SyncedSpellData#addLocalEffect`, `SyncedSpellData#removeEffect`, `SyncedSpellData#removeLocalEffect`, `SyncedSpellData#addEffects`, `SyncedSpellData#removeEffects`
  - Constructors for `EnergySwirlLayer`s no longer take a long flag, instead a predicate or `Holder<MobEffect>`

## <span class="yellow"> [3.14.2] (1.21.1) 2025-07-31</span>
### Additions
- Added Volt Strike spell

### Changes
- Only Eldritch Spells now appear in the Eldritch Learning Screen, instead of all learnable spells
- Adjust Black Hole visuals and sounds
- Rework Soft Cap formula
  - Affects all reductive attributes (Cooldown Reduction, Spell Resistance, Cast Time Reduction, etc)
  - Softcap begins sooner and approaches maximum slower
- Updated Korean Localizations, thanks to moralless0591
- Tweak Wizard Armor icons
- Spell Balance
  - Rework Chilled debuff
    - No longer doubles incoming freeze time
    - If affected creatures become fully frozen, the effect is now consumed to encase them in an evil Ice Tomb
      - (Evil Ice Tombs double incoming damage that breaks them to creature inside)
    - Snowball's initial explosion now afflicts Chilled, not freeze
    - Ice Tombs no longer afflict Chilled
    - Frostwave still afflicts Chilled
  - Rebalance Ball Lightning
    - Damage range reduced from [6,15] to [5,9.5]
    - Lifetime increased from 4s to 5s
  - Buff Ice Shadows
    - Now create a small explosion around them for half their shatter damage
  - Buff Lob Creeper Spell
    - Increase explosion radius 3.5 → 5 blocks
    - Increase base projectile velocity
  - Buff Chain Creeper Spell
    - Increase explosion radius 3.5 → 5 blocks
    - Chained explosions now count down from the previous chain count, instead of only spawning 3 more bombs
  - Nerf Heartstop
    - Reduce Max Level 10 → 5
    - Reduce Initial Duration 15s → 10s
    - Increase Min Rarity Common → Rare
    - Increase Base Mana Cost 50 → 100
  - Nerf Acid Spit
    - Reduce Max Level 10 → 8
    - Increase Base Mana Cost 30 → 40
    - Increase Mana Cost Per Level 3 → 10
  - Nerf Heat Surge
    - Reduce Max Level 8 → 6
    - Increase Mana Cost Per Level 8 → 10
  - Nerf Fortify
    - Increase Base Cooldown 35s → 60s
    - Increase Base Mana Cost 40 → 80
    - Increase Mana Cost Per Level 5 → 10
    - Increase Cast Time 2s → 3s
  - Nerf Recall
    - Explicitly no longer able to be cast from combat (similar to Pocket Dimension)
    - Increase Cast Time 4s → 5s
    - No longer affected by Cast Time Reduction
  - Nerf Teleport
    - Increase Mana Cost Per Level 2 → 5
  - Nerf Bloodstep
    - Increase Cooldown 5s → 12s
  - Nerf Frost Step
    - Increase Cooldown 10s → 12s
  - Nerf Earthquake
    - Slowness effect is now capped at amplifier 3
  - Nerf Sculk Tentacles
    - Damage no longer scales with level
    - Reduce tentacle damage hitbox size
  - Nerf Blight
    - Increase Base Cooldown 35s → 90s
    - Increase Base Mana Cost 10 → 60
    - Increase Mana Cost Per Level 5 → 20
  - Nerf Angel Wings
    - Reduced Base Duration 30s → 10s
    - Reduced Duration per Level 30s → 10s
    - Increased Base Mana Cost 60 → 80
    - Increased Min Rarity Epic → Legendary
    - Now acts more like a short-term glider with low uptime, unless the caster actively specs into cooldown and holy power

### Fixes
- Fixed centered Mana Bar overlay not respecting hotbar height
- Fixed Sacrifice explosions being able to damage items
- Fixed Creeper Bomb explosions being able to damage items
- Fixed potential incompatibilities causing new smithing recipes to be invalidated

### API
- Added `/ironsSpellbooks upgrade` command
- Added `/ironsSpellbooks it` (inscription table) command
- Added `/it` command, only accessible in a development environment
- Added `ISyncedMobEffect`, an interface that makes the API sync affected `MobEffects` to all clients
  - Allows client-based state tracking native to effect lookups
  - Replaces `SyncedSpellData` synced effect flags. Currently only used by Volt Strike and Abyssal Shroud
- Added `NoAdditionSmithingTransformRecipe`

## <span class="yellow"> [3.14.1] (1.21.1) 2025-07-29</span>
### Changes
- Tyros can now break blocks around him, if damaged while "stuck"

### Fixes
- Fixed concurrent modification exception that could happen when summons were unloaded to a chunk
- Fixed Cursed Armor Stands not always de-aggroing properly
- Fixed Shadow-Walker armorset pivots (Better Combat leg bug)

### Api
- Added `SpellCooldownAddedEvent` with a `Pre` and `Post` event, courtesy of clcment446


## <span class="yellow"> [3.14.0] (1.21.1) 2025-07-14</span>
### Additions
- Added Wizard Armorset, made from Arcane Cloth
  - Now acts as a crafting precursor to all previous armors made from Arcane Cloth
  - Helmet has a Hood and Hat variant (can be used interchangeably in crafting recipes)
  - Has the same base stats as late game armor, but lacks any specializations
  - Dyeable
- Added Dying to Netherite Battlemage Armorset
- Added Greater Conjurer's Talisman necklace
- Added configurable glow settings to summoned entities
  - By default, owned summons now glow a soft green
- Added advancements for recently added spellbooks and staves (Frostbranded Book, Vampiric Spellbook, Pyrium Staff)

### Changes
- Reworked late game armor recipes
  - School armor is now crafted in the smithing table, using Wizard armor and a School rune
  - Netherite Battelmage armor is now crafted in the smithing table, using Wizard armor, a Netherite Ingot, and Netherite Smithing Upgrade Template
- Overhauled summon spells and mechanics
  - Summon spells are now recastable, where recasting unsummons them. This also limits active summon count
  - Summoned mobs log-in and log-out with their summoner
  - Removed summon timer mobeffects
  - Summons cannot leave the summoner's dimension, and are unsummoned if the summoner changes dimension
  - Rebalanced all summon spells:
    - Raise Dead base summon count buffed 1 -> 3
    - Summon Vex base summon count buffed 1 -> 3
    - Summoned Polar Bear health now scales with spell power
    - Summoned Polar Bear now has passive regen
    - Summon Horse attribute scaling completely overhauled
    - No changes to Summoned Swords
- Buffed Conjurer's Talisman summon damage (10% -> 15%)
- Replaced Scroll and Arcane Cloth textures, thanks to CrispyTwig
- Melee damage spells now reflect their bonus damage in the tooltip again

### Fixes
- Fixed a variety of bugs surrounding summon state tracking and desync
- Fixed nonmagic summon damage being able to damage owner
- Fixed summons not correctly updating lastHurtBy tracking, affecting when mobs fight back against summons
- Fixed recast bar not correctly adapting to new custom boss bars
- Fixed Summoned Horse safe fall distance not scaling with its jump strength
- Fixed Summoned Polar Bear tooltip not showing damage scaling with spell power
- Fixed players with high enough scale attribute from immediately teleporting out of Pocket Dimension by clipping into Pocket Dimension Portal Frame
- Implemented a hacky fix for geckolib's glowing mob issues (geomobs are now no longer allowed to glow)
- Fixed Stomp falling blocks visual offset

### API
- Added `DyeableArmorRenderer`. Automatically adjusts color of bones that start with the prefix "dye" to the item's dyecolor
- Added `SummonManager`
  - Added `SummonManager#getOwner`
  - Added `SummonManager#setOwner`
  - Added `SummonManager#getSummons`
  - Added `SummonManager#initSummon`
  - Added `SummonManager#setDuration`
  - Added `SummonManager#removeSummon`
  - Added `SummonManager#recastFinishedHelper`
  - Added `SummonManager#stopTrackingExpiration`
  - Handles all summon state tracking and serialization. Porting guide available on iron.wiki
- Added `AbstractSpell#getLockedMessage` for custom unlearned error messages in Scroll Forge (courtesy of FireOfPower)

## <span class="yellow"> [3.13.1] (1.21.1) 2025-07-01</span>
### Fixes
- Fixed Ice Spiders being able to aggro each other
- Fixed Boreal Blade missing sword tags, preventing things like enchantments

## <span class="yellow"> [3.13.0] (1.21.1) 2025-06-28</span>
### Additions
- Added Ice Tomb spell
  - Cast to entomb yourself in a protective layer of ice, slowing healing while within, and completely absorbing one hit or counterspell before breaking
- Added Snowball spell
  - Cast to throw a large snowball, freezing creatures on impact, and leaving a frosted field which continuously builds up freeze on creatures within
- Added Frostbite spell
  - Cast to imbue yourself with a frostbiting magic, causing fully-frozen creatures you kill to turn into Ice Shadows
- Added Ice Spider
  - Has 3 melee attacks, a grappling pounce attack, and a defensive leap
    - Can cast Snowball or Ice Spikes after leaping away
    - Grappled enemies are entombed in ice. Breaking the tomb transfers double damage to the entity inside
    - Grapple attack can be blocked, disabling the shield
  - Has accurate moving hitboxes
  - Can crouch and climb through obstacles
  - Can drop an Icy Fang upon death, a useful crafting ingredient
- Added Ice Spider Egg block
  - When found in the world, it has a protective layer of ice around it
  - Breaking the ice allows it to be harvested, and will summon nearby Ice Spider to protect it
  - Requires silk touch to harvest after ice shell has been destroyed
- Added Ice Spider den structure
  - Approach an unassuming derelict structure in icy biomes
  - Descend into an infested dungeon, a ruinous landscape repurposed as an Ice Spider's den, full of Ice Spider Eggs
- Added Icy Fang item, a drop from Ice Spiders
- Added Ice Venom Vial item, a crafting ingredient refined from Icy Fangs
- Added the Boreal Blade, a magic ice greatsword crafted from Mithril and Ice Venom
- Added the Frostbranded Book, a top-their Ice spellbook
- Added craftable Furled Map variant, leading to the Infested Ruins
- Added lens flare to Magic Missile rendering
- Added Spell Wheel config option to make it ignore Gui Scale (always fit screen). Not enabled by default.

### Changes
- Frozen Humanoid mobs (Ice Shadows) can now mimick entities
- Rebalanced/Fixed Echoing Strikes spell power scaling
- Nerf Summoned Swords spell
  - All entity's base damage reduced by 2
  - Sword and Rapier base health reduced by 5
- Long Casts are no longer interrupted by Heartstop Damage, Fall Damage, or Drowning Damage

### Fixes
- Fixed craftable Furled Map item translations
- Fixed hoppers being able to insert stacks of items into Alchemist Cauldron input slots
- Fixed Evasion being able to dodge Heartstop damage
- Fixed Dead King's second phase transition not cancelling his current action
- Significantly optimize shield-particle collision handling; add client config to completely disable it

### API
- Added structure-based aquifer management, to help encase and protect underground structures from aquifer generation
  - Experimental, maybe unstable, and scarcely accessible through `AquiferHelper#registerTrackedStructure`
- Fixed `IndividualTerrainStructurePoolElement` beardifier config from generating jigsaw junction beardification (causing terrain "residue" at surface level around jigsaw x-z coordinates)

## <span class="yellow"> [3.12.3] (1.21.1) 2025-06-19</span>
### Changes
- Updated Chinese localizations, courtesy of Hanekmio

### Fixes
- Fixed typo in Pocket Dimension unplaceables tag prevent a large subset of blocks from being identified

### API
- Made `ClientSpellCastHelper#animatePlayerStart` public
- Added support for one item being a focus for multiple schools, if tagged as such

## <span class="yellow"> [3.12.2] (1.21.1) 2025-06-19</span>
### Additions
- Added Pocked Dimension spell, patreon request of Infektedskrpion
  - Teleports caster into small, personal pocket dimension
  - Cannot be cast from combat
  - Some spells or blocks cannot be used in the dimension
- Added item tags: `irons_spellbooks:imbue_whitelist` and `irons_spellbooks:upgrade_whitelist`, courtesy of Ace
- Added Spell Griefing effects to Black Hole
- Added custom bossbars to Tyros and Dead King
- Added Fiery Smoke particle, which is now used in Fiery Explosions and Fireball trail

### Changes
- Tyros's parry ability now have a cooldown phase
- Tweaked Shadowwalker Armor Icons

### Fixes
- Fixed Summoned Swords not unsummoning after their duration was over
- Fixed pvp friendly fire checks
- Fixed upgrades not returning all orbs if an orb type was stacked

## <span class="yellow"> [3.12.1] (1.21.1) 2025-05-22</span>
### Additions
- Added Spell Wheel Toggle keybind (unbound by default)

### Changes
- The mod-id of a Scroll item is now attributed to the mod of the held spell
- Vampiric Spellbook now gives affinity to Blood Slash and Blood Step, instead of Acupuncture and Blood Needles

### Fixes
- Fixed spell bar transparency handling, which should fix escape menu artifacting
- Significantly optimize cpu usage during JEI recipe building
- Fixed hopper-alchemist cauldron interactions
- Fixed Blastwave particle culling
- Fixed Summoned Weapon entities being able to drown
- Fixed Spell Wheel being allowed to be opened for a frame if the player has no spells equipped

## <span class="yellow"> [3.12.0] (1.21.1) 2025-05-04</span>
### Changes
- Updated Tyros Attack Abilities
  - Reworked triple-slash animation
  - Added new melee move, utilizing a fiery dagger
  - Added ability to parry
- Adjust Dead King Balance
  - Drops half as much Arcane Essence
  - Named drops now have a 50% chance of dropping
  - Rune loot drops separated from ink loot drops and merged into scroll loot drops
  - Improved pathfinding
  - Now has damage resistance to projectiles
  - Health increased 400 -> 500hp
- Remodeled Shadow-Walker armorset
- Nerfed Ancient Knight netherite droprate (25% -> 12.5% chance)
- Nerfed Lightbringer Chestplate (removed spell resistance)
- Reworked Cursed Doll Spellbook visuals
  - No longer a doll, but a dedicated spellbook - the Vampiric Spellbook
- Buffed Villager Bible spell book attributes to be in line with Cursed Doll (Vampiric) Spellbook
- Updated Iron's Jewelry Compat
  - Cooldown runes now give twice as much reduction
  - Retextured Rune-Inscribed Ring and Rune Palettes
- Tweaked Spellbreaker texture
- Tweaked Hellrazor texture
- Adjust Fire Spell Icons
  - Retexture Firebolt spell icon
  - Adjust Wall of Fire, Scorch, Flaming Barrage, Fire Breath, and Burning Dash to use the same fire color palette

### Fixes
- Fixed Summon Damage attribute only affecting spell damages sources
- Prevent Merchant wizard trades from being read client-side
- Fixed Pyrium Ingot not being fire resistant
- Removed Active Spell Overlay
- Fixed armor rendering improperly with latest Geckolib
- Fixed casting mobs not rendering Ray of Siphoning
- Fixed Dead King not looking at his targets
- Fixed Wither Skull and Creeper Head projectile rotation rendering
- Fixed Spell Selection Manager not defaulting to first spell without manual selection
- Fixed Ice Spikes generating in the air (now need a block to support them)
- Fixed Ice Spikes targeting potentially stopping short

## <span class="yellow"> [3.11.0] (1.21.1) 2025-03-28</span>
### Additions
- Overhauled Alchemist Cauldron
  - Now is a fully-fledged fluid tank, with modded piping compatibility
    - Reworked JEI, crouch display, and according features to use fluids and milibuckets
  - All Recipes are now Datadriven, with dynamic potion handling
  - Added "Empty", "Fill", and "Brew" Recipe Types
  - Added Timeless Slurry texture
  - Added Crying Obsidian recipe
  - Added Bloody Vellum item and recipe
- Added Fluids
  - Blood
  - Timeless Slurry
  - Potion
    - Uses `minecraft:potion_contents` and `irons_spellbooks:potion_bottle_type` components to hold potion information
  - All Inks
  - All Elixirs
- Added Dye support to Portal Frame portals, courtesy of Electroely
  - Portal Frames can no longer be right-clicked to teleport
  - Portal Frames can now be right-clicked with a dye in hand to dye the portal color (at both ends)
  - Added Portal Frame config to only allow owner to dye the portal (default: enabled)
  - Added Portal Frame config to only allow owner to break the portal frame block (default: disabled)
- Added Bloody Vellum item (crafting ingredient)
- Added Cursed Doll spellbook item
  - Grants Blood Spell Power, Spell Resistance, and Affinities to Acupuncture and Blood Needles
  - Patreon request of Apshock

### Changes
- Rebalance Frost Step
  - Ice Shadow now taunts nearby enemies, taking their aggro
  - Ice Shadow now takes 5 seconds to explode without taking damage
  - Stats now scale along reasonable numbers
- Rework Starfall Targeting
  - Comets are now biased towards landing on top of entities in the zone
  - Zone is no longer outlined
  - Improve overall comet trajectory in relation to the zone
- Adjust Ice Spell Icons
- Improve Ice Spike target detection
- Rework Ender Particle
  - Now uses spell sprite instead of dust sprite
  - Is now used more liberally across ender spells
- Necronomicon now gives +2 levels to Raise Dead instead of +1

### Fixes
- Fixed Priest House structures not utilizing mossify structure processors
- Fixed Summoned Swords not being able to be counterspelled
- Fixed Staffs not showing any applicable enchantments in the enchanting table

### API
- Alchemist Cauldron
  - `AlchemistCauldronBuildInteractionsEvent` is now no longer fired, and does nothing (deprecated, pending removal)
  - `AlchemistCauldronRecipeRegistry` is now no longer used, and adding recipes to it does nothing (deprecated, pending removal)
  - `CauldronPlatformHelper`, `AlchemistCauldronRecipe`, and `AlchemistCauldronInteraction` are now no-op classes (deprecated, pending removal)
  - Added `irons_spellbooks:alchemist_cauldron_brew` Recipe Type
    - Takes a base fluidstack `base_fluid`, an item ingredient `input`, and produces a list of fluidstacks `results`, and optional byproduct itemstack `byproduct`
    - Can be datagenned
  - Added `irons_spellbooks:alchemist_cauldron_fill` Recipe Type (fills the cauldron with a fluid from a given item, such as an ink bottle)
    - Takes an input ingredient `input`, a resulting fluidstack to fill the cauldron `fluid`, an itemstack to return `result`, an optional sound event `sound` (defaults to water bottle empty sound), and an optional boolean `mustFitAll` (default: true) of whether the entirety of the fluid must fit in the cauldron in order to perform the action
    - Can be datagenned
  - Added `irons_spellbooks:alchemist_cauldron_empty` Recipe Type (empties the cauldron via an item, such as an empty bucket)
    - Takes an input ingredient `input`, a required fluidstack `fluid`, resulting itemstack `result`, and optional sound event `sound` (defaults to water bottle fill sound)
    - Can be datagenned
- Added `handleCustomLecternPosing` to `ILecternPlaceable`, allowing custom posestack manipulation
- Affinity Data Rework
  - Affinity data now supports multiple spells per item.
  - Old component format (`id` and `bonus` field) is temporarily supported (deprecated, pending removal)
  - New component format is a map-like entry `bounses`, with key-value pairs of spellId to bonus level, ie `bonuses:{"irons_spellbooks:fireball":1,"irons_spellbooks:magic_missile":2}`

## <span class="yellow"> [3.10.2] (1.21.1) 2025-03-22</span>
### Changes
- Rebalance Arrow Volley Spell
  - Arrows no longer proc iframes
  - Arrow damage no longer scales from level, only spell power
- Update Chinese and Japanese translations
- Casting Implements are no longer Multihand Items by default
  - Using a casting implement is intended to be a way of commiting to a mage build, but being able to utilize casting implements in the offhand gave all the benefits while mitigating most cost

### Fixes
- Fixed Wisewood Bookshelves not being able to power enchanting tables
- Fixed missing Better Combat weapon tags
- Fixed non-nullsafe jei code due to upgrade orb changes
- Fixed Spell Filters having an invalid yet nonempty return if all spells are disabled/disabled looting
- Fixed XP Mana bar no longer hiding the XP bar while active
- Fixed Betrayer Signet Ring multiplying damage instead of multiplying bonus damage
- Fixed Stomp and Arrow Volley direction resetting

### API
- Added optional "force" field to Spell Filters. If true, it forces spells to be lootable (useful for eldritch loot tables)

## <span class="yellow"> [3.10.1] (1.21.1) 2025-03-16</span>
### Changes
- Update Chinese and Japanese translations

### Fixes
- Fixed Touch Dig spell not using item enchantments
- Fixed Looting enchantment negatively affecting boss drop rates
- Fixed Armor Pile destruction effect causing stack overflow when destroying another Armor Pile
- Fixed inconsistent teleportation desintation solving
- Fixed multipart entities (such as the Enderdragon) being untargetable for targeted spells

## <span class="yellow"> Echo of Flames [3.10.0] (1.21.1) 2025-03-15</span>
### Additions
- Return of the Citadel:
  - Added the Citadel structure
  - Added Fire Boss
    - Spellcasting Enemy
    - 5 Melee Combos
    - 4 Unique Boss abilities
    - Summons Citadel Keepers
    - Music by Caner Crebes
    - Several unique drops
  - Added Cursed Armorstands
- Spells:
  - Added Fire Arrow Spell
  - Added Raise Hell Spell
  - Added Summon Swords Spell (Patreon request of Hazen)
  - Added Touch Dig Spell
- Items:
  - Added Hellrazor
  - Added Decrepit Scythe
  - Added Legionnaire Flameberge
  - Added Pyrium Staff
  - Added Signet of the Betrayer
  - Added Cinderous Soulcaller
  - Added Ancient Furled Map
  - Added Decrepit Key
  - Added Chained Book
  - Added Divine Soulshard
  - Added Mithril Weave (crafting ingredient)
  - Added Pyrium Ingot (crafting ingredient)
  - Added Timeless Slurry (crafting ingredient)
  - Added Holy Artifact: Lightbringer's Chestplate
  - Added Evocation Artifact: Boots of Speed
  - Added Music Disc: Flame Still Burns
  - Added Flame Still Burns Music Disc Shards
- Blocks:
  - Added Cinderous Keystone block
  - Added Brazier and Soul Brazier blocks
  - Added Nether Brick Pillar block
  - Added Book Stack decoration block
  - Added Wisewood Bookshelf and Chiseled Bookshelf blocks
- Added Pedestal block Recipe
- Added Creative Inventory Tab for Iron's Spellbooks Blocks
- Added "creativeCooldowns" and "creativeMana" configs for disabling cooldowns and mana in creative mode
  - By default, creative mode no longer requires mana or respects cooldowns

### Changes
- Flaming Strike Visual Entity replaced with particle
- Replaced soul campfires with soul braziers in the Catacombs throne room
- Changed Ancient Knight visuals
  - Armor is no longer made out of netherite, but a decrepit material
  - Reworked Decrepit Flamberge texture
- Armor Piles
  - Reworked Visuals
  - No longer requires diamond tools
  - Nerfed Drops
- Rebalance ink drops across all loot
  - Lower qualities of ink are more plentiful, while higher qualities are more rare
  - Regular casting mobs (Pyromancer, Apothecarist, etc) now cannot drop legendary ink
- Summons now preemptively scan for and attack creatures that target their owner
- Eldritch Blast no longer procs Iframes

### Fixes
- Melee mobs can no longer hit through blocks
- Fixed recast bar intersecting with boss bars

### API
- Removed `TransformStack#pushRotationWithBase`
- Added `guiding_bolt_immune` tag for projectiles

## <span class="yellow"> [3.9.1] (1.21.1) 2025-03-08</span>
### Changes
- Upgrade Orb Type definitions now allow ingredients as container items (allowing custom components)
### Fixes
- Fixed invalid upgrade orb component crashing while trying to render tooltip
- Fixed SpellSelectionManager desync on player death

## <span class="yellow"> [3.9.0] (1.21.1) 2025-03-08</span>
### Additions
- Added Datadriven support for Upgrade Orb Types
- Added item component for item upgrades: `irons_spellbooks:upgrade_orb_type`

### Changes
- Oakskin movement debuff no longer scales with level, but is a fixed -20%
- Greater Oakskin Elixir buff from 30% -> 40% damage reduction

### API
- BREAKING CHANGE: Upgrade Orbs are now datadriven
  - See discord for porting to the new system
- Now native to 1.21.1
- Now supports official Curios API
- All curios are initialized into the spell wheel, instead of just Spellbooks
- MagicPercentAttribute now implements NeoForge's Percentage Attribute formatting

## <span class="yellow"> [3.8.10] (1.21) 2025-02-15</span>
### Changes
- Improve Thunderstorm death message
- Improve Ice Block Spell projectile tracking

### Fixes
- Fixed friendlyfire checks from ignoring server pvp
- Fixed the possibility of "None" scrolls generating if all scroll loot is disabled
- Fixed JEI displaying recipes for spells configured to be uncraftable
- Fixed Inscription Table and Scroll Forge background rendering twice

## <span class="yellow"> [3.8.9] (1.21) 2025-01-23</span>
### Changes
- Retextured all Runestones
- Nerfed Oakskin (Requires config reset)
  - Now imposes -4% movement speed per level
  - Cooldown increased from 35s -> 90s

### Fixes
- Fixed Counterspell particles only appearing when hitting entities
- Fixed Charged Creepers not giving a Bottle o' Lightning when consuming an empty bottle stack of size 1

## <span class="yellow"> [3.8.8] (1.21) 2025-01-04</span>
### Additions
- Builtin Compat with Repurposed Structures, courtesy of TelepathicGrunt

### Changes
- Updated Chinese and Ukrainian localizations, courtesy of FezeRyn, Hanekmio, and Oleksandr

### Fixes
- Resolved the looping between portals issue when two portals are cast on top of each other.
- Fixed Electrocute Spell visuals clipping into player torso
- Fixed Zap particle chain beams having the incorrect offset

## <span class="yellow"> [3.4.0.7] (1.20.1) 2025-01-04</span>
### Changes
- Updated Chinese and Ukrainian localizations, courtesy of FezeRyn, Hanekmio, and Oleksandr

## <span class="yellow"> [3.8.7] (1.21) 2024-12-11</span>
### Changes
- Summon Damage attribute now affects Sacrifice Spell
- Update Chinese language (courtesy of FezaRyn)

### Fixes
- Disabled outdated Apotheosis data files

## <span class="yellow"> [3.4.0.6] (1.20.1) 2024-12-27</span>
### Changes
- Backport Balance Changes
  - Spell Balance Changes of 3.8.6
  - Removed curio salvaging for Arcane Salvage

## <span class="yellow"> [3.8.6] (1.21) 2024-12-11</span>
### Additions
- Added compat for Iron's Gems 'n Jewelry
  - Added Mithril metal material
  - Added Arcane metal material
  - Added Divine Pearl gem material
  - Added all runes as a rune material
  - Added Rune-Inscribed Ring Pattern
    - Accepts a rune, and gives an attribute

### Changes
- Spell Balance Changes
  - Sonic Boom: now pierces entities
  - Telekinesis: force is much less springy
  - Ascension: Lightningbolt know applies a wave of knockback, which scales with damage dealt
  - Slow/Haste (requires config reset)
    - Reduced Max Level 6->4
    - Increased Minimum Rarity Uncommon->Epic
    - Increased Cooldown 45->80 seconds
  - Ice Block: Base damage increased 8->14
  - Ray of Frost: Base damage increased 9->12
  - Evasion: Max teleporation radius reduced 18->12 blocks
- Significantly improved player animation transitions
- Removed curio salvaging for Mithril
- Improved the Eldritch Learning Screen for access to more spells

### Fixes
- Fixed blood cauldron overriding empty cauldron's interactions
- Fixed IMobEffectEndCallback on death only working for players
- Fixed Shield Entity damage client syncing issue


## <span class="yellow"> [3.8.5] (1.21) 2024-11-24</span>
### Changes
- Priests no longer guard chests

### Fixes
- Fixed gui fade option transparency not always working
- Fixed contextual spell bar setting hiding spell bar while using scroll modifier keybind
- Fixed Angel Wings implementation to be more compatible with various mods

## <span class="yellow"> [3.4.0.5] (1.20.1) 2024-11-24</span>
### Fixes
- Updated Tetra compat to Tetra v6.5.0 (courtesy of mickelus)

## <span class="yellow"> [3.8.4] (1.21) 2024-10-31</span>
### Fixes
- Fixed Knockback CME exception

## <span class="yellow"> [3.8.3] (1.21) 2024-10-30</span>
### Additions
- Spellbooks and other books can now be placed in chiselled bookshelves

### Changes
- Removed Caelus as a dependency

### Fixes
- Optimize Knockback handler
- Optimize Guiding Bolt Manager
- Fixed Guiding Bolt Effect not homing if you shoot a projectile from inside the mob's hitbox range
- Fixed dangerous ordering of portal frame saving
- Fixed Patchouli book recipe

## <span class="yellow"> [3.8.2] (1.21) 2024-10-22</span>
### Changes
- Reimplement Patchouli Compat for 1.21+

### Fixes
- Add config safety check to jei plugin
- Temporarily remove apothic attributes compat to restore cross version compatibility

## <span class="yellow"> [3.8.1] (1.21) 2024-10-21</span>
### Fixes
- Fixed dedicated server startup issue

## <span class="yellow"> [3.8.0] (1.21) 2024-10-21</span>
### Additions
- Added Item Component for Casting Implement Functionality
  - irons_spellbooks:casting_implement
- Added Item Component for Multihand Weapon Functionality
  - irons_spellbooks:multihand_weapon
- Added Config to disable Scroll Upgrading, courtesy of Cephelo
- Added Mana Regeneration Multiplier Config
- Added Casting Movement Speed Attribute
  - Affects the user's movement speed while casting
  - Currently Unused
- Added Apothic Attributes Formatting Compatibility
- Expanded Lectern Functionality
  - Spellbooks can now be placed on lecterns
  - "Lore Items" can now be placed on lecterns
- Added Archevoker Logbook item
  - Has translated and untranslated variants
  - Spawns in Evoker Fort tower lectern
  - Replaces Written Book in Villager Bible Questline

### Changes
- Updated Languages
  - Russian, thanks to Tefny and Quark
  - Added Vietnamese support, thanks to Le P. Thanh Sang
- Root no longer affects any boss (instead of just Ender Dragon)
- Black hole is now less effective against bosses, as well as creatures with high knockback resistance

### Fixes
- Void Tentacles are no longer affected by Black Hole
- Fixed Pedestal being unable to sync empty item stacks
- Fixed Staffs always showing imbued item's cooldown reduction
- Fixed Energy Swirl effect incorrectly calculating model transforms
- Fixed Aoe Entities being affected by explosion knockback
- Fixed Inscription Table Exploit

### API
- Added Events, courtesy of clement
  - CounterSpellEvent
  - SpellSummonEvent
- Multihand and Casting Implement functionality is now component based. Nothing needs to be done if you were not manually implementing these

## <span class="yellow"> [3.4.0.3] (1.20.1) 2024-10-21</span>
### Additions
- Config to disable scroll upgrading
### Fixes 
- Backported Fixes
  - Inscription Table Exploit
  - Water Processor
  - AOE knockback
  - Energy Swirl Rendering


## <span class="yellow"> [3.7.0] (1.21) 2024-09-28</span>
### Additions
- Added new Advancement: A Fool's Foley
  - Anger a wizard by looting a nearby chest
- Added config for Hoglins to pass on Netherward Tincture's effect when bred (defaulted to true)
- Added Waterlogging to Inscription Table, Scroll Forge, Firefly Jar, Armor Pile, and Pedestal

### Fixes
- Fixed advancements not being visible due to 1.21 format change
- Fixed blood cauldron block crashbug due to missing default interaction
- Fixed poison cancelling long casts
- Fixed Alchemist Cauldron and hopper interaction

## <span class="yellow"> [3.4.0.2] (1.20.1) 2024-09-28</span>
### Fixes 
- Backported Fixes
  - Fixed Alchemist Cauldron and hopper interaction

## <span class="yellow"> [3.4.0.1] (1.20.1) 2024-09-18</span>
### Changes
- Backported Spell Balance changes from 3.6.0 and 3.5.0
- Backported Necromancer nerf from 3.4.5

### Fixes
- Backported various fixes
  - Fixed Flaming Strike Spell being able to damage items
  - Fixed Scorch Spell entity recast positioning
  - Fixed some spells not using config power multiplier
  - Fixed Affinity Rings being able to roll disabled spells
  - Fixed Chain Lightning entity using a dangerous comparator
  - Fixed Priest dangerous level lookup during spawn
  - Fixed casting mobs dangerous server operation during load from nbt

## <span class="yellow"> [3.6.2] (1.21) 2024-09-17</span>
### Fixes
- Fixed generated resources being omitted from last build

## <span class="yellow"> [3.6.1] (1.21) 2024-09-15</span>
### Changes
- Wither effect can now be cleansed


## <span class="yellow"> [3.6.0] (1.21) 2024-09-15</span>
### Additions
- Added Cleanse Spell
- Added Ice Spikes Spell

### Changes
- Necromancers now only drop Scrolls on player kill
- Spell Balance Changes:
  - Guiding Bolt
    - Guiding Bolt Projectile Speed increased by 30%
    - Guided Effect duration increased from 15s -> 25s
    - Guided Projectiles home from farther, and more quickly
    - These changes should make hitting the Guiding Bolt debuff more rewarding and worthwhile
  - Fortify
    - Decreased cast range from 16 -> 8 blocks
  - Sunbeam
    - Increased base damage from 10 -> 12
    - Increased damage per level from 1 -> 1.5
    - Decreased windup time from 20 -> 15 ticks
    - These changes should make Sunbeam more viable compared to other pillar aoe spells
  - Heal (Requires Config Reset)
    - Base Healing reduced from 6 -> 5 HP
    - Max Level reduced from 10 -> 8
    - Min Rarity increased from common -> uncommon
    - Cooldown increased from 25s -> 30s
    - Mana Cost per level increased from 10 -> 15
    - While Heal was intended to be a jack-of-all-trades, Heal always outperformed and overshadowed other healing spells in their own niche. These changes should make relying on just Heal without specing holy power less universally viable
  - Blessing of Life
    - Base healing increased from 4 -> 6 HP
  - Healing Circle
    - Increased radius from 4 -> 5 blocks
  - Divine Smite
    - Improved damage hitbox placement
    - Increased damage hitbox radius
    - Increased base damage from 5 -> 8
  - Flaming Strike
    - Improved damage hitbox placement and hit registration
    - Decreased damage per level from 3 -> 2
    - Redid Spell Icon

### Fixes
- Fixed Healing Circle Entity Effect Particles
- Fixed Flaming Strike Spell being able to damage items
- Fixed Scorch Spell entity recast positioning
- Fixed some spells not using config power multiplier
- Fixed entity tags not being loaded
- Fixed missing tool/enchantment tags for various items

## <span class="yellow"> [3.5.0] (1.21) 2024-09-03</span>
### Additions
- Added Portal Frame block, allowing for permanent portal spell connections
- Added King's Lullaby music disc (Music by Caner Crebes)
- Added Sunbeam Spell
- Added decorated pots to various Catacombs rooms
- Added decorated pot room to Pyromancer Tower cellar

### Changes
- Spell Balance Changes:
  - Acid Spit:
    - Remove spell power scaling of rend percent
    - Increased base rend percent (5%->20%)
    - Increased base effect duration (15s->20s)
  - Heat Surge:
    - Removed spell power scaling of rend percent
    - Decreased default rend percent (20% -> 15%)
  - Blight:
    - Removed spell power scaling from effect percents
  - Teleport, Blood Step, Frost Step:
    - Teleport range now scales with a softcap
- Aoe Fields now fit to the ground better
- Overhauled Ancient Battlegrounds origin structure piece
- Separated Fire Particle from Fire Emitter Particle, and now use fire particle is various contexts

### Fixes
- Fixed Priest's Villager Bible trade
- Fixed Scrolls without spell container component crashing the client
- Fixed Armor Cape Layer not tracking to entity's during various animations
- Fixed Affinity Rings being able to roll disabled spells
- Fixed geckolib mob invisibility handling

## <span class="yellow"> [3.4.5] (1.21) 2024-08-24</span>
### Additions
- Added Amulet of Teleportation

### Changes
- Nerfed Necromancer's spell power

### Fixes
- Fixed Necromancers not spawning naturally
- Fixed anger particles playing when they shouldn't for neutral casting mobs
- Fixed Rod o' Lightning no longer being fire resistant
- Fixed holding on to references of various objects, causing additional memory consumption
- Fixed Chain Lightning entity using a dangerous comparator
- Fixed Priest dangerous level lookup during spawn
- Fixed casting mobs dangerous server operation during load from nbt
- Fixed SyncedSpellData copying all data on death, instead of only persistent data
- Fixed duplicate curio attribute modifier ids

## <span class="yellow"> [3.4.4] (1.21) 2024-08-11</span>
### Changes
- Remove InterModComms with curios to fix compat with a different curios API port that broke inter mod comms

## <span class="yellow"> [3.4.3] (1.21) 2024-08-10</span>
### Fixes
- Fixed default magic data attachment having null server player

## <span class="yellow"> [3.4.0] (1.19.2 | 1.20.1) 2024-08-10</span>

### Additions
- Added Weapon Parts, crafted from Arcane Salvage and used for crafting magic weapons
- Added Spellbreaker, a craftable imbued sword
- Added Amethyst Rapier, a craftable imbued sword

### Changes
- Arcane Anvil now returns Upgrade Orbs when using a Shriving Stone
- Reworked Alchemist Cauldron
  - Water Level and Liquid Contents are no longer separate values. This should make interactions much more intuitive
- Loot-Only curios can now be recycled
  - Can be Smelted into Arcane Salvage, and crafted from Arcane Salvage and a designated item
- Affinity Rings can now be attuned to specific spells by combining a ring with a scroll of any level in the Arcane Anvil

### Fixes
- Fixed Firefly Jar not having a loot table
- Fixed True Invisibility not affecting the aggro of mobs that use Brain for targeting
- Fixed Inscription Table ghost block/dupe when exploded
- Fixed Abyssal Shroud destination logic
- Fixed Inscription Table bug/exploit relating to death

## <span class="yellow"> [3.4.2] (1.21) 2024-08-10</span>
### Changes
- Adjusted drop rate of magic items Trial Chambers chests

### Fixes
- Fixed null crash when rendering armor with enchantment glint or smithing trims
- Fixed Arcane Anvil not saving imbued spell containers

## <span class="yellow"> [3.4.1] (1.21) 2024-08-09</span>
### Fixes
- Added missing common item/block tags for Mithril
- Fixed Firefly jar recipe using wrong glass tag
- Fixed loot tables being allowed to roll mace enchantments
- Fixed dedicated server crash

## <span class="yellow"> [3.4.0] (1.21) 2024-08-09</span>

### Additions
- Port to 1.21
- Added crouch display to Alchemist Cauldron contents
- Added specific Stronghold/End City loot tables for magic items
- Added Loot to Trial Chambers
  - Pots
    - Chance to drop Arcane Essence, or rarely drop a Scroll 
  - Chests
    - Arcane Essence, Cloth, Scrolls, Blank Runes, Curios, Ink, and Elixirs
  - Spawners
    - Mana Potions
  - Ominous Spawners
    - High Quality Mana Potions, and Elixirs
  - Vaults
    - Scrolls, Ink, Curios, Arcane Essence, and Blank Runes
  - Ominous Vaults
    - Magic Equipment, High Tier Resources, Empty Upgrade Orbs, High Quality Scrolls/Ink, and Arcane Essence
- Added Mithril
  - Mithril Ingot
  - Mithril Scrap
  - Raw Mithril
  - Mithril Ore
  - Deepslate Mithril Ore
- Added Weapon Parts, crafted from Mithril and used for crafting magic weapons
- Added Spellbreaker, a craftable imbued sword
- Added Amethyst Rapier, a craftable imbued sword
- Added Autoloader Crossbow, a unique Trial Chambers reward
- Added Ring of Expulsion, a unique Trial Chambers reward
- Added Ring of Visibility, a unique Trial Chambers reward

### Changes
- Affinity Data can now specify a bonus greater than 1
- Arcane Anvil now returns Upgrade Orbs when using a Shriving Stone
- Reworked Alchemist Cauldron
  - Water Level and Liquid Contents are no longer separate values. This should make interactions much more intuitive
- Loot-Only curios can now be recycled
  - Can be Smelted into Mithril Scrap, and crafted from Mithril Scrap and a designated item
- Affinity Rings can now be attuned to specific spells by combining a ring with a scroll of any level in the Arcane Anvil
- Pyromancer Chestplate now has a cape addition
- Casting Mobs now display capes from armor with capes

### Fixes
- Fixed Firefly Jar not having a loot table
- Fixed True Invisibility not affecting the aggro of mobs that use Brain for targeting
- Fixed Inscription Table ghost block/dupe when exploded
- Fixed Abyssal Shroud destination logic
- Fixed Inscription Table bug/exploit relating to death

### API
- Removed irsonspellbooks from java group id
  - io.redspace.ironsspellbooks.irons_spellbooks => io.redspace.irons_spellbooks
- Removed Deprecated Content
  - CastType#holdToCast
  - AbstractSpell#needsLearning (replaced by AbstractSpell#requiresLearning)
  - AbstractEldritchSpell class
- Added Events
  - AlchemistCauldronBuildInteractionsEvent

## <span class="yellow"> [3.3.0] (1.19.2 | 1.20.1) 2024-07-16</span>
### Changes
- Large Balance Changes
  - Armor
    - School Armor now gives +10% school spell power per piece (previously +8%)
    - School Armor and Netherite Battlemage Armor now gives +5% Spell Power per piece
    - School Armor and Netherite Battlemage Armor now gives +125 Max Mana (previously +100)
    - Scarecrow Armor now gives +75 Max Mana (previously +50)
  - Scrolls
    - Increased stack size to 64
    - Upgrading scrolls now requires one ink per level, instead of a scroll of equal level
      - The rarity of the ink is equal to the rarity of the resulting scroll rarity
  - Upgrade Orbs
    - Spell Power Upgrade Orbs now give +5% power (previously +3%)
    - Cooldown and Resistance Upgrade Orbs now give +5% Cooldown/Spell Resistance (Previously +6%)
  - Spellbooks
    - Spellbooks now give max mana
      - "High Tier" spellbooks (spellbooks with spell power buffs) now give +200 Max Mana
      - Enchanted Spell Book and Ruined Spell Book now gives +100 Max Mana
      - Apprentice Spell Book now gives +50 Max Mana
- Tweaked Alchemist Cauldron Texture
- Removed strict hold-to-cast mechanics from scrolls and casting implements
- Adjusted Cone of Cold particles

### Fixes
- Fixed JEI Scroll Upgrade recipes showing one additional level past max level
- Fixed Long Casts going on cooldown if the cast was cancelled by opening a menu
- Fixed the Dead King dropping a loot table of ink, instead of always Legendary Ink
- Fixed ground height algorithm used in Target Area rendering
- Fixed spell rarity of a spell over its max level appearing as common

## <span class="yellow"> [3.2.2] (1.19.2 | 1.20.1) 2024-07-09</span>
### API
- Abstracted AbstractCastingMob into IMagicEntity interface

## <span class="yellow"> [3.2.1] (1.19.2 | 1.20.1) 2024-07-05</span>
### Changes
- Updated Japanese Translations, thanks to SAGA
- Updated Korean Translations, thanks to smoong
- Updated Russian Translations, thanks to Tefnya

### Fixes
- Fixed world upgrader code resetting spellbook slot NBT on relog after using Spell Slot Improvement item
- Fixed visual bug with the cast command resetting an item's use progress
- Fixed config loading incompatibility with Modernfix
- Fixed Arcane Anvil JEI recipe memory usage

## <span class="yellow"> [3.2.0] (1.19.2 | 1.20.1) 2024-06-19</span>
### Additions
- Added Flaming Barrage Spell
- Added Ball Lightning Spell
- Added Sacrifice Spell
- Added Rod o' Lightning, a staff enhancing lightning magic
- Added Energized Core, a crafting ingredient to the Rod o' Lightning
- Added Lesser Spell Slot Improvement, an item that can increase a Spell Book's capacity up to 12 slots
- Added Mana Text offsets in client config
- Added server config option to disable spellcasting in adventure mode

### Changes
- Buffed Scorch Spell
  - Increased radius
  - Now leaves a fiery field where it scorches
- Made Thunderstorm targeting more strict to lessen collateral damage
- Restricted the damage types (mainly damage over time) that can trigger an Echoing Strike
- Updated Heat Surge and Frostwave spell particles
- Updated various language files thanks to community members
- Slight adjustment to Priest AI

### Fixes
- Fixed Portals not playing the destination sound to the player teleporting
- Fixed Capes and Angel Wings rendering over each other
- Fixed Neutral Trading Wizards ceasing to trade after taking damage from a non-player source
- Fixed certain magic summons being attack unprovoked by mobs like Iron Golems

## <span class="yellow"> [3.1.7.1] (1.20.1) 2024-05-29</span>
# Fixes
- Fixed casting mobs no longer displaying long cast animations

## <span class="yellow"> [3.1.7] (1.19.2 | 1.20.1) 2024-05-28</span>
### Additions
- Added config for disabling Wandering Trader magic item trades (default is enabled)

### Changes
- While using the Cast command, if the executing entity could not support long casts, they now skip the cast time in order to successfully cast the spell
- Adjusted Cone of Cold particles

### Fixes
- Fixed Netherite Battlemage armor not being fire resistant
- Fixed Black Hole Spell's order in creative menu/JEI
- Fixed Spellcasting mobs casting Fang Ward while out of range
- Fixed disabling all spells to cause merchant trying to sell scrolls to crash the client
- Fixed Ice Block Projectile serialization
- Fixed Scroll exploit

### API
- Improved functionality of SpellSelectionManager.SpellSelectionEvent. Still a work in progress
- Removed Deprecated Methods/Events
  - SpellCastEvent (Previously Replaced by SpellPreCastEvent and SpellOnCastEvent)
  - SpellSelectionManager#initOther
  - AbstractSpell#getLevel(int, LivingEntity) (Previously replaced by getLevelFor(int, LivingEntity))
  - AbstractSpell#getMana(int, LivingEntity) (Previously replace by getMana(int))
  - AbstractSpell#onCast(Level, int, LivingEntity, MagicData) (Previously replace by onCast(Level, int, LivingEntity, CastSource, MagicData))
  - Utils#doMeleeAttack (Previously replaced by doMeleeAttack(Mob, Entity, DamageSource))

## <span class="yellow"> [3.1.6] (1.19.2 | 1.20.1) 2024-05-20</span>
# Additions
- Added Italian and Chinese-Taiwan localizations

# Fixes
- (1.19.2 only): Fixed old structures relying on outdated catacombs file preventing their extensions from generating

## <span class="yellow"> [3.1.5] (1.19.2 | 1.20.1) 2024-05-13</span>
### Additions
- Added Scorch Spell
- Added Echoing Strikes Spell
- Added Thunderstorm Spell
- Added several new Catacombs room pieces
- Added client config for disabling boss music
- Added new command parameter to mana command: "get"

### Changes
- Adjusted Wall of Fire spell icon to be differentiable from Scorch spell icon

### Fixes
- Fixed Dead King Music potentially playing twice over if killed and respawned near the Dead King fight
- Improved Abyssal Shroud teleporting mechanics potentially making the player become stuck
- Fixed the Blood Staff not renaming properly when upgraded
- Fixed mana regeneration of less than one being truncated
- Fixed spellbook curio render logic affecting custom body models

### API
- AnimationHolder now allows non-irons_spellbooks namespaces for animation resourcelocations

## <span class="yellow"> [3.1.4] (1.19.2 | 1.20.1) 2024-04-26</span>
### Additions
- Added AllowCrafting config to each spell, which can prevent a spell from being craftable in the scroll forge (PR of squoshi)

### Changes
- Reworked Various Spell Icons, thanks to Renovated Studios
  - Frostwave
  - Sculk Tentacles
  - Telekinesis
  - Spider Aspect
  - Summon Ender Chest
  - Shockwave
  - Charge
  - Dragon's Breath
  - Poison Arrow
  - Poison Splash
  - Summon Horse
- Adjusted Colors of various spell icons to be more consistent
- Changed GUI arrangement of staff models to better fit one slot
- Reverted Scarecrow Helmet to old texture

### Fixes
- Fixed Ancient Knight's arms no longer animating on 1.19.2
- Fixed Apothecarist ears no longer animating
- Fixed spell level buffs applying inconsistently

### API
- Added UpdateClient helper class to API package (PR from IGN-Styly)
- Added ModifySpellLevelEvent, allowing modders to create custom buffs that affect a spell's level, like affinity rings

## <span class="yellow"> [3.1.3] (1.19.2 | 1.20.1) 2024-04-06</span>
### Fixes
- Fixed new SpellOnCastEvent returning the wrong level

## <span class="yellow"> [3.1.2] (1.19.2 | 1.20.1) 2024-04-05</span>
### Additions
- Added Eldritch Spell Power and Resistance attributes (not utilized in game yet)

### Changes
- Increased the caps on most attributes. Mana regen can now be 0, but not negative

### Fixes
- Fixed Casting Mob model overrides messing with the Dead King's new melee animation
- Fixed client data persisting after logout (such as the spell bar)
- Fixed left-clicking while the spell wheel is open to grab the screen without closing the menu
- Fixed Quick Casts only being able to cast from player's spell book instead of all their spells

### API
- Moved the SpellSelectionManager into the API package (may be a breaking change for mods relying on more than the API)
- Added SpellSelectionManager.SpellSelectionEvent for modders to add custom spell sources to the player
- Split the SpellCastEvent into SpellPreCastEvent and SpellOnCastEvent

## <span class="yellow"> [3.1.1] (1.19.2 | 1.20.1) 2024-03-23</span>
### Additions
- Added item tag support to imbue/upgrade whitelist/blacklist

### Changes
- Adjusted Heat Surge, Flaming Strike, and Magic Missile spell icons
- Reformatted Gust Spell's tooltip
- Adjusted when an item is explicitly labeled as imbeuable

### Fixes
- Fixed non-spellbook Apotheosis gems requiring Apothic curios to register
- Fixed neutral spellcasting mobs still not trading with players after no longer being angry
- Fixed generic Spell Resist attribute not applying to spell damage

## <span class="yellow"> [3.1.0] (1.19.2 | 1.20.1) 2024-03-17</span>
### Additions
- (1.20.1): Fully ported Tetra compatibility
- Added Shockwave Spell
- Added Pyromancer Tower Structure
  - Pyromancer now lives here instead of the Mangrove Hut structure
  - Added Fire Ale item
- Added the Apothecarist, Nature spellcasting mob
  - Has taken over and refurbished the Mangrove Hut structure
  - Neutral, and will trade with the player
  - Uses Splash Potions in tandem with spells
  - Added Netherward Tincture item, which can only be obtained by trading with the Apothecarist
- Added Boss Music to the Dead King boss fight, courtesy of Caner Crebes
- Added Hogskin -> Leather recipe
- Added blastwave particle to Starfall Comets

### Changes
- Pyromancer Rework
  - Now Neutral
  - Can be traded with
  - Now Spawns in Pyromancer Tower instead of Mangrove Hut
- Dying entities can no longer be targeted by spells
- Reworked Spell Griefing Mechanics
  - Instead of using mobGriefing gamerule, there is now a spellGriefing server config
  - The default is off (no spell griefing)
- Reworked Fireball Spell
  - Now has 5 levels (requires config reset)
  - Minimum rarity is now rare (requires config reset)
  - Explosion radius is larger at lower levels
  - Damage is lower at higher levels
  - Reworked explosion visuals
  - Now requires spellGriefing to be enabled to break and ignite blocks
- Adjusted various ring textures
- Reworked Catacombs Throne Room
- Reworked Dead King melee animations
- Dead King Balance Changes
  - Decreased projectile resistance from 25%->0%
  - Increased based health by 25%
  - Now immune to lava
  - Now immune to fall damage
- Reworked all Casting Mobs' look control for better vertical spell casting

### Fixes
- Fixed Spell Bar configured Y offset applying to X and Y
- Fixed Dead King's legs improperly animating during phase transition animation
- Fixed Zap Particle rendering at many rotations
- Fixed Shriving Stones being able to remove the spells of unique items (Hither-Thither wand)
- Fixed client crash on the inscription table caused by JEI resetting the spellbook slot
- Fixed Arrow Volley entity not having an owner
- Fixed Evoker Fort cages having a gap, which pillagers could shoot and kill captive villagers through
- Fixed Apotheosis gem values
- Fixed scrolls with a count of more than 1 not displaying their school texture

### API
- Added interface for easier use of ExtendedArmorMaterials

## <span class="yellow"> [3.0.1] (1.19.2 | 1.20.1) 2024-02-28</span>
### Additions
- Added JEI support to Upgrade Orb recipes

### Changes
- Redid Magma Bomb spell icon
- Staffs can now be upgraded

### Fixes
- Fixed teleportation clipping issues caused by previous update
- Fixed incorrect loot function type cast
- Fixed Projectiles not being able to go through portals
- Fixed client crash caused by upgrading curio items on a dedicated server
- Fixed mismatched Russian translations between versions
- Fixed tooltip index operation potentially being out of bounds with other mod's editing the tooltip at the same time
- Fixed Arrow Volley spell's sub-arrows not keeping track of the original caster

## <span class="yellow">Curio Casting [3.0.0] (1.19.2 | 1.20.1) 2024-02-27</span>
### Additions
- Added Curio Casting System
  - Added Curio slot for spell books
  - Added keybind to cast active spell from your spell book
  - Removed ability to cast by right-clicking with a spell book
  - Removed Rarity limit on Spell Books
  - Increased all Spell Books' spell slot count
  - Unique Spell Books now have additional unlocked slots
  - Added Casting Implements, which allow right-clicking to cast active spell
  - Reworked imbued items (see changes)
- Added Casting Implements
  - Can be right-clicked to cast your active spell
  - Offer spellcasting attributes when held in either hand
- Added Staves (a type of Casting Implement)
  - Graybeard Staff
  - Artificer's Cane
  - Ice Staff
  - Blood Staff (No longer a spell book, see Necronomicon)
- Added Netherite Battlemage armorset
  - Protection of Netherite armor without knockback resistance
  - Mana bonus of School armor without spell power
- Added functionality for Curio Items to be upgraded with upgrade orbs
- Added Recastable Spells
  - Once being cast, they have an additional time window to cast again, for a repeated or separate effect, allowing for multi-stage spells
  - Mana is only consumed on the first cast, and the cooldown triggers after all recasts are expended or wear out
- New Spells
  - Portal Spell (recastable)
  - Eldritch Blast Spell (recastable)
  - Stomp Spell
  - Gluttony Spell
  - Flaming Strike Spell
- Added the Necronomicon
  - Unique Spell Book drop from the Dead King
  - Comes with Blood Slash (5), Blood Step (5), Ray of Siphoning (5), and Blaze Storm (5)
  - Comes with affinity for Raise Dead (+1 level to Raise Dead)
- Cast Command
  - Basic functionality for now
- Added clearCooldown command
- Added Impaled Icebreaker Ship structure
  - Found very rarely in frozen biomes
  - Contains the key crafting component of the Ice Staff
  - Locator maps to this structure can be found in the Mountain Tower
- Added more client configs regarding HUD elements
- Added Hither Thither Wand
  - Unique item, comes imbued with Portal Spell
  - Rare trade of Wandering Traders
- Added 3d Spell Book Models for each spell book, thanks to Cakeman

### Changes
- Spell Book can no longer be right-clicked to cast (See Additions for curio casting system)
- Reworked Spells:
  - Wall of Fire now uses recasting to stage each anchor point before creating the wall
  - Burning Dash now provides I-frames and damages mobs you pass through instead of only where you launch from
  - Spectral Hammer QOL: must be cast on a block it can mine to initiate, can mine many more block types, no longer leaves debris, has a longer range, and much shorter cooldown
- Reworked Imbued Items
  - Armor and Curios now support imbuements
    - Tarnished Crown can now be imbued
    - Chestplate of School armor and Netherite Battlemage armor can now be imbued
  - Imbued items support multiple spells on one item (not yet used in gameplay)
  - Imbued items now add their spells into the player's spell wheel
  - Imbued items can no longer be right-clicked to cast their spell, instead integrating with the curio casting system and its keybinds
- Reworked Arcane Anvil recipe to no longer require Netherite (with accompanying texture change)
- Reworked Spell Book Progression
  - Removed Rarity limit on Spell Books
  - Increased all Spell Books' spell slot count
  - Unique Spell Books now have additional unlocked slots
- Reworked Scroll Textures (Thanks to Bodya33381 for textures)
  - Each school now has a scroll texture
- Reworked Apotheosis Compatibility
  - Added and tweaked many affixes for armor, weapons, and curios
  - Affixes for Spell Books now require Apothic Curios to work
- Adjusted various spell icons
- Changed default keybind Spell Wheel Scroll Modifier (LShift->LAlt)
- Reworked Mountain Tower interior layout
- Items no longer visually bob while on Pedestal block
- The Dead King is now guaranteed to drop either the Blood Staff or Necronomicon (only one)
- Wandering Trader can now sell ink
- Reworked Advancement tree
- Reworked Apotheosis Affixes
### Fixes
- Various changes and fixes

### API
- Various breaking changes

## <span class="yellow">[2.2.2] (1.19.2 | 1.20.1) 2024-01-26</span>
### Additions
- Added a config for better creeper thunderhit behavior

### Changes
- Magic projectiles and lightning can no longer hit their caster
- Made the Keeper Flamberge item fire resistant
- Reworked Lightning Bolt spell hit detection
- Spectral hammer no longer has a chance to leave blocks behind, falling blocks are now visual only
- Redid the Pyromancer and Electromancer Hat icons

### Fixes
- Fixed exploit involving Spectral Hammer spell
- Fixed Spectral Hammer stack overflow at massive sizes
- Affinity Rings can no longer generate for spells with only one level (such as Summon Ender Chest)

## <span class="yellow">[2.2.1] (1.19.2 | 1.20.1) 2024-01-09</span>
### Changes
- Optimized GuidingBoltManager
- Optimized LivingSpawnEvent

### Fixes
- Fixed GuidingBoltManager raycasting into unloaded chunks

## <span class="yellow">[2.2.0] (1.19.2 | 1.20.1) 2024-01-02</span>
### Additions
- Spells
  - Added Haste Spell
  - Added Slow Spell
  - Added Heat Surge Spell
  - Added Frostwave Spell
  - Added Arrow Volley Spell
  - Added Recall Spell
- Added Furled Map Item, an NBT-driven holder for a locator map
- Added Trades to the Priest
  - Furled Map to Evoker Fort
  - Buys and Sells health potions
  - Buys special item for the Villager Bible
- Added Taiga Priest House Variant
- Added two new Evoker Fort camp half pieces
  - Gallows
  - Campsite
- Added a recipe to convert inscribed runes back into Blank Runes
- Added a recipe to convert frozen bones into bone meal

### Changes
- Neutral Wizards now have anger levels, where actions can make them angry but not aggressive.
- Neutral Wizards will now be angered by players opening their chests
- The Priest now has a nosepiece to go with his mask
- Priest Hood has been renamed to Priest Mask to reflect the texture change
- Reworked Guiding Bolt's Guided Effect mechanic. It is now much smoother and more consistent.
- Reworked the "questline" to obtain the Villager Bible
  - Nitwits no longer spawn in Evoker Forts, nor have trades
  - The final trade is done with the Priest
- Evoker Forts are now more rare
- Improved Wizard fleeing behavior (they will cast backwards less often)
- Adjusted Cone of Cold's particles
- Made the Mountain Tower structure less common
- Blazes are now vulnerable to Ice magic
- Divine Smite will now also apply additional enchantment effects, such as fire aspect
- Improved several mob effect icons
- Improved Heal Spell icon
- Improved several spell icon's, courtesy of Renovated Studios
  - Black Hole
  - Blood Slash
  - Devour
  - Magic Arrow
  - Poison Arrow
  - Poison Breath
  - Fire Breath
  - Ray of Siphoning
  - Ray of Frost
  - Sonic Boom
  - Starfall
  - Wall of Fire

### Fixes
- Fixed Divine Smite being able to damage Items
- Fixed Blood Slash's radius calculations
- Fixed Lightning Bolt Spell's aerial targeting
- Fixed successfully using a bottle on a creeper to obtain Bottle o' Lightning still causing the offhand to perform an action
- Fixed Ray of Frost not taking an entity's base freeze time into account when applying freeze
- Fixed Firecracker Spell's incredibly inconsistent damage
- Fixed Cooldowns not persisting serverside after death/player clone

## <span class="yellow">[2.1.2] (1.19.2 | 1.20.1) 2023-12-12</span>
### Changes
- Telekinesis
  - Telekinesis base range increased
  - Telekinesis mana cost no longer scales with level
  - Telekinesis duration now scales with level
  - Telekinesis force is now smoother
- Dragonskin dropped from Ender Dragons now floats and glows

### Fixes
- Fixed Spell MobEffects persisting after death
- Fixed Summoned Entities with no summoner causing a crash after killing a player
- Fixed /kill not working on Dead King Corpse entity

## <span class="yellow">[2.1.1.1] (1.20.1) 2023-12-07</span>
### Changes
- Updated minimum Geckolib version to 4.3.1

## <span class="yellow">[2.1.1] (1.19.2 | 1.20.1) 2023-11-28</span>
### Fixes
- Fixed compatibility with mods attempting to access spell names from the server
- (1.20.1) Fixed item cooldown rendering using the wrong coordinate
 
## <span class="yellow">Eldritch Update [2.1.0] (1.19.2 | 1.20.1) 2023-11-26</span>
### Additions
- Added New School, Eldritch
  - Spells
    - Added Planar Sight Spell
    - Added Sonic Boom Spell
    - Added Telekinesis Spell
    - Reenabled Abyssal Shroud Spell
    - Reworked Sculk Tentacles Spell (was Void Tentacles)
  - Items
    - Added Eldritch Manuscript Item
    - Added Ancient Knowledge Fragment Item
  - Research System
    - Eldritch Spells are unlearned by default. (Cannot be crafted nor cast)
    - Added Research Menu, accessed by Eldritch Manuscripts
- Misc
  - Added Divine Smite Spell
    - This spell is always uninterruptible
  - Added additional Wandering Trader trades
    - Sell ink to Wandering Trader
    - Buy Curios from Wandering Trader
    - Buy scrolls from Wandering Trader
    - Buy mystery bags of scrolls from Wandering Trader
    - Buy Ancient Knowledge Fragments from Wandering Trader
  - Added a Patchouli page for Schools
  - Added a learnSpell command
  - Added Ukrainian Translations
  - Added inherent mob spell resistance
    - Undead are weak to Holy magic and resistant to Blood magic
    - Fire mobs are resistant to Fire magic
    - Water mobs are weak to Lightning magic
  - Added Scroll Bar to Scroll Forge

### Changes
- Spell Balance
  - Ice Block Spell now moves faster and initiates its fall sooner
  - Counterspell Default cooldown reduced from 15s -> 10s (existing worlds need config reset)
  - Improved Lightningbolt Spell's hit detection/placement
  - Increased Lightning Lance Spell's Damage
  - Decreased Lightning Lance Spell's Default Rarity from Rare -> Uncommon (existing worlds need config reset)
  - Magma Bomb impact damage no longer scales with spell level
  - Magma Bomb aoe damage slightly increased
  - Magma Bomb radius is reduced, and now scales with spell power
  - Gust Spell is less affected by knockback resistance
- Misc
  - Unique Spell Books can have their spells improved in the Arcane Anvil, by combining it with a higher level scroll
  - Evoker Spell Book now gives +10% Evocation Spell Power
  - Improved animation smoothing
  - Updated Chinese Translations

### Fixes
- Fixed Spell Power and Resistance Attributes not being able to go below 1
- Fixed Fireward Ring strange behavior due to reliance on mob effect

### API
- Spells now have methods for crafting criteria, craftability, lootability, and interruptibility
- Consolidated mana and cooldown checks into a CastResult class
- Added canBeCastBy (returns CastResult) method to AbstractSpell

## <span class="yellow">[2.0.3] (1.19.2 | 1.20.1) 2023-10-29</span>
### Fixes
- Removed accidently left-in testing code that could mess with mana

## <span class="yellow">[2.0.2] (1.19.2 | 1.20.1) 2023-10-28</span>
### Additions
- Added Mana Regen attribute
- Added the Amethyst Resonance Charm, a craftable necklace that gives +15% mana regeneration

### Changes
- Buff Magic Arrow's base damage by 5
- Add CastSource to SpellCastEvent for developers
- Rework Priest Armor Texture, courtesy of Crydigo
- Tweak most jewelry textures
- Any armor can now be upgraded instead of only mage armor (can_be_upgraded tag has been removed)
- Spectral Hammer debris reduced

### Fixes
- Fixed inconsistent Magic Arrow block penetration
- Fixed the two-handed sword models when using left hand mode
- Mobs can no longer detect your armor when affected by True Invisibility
- Fixed geckolib armor anchor points causing misaligned armor models when the player is animating
- Fixed JEI recipe autocomplete exploit
- Fixed Raise Dead spell not being able to find suitable ground locations at y < 0

### API
- Added InscribeSpellEvent, courtesy of Silvertide7
- Added ChangeManaEvent
- Added SpellDamageEvent

## <span class="yellow">[2.0.1] (1.19.2 | 1.20.1) 2023-10-02</span>
### Additions
- Added SpellCastEvent and SpellHealEvent for developers, courtesy of Silvertide7

### Changes
- Significantly Optimized WorldUpgrader by skipping uninhabited chunks

### Fixes
- Fix Alchemist Cauldron having a null level when spawned in as a structure

## <span class="yellow">Spell Registration Update [2.0.0] (1.19.2 | 1.20.1) 2023-09-24</span>
### Additions
- New Spells
  - Added Earthquake Spell
  - Added Ray of Frost Spell
  - Added Summon Ender Chest Spell
  - Added Firefly Spell
  - Added Oakskin Spell
- Added Elixirs
  - Added Oakskin Elixir
  - Added Invisibility Elixir
  - Added Evasion Elixir
  - Added Greater Potion of Healing
- Added Firefly Jar block
- Added the Druidic Tome, an epic Nature spell book 
- Added spell targeting success notification
- Added school based resistance attributes
  - While these are not used in the game yet, they can be used by modpacks or addons

### Changes
- Schools
  - Poison School has been replaced by the Nature School
  - Void school has been temporarily removed while it is being reworked
    - Black Hole is now an Ender spell
    - Void Tentacles is now an Ender spell
    - Abyssal shroud is now disabled by default (configurable)
- Spells
  - Devour spell no longer pulls enemies in, and has had its range extended
  - Long casts can no longer be held to cast
  - Long casts must be clicked again to cancel mid-cast
- Mobs
  - Cryomancer, Pyromancer, and Archevoker max health increased by 10
  - Cryomancer, Pyromancer, Archevoker, and Necromancer will now attempt to flee from melee combat
  - Archevoker will now use the Gust spell
  - Increased Arcane Essence drop quantity from the Necromancer
- Textures
  - Updated Anicent Codex, Enchanted Spell Book, and Grimoire of Evokation textures
  - Updated Inscription Table's Lore Page texture
  - Update Amulet of Concentration's texture
  - Updated Wandering Magician, Priest, and Electromancer Chestplate icons to better match their armor model
- Misc
  - Potions can now be put into the Alchemist Cauldron
  - Ink can now be put into the Alchemist Cauldron
  - Ink can now be upgraded in the Alchemist Cauldron
  - The visuals of the Target Area Outline (used in spells like Healing Circle) have been improved

### Fixes
- Fixed an issue causing casting mobs to have a difficult time teleporting around non-flat terrain
- Fixed input issues caused by hybrid long casting inputs
- Fixed Cyromancer's armor attribute not reflecting his worn armor

## <span class="yellow">[1.2.1] (1.19.2 | 1.20.1) 2023-08-10</span>
### Additions
- Added the Decrepit Flamberge sword
- Added error message to the Wayward Compass if there is no found structure

### Changes
- Slimmed down Electromancer Chestplate Model
- Slimmed down Priest Chestplate Model
- Slimmed down Archevoker Chestplate Model
- Removed Black Pixel from Archevoker Shoulderpad
- Updated Archevoker, Pyromancer, Electromancer, and Scarecrow Hat icons
- Updated Archevoker and Electromancer Chestplate icons to better match their models
- Slightly Tweaked Pyromancer Hat model
- Updated Plagued Helmet and Chestplate icons
- Overhauled Ancient Knight animations
- Overhauled Ancient Knight sounds
- Overhauled Ancient Knight energy layer
- Ancient Knights now carry Decrepit Flamberges
- Magehunter sword reworked
- Tweaked Chain Lightning and Healing Circle spell icons

### Fixes
- Fixed Black Holes of small enough radius causing a divide by zero crash

## <span class="yellow">[1.2.0] (1.19.2 | 1.20.1) 2023-07-29</span>
### Additions
- Added the Alchemist Cauldron
  - Allows for scrolls to be recycled into ink
  - Allows for brewing of 4 potions at once
  - Allows for production of Blood Vials
  - Supports interactions with dispensers, hoppers, and observers
- Added Mana Potion, which can be brewed from Arcane Essence
- Added loot integration to all of Yung's structure mods
- Added loot integration to Structory

### Changes
- Priests will now heal friendly players
- Aoe and Cone spells no longer cause knockback
- Instant cast spells no longer spam their cooldown error if right click is held down
- Some loot table rebalances, including ink now dropping outside of Iron's Spellbooks structures

### Fixes
- Fixed Aoe entities damaging summons and teammates
- Fixed Wall of Fire igniting summons and teammates
- Fixed True Invisibility effect icon disappearing

## <span class="yellow">[1.1.8] (1.19.2 | 1.20.1) 2023-07-17</span>
### Additions
- Added spell descriptions to tooltips in Inscription Table and Scroll Forge
- Added config option for the cooldown multiplier of imbued weapons
- Added entity collision to the Shield Spell
- Added JEI descriptions on how to obtain various materials

### Changes
- Updated Affinity Ring Textures
- Updated Arcane Cloth and Ingot Textures
- Level of Vigor gained from Devour Spell is now capped at level 10
- Fang Strike default fang count of increased by 2
- Fang Strike fangs now activate faster
- Fang Strike and Fang Ward base cast time reduced to .75 seconds
- Fang Ward fang count now increases exponentially with its ring count
- Imbued weapons now have half the cooldown instead of twice the cooldown
- Updated to new patchouli book format

### Fixes
- Fixed an exploit that could bypass a spell book's rarity limit when inscribing a spell (fixes #94)
- Fixed an exploit that allowed a different focus to be used to craft a scroll (fixes #100)
- Fixed some magic projectiles ignoring shield spell
- Fixed aoe damage sources damaging shields multiple times
- Fixed Magehunter not showing Counterspell until used
- Fixed casting mobs causing null crash if casting while dying

## <span class="yellow">[1.1.7] (1.19.2 | 1.20.1) 2023-07-06</span>
### Additions
- Added Amulet of Concentration

### Changes
- Redid Icicle Projectile Visuals
- Slowed Down Icicle Projectile
- Redid Icicle Spell Icon
- Redid Snowflake Particle Texture
- Redid Magic Missile Visuals
- Redid Magic Missile Icon
- Replaced Dead King Boss Model and Weapon Model, thanks to Crydigo. Includes Programmer Art Texture Pack

### Fixes
- Fixed Spellcasting Mobs casting Fang Strike while out of range
- Fixed Quick Casting a spell out of bounds of your current spell book causing a crash
- Fixed summoned horse being able to enter a glitched death state if summoned while dying
- Fixed the Dead King not using a second single use spell during his second phase
- Lightning Bolt Spell no longer strikes multiple times
- Fixed latest version of Forge causing loot modifiers to crash game

## <span class="yellow">[1.1.6] (1.19.2 | 1.20.1) 2023-06-26</span>
### Additions
- Added Devour Spell, patreon request of Yorhavich
- Added Patchouli Guide Book
- Added descriptions in JEI for Bottles o' Lightning and Blood vials for how to obtain them
- Added config for Priest House spawn rate

### Changes
- Combined Long and Charge Casts
- Made battlegrounds smaller and more rare
- Reworked Priest House to better fit vanilla and modded villages
- Priest shakes his head like a villager if you interact with him
- Refactored mana bar's hunger Y value calculation to automatically fit with other mods UI elements

### Fixes
- Fixed piglins in the battlegrounds not having weapons
- Chain Lightning can no longer target non-living entities, such as minecarts
- Ceased cancelling the use item finish event
- Magical Area of Effect entities are now affected by counterspell
- Fixed typo in language file causing guiding bolt and chaing lightning death messages to not appear


## <span class="yellow">[1.1.5] (1.19.2 | 1.20.1) 2023-06-20</span>
### Additions
- Added a holy spellcasting mob: the Priest. Spawns in a new house in plains villages.
- Added Guiding Bolt Spell
- Added Chain Lightning Spell
- Added Gust Spell
- Added functionality to modded and vanilla projectiles to pass through players with evasion, instead of thinking there was an impact
- Added Spellbook Category of Equipment to Apotheosis (Thanks to amo)
- Added Poison Apotheosis Gem

### Changes
- Invisibility removes you as the active target from nearby mobs that were targeting you.
- Slimmed down priest armor model.
- Disabled first person animations entirely if both configs are disabled
- Improved casting mob movement logic

### Fixes
- Scroll Forge Ink Outline shifted to match ink texture
- Fixed ground detection that prevented certain spells from working below y = 0
- Fixed and issue where casting mobs could choose to drink a potion and cast a spell at the same time


## <span class="yellow">[1.1.4] (1.19.2 | 1.18.2) 2023-06-08</span>
### Changes

- Updated Counterspell to counter magical effects that were recently added
- Update Scroll Forge ink outline to match new textures
- Shifted all ink textures 1 pixel to the right
- Removed Dismount message when rooted
- Improved mob teleport collision detection

### Fixes

- Target Area Visuals no longer persist if the owner dies while casting
- "None Spell" is no longer craftable
- Fixed Single Use Spell timer improperly being ticked, resulting in some mobs never casting it
- Fixed Crash when attempting to slot a spell into a full spellbook
- Fixed some spells not serializing damage

<hr>


## <span class="yellow">[1.1.3, 1.19.2] 2023-05-31</span>
### Changes
- Replaced ink, hogskin, dragonskin, and most spell book textures (Courtesy of Crydigo)
- Increased spell power bonus from 2.5% to 3% on school armor
- Increased spell power bonus on upgrades from 2.5% to 3% per upgrade
- Increased spell resistance upgrade bonus from 2.5% to 6%
- Increased cooldown upgrade bonus from 5% to 6%
- Update Chinese Translations

### Fixes
- Fixed playeranimator not displaying dependencies screen when the game was launched without it
- Fixed necromancer accidentally having only 1 spell

<hr>

## <span class="yellow">[1.1.2] 2023-05-27</span>
### Changes
- Ray of Siphoning render overhaul
- Firebolt render overhaul
- Fireball render overhaul
- Replaced vanilla fireballs with new fireball model (configurable)
- Added School to a spell's configuration
- Added client config for hiding mana bar text
- Added Fire Bomb, Starfall, and Healing Circle Spells
- Cloud of Regeneration is now disabled by default (won't take effect in preexisting world, reset your serverconfig)
- Added Affinity Rings, which give + 1 level to a random spell
- Added item model override support to scrolls and affinity rings
- Replaced all ring textures (thanks to crispytwig)
 
### Fixes
- Fixed Ancient Knight rendering at improper scale and color with shaders
- Fixed Dead King teleport collision check
- Fixed casting mobs improperly tracking aggression
- Fixed imbued weapon overlay not disapearing after dropping imbued item
- Fixed casting mobs being able to reuse a single use spell if the player relogs or goes out of combat
- Added null check to tooltip renderer

<hr>

## <span class="yellow">[1.1.1] 2023-05-19</span>
### Changes
- Updated Chinese Language File
- Renamed Poison Breath to Poison Spray (No other changes)
- Adjust Black Hole cast animation
- Reduced default max level of blight from 10->8 (will not take effect in preexisting worlds)
- Increase Aspect of the Spider default cooldown from 35s->90s (will not take effect in preexisting worlds)
- Added Blood Needles Spell
- Added Acupuncture Spell
- Increased Ray of Siphoning lifesteal rate from 35%->100%
- Increase Blood Slash lifesteal rate from 10%->15%
- Updated Spell Descriptions to include lifesteal rate
- Added error message if you try to cast a targeted spell with no target
- Redid Void Tentacles texture, also fixing shaders issue with the previous texture
- Redid Void Tentacle spell icon
- Fixed Spell Book Advancement Chain and added Dragonskin Spell Book to the chain

<hr>

## <span class="yellow">[1.1.0] 2023-05-12 - Poison Update</span>
### Changes
- New School Added: Poison
  - Corresponding Rune, Upgrade Orb, and Armor (The Plagued Armor Set)
  - Poison Breath Spell
  - Poison Arrow Spell
  - Poison Splash Spell
  - Acid Spit Spell
  - Aspect of the Spider Spell
  - Blight Spell
  - Root Spell
- Evoker Fort reworked:
  - Removed Library Floor
  - Decreased Spawn Rate
  - Moved loot to be harder to grab without fighting anything 
  - Known Issue: Captured Villagers do not adopt the biome of where they spawn
- Spell Balance Changes:
  - All "basic attack" spells deal more damage at lower levels, and less damage at higher levels
  - All cone spells have reduced damage scaling
  - Most "advanced attack" spells cooldown reduced
  - Shield is now larger, has significantly increased health, and can cast farther away from the player
- Loot Table Changes:
  - Reduced Vanilla Chest Scroll Drop chance
  - Increased rune drop chance in nether chests
  - Increased rune drop chance in catacombs chests
  - Increased rune drop chance in treasure chests
  - Reduced ink drop rates overall
  - Ink now drops from killing wizards and the dead king
  - Corresponding runes now drop from wizards
- General Changes:
  - Extended All Summons duration to 10 minutes instead of 3
  - Reworked Dragon Breath Pools
  - Continuous Tooltips are now in mana per second
  - Tooltips say charge time instead of cast time for charge casts
  - Teleports can now go through water
  - Added Mana command
  - Added Poisonward Ring (immune to poison)
  - Wizards now drink potions instead of spamming heal spell
  - Necromancer Spawn Rates significantly reduced
  - Rebalanced the spell arsenal of the necromancer, archevoker, cryomancer, and pyromancer
  - JEED Support
  - Apotheosis Initial Support (more to come)
  - Ascension now charges creepers
  - New Void Spell
  - Cryomancer in Mountain Tower now guards the loot instead of being useless at the top of the tower
  - Ancient Knights are now immune to fall damage and fire damage, and will lunge more frequently
  - Added Shriving stone, which can remove imbuements or upgrades in the smithing table
  - Increased Copper, Iron, and gold spell book capacity by 1 (will not take effect on old spell books)
  - Decreased Villager Bible Rarity to epic
  - Added new legendary spell book, the Dragonskin Spellbook (+10% Ender Power). Crafted From Dragonskin, a new ender dragon drop
  - Added Dragonskin
  - Gave +20% cooldown reduction to the Ancient Codex

### Fixes
- Fixed precast sounds sometimes playing at the wrong time on the client
- Fixed Missing pixels on Cultist and Priest Armors
- Fixed Client duplicating teleport particles
- Fixed Broken Inscription Table generation in mountain tower

<hr>

## <span class="yellow">[1.0.9] 2023-05-12</span>
### Changes
- Added new Mana UI config (Anchoring, Display mode, and XP mode)
- Casting errors moved from chat onto the action bar
- Generified imbuement and added imbuement config overrides, so you can now imbue anything

### Fixes
- Fixed additional dimensions causing mana regen issues
- Made rarity config thread-safe to actually prevent another REI related issue
- Fixed Summon Timer effect not immediately syncing to client after player respawn

<hr>

## <span class="yellow">[1.0.8] 2023-05-06</span>
### Fixes
- Hotfix to make loading rarity config thread safe to prevent an REI related crash

<hr>

## <span class="yellow">[1.0.7] 2023-05-03</span>
### Changes
- Summons now show death and despawn messages to their owner
- Summons now actively track their number through the pre-existing timer effect (mouse over in inventory to see how many are remaining)
- Summons now remove their effect timer if all summons are dead
- The summon effect timers are not wiped after player death
- Added summon damage attribute, which increases your active summon's damage
- Added Conjurer's Talisman, a necklace that gives +10% summon damage
- Increased Summoned Polar Bear's speed
- Summons and Tamed Animals can no longer agro each other
- Reworked fog particle to be significantly more visually appealing (currently only used in the Void Tentacle spell)

### Fixes
- Fixed a bug where summoned skeleton arrows could anger other summons
- Fixed Summoned Polar Bear not letting the player on after the player dies and respawns
- Fixed Black Pixels appearing around certain spells with some visual mods/shaders
- Fixed the tree half of the Evoker Fort being able to clip into the ground
- Fixed invalid rarity config entries being able to crash the game when looking at a tooltip

<hr>

## <span class="yellow">[1.0.6] 2023-05-03</span>
### Fixes
- Replaced most textures that used vanilla textures. This caused issues with texturepacks, especially ones using Optifine. While this does not extend compatibility for these texture packs, it alleviates conflict with them.

<hr>

## <span class="yellow">[1.0.5] - 2023-05-02</span>
### Fixes
- Fixed Dedicated Server Startup Issue https://github.com/iron431/Irons-Spells-n-Spellbooks/issues/15

<hr>

## <span class="yellow">[1.0.4] - 2023-05-01</span>
### Changes
- Added Spawn eggs for the Archevoker, Necromancer, Cryomancer, Pyromancer, Ancient Knight, and Dead King
- Added conflig for Mana Bar position offset in client config
- Added Tetra Material Support
- Arcane Ingot (metal, gives mana)
- Arcane Cloth (fabric, gives cooldown reduction)
- Hogskin (skin, gives new mana siphon effect)
- Runestones (socket, gives corresponding spell power)
- Frozen Bone (bone, gives freezing effect)
- Added Chinese Language Support (Thanks LILPRINCES)

### Fixes
- Improved Mangrove hut placement fix
- Cleaned up summoned entities, fixing https://github.com/iron431/Irons-Spells-n-Spellbooks/issues/8
- Fixed empty spell wheel log spamming
- Slightly tweaked loot table balance

<hr>

## <span class="yellow">[1.0.3] - 2023-04-29</span>
### Initial Release
- Over 55 upgradable spells
- Over 20 equipment items
- Weapon Imbuement System
- Armor Upgrade System
- 10 wizard armor sets
- 5 randomly generated structures
- 5 new enemies; a new boss
- And much more!


