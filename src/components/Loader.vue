<template>
    <div class="loader"></div>
</template>
<style scoped>
.loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: block;
    position: relative;
    border: 10px solid;
    border-color: rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.0) rgba(0, 0, 0, 0.35) rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    margin: auto;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>