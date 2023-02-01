import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
	state: () => ({
		ready: false,
		loading: true,
		message: null,
		error: null,
		lst: ["၇၈၉", "70", "77", "777", "3456", "10000000", "123456789"],
		count: 0
	}),
	getters: {
		doubleCount: state => state.count * 2
	},
	actions: {
		increment() {
			this.count++;
		}
	}
});
