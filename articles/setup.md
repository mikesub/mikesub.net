---
title: The setup
date: 2020-09-03 21:31
---

I've just realised that [Joanne Dvorak](https://www.theolognion.com/programmer-starts-a-blog-doesnt-write-about-their-static-site-generator-setup-in-the-first-post/) might be not the only one to make such mistake.

So let me fix it. I've never been a fan of write-your-own-thing when there are many superior alternatives available. Now I’m even less of it. But when I decided to spin up a stand-alone blog, I didn’t go for Hugo, Gatsby or Jekyll. I thought it’s just a bunch of static pages, right. If you add some basic scripts for automation so you don’t need to update a RSS file manually and don’t copy-paste a HTML header, you should end up in less than a hundred lines of code. That probably should take less than reading through docs and configuring something ready-made. Well, I’ve ended up in [~150](https://github.com/mikesub/mikesub.net/tree/master/src).

To be fair, it has dependencies on Date-fns, Lodash, Mustache and Meta-marked. In theory, I could have gone without first two. That would increase the size, of course. Mustache and Meta-marked (a markdown library) is harder to remove but at the same time I could make it as an independent external process in the build system, not depending on node-modules implementation. It seems to be an overkill, I'm not a purist in this regard.

One thing I'm very pleased with is how tests are done. There are none of them. I've just made it work once by manual testing, then results (htmls and feeds) got pushed to Git and from that moment I just re-run builds and check Git diff. No changes, no regression. I like it. Snapshot testing, haha.

The blog comes with a dark mode, human date formatting, drafts, RSS and JSONFeed.

As for the deploy, I just push changes to GitHub. Hosting comes for free from GitHub at the moment. The only thing I’m paying for is the domain name.

It misses a favicon, I'll make it eventually. Also I planned to add tags when I got enough posts, but with the current pace I have few more years for that.

Now you know.
