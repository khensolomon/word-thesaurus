import { it } from "mocha";
import assert from "assert";
import fs from "fs";
import path from "path";

import thesaurus from "../index.mjs";

describe("Source", () => {
	it("Default source file", () => {
		assert.strictEqual(
			path.basename("./src/thesaurus.dat"),
			path.basename(thesaurus.src.file)
		);
		assert.ok(fs.existsSync("./src/thesaurus.dat"));
	});

	it("Changing source file", () => {
		thesaurus.src.file = "./tmp.dat";
		assert.strictEqual(
			path.basename("./tmp.dat"),
			path.basename(thesaurus.src.file)
		);
		assert.ok(!fs.existsSync("./tmp.dat"));
	});

	it("Reset source file", () => {
		thesaurus.src.file = "./src/thesaurus.dat";
		assert.strictEqual(
			path.basename("./src/thesaurus.dat"),
			path.basename(thesaurus.src.file)
		);
	});
});
