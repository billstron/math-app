<template>
  <div class="challenge">
    <equation
      v-bind:mathType="mathType"
      v-bind:equation="equation"
      v-model="answer"
      v-on:answered="answered"
    />
    <div class="overlay" v-if="right || wrong">
      <icon class="answer right" v-if="right" name="check"/>
      <icon class="answer wrong" v-if="wrong" name="times"/>
    </div>

    <div class="info-row">
      <div class="timer">
        <icon name="clock-o"/>
          {{ mins }} min
          {{ secs }} s
      </div>
      <div class="count">
        <icon name="hashtag"/>
        {{ answers.length + 1 }} / {{ maxQuestions }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome';
import Equation from './equation.vue';

const model = {
  limits: {
    addition: 30,
    subtraction: 30,
    multiplication: 12
  },
  answers: [],
  answer: null,
  right: false,
  wrong: false,
  maxQuestions: 20,
  equation: [],
  startTime: null,
  duration: 0,
  interval: null,
  mathType: null,
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
    const a = Math.round(Math.random() * model.limits[this.mathType]);
    const b = Math.round(Math.random() * model.limits[this.mathType]);
    let candidate = [ a, b ];
    if (this.mathType == 'subtraction') {
      candidate = candidate.sort((a, b) => b - a);
    }
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
    this.$cookie.set(`challenge/${this.mathType}`, JSON.stringify(model));
    this.$router.push(`/challenge/${this.mathType}/result`);
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
  name: 'challenge',
  components: {
    Icon,
    Equation,
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
  beforeMount() {
    this.mathType = this.$router.currentRoute.params.mathType;
  },
  mounted() {
    this.setup();
  },
  beforeDestroy() {
    this.teardown();
  },
}
</script>

<style scoped>
.challenge {
  padding-top: 0%;
  text-align: center;
}

.info-row {

}

.timer {
  margin: 20px auto;
  padding-left: 7%;
  width: 43%;
  text-align: left;
  font-size: 20px;
  float: left;
}

.count {
  margin: 20px auto;
  padding-right: 7%;
  width: 43%;
  text-align: right;
  font-size: 20px;
  float: left;
}

.overlay {
  float: left;
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 20px 0;
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
