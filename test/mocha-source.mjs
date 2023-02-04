import { it } from "mocha";
import assert from "assert";
import fs from "fs";
import { wordThesaurus } from "../index.mjs";

describe("Source", () => {
	it("Default source file", () => {
		assert.strictEqual("./src/thesaurus.dat", wordThesaurus.file);
		assert.ok(fs.existsSync("./src/thesaurus.dat"));
	});

	it("Changing source file", () => {
		wordThesaurus.file = "./tmp.dat";
		assert.strictEqual("./tmp.dat", wordThesaurus.file);
		assert.ok(!fs.existsSync("./tmp.dat"));
	});

	it("Reset source file", () => {
		wordThesaurus.file = "./src/thesaurus.dat";
		assert.strictEqual("./src/thesaurus.dat", wordThesaurus.file);
	});
});
