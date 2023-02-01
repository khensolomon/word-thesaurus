import { createApp } from "vue";
import { createPinia, mapStores } from "pinia";
import { useDataStore } from "./data.js";

// import VueRouter from "vue-router";

// Vue.config.productionTip = true;
// Vue.config.devtools = true;
// Vue.use(VueRouter);

const pinia = createPinia();

const app = createApp({
	methods: {
		handleInput(e) {
			this.dataStore.lst = this.queryArray(e.target.innerHTML);
		},
		queryArray(e) {
			return e
				.replace(/<div>/g, "<br>")
				.replace(/<\/div>/g, "")
				.split(/<br>|\n|;/)
				.map(e => e.trim())
				.filter(e => e);
			// return e
			// 	.replace(/<div>/g, "\n")
			// 	.replace(/<\/div>/g, "")
			// 	.split(/\n/)
			// 	.map(e => e.trim())
			// 	.filter(e => e);
		}
	},
	watch: {},
	// async created() {},
	// beforeCreate() {},
	created() {
		let urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has("q")) {
			var tmp = urlParams.get("q");
			if (tmp != null && tmp != "") {
				this.dataStore.lst = tmp.split(" ");
			}
		}
	},
	// beforeMount() {},
	mounted() {
		this.$refs.handleId.innerHTML = this.dataStore.lst.join("<br />");
	},
	// render: (h) => h(layout),
	computed: {
		// note we are not passing an array, just one store after the other
		// each store will be accessible as its id + 'Store'
		...mapStores(useDataStore),
		notation() {
			var result = [];
			this.dataStore.lst.forEach(item => {
				// @ts-ignore
				var notation = myanmarNotation.get(item);
				if (notation.notation.length) {
					notation.query = item;
					result.push(notation);
				}
			});
			return result;
		}
	}
	// NOTE: without setup {useDataStore} can be accessed at {dataStore}
	// setup() {
	//   const data = useDataStore();
	//   data.count++;
	//   // with autocompletion ✨
	//   data.$patch({ count: data.count + 1 });
	//   // or using an action instead
	//   data.increment();
	//   return { data };
	// },
});

app.use(pinia);
app.mount("#app");
