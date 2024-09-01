<script lang="ts">
  import { onMount } from "svelte";
  import phrases from "../../../data/phrases";
  import type { PageData } from "./$types";
  import {
    calculateAttemptResult,
    findLastAlphaIndex,
    isWin,
    replaceCharacterAt
  } from "../../../utilities/stringUtilities";
  import Attempt from "./Attempt.svelte";
  import Keyboard from "./Keyboard.svelte";
  import { GameState, loadLevel, saveLevel } from "../../../data/storage";
  import PageHeader from "../../../components/PageHeader.svelte";
  import InstructionModal from "./InstructionModal.svelte";

  export let data: PageData;

  let showModal = false;

  const MAX_ATTEMPTS = 6;
  let phrase = data.index ? phrases[data.index - 1] : "";

  let hiddenPhrase = phrase.replaceAll(/[a-z]/gi, "_");
  let attemptIndex = 0;
  let attempts: string[] = [];
  let results: string[] = [];
  let gameState = GameState.Playing;

  const handleKeydown = (e: KeyboardEvent) => {
    handleInput(e.key.toLowerCase());
  };

  const handleVirtualKeypress = (e: CustomEvent<string>) => handleInput(e.detail);

  const handleInput = (key: string) => {
    if (gameState !== GameState.Playing) return;
    if (attemptIndex >= MAX_ATTEMPTS) return;

    const value = key.toLowerCase();
    let currentAttempt = attempts[attemptIndex];

    if (value === "backspace") {
      const lastLetter = findLastAlphaIndex(currentAttempt);
      if (lastLetter === -1) return;

      currentAttempt = replaceCharacterAt(currentAttempt, "_", lastLetter);

      attempts[attemptIndex] = currentAttempt;

      return;
    }

    if (value === "enter") {
      if (currentAttempt.includes("_")) return;

      const attemptResult = calculateAttemptResult(currentAttempt, phrase);
      results[attemptIndex] = attemptResult;

      if (isWin(attemptResult)) {
        gameState = GameState.Win;
      }

      if (attemptIndex + 1 < MAX_ATTEMPTS) {
        attemptIndex++;
      } else {
        gameState = GameState.Lose;
      }

      saveLevel(phrase, attempts, results, gameState);

      return;
    }

    if (!currentAttempt.includes("_")) return;

    if (!/^[a-z]$/.test(value)) return;

    currentAttempt = currentAttempt.replace("_", value);

    attempts[attemptIndex] = currentAttempt;
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);

    const savedLevelData = loadLevel(phrase);

    attempts = savedLevelData?.attempts ?? new Array<string>(MAX_ATTEMPTS).fill(hiddenPhrase);
    results = savedLevelData?.results ?? new Array<string>(MAX_ATTEMPTS).fill("");
    gameState = savedLevelData?.state ?? GameState.Playing;

    for (let i = 0; i < results.length; i++) {
      if (results[i] !== "") continue;
      attemptIndex = i;
      break;
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<div class="content">
  <a class="back-link" href="/">{"< levels"}</a>

  <PageHeader />

  <h2>Level {data.index}</h2>

  <div class="attempt-container">
    {#each attempts as attempt, i}
      <Attempt {attempt} result={results[i]} />
    {/each}
  </div>

  {#if gameState === GameState.Win}
    <h2 class="win">You win!</h2>
  {/if}

  {#if gameState === GameState.Lose}
    <h2 class="lose">You lose. The phrase was {phrase.toUpperCase()}.</h2>
  {/if}

  <!-- <p>{phrase}</p> -->

  <Keyboard on:keypress={handleVirtualKeypress} {attempts} {results} />

  <InstructionModal bind:showModal />

  <div class="footer">
    Built by <a href="https://fleetfoxx.dev" target="_blank">fleetfoxx</a> |
    <button class="instruction-button" on:click={() => (showModal = true)}>How to play?</button>
  </div>
</div>

<style lang="scss">
  .back-link {
    text-decoration: none;
    text-align: left;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-height: 100vh;
  }

  .attempt-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 2rem;
  }

  @media (max-width: 700px) {
    .attempt-container {
      gap: 1.5rem;
    }
  }

  .win {
    color: green;
  }

  .lose {
    color: red;
  }

  .footer {
    margin-bottom: 1rem;
  }

  .instruction-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    margin: 0;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
