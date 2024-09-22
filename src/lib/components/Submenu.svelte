<script lang="ts">
	import { clickOutside } from "$lib/utils";

    export let visible = true;
    export let height = 300;
    export let width = 300;

    function toggleVisibility() {
        visible = !visible;
    }
</script>

<style>
    .container, .container:focus {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        border: 0;
    }
    .center {
		background-color: white;
		margin:auto;
        opacity: 100%;
	}
    .close {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>

<button class="container">
    <button class="close" on:click={toggleVisibility}>X</button>
    <div use:clickOutside={toggleVisibility} class="center" style="width: {width}px; height: {height}px;">
        <slot></slot>
    </div>
</button>