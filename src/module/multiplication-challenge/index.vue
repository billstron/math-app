<template>
  <div class="challenge">
    <multiplication-equation
      v-bind:equation="equation"
      v-model="answer"
      v-on:answered="answered"
    />
    <div class="overlay" v-if="right || wrong">
      <icon class="answer right" v-if="right" name="check"/>
      <icon class="answer wrong" v-if="wrong" name="times"/>
    </div>

    <div class="timer">
      <icon name="clock-o"/>
        {{ mins }} min
        {{ secs }} s
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome';
import MultiplicationEquation from './multiplication-equation.vue';

const model = {
  limit: 12,
  answers: [],
  answer: null,
  right: false,
  wrong: false,
  maxQuestions: 20,
  equation: [],
  startTime: null,
  duration: 0,
  interval: null,
};

const methods = {
  setup() {
    this.answers = [];
    this.right = false;
    this.wrong = false;
    this.equation = this.getNewEquation();
    this.startTime = Date.now();
    this.duration = 0;
    this.interval = setInterval(() => {
      this.duration++;
    }, 1000);
  },

  teardown() {
    clearInterval(this.interval);
  },

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

  finishUp() {
    model.duration = Math.round((Date.now() - model.startTime) / 1000);
    this.$cookie.set('multiplication/challenge', JSON.stringify(model));
    this.$router.push('/multiplication/challenge/result');
  },

  answered(correct) {
    model.right = correct == true;
    model.wrong = correct == false;
    model.answers.push({ equation: model.equation.slice(0), answer: this.answer, correct });

    setTimeout(() => {
      if (model.answers.length >= model.maxQuestions) {
        this.finishUp();
      }
      this.reset();
    }, 1000);
  },
};

export default {
  name: 'multiplication-challenge',
  components: {
    Icon,
    MultiplicationEquation,
  },
  data() {
    return model;
  },
  methods,
  computed: {
    mins() {
      return Math.floor(this.duration / 60);
    },
    secs() {
      return Math.round(this.duration - this.mins * 60 );
    }
  },
  mounted() {
    console.log('mounted');
    this.setup();
  },
  beforeDestroy() {
    console.log('before destroy');
    this.teardown();
  },
}
</script>

<style scoped>
.challenge {
  padding-top: 0%;
  text-align: center;
}

.timer {
  margin: 20px auto;
  text-align: center;
  font-size: 20px;
}

.overlay {
  float: left;
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 50px 0;
  background-color: #ffffff4a
}

.answer {
  display: inline-block;
  font-size: 100px;
}

.answer.right {
  color: green;
}

.answer.wrong {
  color: red;
}
</style>
