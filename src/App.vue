<template>
  <div id="app">
    <multiplication-equation
      v-bind:equation="equation"
      v-model="answer"
      v-on:answered="answered"
    />
    <icon v-if="right" name="check"/>
    <icon v-if="wrong" name="times"/>
  </div>
</template>

<script>
import Icon from 'vue-awesome';
import MultiplicationEquation from './module/MultiplicationEquation.vue';

const methods = {
  getNewEquation() {
    const a = Math.round(Math.random() * model.limit);
    const b = Math.round(Math.random() * model.limit);
    const candidate = [ a, b ];
    if (model.answers.find(({ equation, correct }) => correct && candidate[0] == equation[0] && candidate[1] == equation[1]) == null) {
      return candidate;
    }
    return this.getNewEquation();
  },

  reset() {
    model.answer = null;
    model.right = false;
    model.wrong = false;
    model.equation = this.getNewEquation();
  },

  answered(correct) {
    model.right = correct == true;
    model.wrong = correct == false;
    model.answers.push({ equation: model.equation.slice(0), answer: this.answer, correct });
    console.log('answers', model.answers);

    setTimeout(() => {
      this.reset();
    }, 1000);
  },
};

const model = {
  limit: 12,
  answers: [],
  answer: null,
  right: false,
  wrong: false,
  equation: methods.getNewEquation(),
};

export default {
  name: 'app',
  components: {
    Icon,
    MultiplicationEquation,
  },
  data() {
    return model;
  },
  methods
}
</script>
