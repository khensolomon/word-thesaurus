import fs from "fs";

/**
 * @typedef { {[name:string]: {[type:number]:[type:string]}} } TypeOfWordList
 * @type { TypeOfWordList }
 */
const database = {};

// /**
//  * @typedef { {[type:number]:string} } TypeOfPos
//  * @typedef { {[name:string]: {[type:number]:[type:string]}} } TypeOfWords
//  * @type { {pos:TypeOfPos; words:TypeOfWords} }
//  */
// const db = {
// 	pos: {
// 		0: "Noun",
// 		1: "Verb",
// 		3: "Adjective"
// 	},
// 	words: {}
// };

class Thesaurus {
	/**
	 * @type {string}
	 */
	file;
	/**
	 * @param {string} [inputFile]
	 * @default th_en_US_new.dat
	 */
	constructor(inputFile) {
		if (inputFile && inputFile != "") {
			this.file = inputFile;
		} else {
			this.file = "./lib/th_en_US_new.dat";
		}
	}
	load() {
		// database["word"] = {
		//   1: ["abc"],
		// };
		// var abc = database["abc"][1];
		const input = fs.readFileSync(this.file, "utf8");
		// ISO8859-1
		const _ref = input.split("\n").slice(1);

		const current = {
			word: "",
			count: 0
		};
		for (let i = 0, len = _ref.length; i < len; i++) {
			var line = _ref[i];
			var columns = line.split("|");
			if (current.count === 0) {
				current.word = columns[0];
				current.count = Number(columns[1]);
				database[current.word] = {};
			} else {
				--current.count;
				const type = columns[0];
				const word = columns.slice(1).filter(e => e.trim());
				database[current.word][type] = word;
			}
		}
		// fs.readFileSync(this.file, "utf8");
		fs.writeFileSync(
			this.file.replace(".dat", ".json"),
			JSON.stringify(database, "utf8", 2)
		);
	}
	reset() {}
	replace() {}
	toJson() {}
	find() {}
	get() {}
}

// export default new Thesaurus();
const thesaurus = new Thesaurus();
// thesaurus.load();

/** @namespace */
export const wordThesaurus = thesaurus;
export default wordThesaurus;