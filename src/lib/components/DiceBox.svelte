<script lang="ts">
    let list: string[] = [
        "/images/d4.png",
        "/images/d6.png",
        "/images/d8.png",
        "/images/d10.png",
        "/images/d12.png",
        "/images/d20.png",
    ];

    let gap = 2;
</script>

<style>
    .container {
        display:grid;
        grid-template-columns:repeat(auto-fit, minmax(100px, 1fr));
    }
    .red-filter {
        filter: brightness(0) saturate(100%) invert(15%) sepia(100%) saturate(6932%) hue-rotate(0deg) brightness(100%) contrast(115%);
        width: 100px;
        height: 100px;
    }
</style>

<div>
    <div class=container style={'grid-gap:'+gap+'px'}>
        {#each list as url}
            <img src={url} alt="D20 die" class="red-filter"/>
        {/each}
    </div>
</div>