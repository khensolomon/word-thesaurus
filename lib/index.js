import fs from "fs";

/**
 * @typedef { {[name:string]: {[type:string]:string[]}} } TypeOfPlain
 * @typedef { {[name:string]: {[type:number]:string[]}} } TypeOfNeedle
 * @typedef { {[name:number]: {[type:number]:number[]}} } TypeOfIndexed
 * @typedef { string[] } TypeOfWords
 * @typedef { {name: string;shortname: string;}[] } TypeOfPartOfSpeech
 * @typedef { {posName:string, posIndex:number, raw: string[]} } TypeOfResponseData
 * @typedef { {pos:number, raw: string[]} } TypeOfThesaurus
 * @typedef { {word:string; thesaurus:TypeOfThesaurus[]} } TypeOfResult
 * @typedef { {name:string, count:number, data?:TypeOfResponseData} } TypeOfCallbackData
 *
 * @callback TyeOfReaderCallback
 * param {boolean} identity
 * param { {name:string, count:number, raw?:string[]} } data
 * @param { TypeOfCallbackData } data
 */

/**
 * @type { TypeOfPartOfSpeech } partOfSpeech
 */
const partOfSpeech = [
	{ name: "Noun", shortname: "n" },
	{ name: "Verb", shortname: "v" },
	{ name: "Adjective", shortname: "adj" },
	{ name: "Adverb", shortname: "adv" },
	{ name: "Preposition", shortname: "prep" },
	{ name: "Conjunction", shortname: "conj" },
	{ name: "Pronoun", shortname: "pron" },
	{ name: "Interjection", shortname: "int" },
	{ name: "Abbreviation", shortname: "abb" },
	{ name: "Prefix", shortname: "" },
	{ name: "Combining form", shortname: "" },
	{ name: "Phrase", shortname: "phra" },
	{ name: "Contraction", shortname: "" },
	{ name: "Punctuation", shortname: "punc" },
	{ name: "Particle", shortname: "part" },
	{ name: "Post-positional Marker", shortname: "ppm" },
	{ name: "Acronym", shortname: "" },
	{ name: "Article", shortname: "" },
	{ name: "Number", shortname: "tn" }
];

const db = {
	/**
	 * @type { string[] }
	 */
	pos: [],
	/**
	 * @type { TypeOfWords }
	 */
	words: [],
	/**
	 * @type { TypeOfPlain }
	 */
	plain: {},
	/**
	 * @type { TypeOfNeedle }
	 */
	needle: {},
	/**
	 * @type { TypeOfIndexed }
	 */
	indexed: {},
	/**
	 * @type { TypeOfResult }
	 */
	result: {
		word: "",
		thesaurus: []
	}
};

class Thesaurus {
	/**
	 * @private
	 */
	_defaultPath = "./src/thesaurus.dat";

	/**
	 * @private
	 * @type {string}
	 */
	_sourcePath;

	/**
	 * @param {string} [filePath]
	 * @default ./src/thesaurus.dat
	 */
	constructor(filePath) {
		if (filePath && filePath != "") {
			this._sourcePath = filePath;
		} else {
			this._sourcePath = this._defaultPath;
		}
	}

	/**
	 * Set source file
	 * @param {string} filePath
	 */
	set file(filePath) {
		if (filePath != "") {
			this._sourcePath = filePath;
		}
	}

	/**
	 * Get source file
	 */
	get file() {
		if (this._sourcePath && this._sourcePath != "") {
			return this._sourcePath;
		}
		return this._defaultPath;
	}

	/**
	 * Get Pos Index by name
	 * @param {string} posName
	 * @returns {number}
	 */
	posIndex(posName) {
		return partOfSpeech.findIndex(
			e => e.name.toLowerCase() == posName || e.shortname == posName
		);
	}

	/**
	 * Get Pos Name by index
	 * @param {number} posIndex
	 * @returns {string}
	 */
	posName(posIndex) {
		let o = partOfSpeech[posIndex];
		if (o) {
			return o.name;
		}
		return partOfSpeech[0].name;
	}

