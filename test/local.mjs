#!/usr/bin/env node

// import fs from "fs";
// import { wordThesaurus } from "../index.mjs";
import thesaurus from "../index.mjs";

// const outFile = "./test/local.json";

// // let query = process.argv.slice(2)[0];
// // query = '၁,၂၀၀၀၀၀.၂ဝ';

// var raw = [];
// [12345678, 2700, "၂,၇၀၀", "27,000,000.00", "5.23e+8"].forEach(query =>
// 	raw.push(notation.get(query))
// );
// // ['27,000,000.00'].forEach(query=>raw.push(notation.get(query)))

// fs.writeFile(outFile, JSON.stringify(raw, null, 2), "utf8", e =>
// 	console.log(e || "...done")
// );

// wordThesaurus.listOfPos();
// wordThesaurus.load();
// wordThesaurus.generate_plain();
// wordThesaurus.generate_needle();
// wordThesaurus.generate_indexed();
// wordThesaurus.file = "./src/thesaurus.dat";
// wordThesaurus.generate_plain(2);
// wordThesaurus.generate_needle(2);
// wordThesaurus.load();

// wordThesaurus.generate_words();
// wordThesaurus.generate_pos();

// wordThesaurus.load({ save: true, space: 1 });

// wordThesaurus.load();
// const obj = wordThesaurus.find("love");
// // console.log(obj);
// for (const o of obj) {
// 	// o.pos
// 	console.log("posName", wordThesaurus.posName(o.pos));
// 	console.log("posIndex", o.pos);
// 	// console.log("raw", o.raw);
// 	console.log("o", o);
// }

// wordThesaurus.generate_words({ save: true});
// wordThesaurus.generate_words({ all: false });
// wordThesaurus.generate_words({ save: true, all: true });

// thesaurus.find();
// wordThesaurus.find();

// thesaurus.allPartOfSpeech({ save: true, suffix: "abc" });
thesaurus.allPartOfSpeech(true, "-just-pos.csv");
thesaurus.allWord({ save: true, all: true });
