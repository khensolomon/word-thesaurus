import { it } from "mocha";
import assert from "assert";

import { wordThesaurus } from "../index.mjs";

describe("Result", () => {
	wordThesaurus.load();
	it("*.find(love): using toLowerCase", () => {
		const res = wordThesaurus.find("love");
		assert.ok(res.length > 0);
	});

	it("*.find(loVe): testing case insensitive", () => {
		const res = wordThesaurus.find("loVe");
		assert.ok(res.length > 0);
	});

	it("*.find(rapid): result.raw remove duplicate", () => {
		const res = wordThesaurus.find("rapid");
		assert.ok(res.length == 2);
		assert.strictEqual(0, res[0].pos);
		assert.strictEqual("waterway", res[0].raw.toString());
		assert.strictEqual(2, res[1].pos);
		assert.strictEqual("speedy,fast", res[1].raw.toString());
	});
});
