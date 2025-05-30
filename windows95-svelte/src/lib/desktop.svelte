<script lang="ts">
	import { onMount } from "svelte";
    import Placeholder from "./placeholder.svelte";
	import Toolbar from "./toolbar.svelte";
	import Window from "./window.svelte";
	import Settings from "./settings.svelte";
    
    const OBJECTS = {
        Portfolio: {
            key: 'About Me',
            icon: 'assets/myComputer.png',
            page: Placeholder,
            top: 12,
            left: 12,
        },
        Doom: {
            key: 'Doom',
            icon: 'assets/doom.ico',
            page: Placeholder,
            top: 92,
            left: 12,
        },
    }
    const entries = Object.entries(OBJECTS);
</script>

<div class=desktop>
    <!-- shortcut icons -->
    <!-- {#each entries as [name,object]}
        <div class=`item-{object.key}`>
            <Placeholder/>
        </div>
    {/each} -->

    <!-- window management -->
    <!-- {#each windows as window}
    <p> this is where we'd put the windows</p>
    {/each} -->
    
    <!-- toolbar -->
    <div class=main-screen>
        bleh
    </div>
    <Window 
    showButtonPosition="top-right" 
    showButtonText="Debug Panel" 
    buttonIndex={1}
    contentProps={{ theme: 'dark', username: 'John' }}
    windowTitle="Settings"
  ><Settings/></Window>
  
  <Window 
    showButtonPosition="top-right" 
    showButtonText="Tools" 
    buttonIndex={2}
  />
    <div class=toolbar>
        <Toolbar/>
    </div>
</div>

<style>
    .desktop {
        background-color: green;
        height:100%;
        display:flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .toolbar {
        background-color: yellow;
    }
    .minimized {
        pointer-events: 'none';
        opacity: 0;
    }
    .main-screen {
        flex-grow: 1;
    }
</style>