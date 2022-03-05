# Project is under migration
The installation instructions still point to the old binaries, the project has changed owners but I haven't had a chance to publish binaries under my name yet. Apologies.

# bs-atdgen-generator

[Atdgen](https://github.com/ahrefs/atd) prebuilt binaries for 3 major OS platforms.

Mainly for BuckleScript users, to avoid the step of installing esy.

## Getting started

(Prefer example? Check the [test](./test) folder)

With yarn:

```
yarn add -D @jchavarri/bs-atdgen-generator
yarn --check-files
```

Tell bsb which files need to be processed:

```json
"generators": [
  {
    "name": "atd_t",
    "command": "yarn run atdgen -t $in"
  },
  {
    "name": "atd_bs",
    "command": "yarn run atdgen -bs $in"
  }
],
```

Or with node:
```
npm install @jchavarri/bs-atdgen-generator --save-dev
```

And then:

```json
"generators": [
  {
    "name": "atd_t",
    "command": "npx atdgen -t $in"
  },
  {
    "name": "atd_bs",
    "command": "npx atdgen -bs $in"
  }
],
```

Now that the generator is defined, add the files that need to be processed to `sources` (still in `bsconfig`):

```json
"sources": {
  "dir" : "src",
  "subdirs" : true,
  "generators": [
    {
      "name": "atd_t",
      "edge": ["meetup_t.ml", "meetup_t.mli", ":", "meetup.atd"]
    },
    {
      "name": "atd_bs",
      "edge": ["meetup_bs.ml", "meetup_bs.mli", ":", "meetup.atd"]
    }
  ]
},
```

## For Windows users

Unfortunately, it's not possible for `npx` or `yarn run` to work directly in Windows environments, due to
the way [ninja calls CreateProcess](https://github.com/jchavarri/bs-atdgen-generator/pull/3#issue-415706268).

In order to use atdgen for this platform, there are two options:

#### 1. Use relative path

In `bsconfig.json`:

```diff
"generators": [
  {
    "name": "atd_t",
-   "command": "npx atdgen -t $in"
+   "command": "../../node_modules/\@jchavarri/bs-atdgen-generator/atdgen.exe -t $in"
  },
  {
    "name": "atd_bs",
-   "command": "npx atdgen -bs $in"
+   "command": "../../node_modules/\@jchavarri/bs-atdgen-generator/atdgen.exe -bs $in"
  }
],
```

#### 2. Use `cmd /c`:

```diff
"generators": [
  {
    "name": "atd_t",
-   "command": "npx atdgen -t $in"
+   "command": "cmd /c npx atdgen -t $in"
  },
  {
    "name": "atd_bs",
-   "command": "npx atdgen -bs $in"
+   "command": "cmd /c npx atdgen -bs $in"
  }
],
```

Both solutions are shell independent, and work with both Powershell and Windows bash.
