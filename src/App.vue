<template>
  <splitpanes class="default-theme dark" style="height: 100vh">
    <pane min-size="10" max-size="70" size="20">
      <div class="sidebar">1</div>
    </pane>
    <pane>
      <splitpanes horizontal class="dark">
        <pane min-size="10" size="70">
          <div class="main">2</div>
        </pane>
        <pane min-size="10" size="30">
          <div class="notes">
            <div class="btn-group">
              <button>Save</button>
              <button>Open</button>
            </div>
            <textarea name="notes" id="notes" cols="30" rows="10"></textarea>
          </div>
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  name: 'App',
  components: { Splitpanes, Pane },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
html, body {
  margin: 0;
  padding: 0;
}
body {
  height: 100vh;
  width: 100vw;
}
.splitpanes.default-theme.dark .splitpanes__splitter::before {
  display: none;
}
.splitpanes.default-theme.dark .splitpanes__splitter:after {
  display: none;
}
.splitpanes.default-theme.dark .splitpanes__splitter {
    background-color: #424e5a;
    box-sizing: border-box;
    position: relative;
    flex-shrink: 0;
}
.default-theme.dark.splitpanes--horizontal>.splitpanes__splitter, .default-theme.dark .splitpanes--horizontal>.splitpanes__splitter {
    height: 1px;
    border-top: 2px solid #424e5a;
    margin-top: -1px;
}
.default-theme.dark.splitpanes--vertical>.splitpanes__splitter, .default-theme.dark .splitpanes--vertical>.splitpanes__splitter {
    width: 1px;
    border-left: 2px solid #424e5a;
    margin-left: -1px;
}
.default-theme.dark.splitpanes--horizontal>.splitpanes__splitter:hover, .default-theme.dark .splitpanes--horizontal>.splitpanes__splitter:hover {
    height: 1px;
    border-top: 7px solid #445566;
    margin-top: -1px;
    transition: border-width 0.2s;
}
.default-theme.dark.splitpanes--vertical>.splitpanes__splitter:hover, .default-theme.dark .splitpanes--vertical>.splitpanes__splitter:hover {
    width: 1px;
    border-left: 7px solid #445566;
    margin-left: -1px;
    transition: border-width 0.2s;
}
.dark.splitpanes--vertical>.splitpanes__splitter {
    min-width: 1px;
    cursor: ew-resize
}
.dark.splitpanes--horizontal>.splitpanes__splitter {
    min-height: 1px;
    cursor: ns-resize
}
.splitpanes__pane {
  margin: 0;
  padding: 0;
}
.sidebar {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
}
.main {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
}
.notes {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
}
.btn-group {
  display: inline-block;
  width: 100%;
}
.btn-group button {
  background-color: inherit;
  border-style: none;
  color: gray;
  padding: 10px 24px;
  cursor: pointer;
  float: left;
}
.btn-group button:hover {
  color: white;
}
textarea {
  resize: none;
  margin: 0;
  padding: 5px;
  width: 100%;
  height: 100%;
  border-style: none;
  background-color: #2e4155;
  color: white;
}
textarea:focus {
  outline: none;
}
</style>
