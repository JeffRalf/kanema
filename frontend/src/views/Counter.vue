<template>
  <h1>This is a counter example</h1>
  <div class="counter-value">Counter value is: {{ counter }}</div>
  <button @click="increment()">Increment</button>
</template>

<script>
export default {
  name: "Counter",
  data: function () {
    return {
      counter: 0,
    };
  },
  methods: {
    increment: function () {
      this.counter++;
    },
  },
};
</script>

<style scoped>
.counter-value {
  margin-bottom: 5px;
}
</style>
