import { it } from "mocha";
import assert from "assert";
import { wordThesaurus } from "../index.mjs";

describe("Method", () => {
	it("load", () => {
		assert.strictEqual("function", typeof wordThesaurus.load);
	});

	it("posIndex", () => {
		assert.strictEqual("function", typeof wordThesaurus.posIndex);
	});

	it("posName", () => {
		assert.strictEqual("function", typeof wordThesaurus.posName);
	});

	it("generate_pos", () => {
		assert.strictEqual("function", typeof wordThesaurus.generate_pos);
	});

	it("generate_words", () => {
		assert.strictEqual("function", typeof wordThesaurus.generate_words);
	});

	it("find", () => {
		assert.strictEqual("function", typeof wordThesaurus.find);
	});
});

describe("Module", () => {
	it("file", () => {
		assert.strictEqual("string", typeof wordThesaurus.file);
	});
});
