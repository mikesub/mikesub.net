---
title: Types and runtime checks
date: 2019-03-01 17:00
---

That's the second article in a series on TypeScript started by ‘[TypeScript. Bad Parts](ts_bad_parts.html)’. You can read them in any order as they aren't really connected apart from covering the same topic. But if you can't decide, make it [chronologically](ts_bad_parts.html).

So what do types bring to JS? They fix some bad parts of JS, but that's a byproduct. Mainly they add some semantics to code which helps editors and people to get more sense what it's doing, how it should work and also spot some things which can be optimised. Let me show-case that with several examples.

## Runtime checks

Say, we have a function which takes a configuration object, which is a JS way to have named arguments, and it really needs `url` out of it.

```javascript
function main({ url }) {
  // ...
}
```

It can not do a thing without `url`, no fallback or default value possible. So there are two options, either to exit silently returning `undefined` or, to make it more explicit, to throw an error:

```javascript
function main({ url }) {
  if (!url) {
    throw new Error("no URL provided");
  }
  // ...
}
```

That should work. If somebody fails to put URL there, they notice it ASAP. But since it's not really named arguments there but just a fake, the code might fail even before. If one doesn't provide an object at all, we'll get:

```
TypeError: Cannot destructure property `url` of 'undefined' or 'null'.
```

Let's not discuss the fact that my Chrome can't decide what it gets there: null or undefined, and try to fix that.

```javascript
function main({ url } = {}) {
  if (!url) {
    throw new Error("no URL provided");
  }
  // ...
}
```

Now it's better. Though now it looks stupid. We've just provided a fallback value to be able to throw an error which can not be caught and recovered from.

And that's all happening in runtime. The code is there: parsed, evaluated, running, though isn't helping at all. If you use type annotations you can prevent that thing before runtime.

```typescript
function main({ url }: { url: string }) {
  // ...
}
```

Instead of providing a default value and throwing an error, we state that the argument is required and it needs to have `url` key which is a string. That's not ideal as any string, even empty one, will pass. But TypeScript might evolve to it at some point: [regex-validated string type](https://github.com/Microsoft/TypeScript/issues/6579). And as of now, we're already preventing some errors w/o any runtime costs.

---

That's the second article in a series on TypeScript. You can read them in any order as they aren't really connected apart from covering the same topic:

- [TypeScript. Bad Parts](ts_bad_parts.html)
- [Types. String semantics](types_string_semantics.html)