	/**
	 * Reading `*.dat`
	 * No character encoding on 1st row required: `ISO8859-1`
	 * `engine.name`: row.first
	 * `engine.count`: number of result
	 * `posName`: removes (){}[]
	 * `posIndex`: get index from partOfSpeech
	 * `raw`: remove any line break then unique with filter to remove empty
	 * @private
	 * @param {TyeOfReaderCallback} callback
	 */
	reader(callback) {
		const input = fs.readFileSync(this.file, "utf8");
		const line = input.split("\n").slice(1);
		const engine = {
			name: "",
			count: 0
		};
		for (let i = 0, len = line.length; i < len; i++) {
			var row = line[i];
			var cols = row.split("|");
			if (engine.count === 0) {
				engine.name = cols[0];
				engine.count = Number(cols[1]);
				callback(engine);
			} else {
				const posName = cols[0].replace(/[\])}[{(]/g, "").toLowerCase();
				const raw = cols
					.slice(1)
					.map(e => e.replace(/\r?\n|\r/g, ""))
					.filter(e => e.trim());

				callback(
					Object.assign({}, engine, {
						data: {
							posName: posName,
							posIndex: this.posIndex(posName),
							raw: raw.map(e => e.trim()).filter(e => e)
						}
					})
				);
				--engine.count;
			}
		}
	}

	/**
	 * Insert to `db.words` and return `length + -1` on non existent,
	 * if exists return `index`
	 * @private
	 * @param {string} word
	 * @returns {number}
	 */
	// wordInsert(word) {
	// 	const index = db.words.indexOf(word);
	// 	if (index <= -1) {
	// 		return db.words.push(word) + -1;
	// 	}
	// 	return index;
	// }

	/**
	 * generate source to json
	 * @example .load({save:true, space:2}) -- format and save
	 * .load({save:true}) -- save with minify
	 * .load() -- just build
	 * @param { {save?:boolean; space?:number} } [options={}] - if `options.save:true`; save as `*-needle.json`
	 */
	load(options) {
		if (Object.keys(db.needle).length === 0) {
			this.reader(function(res) {
				if (res.data) {
					// NOTE: rapid
					// db.needle[res.name][res.data.posIndex] = res.data.raw;
					if (res.data.posIndex.hasOwnProperty(res.data.posIndex)) {
						db.needle[res.name][res.data.posIndex] = [
							...new Set([
								...db.needle[res.name][res.data.posIndex],
								...res.data.raw
							])
						];
					} else {
						db.needle[res.name][res.data.posIndex] = res.data.raw;
					}
				} else {
					db.needle[res.name] = {};
				}
			});
			if (options) {
				if (options.save) {
					fs.writeFileSync(
						this.file.replace(".dat", "-needle.json"),
						JSON.stringify(db.needle, null, options.space)
					);
				}
			}
		}
	}

	/**
	 * Testing takes about 5mins to generate,
	 * uncompress: 17,837kb, compressed: 8,254kb
	 * apparently its saved just disk space not memory!
	 * db.indexed[0] = {};
	 * db.indexed[0][1] = [];
	 * private
	 * @param {string | number} [space]
	 */
	// generate_indexed(space) {
	// 	this.reader(res => {
	// 		const wordIndex = this.wordInsert(res.name);
	// 		if (res.data) {
	// 			const listOfIndex = res.data.raw.map(this.wordInsert);
	// 			db.indexed[wordIndex][res.data.posIndex] = listOfIndex;
	// 		} else {
	// 			db.indexed[wordIndex] = {};
	// 		}
	// 	});
	// 	fs.writeFileSync(
	// 		this.file.replace(".dat", "-indexed-.json"),
	// 		JSON.stringify({ indexed: db.indexed, words: db.words }, null, space)
	// 	);
	// }

