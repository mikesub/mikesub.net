---
title: TypeScript. Bad Parts
date: 2019-02-07 23:00+01
---

I've been writing TypeScript for more than a year now and gone through well-known five stages of grief so it's time to share my experience. It all started as a compilation of tips & tricks I've discovered so far. Then it went to a more meta level of what types bring JS at all. And so I was writing two pieces asynchronously when I began to find myself noticing ‘bad’ parts here and there. At some point, there were enough of them for a separate discussion. So to keep those original ideas free of them, here they are, unordered.

## Slowness
Everything is pointing out it could be considerably faster. I should admit it's slow but stable so if authors had to choose between those, they did the right choice, but hey, it's v3 already, maybe it's time to address that.

## Cryptic error messages
They are. When you rely much on type inferring, it's even worse. Basically, they are generic stack traces which most of the times I see in a hint window in VSCode. They're not alone, some other languages are also known for it, but that's not an excuse.

## Types vs. interfaces
As of TS v3, I don't see any difference in them, practically speaking. Yes, interfaces can be extended and merged but differences are so subtle so it adds more confusion in the current state of things than benefits.

## Const enums
If you prepend enum declaration with `const` the compiler inlines it without creating an object. I can't see why I have to make that choice, the compiler has all the knowledge (actually even more than me) to decide whether it makes sense or not.

## Index signatures
In JS you can put anything as a key in object and it will be converted to a string. TS decided to improve that a bit and allows `{ [key: number]: boolean }`. Basically, it points that even though key is to be coerced to a string, let's check that we pass only numbers here. But then we get these:
```typescript
type A = { [k: number]: any };
const a2: A = {2: true}; // alright
const a1: A = {'string': true}; // error, fine
const a3: A = {'2': true}; // no error?

type B = { [k: string]: any };
const b1: B = {'string': true}; // alright
const b3: B = {'2': true}; // no error, fine
const b2: B = {2: true}; // no error?
```

And `Object.keys()` is not a generic, because it can't be as it always returns strings. The coercion was irreversible, nobody can convert strings back to original types for you. You're alone.
```typescript
Object.keys() // {} => string[]
```

And the last, not the least, is that you can only use primitives there, not your own types:
```typescript
type Id = number;
type Item = {id: Id};
type Index = { [k: Id]: Item}; // nope, number please
```

## Type Inference
That's nice. You feel good when you can drop obvious cases. It feels like language has done its homework. But then it starts taking defaults when there are multiple options and now you should be aware of them.
```typescript
const x = [2, true];
// (number | boolean)[], not [number, boolean]
```

And when you return different shapes of objects from a function (say, redux reducer), inference creates monsters.
```typescript
function foo(x: boolean, arr: []) {
    if (x) {
        return {'a': true, '3': 2}
    } else {
        return {'b': 2, 3: arr.length};
    }
}
// Inferred: {'a': boolean; '3': number; 'b'?: undefined;}
//           | {'bar': number; 3: 0; 'a'?: undefined}
//
// Meant to be: {a?: boolean; '3': number; b?: number;}
```
 Possible solution might be to add strict check similar to disabling implicit ‘any’ to avoid this monsters guessing and fail to infer when it is ambigious.

## Global scope
If you write TS for a browser, thus adding `dom` in `compilerOptions/lib`, lots of useful types become available in the global scope. And you don't need to import them explicitly. You know what it means. And they aren't grouped into a namespace. Yup.
Some are easy to expect as `XMLHTTPRequest` but others have more abstract names: `AlignSetting`, `Transport`. You will notice errors if you would try to define them in your code:
```typescript
type Transport = ...;
// duplicate identifier, was already declared in dom.d.ts
```
But you might miss the error if you just forget to define it and thus built-in will be used. And even worse will happen if you clash with built-in interfaces, as they will be merged:
```typescript
interface Account { foo: 'bar' }
let x: Account = { foo: 'bar' };
// missing displayName, id, rpDisplayName from type 'Account'.
```

## Official documentation
It's lacking behind. TS v3.3 is the latest now. `BigInt` has been added in v3.2 but official documentation hasn't been updated.

## Syntax
JS started to feel heavy when they added object destructuring. Then defaults and renaming came. Only type annotations were missing. Oh, it could be nested. I know it can be easily avoided by code style rules but still sometimes I find myself hitting the timeout in trying to parse the function declaration.

---

Alright. The path for more positive things looks much clear now. If you have any comments, please reach out to me, I'd love to discuss that in more details. And stay tuned, originally planned articles will follow.
