<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements'

    interface $$Props extends HTMLButtonAttributes {
      method: () => void;
      absorbInput?: boolean;
    }

    export let method: () => void;
    export let absorbInput: boolean = true;

    function onClick(event: MouseEvent) {
        if (absorbInput) event.stopPropagation();
        method();
    }
</script>

<button {...$$restProps} on:click={onClick}>
  <slot />
</button>