	/**
	 * Generate list of Needle raw as `*-needle.json`
	 * private
	 * @param {string | number} [space]
	 */
	// generate_needle(space) {
	// 	this.reader(function(res) {
	// 		if (res.data) {
	// 			db.needle[res.name][res.data.posIndex] = res.data.raw;
	// 		} else {
	// 			db.needle[res.name] = {};
	// 		}
	// 	});
	// 	fs.writeFileSync(
	// 		this.file.replace(".dat", "-needle-.json"),
	// 		JSON.stringify(db.needle, null, space)
	// 	);
	// }

	/**
	 * Generate list of Plain raw as `*-plain.json`
	 * private
	 * @param {string | number} [space]
	 */
	// generate_plain(space) {
	// 	this.reader(function(res) {
	// 		if (res.data) {
	// 			db.plain[res.name][res.data.posName] = res.data.raw;
	// 		} else {
	// 			db.plain[res.name] = {};
	// 		}
	// 	});
	// 	fs.writeFileSync(
	// 		this.file.replace(".dat", "-plain-.json"),
	// 		JSON.stringify(db.plain, null, space)
	// 	);
	// }

	/**
	 * Generate list of Pos raw as `*-just-pos.csv`
	 * private
	 */
	generate_pos() {
		this.reader(function(res) {
			if (res.data) {
				if (!db.pos.includes(res.data.posName)) {
					db.pos.push(res.data.posName);
				}
			}
		});

		fs.writeFileSync(
			this.file.replace(".dat", "-just-pos.csv"),
			db.pos.join("\n")
		);
	}

	/**
	 * Generate list of words which is unique (case insensitive: `x == X`)
	 * to `*-just-words-all.csv` `*-just-words-searchable.csv`
	 * param {boolean} [all=true] - `true`: all words, `false`: only fast & searchable
	 * @param { {save?:boolean; all?:boolean} } options - if `options.save:true`; save as `-just-words-[all,searchable].csv`
	 * @example
	 * .generate_words({save: true, all: false}) - only searchable & save
	 * .generate_words({all: false }) - just appended, but no saving
	 * .generate_words({save: true, all: true }) - every words & save
	 */
	generate_words(options) {
		this.reader(function(res) {
			if (options.all && res.data) {
				db.words.push(...res.data.raw);
			} else {
				db.words.push(res.name);
			}
		});

		if (options.save) {
			fs.writeFileSync(
				this.file.replace(
					".dat",
					"-just-words-*.csv".replace("*", options.all ? "all" : "searchable")
				),
				[...new Set(db.words)].join("\n")
			);
		}

		// fs.writeFileSync(
		// 	this.file.replace(".dat", "-words-unique.json"),
		// 	JSON.stringify([...new Set(db.words)], null, 2)
		// );
	}

	/**
	 * @param {string} keyword
	 * @example return [{pos:number, raw:string[]}] || []
	 * @returns TypeOfThesaurus[]
	 */
	find(keyword) {
		const word = keyword.toLowerCase();
		if (db.result.word == word) {
			return db.result.thesaurus;
		}
		db.result.word = word;
		db.result.thesaurus = [];

		if (db.needle.hasOwnProperty(word)) {
			var elms = db.needle[word];
			for (const posIndex in elms) {
				if (Object.hasOwnProperty.call(elms, posIndex)) {
					db.result.thesaurus.push({
						pos: Number(posIndex),
						raw: elms[posIndex]
					});
				}
			}
		}
		// if (db.plain.hasOwnProperty(word)) {
		// 	var elms = db.plain[word];
		// 	for (const posName in elms) {
		// 		if (Object.hasOwnProperty.call(elms, posName)) {
		// 			db.result.thesaurus.push({
		// 				pos: this.posIndex(posName),
		// 				raw: elms[posName]
		// 			});
		// 		}
		// 	}
		// }
		return db.result.thesaurus;
	}

	// reset() {}
	// replace() {}
	// toJson() {}
	// find() {}
	// get() {}
}

/**
 * @namespace
 * Build thesaurus and search
 */
export const wordThesaurus = new Thesaurus();
export default wordThesaurus;
