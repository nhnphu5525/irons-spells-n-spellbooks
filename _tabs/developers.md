---
layout: post
icon: fas fa-code
order: 11
toc: true
---

## Introduction

With the 2.0.0 release of Iron's Spells 'n Spellbooks you can now register your own **_spells_** and **_schools_**!
There is also an API to compile against. If you are interested in developing using us as a dependency, you can help shape
the roadmap by joining our discord and asking questions or providing feedback/suggestions.

<a href="https://discord.gg/TRzEdrndM2"><img src="https://img.shields.io/discord/1104430139275743293.svg?label=&amp;logo=discord&amp;logoColor=ffffff&amp;color=7389D8&amp;labelColor=6A7EC2&amp;style=for-the-badge" alt="" width="129" height="28" /></a>

## Dependency Setup
In order to build against Spells 'n Spellbooks, you need to configure your `build.gradle` file.
You will need as least one of the following mavens under `repositories`. 
If you are not interested in building with snapshots, you only need the release maven.

```groovy
maven {
  name = "Iron's Maven - Release"
  url = "https://code.redspace.io/releases"
}
maven {
  name = "Iron's Maven - Snapshots"
  url = "https://code.redspace.io/snapshots"
}
```
In order to include the api in your project, add the following under `dependencies`:
### Forge (1.20.1 and below)
```groovy
compileOnly fg.deobf("io.redspace.ironsspellbooks:irons_spellbooks:${irons_spells_version}:api")
runtimeOnly fg.deobf("io.redspace.ironsspellbooks:irons_spellbooks:${irons_spells_version}")
```
### NeoForge (1.21+)
```groovy
compileOnly "io.redspace:irons_spellbooks:${irons_spells_version}:api"
localRuntime "io.redspace:irons_spellbooks:${irons_spells_version}"
```
## API vs Full Mod Dependency
Alternatively, you can use the entire mod as a dependency. What is the significance of this?
The contents of <span style="color:yellow">io.redspace.ironsspellbooks.api</span> are stable, though they may have limited functionality. 
If you use packages outside of this, you'll have access to all the same tools that we do, but you might encounter breaking changes in future releases. 
If you’d like to expand the API, feel free to submit a pull request to our main repository at https://github.com/iron431/Irons-Spells-n-Spellbooks. 
To use the full mod dependency, replace the previously mentioned `dependencies` with the following in your `build.gradle` file (omit the `api` tag):
### Forge
```groovy
implementation fg.deobf("io.redspace.ironsspellbooks:irons_spellbooks:${irons_spells_version}")
```
### NeoForge
```groovy
implementation "io.redspace:irons_spellbooks:${irons_spells_version}"
```

## Spell Registration

To register spells you will need to create your own registry using a DeferredRegister

