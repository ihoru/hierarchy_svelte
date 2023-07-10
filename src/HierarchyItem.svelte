<script>
    import {randomId} from "./utils.js";
    import {beforeUpdate, tick} from "svelte";

    export let item = {
        id: "ID",
        title: "TITLE",
        children: [],
    };
    console.log({...item});
    if (item.open === undefined) {
        item.open = true;
    }
    let focusId;

    const toggle = () => {
        item.open = !item.open;
    };
    const add = () => {
        let id = randomId();
        focusId = id;
        item.children.push({
            id: id,
            open: true,
            isNew: true,
            title: randomId(),
            children: [],
        });
        item.open = true;
        item = item;
    };
    const edit = () => {
        item.ref.focus();
    };
    export let deleteItem = (id, items) => {
        console.log("delete is not defined", {id, items});
        return items;
    };

    beforeUpdate(async () => {
        await tick();
        const child = item.children.find(item => item.id === focusId);
        if (child) {
            child.ref.focus();
            focusId = null;
        }
    });
</script>

<div class="item">
    <div class="current">
        <div class="folder">
            <button on:click={toggle}>
                {#if item.open}
                    <i class="fas fa-folder-open fa-lg"></i>
                {:else}
                    <i class="fas fa-folder fa-lg"></i>
                {/if}
            </button>
        </div>
        <div class="title">
            <input type="text" autocomplete="off"
                   bind:value={item.title}
                   bind:this={item.ref}
            />
        </div>
        <div class="actions">
            &nbsp;
            <button class="action" on:click={add}>
                <i class="fas fa-plus"></i>
            </button>
            <button class="action edit" on:click={edit}>
                <i class="fas fa-edit"></i>
            </button>
            <button class="action delete" on:click={deleteItem}>
                <i class="fas fa-trash"></i>
            </button>
        </div>
    </div>
    <div class="children" class:hidden={!item.open}>
        {#each item.children as child (child.id)}
            <svelte:self item={child} deleteItem={() => {
                item.children = item.children.filter(item => item.id !== child.id);
            }}></svelte:self>
        {/each}
    </div>
</div>

<style>
    button {
        border: none;
        background: none;
        cursor: pointer;
    }
    .current {
        padding-bottom: 5px;
        flex-direction: row;
        display: flex;
    }

    .current > div {
    }

    .item .folder button {
        width: 20px;
    }
    .item .folder,
    .item .actions {
        max-width: fit-content;
    }

    .item .actions .action {
        display: inline-block;
        margin-right: 2px;
    }

    .item .title {
        flex-grow: 1;
        padding-left: 5px;
    }

    .item .title input {
        border-style: none;
        width: 100%;
        outline: none;
        padding: 3px 5px;
    }

    .item .title input:focus {
        outline: 1px dotted #ccc;
    }

    .item .children {
        padding-left: 30px;
    }

    .hidden {
        display: none;
    }
</style>
