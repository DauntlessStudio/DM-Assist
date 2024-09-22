<script lang="ts">
    export let visible = true;
</script>

<style>
    .container {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
    }
    .center {
		position: absolute;
		background-color: #00bfa5;
		left:  30%;
		right: 30%;
		bottom:30%;
		top: 30%;
		margin:10px;
		padding:10px;
	}
</style>

<button class="container" on:click={() => visible = !visible}>
    <div class="center">
        <slot></slot>
    </div>
</button>