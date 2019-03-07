---
title: A Case of SSR
date: 2019-03-07 17:40+01
---

If we take popular JS topics currently out there, type annotations, server-side rendering (SSR) and CSS in JS are probably in the top four. Virtual DOM frameworks have come as a solution to a request of getting more code on a client side. Tools like TypeScript and Flow appeared as attempts to fix some JS parts. Also, people started to seek for ways how not to duplicate ‘view’ code between server and client. Most often it leads to running JS in Node.js on server, which comes with [‘restart every N requests’](https://solovyov.net/en/2017/server-side-rendering/) and other implications. But people still go there to serve content faster. And it's obvious — why to take away from browsers what they do best: parsing and rendering HTML pages. And so now it's even supported by many frameworks out of the box.

But do you need all that? Do you need to add SSR to your React (insert any other Virtual DOM framework) application? Given the complexity it brings, I would say often ‘no’ and let me elaborate on that.

To show a ‘loading’ screen and do everything client-side would be much easier. Yes, it would drastically increase first page load time but if you deal with application-type website, sometimes it's acceptable. To mitigate drawbacks, there are few techniques to hack the perception of this loading time. For example, you can show placeholders for content, preparing users for actual things to appear.

![Content placeholder](images/content-placeholder.png)

BUT HEY NO, not acceptable. It can be done better. We have service workers, critical path render techniques, all those are at our disposal. And nothing's wrong with using node.js.

But then there is a thing. The markup you'd prepare on server will be static (sic!). It's a safe bet to assume that all event listeners would be attached after DOM is parsed, rendered and your JS bundles are downloaded, parsed, interpreted. And it leads to showing static markup of something intended to be dynamic, breaking UX right from the first interaction.

So it's possible that ‘loading’ screen, fully functional, yet empty is not that bad if you can't do the other option right. To show perfectly-looking tabs which are not clickable is just ignorant.

![NS wifi splash screen](images/ns-wifi.png)

That's a splash screen for wifi on Dutch railways. The connection is often flaky as there are many devices online and cell coverage is also spotty sometimes. And so I see a page, but can't switch to a tab I need. And yes, probably it doesn't even use React, it's actually an illustration to already forgotten ‘Unobtrusive JS‘ thing, but it's the same issue.

Unobtrusive JS is still the right approach. But it adds so many things to take care of, so it's very tempting to disregard it. Hey, it loads blazingly fast on my machine, and yes, I will wait few seconds before clicking anywhere just because I know that this button, even though already rendered, won't be responsive for a while. So what should I do? Right, let's move everything to JS so there is no static markup to break. Then we got loading state and we get back to square one with going SSR.

As always there is a third option. And it can help to escape that loop: to serve content in chunks and to send parts of JS with every chunk, progressively build a page with atomic blocks, but that brings you problems with shared dependencies and some others

(╯°□°)╯︵ ┻━┻

So going SSR, first of all, you need to solve how not to show broken interface while not everything is ready to interact. And don't ignore that as network is slow, unpredictable and with few guarantees.
