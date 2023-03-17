import { defineStore, createPinia } from 'pinia';
import { useStorage } from '@vueuse/core'

export const useChallenge = defineStore('challenge', {
  state: () => ({
    list: useStorage('challenge/list', []),
    current: useStorage('challenge/current', {
      state: 'NOT_STARTED',
    }),
  }),
  getters: {
    count: (state) => state.list.length,
    lastCompleted: (state) => {
      return state.list.filter(({ state }) => state === 'COMPLETED').slice(-1)[0];
    },
    currentAnswers: (state) => {
      return state.current.answers || [];
    },
  },
  actions: {
    start(type) {
      this.current = {
        type,
        answers: [],
        duration: 0,
        state: 'UNDERWAY',
      };
    },
    addAnswer({ equation, answer, correct }) {
      this.current.answers.push({ equation, answer, correct });
    },
    complete(duration) {
      this.current.state = 'COMPLETED';
      this.current.duration = duration;
      this.list.push({ ...this.current });
      this.current = {};
    },
    
  },
});

export default createPinia();
