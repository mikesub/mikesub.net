---
title: On Tailwind
date: 2026-11-14 16:00
photo: _
alt: _
---

I've been getting back to thinking about Tailwind CSS design and its success several times recently. And now, with llms.txt-related drama[1], let me note it here.

There are people loving tailwind for letting them not care about browser quirks and css files. There are people opposed to it, wondering how even it could be a good idea to invent a new syntax which you need all to squeeze into a small XML-like node attribute value.

I talked to a frontend developer who's pro-tailwind and came to the industry just few years ago. To him the key point was to have CSS next to HTML, without looking for a needed classname somewhere in a separate file.

So, React, in order to level up DX, brought JSX and combined markup with rendering logic, while completely ignored CSS. Before him there were opinions that, first, you need clear separation of these layers, and second, you don't introduce a new syntax and there are no additional compilers. Meta paid this consYou juggle your JS and HTML, and then somewhere separately you had a tree of CSS files. That was the reason for appearance of CSS-in-JS techniques, and that, I think, helped Tailwind.

Meanwhile, Vue, Svelte, Astro and other more modern frameworks went the other way: we are already compiling, why not add CSS and put it next to the rest of component code. As a result, we have quite nice scoped styles and everything component-related is contained together. Yes, we had to pay by supporting this new syntax in editors, but you get normal CSS — structured, scoped and with all native syntax and no proxy layers.

But then LLMs came and Tailwind got another boost. You ask for markup and they return a string of html nodes with all styling included. just copy/paste, given you have tailwind set up in your project.

So looks like nobody to blame but ourselves. DX was not great, and tailwind is a hacky, but working solution.

[1] —

Discussion: [BSKY](https://bsky.app/profile/mikesub.net)
