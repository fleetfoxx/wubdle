<script lang="ts">
  import Modal from "../../../components/Modal.svelte";

  export let showModal = false;
</script>

<Modal bind:showModal>
  <h2 slot="header">How to play wubdle</h2>

  <div>
    <p>
      Your goal is to guess the Wubby phrase. Enter words to make a guess, and the colored boxes will give you hints:
    </p>

    <p class="letter-row">
      <span class="letter green">W</span>
      <span class="letter">U</span>
      <span class="letter">B</span>
      <span class="letter">B</span>
      <span class="letter">Y</span>
      <span class="space"></span>
      <span class="letter">W</span>
      <span class="letter">O</span>
      <span class="letter">O</span>
    </p>

    <p>Green means the letter is in the correct position in the correct word.</p>

    <p class="letter-row">
      <span class="letter">W</span>
      <span class="letter">U</span>
      <span class="letter">B</span>
      <span class="letter">B</span>
      <span class="letter yellow">Y</span>
      <span class="space"></span>
      <span class="letter">W</span>
      <span class="letter">O</span>
      <span class="letter">O</span>
    </p>

    <p>Yellow means the letter is in the correct word, but the wrong position.</p>

    <p class="letter-row">
      <span class="letter">W</span>
      <span class="letter">U</span>
      <span class="letter">B</span>
      <span class="letter">B</span>
      <span class="letter">Y</span>
      <span class="space"></span>
      <span class="letter purple">W</span>
      <span class="letter">O</span>
      <span class="letter">O</span>
    </p>

    <p>Purple means the letter is in the phrase but in the wrong word.</p>

    <p class="letter-row">
      <span class="letter">W</span>
      <span class="letter">U</span>
      <span class="letter">B</span>
      <span class="letter">B</span>
      <span class="letter">Y</span>
      <span class="space"></span>
      <span class="letter">W</span>
      <span class="letter">O</span>
      <span class="letter gray">O</span>
    </p>

    <p>Gray means the letter is not in the phrase.</p>
  </div>
</Modal>

<style lang="scss">
  .letter-row {
    display: flex;
    gap: 2px;
    justify-content: center;
  }

  .letter {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    width: 2rem;
    height: 2rem;
    border-radius: 3px;

    &.green {
      background-color: green;
      border-color: green;
      color: white;
    }

    &.yellow {
      background-color: goldenrod;
      border-color: goldenrod;
    }

    &.purple {
      background-color: purple;
      border-color: purple;
      color: white;
    }

    &.gray {
      background-color: gray;
      border-color: gray;
    }
  }

  .space {
    width: 0.5rem;
  }
</style>
