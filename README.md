# bs-atdgen-generator

[Atdgen](https://github.com/ahrefs/atd) prebuilt binaries for 3 major OS platforms.

Mainly for BuckleScript users, to avoid the step of installing esy.

## Getting started

(Prefer example? Check the [test](./test) folder)

With yarn:

```
yarn add -D @jchavarri/bs-atdgen-generator
```

Tell bsb which files need to be processed:

```
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

```
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

```
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
