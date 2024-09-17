<script lang="ts">
    import type { ICombatent } from "$lib/dnd";

    export let deleteCombatent: (id: string) => void;
    export let data: ICombatent;

    function onDelete() {
        deleteCombatent(data.id);
    }
</script>

<div>
    <p>{data.name}</p>
    <button on:click={onDelete}>Delete</button>
</div>