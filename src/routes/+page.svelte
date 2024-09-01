<script lang="ts">
  import { onMount } from "svelte";
  import phrases from "../data/phrases";
  import { GameState, getAllLevels, type SaveData } from "../data/storage";
  import { isWin } from "../utilities/stringUtilities";
  import PageHeader from "../components/PageHeader.svelte";
  import { base } from "$app/paths";

  let phraseLookup: Map<string, GameState> = new Map();

  onMount(() => {
    const saveData = getAllLevels();

    for (let phrase of phrases) {
      if (!saveData || !saveData[phrase]) {
        phraseLookup.set(phrase, GameState.Playing);
        continue;
      }

      phraseLookup.set(phrase, saveData[phrase].state);
    }

    phraseLookup = new Map(phraseLookup);
  });
</script>

<div class="content">
  <PageHeader />

  <p>A Wubby phrase guessing game built by <a href="https://fleetfoxx.dev" target="_blank">fleetfoxx</a>.</p>

  <h2>Levels</h2>

  <div class="level-link-wrapper">
    {#each phrases as phrase, index}
      <a class={`level-link state-${phraseLookup.get(phrase)}`} href={`${base}/level/${index + 1}`}>{index + 1}</a>
    {/each}
  </div>
</div>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .level-link-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    gap: 0.5rem;
  }

  .level-link {
    display: inline-flex;
    border: 2px solid white;
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &.state-1 {
      background-color: green;
      border-color: green;
    }

    &.state-2 {
      background-color: red;
      border-color: red;
    }
  }
</style>
