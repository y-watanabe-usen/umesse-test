<template>
  <div>
    <div class="bg-umesse-home"></div>
    <router-view />
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  color: black;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 1.3em;
  text-decoration: none;
  background: transparent;
  letter-spacing: 0;
  -webkit-tap-highlight-color: transparent;
  box-sizing: content-box;
}

.bg-umesse-home {
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #177dd1, #489fdf);
}

html,
body {
  height: 100%;
  overflow: hidden;
}

p,
h1,
h2,
h3 {
  margin: 0;
}

input,
textarea {
  -webkit-appearance: none;
}

img,
button {
  border: 0;
}

img,
textarea {
  vertical-align: top;
}

textarea {
  font-family: inherit;
}

a:focus {
  outline: none;
}

div:focus,
button:focus {
  outline: none;
}

ul,
ol {
  list-style: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  border: 0;
}

#app {
  font-family: "Noto Sans CJK JP", "Noto Sans JP", Avenir, Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
}
</style>
