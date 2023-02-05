import fs from "fs";

/**
 * @typedef { {[name:string]: {[type:string]:string[]}} } TypeOfPlain
 * @typedef { {[name:string]: {[type:number]:string[]}} } TypeOfNeedle
 * @typedef { {[name:number]: {[type:number]:number[]}} } TypeOfIndexed
 * @typedef { string[] } TypeOfWords
 * @typedef { {name: string;shortname: string;}[] } TypeOfPartOfSpeech
 * @typedef { {posName:string, posIndex:number, raw: string[]} } TypeOfResponseData
 * @typedef { {word:string; pos:number, thesaurus: string[]} } TypeOfData
 * @typedef { {pos:number, raw: string[]} } TypeOfThesaurus
 * @typedef { {word:string; thesaurus:TypeOfThesaurus[]} } TypeOfResult
 * @typedef { {name:string, count:number, data?:TypeOfResponseData} } TypeOfCallbackData
 * abc
 * @callback TyeOfReaderCallback
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
	 * List of generated part of speech
	 * @type { string[] }
	 */
	pos: [],
	/**
	 * list of words
	 * @type { TypeOfWords }
	 */
	words: [],
	/**
	 * list of generated type plain
	 * @type { TypeOfData[] }
	 */
	data: [],
	/**
	 * list of generated type plain
	 * @type { TypeOfPlain }
	 */
	plain: {},
	/**
	 * list of generated type needle
	 * @type { TypeOfNeedle }
	 */
	needle: {},
	/**
	 * list of generated type indexed
	 * @type { TypeOfIndexed }
	 */
	indexed: {},
	/**
	 * find result
	 * @type { TypeOfResult }
	 */
	findResult: {
		word: "",
		thesaurus: []
	},
	/**
	 * search result
	 * @type { TypeOfResult }
	 */
	searchResult: {
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

	// reset() {}
	// replace() {}
	// toJson() {}
	// find() {}
	// get() {}
}

export const src = new Thesaurus();

/**
 * Reading `*.dat`
 * No character encoding on 1st row required: `ISO8859-1`
 * `engine.name`: row.first
 * `engine.count`: number of result
 * `posName`: removes (){}[]
 * `posIndex`: get index from partOfSpeech
 * `raw`: remove any line break then unique with filter to remove empty
 * private
 * @param {TyeOfReaderCallback} callback
 */
function reader(callback) {
	const input = fs.readFileSync(src.file, "utf8");
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
						posIndex: posIndex(posName),
						raw: raw.map(e => e.trim()).filter(e => e)
					}
				})
			);
			--engine.count;
		}
	}
}
/**
 * Get Pos Index by name
 * @param {string} posName
 * @returns {number}
 */
export function posIndex(posName) {
	return partOfSpeech.findIndex(
		e => e.name.toLowerCase() == posName || e.shortname == posName
	);
}

/**
 * Get Pos Name by index
 * @param {number} posIndex
 * @returns {string}
 */
export function posName(posIndex) {
	let o = partOfSpeech[posIndex];
	if (o) {
		return o.name;
	}
	return partOfSpeech[0].name;
}

/**
 * generate source to Object
 * @param { {save?:boolean; space?:number} } [options={}] - if `options.save:true`; save as `*-data.json`
 * @todo [rapid]
 * @example .load({save:true, space:2}) - format and save
 * .load({save:true}) - save with minify
 * .load() - just build
 */
export function load(options) {
	if (db.data.length === 0) {
		reader(function(res) {
			if (res.data) {
				db.data.push({
					word: res.name,
					pos: res.data.posIndex,
					thesaurus: res.data.raw
				});
			}
		});
		if (options) {
			if (options.save) {
				fs.writeFileSync(
					src.file.replace(".dat", "-data.json"),
					JSON.stringify(db.data, null, options.space)
				);
			}
		}
	}
}

