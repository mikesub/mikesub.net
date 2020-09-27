---
title: Types. Introspect
date: 2019-03-07 10:08
---

That's the fourth and the last one in a series on TypeScript started by ‘[TypeScript. Bad Parts](ts_bad_parts.html)’. You can read them in any order as they aren't really connected apart from covering the same topic. But if you can't decide, make it [chronologically](ts_bad_parts.html).

JS is weak and dynamic so sometimes editors and compilers have problems in inferring whether code makes sense or not. Compilers do crazy and smart hacks trying to optimise running code by inlining pieces, refactoring some parts of it, etc. As already mentioned, types can bring more expressiveness to the language and that can help here as well.

## Exhaustiveness checks

Here is something loosely similar to react-redux reducer function. We have a state, and some events which we apply to get the new one.

```typescript
type State = number[];
type Event = ["created" | "moved" | "deleted", number];
function reducer(s: State, [kind, value]: Event): State {
  switch (kind) {
    case "created":
      return [...s, value];
    case "deleted":
      return s.filter((x) => x !== value);
  }
}
```

It's called a reducer because of its signature `(State, Event) => State`. And using that TS could warn you that you forgot to handle `moved` event as now the function returns `undefined` in this case. Also it will warn you if you have some unreachable or redundant code.

## Guards

We can take expressiveness even a bit further with type guards.

```typescript

type A = {flag: boolean}
type B = A && {value: string}
const a: A =  {flag: false};
const b: B = {flag: true, value: 1}
const list = [1, 2, "two"];
function isNumber(y: any): boolean {
  return Number.isFinite(y);
}
list.filter(isNumber).map(num => num * 2);
```

---

That's the fourth article in a series on TypeScript. You can read them in any order as they aren't really connected apart from covering the same topic:

- [TypeScript. Bad Parts](ts_bad_parts.html)
- [Types and runtime checks](types_runtime_checks.html)
- [Types. String semantics](types_string_semantics.html)
