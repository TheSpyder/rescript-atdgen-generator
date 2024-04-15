# rescript-atdgen-generator

[Atdgen](https://github.com/ahrefs/atd) prebuilt binaries for 3 major OS platforms.

This is capped at version 2.15.0, after which BuckleScript support (which ReScript relies on) was removed.
https://github.com/ahrefs/atd/pull/375

 If `atd` proves to be a popular tool for ReScript projects it can be restored fairly easily.

## Getting started

(Prefer example? Check the [test](./test) folder)

### Runtime library installation

This tool will not work without a library that implements the ATD BuckleScript runtime API. A ReScript implementation is in progress, in the meantime [`bs-atdgen-codec-runtime`](https://www.npmjs.com/package/@ahrefs/bs-atdgen-codec-runtime) still works - but not on ReScript 11.

### Generator installation

With yarn or npm:

```
yarn add -D rescript-atdgen-generator
```
```
npm i -D rescript-atdgen-generator
```

We then need to define `atd` as a generator in `rescript.json`. For compatibility with windows development, the recommended approach is a direct reference to `atdgen.exe`. Generators are run in the `lib/bs` folder context, so a leading `../..` is required:

```json
"generators": [
  {
    "name": "atd_types",
    "command": "../../node_modules/rescript-atdgen-generator/atdgen.exe -t $in"
  },
  {
    "name": "atd_runtime",
    "command": "../../node_modules/rescript-atdgen-generator/atdgen.exe -bs $in"
  }
],
```

If windows compatibility is not required, or for more complex monorepo scenarios, these commands can be replaced by the shorter `npx atdgen -t $in` and `npx atdgen -bs $in` (or using `yarn run` instead of `npx`). This approach is however a little slower due to the extra nodejs invocations.

Now that the generator is defined, add the files that need to be processed to `sources`. ReScript requires a manual definition for every file that the generator will process. For `atd`, this means a pair of entries must be defined for _every_ `.atd` file in your project. Both "types" and "runtime" representations are required, and each generates both an interface and a code file.

```json
"sources": {
  // given a `my-generated-source` folder, define generators for the file `meetup.atd` in that folder.
  // it is not necessary to have a dedicated folder for generated sources,
  // but it does help avoid generated files getting in the way.
  {
    "dir": "my-generated-source",
    "generators": [
      {
        "name": "atd_types",
        "edge": ["meetup_t.ml", "meetup_t.mli", ":", "meetup.atd"]
      },
      {
        "name": "atd_runtime",
        "edge": ["meetup_bs.ml", "meetup_bs.mli", ":", "meetup.atd"]
      }
    ]
  },
  // ...other source folders
  "src1",
  "src2"
},
```

The syntax here is a little weird, the `edge` array defines a build syntax recognised by the compiler. The order of this array is very important; it must be the two files that `atd` generates, a `:`, and then the source file that serves as the input to the generator command.

Updates to the source file are what the compiler uses to determine whether the generator needs to run. The generated files can freely be ignored by source control.

## License and Credits

All code is licensed as MIT. See [LICENSE](LICENSE).

This project was transferred to me by [Javier Chávarri](https://github.com/jchavarri) after it was abandoned following the switch of [ahrefs](https://github.com/ahrefs) to Melange.
