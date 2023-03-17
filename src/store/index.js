import { defineStore, createPinia } from 'pinia'

export const useChallenge = defineStore('challenge', {
  state: () => ({
    list: [],
    current: {},
  }),
  getters: {
    count: (state) => state.list.length,
    lastCompleted: (state) => {
      return state.list.filter(({ completed }) => completed).slice(-1)[0];
    },
    currentAnswers: (state) => state.current.answers || [],
  },
  actions: {
    start(type) {
      this.current = {
        type,
        answers: [],
        duration: 0,
        completed: false,
      };
    },
    addAnswer({ equation, answer, correct }) {
      this.current.answers.push({ equation, answer, correct });
    },
    complete(duration) {
      this.current.completed = true;
      this.current.duration = duration;
      this.list.push({ ...this.current });
      this.current = {};
    },
    
  },
});

export default createPinia();
