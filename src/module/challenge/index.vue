<template>
  <div class="challenge">
    <challenge-equation
      :mathType="mathType"
      :equation="equation"
      v-on:answered="answered"
    />
    <div class="overlay" v-if="right || wrong">
      <fa-icon class="answer right" v-if="right" icon="fa-check"/>
      <fa-icon class="answer wrong" v-if="wrong" icon="fa-times"/>
    </div>

    <div class="info-row">
      <div class="timer">
        <fa-icon icon="fa-clock"/>
          {{ mins }} min
          {{ secs }} s
      </div>
      <div class="count">
        <fa-icon icon="fa-hashtag"/>
        {{ this.previousAnswers.length + 1 }} / {{ maxQuestions }}
      </div>
    </div>
  </div>
</template>

<script>
import { useChallenge } from '@/store';
import ChallengeEquation from './ChallengeEquation.vue';

export default {
  name: 'ChallengeMain',
  components: {
    ChallengeEquation,
  },
  setup() {
    const challenge = useChallenge();

    return {
      challenge,
    };
  },
  data() {
    return {
      limits: {
        addition: 30,
        subtraction: 30,
        multiplication: 12
      },
      right: false,
      wrong: false,
      maxQuestions: 2,
      equation: [],
      startTime: null,
      duration: 0,
      interval: null,
    };
  },
  computed: {
    previousAnswers() {
      return this.challenge.currentAnswers;
    },
    mins() {
      return Math.floor(this.duration / 60);
    },
    secs() {
      return Math.round(this.duration - this.mins * 60 );
    },
    mathType() {
      const { mathType } = this.$route.params;
      return mathType;
    }
  },
  methods: {
    getNewEquation() {
      const a = Math.round(Math.random() * this.limits[this.mathType]);
      const b = Math.round(Math.random() * this.limits[this.mathType]);
      let candidate = [ a, b ];
      if (this.mathType == 'subtraction') {
        candidate = candidate.sort((a, b) => b - a);
      }
      if (this.previousAnswers.find(({ equation, correct }) => correct && candidate[0] == equation[0] && candidate[1] == equation[1]) == null) {
        return candidate;
      }
      return this.getNewEquation();
    },

    reset() {
      this.right = false;
      this.wrong = false;
      this.equation = this.getNewEquation();
    },

    finishUp() {
      this.duration = Math.round((Date.now() - this.startTime) / 1000);
      this.challenge.complete(this.duration);
      this.$router.push(`/challenge/${this.mathType}/result`);
    },

    answered({ correct, answer }) {
      this.right = correct == true;
      this.wrong = correct == false;
      setTimeout(() => {
        this.challenge.addAnswer({ equation: this.equation.slice(0), answer, correct });
        if (this.previousAnswers.length >= this.maxQuestions) {
          this.finishUp();
        }
        this.reset();
      }, 1000);
    },
  },
  mounted() {
    this.challenge.start(this.mathType);
    this.right = false;
    this.wrong = false;
    this.equation = this.getNewEquation();
    this.startTime = Date.now();
    this.duration = 0;
    this.interval = setInterval(() => {
      this.duration++;
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
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
