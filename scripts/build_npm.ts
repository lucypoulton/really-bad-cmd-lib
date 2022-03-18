// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./build/npm");

await build({
	entryPoints: ["./src/mod.ts"],
	outDir: "./build/npm",
	test: false,
	shims: {},
	package: {
		// package.json properties
		name: "really-bad-command-framework",
		version: Deno.args[0],
		description: "A really bad text-based command framework",
		license: "BSD-2-Clause",
		repository: {
			type: "git",
			url: "git+https://github.com/lucypoulton/really-bad-command-framework.git",
		},
		bugs: {
			url: "https://github.com/lucypoulton/really-bad-command-framework/issues",
		},
	},
});

// post build steps
Deno.copyFileSync("LICENSE", "build/npm/LICENSE");
Deno.copyFileSync("README.md", "build/npm/README.md");