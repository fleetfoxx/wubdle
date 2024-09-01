<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let attempts: string[] = [];
  export let results: string[] = [];

  const calculateResultLookup = (results: string[]) => {
    const lookup = new Map<string, number>();

    for (let i = 0; i < attempts.length; i++) {
      const attempt = attempts[i];
      const result = results[i];

      if (attempt.length !== result.length) continue;

      for (let j = 0; j < attempt.length; j++) {
        const attemptLetter = attempt[j];
        const resultNumber = parseInt(result[j]);

        if (attemptLetter === " ") continue;
        const currentValue = lookup.get(attemptLetter);
        if (!currentValue) lookup.set(attemptLetter, resultNumber);
        else if (currentValue < resultNumber) lookup.set(attemptLetter, resultNumber);
      }
    }

    return lookup;
  };

  $: resultLookup = calculateResultLookup(results);

  const dispatch = createEventDispatcher();

  const onKeyPress = (key: string) => {
    dispatch("keypress", key);
  };

  const row1 = "qwertyuiop";
  const row2 = "asdfghjkl";
  const row3 = "zxcvbnm";
</script>

<div class="keyboard">
  <div class="row">
    {#each row1 as letter}
      <button class={`key result-${resultLookup.get(letter) ?? "x"}`} on:click={() => onKeyPress(letter)}
        >{letter}</button
      >
    {/each}
  </div>
  <div class="row">
    {#each row2 as letter}
      <button class={`key result-${resultLookup.get(letter) ?? "x"}`} on:click={() => onKeyPress(letter)}
        >{letter}</button
      >
    {/each}
    <button class="key backspace" on:click={() => onKeyPress("backspace")}>←</button>
  </div>
  <div class="row">
    {#each row3 as letter}
      <button class={`key result-${resultLookup.get(letter) ?? "x"}`} on:click={() => onKeyPress(letter)}
        >{letter}</button
      >
    {/each}
    <button class="key enter" on:click={() => onKeyPress("enter")}>ENTER</button>
  </div>
</div>

<style lang="scss">
  .keyboard {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
  }

  .row {
    display: flex;
    justify-content: center;
    gap: 2px;
  }

  .key {
    width: 2.5rem;
    height: 3rem;
    border: none;
    border-radius: 3px;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &.enter {
      width: 5.5rem;
      background: green;
      color: white;
    }

    &.result-0 {
      border-color: gray;
      background: gray;
    }

    &.result-1 {
      border-color: purple;
      background: purple;
    }

    &.result-2 {
      border-color: goldenrod;
      background: goldenrod;
      color: white;
    }

    &.result-3 {
      border-color: green;
      background: green;
      color: white;
    }
  }

  @media (max-width: 700px) {
    .key {
      font-size: 1.2rem;
      width: 2rem;
      height: 2.5rem;
    }
  }
</style>
