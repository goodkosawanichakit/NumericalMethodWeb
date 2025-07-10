<template>
  <div class="terminal">
    <div class="terminal-header">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span class="title">Terminal</span>
    </div>
    <div class="terminal-body">
      <div v-for="(line, index) in lines" :key="index" class="line">
      <span v-if="line.prompt" class="prompt">$</span>
      {{ line.text }}
      </div>
      <div class="input-line">
        <span class="prompt">$</span>
        <input
          v-model="currentInput"
          @keyup.enter="handleEnter"
          @keyup.up="handleArrowup"
          @keyup.down="handleArrowdown"
          class="input"
          autofocus
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTerminal } from '../composables/useTerminal'
const {
  lines,
  currentInput,
  handleEnter,
  handleArrowup,
  handleArrowdown,
} = useTerminal()


</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #1e1e1e;
}

.terminal {
  background-color: #1e1e1e;
  color: #c5c8c6;
  font-family: 'Fira Code', monospace;
  width: 100vw;
  height: 100vh;
  margin: 0;
  border-radius: 8px;
  overflow: hidden;
}

.terminal-header {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #2b2b2b;
  position: relative;
}

.dot {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.red {
  background-color: #ff5f56;
}
.yellow {
  background-color: #ffbd2e;
}
.green {
  background-color: #27c93f;
}
.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #aaa;
  font-size: 0.9rem;
}

.terminal-body {
  padding: 1rem;
}

.line {
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
}

.prompt {
  color: #00ff87;
  margin-right: 0.5rem;
}

.input-line {
  display: flex;
  align-items: center;
}

.input {
  background: transparent;
  border: none;
  outline: none;
  color: #c5c8c6;
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
}
</style>
