const fs = require("fs");

if (process.argv.length === 2) {
  console.error("Expected one argument to atdgen binary");
  process.exit(1);
}

const atdgenPath = process.argv[2];

const bsconfigJson = JSON.stringify(
  {
    name: "bs-atdgen-generator-integration-test",
    generators: [
      {
        name: "atd_t",
        command: `${atdgenPath} -t $in`,
      },
      {
        name: "atd_bs",
        command: `${atdgenPath} -bs $in`,
      },
    ],
    sources: [
      "src",
      {
        dir: "src/atd",
        generators: [
          {
            name: "atd_t",
            edge: ["Foo_t.ml", "Foo_t.mli", ":", "Foo.atd"],
          },
          {
            name: "atd_bs",
            edge: ["Foo_bs.ml", "Foo_bs.mli", ":", "Foo.atd"],
          },
        ],
      },
    ],
    "package-specs": {
      module: "commonjs",
      "in-source": true,
    },
    suffix: ".bs.js",
    "bs-dependencies": ["@ahrefs/bs-atdgen-codec-runtime"],
    warnings: {
      error: "+101",
    },
    "generate-merlin": true,
    namespace: true,
    refmt: 3,
  },
  null,
  2
);

fs.writeFileSync("bsconfig.json", bsconfigJson, {
  encoding: "utf8",
});
