<script>
    import HierarchyItem from "./HierarchyItem.svelte";
    import {randomId} from "./utils.js";

    export let items = [];

    const addRoot = () => {
        items.push({
            id: randomId(),
            open: true,
            title: randomId(),
            children: [],
            isNew: true,
        });
        items = items;
    };
    const _recursiveChangeState = (item, state) => {
        item.open = state;
        for (const child of item.children) {
            _recursiveChangeState(child, state);
        }
    };
    const toggleShowAll = () => {
        if (!items.length) {
            return;
        }
        const firstItem = items[0];
        const state = !firstItem.open;
        for (const item of items) {
            _recursiveChangeState(item, state);
        }
        items = items;
    };

    function sanitizeBeforeSave(item) {
        const newItem = {...item};
        delete newItem.open;
        delete newItem.ref;
        delete newItem.isNew;
        newItem.children = newItem.children.map(sanitizeBeforeSave);
        return newItem;
    }

    const save = () => {
        alert(JSON.stringify(items.map(sanitizeBeforeSave)));
    };

</script>

<div class="items">
    <div class="actions">
        <button on:click={addRoot}>
            <i class="fas fa-plus"></i>
            Add root source
        </button>
        <button on:click={toggleShowAll}>
            <i class="fas fa-plus-square"></i> / <i class="fas fa-minus-square"></i>
            Toggle all
        </button>
        <button on:click={save}>
            Save
        </button>
    </div>
    {#if items.length}
        <div class="content">
            {#each items as item (item.id)}
                <HierarchyItem
                        item={item}
                        deleteItem={() => {
                            items = items.filter(i => i.id !== item.id);
                        }}
                />
            {/each}
        </div>
    {:else}
        <div class="empty">
            No sources added yet
        </div>
    {/if}
</div>

<style>
    .items {
        padding: 10px 0;
    }

    .items .actions {
        margin-bottom: 10px;
    }
    .items .actions button {
        font-size: 1em;
    }
</style>
