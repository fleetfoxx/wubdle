<script lang="ts">
  export let attempt: string;
  export let result: string;
</script>

<div class="attempt">
  {#each attempt as letter, j}
    {#if letter === " "}
      <span class="space"></span>
    {:else if letter === "_"}
      <span class="letter"></span>
    {:else}
      <span class={`letter result-${result[j] ?? "x"}`}>{letter}</span>
    {/if}
  {/each}
</div>

<style lang="scss">
  .attempt {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
  }

  .letter {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 600;

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
      /* color: black; */
    }

    &.result-3 {
      border-color: green;
      background: green;
    }
  }

  @media (max-width:700px) {
    .letter {
      width: 2rem;
      height: 2rem;
      font-size: 1rem;
    }
  }

  .space {
    width: 1rem;
  }
</style>
