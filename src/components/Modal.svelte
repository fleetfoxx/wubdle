<script lang="ts">
  export let showModal: boolean;

  let dialog: HTMLDialogElement;

  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={() => (showModal = false)} on:click|self={() => dialog.close()}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <slot name="header" />
    <hr />
    <slot />
    <hr />
    <!-- svelte-ignore a11y-autofocus -->
    <button autofocus on:click={() => dialog.close()}>close</button>
  </div>
</dialog>

<style lang="scss">
  dialog {
    max-width: 40em;
    border-radius: 5px;
    border: none;
    padding: 5px 0;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
</style>
