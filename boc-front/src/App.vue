<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul {
    list-style-type: none;
  }

  html {
    background: #000231;
  }

  #app {
    height: 0;
    overflow: visible;
  }

  /*html::-webkit-scrollbar {*/
  /*  background: #102568;*/
  /*  width: 18px;*/
  /*  border-radius: 10px;*/
  /*}*/

  /*html::-webkit-scrollbar-thumb {*/
  /*  background: #1a4fbb;*/
  /*  border-radius: 10px;*/
  /*}*/
</style>
