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

	it("allPartOfSpeech", () => {
		assert.strictEqual("function", typeof wordThesaurus.allPartOfSpeech);
	});

	it("allWord", () => {
		assert.strictEqual("function", typeof wordThesaurus.allWord);
	});

	it("find", () => {
		assert.strictEqual("function", typeof wordThesaurus.find);
	});

	it("search", () => {
		assert.strictEqual("function", typeof wordThesaurus.search);
	});
});

describe("Module", () => {
	it("file", () => {
		assert.strictEqual("string", typeof wordThesaurus.src.file);
	});
});
