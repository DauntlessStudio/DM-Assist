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
        opacity: 50%;
        background-color: black;
        border: 0;
    }
    .center {
		background-color: white;
		margin:auto;
	}
</style>

<button class="container">
    <div use:clickOutside={toggleVisibility} class="center" style="width: {width}px; height: {height}px;">
        <slot></slot>
    </div>
</button>