```java
public class ExampleSpellRegistry {
  public static final DeferredRegister<AbstractSpell> SPELLS = DeferredRegister.create(SpellRegistry.SPELL_REGISTRY_KEY, IronsExampleMod.MODID);

  public static void register(IEventBus eventBus) {
    SPELLS.register(eventBus);
  }

  public static RegistryObject<AbstractSpell> registerSpell(AbstractSpell spell) {
    return SPELLS.register(spell.getSpellName(), () -> spell);
  }

  public static final RegistryObject<AbstractSpell> SUPER_HEAL_SPELL = registerSpell(new SuperHealSpell());
}
```
This registry works as any other deferred register does, see the [NeoForge docs for more info](https://docs.neoforged.net/docs/concepts/registries/#deferredregister). 

## Configuration
Spells are highly config-driven, including attributes such as the spell's School, Cooldown, Max Level, and more.

In order have your spells configuration injected into the server config file for Iron's Spells n Spellbooks just add
the <span style="color:yellow">@AutoSpellConfig</span> annotation to the class for your spell.

The default values for the configuration are set by overriding the `getDefaultConfig()` method, where you return the default values for all your config settings.

```java
import io.redspace.ironsspellbooks.api.spells.*;

@AutoSpellConfig
public class YourNewSpell extends AbstractSpell {

  /** Declare the default state of your config here */
  private final DefaultConfig defaultConfig = new DefaultConfig()
    .setMinRarity(SpellRarity.RARE)
    .setSchoolResource(SchoolRegistry.HOLY_RESOURCE)
    .setMaxLevel(10)
    .setCooldownSeconds(20)
    .build();

  /**  Return your config here */
  @Override
  public DefaultConfig getDefaultConfig() {
    return defaultConfig;
  }

  //...
}
```

## Other Links

You can now create spells the same way we do in the core mod. For examples of spells you can look at any of the spells
here.

[https://github.com/iron431/Irons-Spells-n-Spellbooks/tree/1.21/src/main/java/io/redspace/ironsspellbooks/spells](https://github.com/iron431/Irons-Spells-n-Spellbooks/tree/1.19.2/src/main/java/io/redspace/ironsspellbooks/spells)

## Porting Summons to Summon Manager System
Summon spells before 3.14.0 used a rudimentary and limited summon tracking system, which was completely overhauled by the `SummonManager` in 3.14.0. Laid out here are the steps to port existing summon spells to the new system.
This new status-quo includes the following structural changes:
- Summon Spells are now recastable, with the second cast being used to unsummon the given mobs. This has several important implications:
  - You can only have 1 batch of summons for a particular spell active at one time
  - Summon Timer mob effects are no longer used. The countdown-till-despawn is exclusively handled by the `SummonManager`, and visually represented through the recast bar
  - Summon spells cannot be cast from scrolls anymore
- Summons logout and login with the summoner, similar to player mounts
- The implementation of these features is still dependent on the modder, but new helper methods and the `SummonManager` class itself make it very easy to do so

<br>
While the previous practice will still work, old helper methods will eventually be removed, and it is overall recommended to transition to the new system to maintain parity with ISS going forward.
There are three core changes to implement into your codebase:
1. Make the spell recastable, and use the various helpers in `SummonManager` and `SummonedEntitiesCastData` to automatically handle summoning/unsummoning
2. Implement Summon Manager tracking into the spell by using `SummonManager` helpers
3. Adapt Summoned Entity Classes by removing manual state tracking 

### Making the spell recastable
This is the simplest part, and can be completed by just copy + pasting the following into your summon spell:
```java
@Override
public int getRecastCount(int spellLevel, @Nullable LivingEntity entity) {
    return 2;
}

@Override
public void onRecastFinished(ServerPlayer serverPlayer, RecastInstance recastInstance, RecastResult recastResult, ICastDataSerializable castDataSerializable) {
    if (SummonManager.recastFinishedHelper(serverPlayer, recastInstance, recastResult, castDataSerializable)) {
        super.onRecastFinished(serverPlayer, recastInstance, recastResult, castDataSerializable);
    }
}

@Override
public ICastDataSerializable getEmptyCastData() {
    return new SummonedEntitiesCastData();
}
```
### Implementing Summon Manager into the Spell
In your `onCast` method, you now need to do the following:
1. Check if the spell has been recast already. If not, summon mobs and initiate recast
2. Initiate SummonManager tracking
3. Initiate recast (as with any recastable spell). Make sure to use `SummonedEntitiesCastData`

Effectively, follow this skeleton:

```java
public void onCast(Level level, int spellLevel, LivingEntity entity, CastSource castSource, MagicData playerMagicData) {
    // 1.a Wrap old onCast function in this if statement:
    PlayerRecasts recasts = playerMagicData.getPlayerRecasts();
    if (!recasts.hasRecastForSpell(this)) {
        SummonedEntitiesCastData summonedEntitiesCastData = new SummonedEntitiesCastData();
        // ...
        // 1.b <Old summon logic goes here>
        // ...
        // 2. Call this for every summon you add to the world to register it with the summon manager:
        //    (This helper sets the owner, expiration time, and sets-up the SummonedEntitiesCastData, all-in-one)
        SummonManager.initSummon(entity, summon, summonTime, summonedEntitiesCastData);
        // ...
        // 3. Finally, trigger the recast. (Make a new recast instance containing the summon cast data, and add it to the player's recasts)
        RecastInstance recastInstance = new RecastInstance(this.getSpellId(), spellLevel, getRecastCount(spellLevel, entity), summonTime, castSource, summonedEntitiesCastData);
        recasts.addRecast(recastInstance, playerMagicData);
    }
}
```
### Adapting Summoned Entity Classes
1. Remove `getSummoner()` and `setSummoner()` methods. You can also remove related class fields and their serialization. All owner manipulation is done through the `SummonManager` now.
2. Remove any owner-manipulation from the Summon's constructor
3. Remove uses of summon-timer mobeffects, including updating your `onRemovedHelper` to use the non-summon-timer version
4. Note: You may notice Iron's Spellbooks summons do not follow all these changes. This is to preserve backwards compatibility with summon addons currently using these methods. If no addons use your summons, then it is safe to make these changes.
5. Cleanup: Remove any summon timer mobeffects, as well as their resources (lang, icons, etc), and consider any balance changes that might need to be made

