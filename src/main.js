import Hierarchy from "./Hierarchy.svelte";
import {customSources} from "./data.js";

const app = new Hierarchy({
    target: document.getElementById("app"),
    props: {
        items: customSources,
    }
});

export default app;
