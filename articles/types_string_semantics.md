---
title: Types. String semantics
date: 2019-03-06 10:08+01
---

That's the third article in a series on TypeScript started by ‘[TypeScript. Bad Parts](ts_bad_parts.html)’. You can read them in any order as they aren't really connected apart from covering the same topic. But if you can't decide, make it [chronologically](ts_bad_parts.html).

This time I'd like to show how you can leverage types to simplify your runtime code.

Let's say we have a function which calculates a flag's value based on some input. And later you use that flag to do some checks. The easiest way to write that could be something like that:

```javascript
function calculateFlag(conditions) {
  return "important";
}

const flag = calculateFlag(context);
if (flag !== "important") {
  /* ... */
}
```

That would work but it's error-prone and your colleagues might signal you about it during a code review. It turns out that neither any editor nor javascript itself knows much about your flags and what values are valid there, for them it's just strings, nothing more. That's why they can't help you much in refactoring or spot a typo if you misspell a value in one of the places. The common JS pattern to mitigate that is to use an object as a poor-man enum.

```javascript
const flags = { important: "important" };
function calculateFlag(conditions) {
  return flags.important;
}
const flag = calculateFlag(context);
if (flag !== flags.important) {
  /* ... */
}
```

You have your value in one place, it's easier to change it, editors might warn you if you make a mistake in accessing an inexistent property, all good. But that brings a small penalty that you introduce an object where your runtime doesn't need one. It's small enough not to care at all, benefits outweigh that clearly. Though nobody would object if some pre-compiler inlines it away as it doesn't possess any runtime value in itself.

With types, you can add that semantics to your code that it's not just a random string without adding any objects and keeping it as strings.

```typescript
type Flag = "important";
function calculateFlag(conditions): Flag {
  return "important";
}
const flag = calculateFlag(context);
if (flag !== "important") {
  /* ... */
}
```

Now it knows that your function returns that value (in real life it should be a union of several valid strings) and it can check whether your `if` later makes any sense.

I see it as a nice example of adding more expressiveness to the language. One can argue that implementing such checks using built-in features like a plain object is even better. But I do see some value in using separate construct for these needs. Having fewer concepts is better in terms you should not have too many of them. Otherwise, it would be too low-level.

Another take on that (and actually the original premise of that note) is that I tend to use TypeScript solely as a type annotations system and try to avoid any additional features it brings and enums is one of them. And so this example is a nice one to demonstrate that you don't need enums for that, just use a union type and you're good. Hello, `flag.isImportant()`.

---

That's the third article in a series on TypeScript. You can read them in any order as they aren't really connected apart from covering the same topic:

- [TypeScript. Bad Parts](ts_bad_parts.html)
- [Types and runtime checks](types_runtime_checks.html)
