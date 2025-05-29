<script>
    let now = new Date();

    setInterval(() => {
    now = new Date();
    }, 1000);
    $: formattedTime = now.toLocaleTimeString();
</script>

<div class=toolbar-wrapper>
<div class=tab-container-outer>
    <div class=tab-container>
        <img alt='a' src="assets/logo2.png" class=window-bar-icon/>
        <p class=container-text>Start</p>
    </div>
</div>
<div class=spacer></div>
<div class=center>



</div>
<div class=time-container-outer>
    <p class=container-text>{formattedTime}</p>
</div>
</div>
<style>
    .tab-container-outer {
        border: 1px solid white;
        border-bottom-color: black;
        border-right-color: black;
        width: 64px;
        height: 24px;
        align-items: center;
        /* flex: 1; */
    }

    .center-container-outer {
        border: 1px solid white;
        border-bottom-color: black;
        border-right-color: black;
        min-width: 50px;
        width: 50%;
        height: 24px;
        /* flex: 1; */
    }

    .center-container-outer-on {
        border: 1px solid black;
        border-bottom-color: white;
        border-right-color: white;
        min-width: 50px;
        width: 50%;
        height: 24px;
        /* flex: 1; */
    }

    .tab-container-on {
        display: flex;
        border: 1px solid gray;
        border-bottom-color: darkgray;
        border-right-color: darkgray;
        background-image: linear-gradient(45deg, white 25%, transparent 25%),
            linear-gradient(-45deg, white 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, white 75%),
            linear-gradient(-45deg, transparent 75%, white 75%);
        background-size: 4px 4px;
        background-position: 0 0, 0 2px, 2px -2px, -2px 0px;
        align-items: center;
        flex: 1;
    }

    .container-text {
        /* font-weight: bold; */
        padding-left: 4px;
        padding-right: 4px;
    }

    .tab-container {
        display: flex;
        border: 1px solid darkGray;
        border-bottom-color: gray;
        border-right-color: gray;
        align-items: center;
        flex: 1;
    }

    .center {
        justify-content: start;
        width: fit-content;
        flex-grow: 1;
    }

    .tab-icon {
        margin-right: 6px;
    }

    .spacer {
        display: flex;
        width: 0px;
        border: 1px solid darkGray;
        border-left-color: white;
        border-top-color: white;
        margin-left: 4px;
        margin-right: 4px;
    }

    .time-container-outer {
        border: 1px solid gray;
        border-bottom-color: white;
        border-right-color: white;
        width: 56px;
        height: 24px;
        justify-content: center;
        align-items: center;
        /* flex: 1; */
    }

    .time-container {
        display: flex;
        border: 1px solid gray;
        border-bottom-color: darkgray;
        border-right-color: darkgray;
        align-items: center;
        justify-content: center;
        flex: 1;
    }

    .window-bar-icon {
        /* padding-top: 1px; */
        padding-left: 4px;
        height: 16px;
    }

    .toolbar-wrapper {
        width: '100%';
        padding-right: '6px';
        /* display:inline; */
        display: flex;
    }

</style>