/**
 * @param {string} keyword
 * @returns TypeOfThesaurus[]
 * @example return [{pos:number, raw:string[]}] || []
 */
export function find(keyword) {
	const word = keyword.toLowerCase();
	if (db.findResult.word == word) {
		return db.findResult.thesaurus;
	}
	db.findResult.word = word;
	db.findResult.thesaurus = [];

	for (const e of db.data) {
		if (word == e.word) {
			searchMerge(db.findResult.thesaurus, e.pos, e.thesaurus, []);
		}
	}

	return db.findResult.thesaurus;
}

/**
 * @param {TypeOfThesaurus[]} obj
 * @param {number} pos
 * @param {string[]} raw
 * @param {string[]} extra
 */
function searchMerge(obj, pos, raw, extra) {
	let index = obj.findIndex(e => e.pos == pos);
	if (index > -1) {
		const org = obj[index].raw;
		obj[index].raw = [...new Set([...org, ...raw, ...extra])];
	} else {
		obj.push({
			pos: pos,
			raw: raw
		});
	}
}

/**
 * @param {string} keyword
 * @returns TypeOfThesaurus[]
 * @example return [{pos:number, raw:string[]}] || []
 */
export function search(keyword) {
	load();
	const word = keyword.toLowerCase();
	if (db.searchResult.word == word) {
		return db.searchResult.thesaurus;
	}
	db.searchResult.word = word;
	db.searchResult.thesaurus = [];
	for (const e of db.data) {
		if (word == e.word) {
			searchMerge(db.searchResult.thesaurus, e.pos, e.thesaurus, []);
		} else {
			if (e.thesaurus.findIndex(e => e.toLowerCase() == word) > -1) {
				searchMerge(db.searchResult.thesaurus, e.pos, e.thesaurus, [e.word]);
			}
		}
	}
	return db.searchResult.thesaurus;
}

/**
 * Generate list of Pos raw
 * @param {boolean} [save=false] - to save, default value: `false`
 * @param {string} [suffix="-pos.csv"] - the suffix file name, default value: `-pos.csv`
 * @returns string[]
 * @example
 * .allPartOfSpeech(true, "-pos.csv"); - save
 * .allPartOfSpeech(); - no saving
 */
export function allPartOfSpeech(save, suffix) {
	if (db.pos.length == 0) {
		reader(function(res) {
			if (res.data) {
				if (!db.pos.includes(res.data.posName)) {
					db.pos.push(res.data.posName);
				}
			}
		});
	}

	if (save) {
		fs.writeFileSync(
			// src.file.replace(".dat", "-pos.csv"),
			src.file.replace(".dat", suffix || "-pos.csv"),
			db.pos.join("\n")
		);
	}

	return db.pos;
}

/**
 * Generate list of words which is unique (case insensitive: `x == X`)
 * to `*-words-all.csv` `*-words-searchable.csv`
 * @param { {save?:boolean; all?:boolean} } options - if `options.save:true`; save as `-words-[all,searchable].csv`
 * @return TypeOfWords
 * @example
 * .allWord({save: true, all: false}) - only searchable & save
 * .allWord({all: false }) - just appended, but no saving
 * .allWord({save: true, all: true }) - every words & save
 */
export function allWord(options) {
	if (db.words.length == 0) {
		reader(function(res) {
			if (options.all && res.data) {
				db.words.push(...res.data.raw);
			} else {
				db.words.push(res.name);
			}
		});
		db.words = [...new Set(db.words)];
	}

	if (options.save) {
		fs.writeFileSync(
			src.file.replace(
				".dat",
				"-words-*.csv".replace("*", options.all ? "all" : "searchable")
			),
			db.words.join("\n")
		);
	}
	return db.words;
}

/**
 * @namespace
 * Build thesaurus and search
 */
export const wordThesaurus = {
	src,
	load,
	find,
	search,
	posName,
	posIndex,
	allWord,
	allPartOfSpeech
};
export default wordThesaurus;
