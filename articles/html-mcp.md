---
title: HTML MCP
date: 2025-05-28 02:51
---

I’ve been playing around with MCP lately, trying to figure out what it’s really about. I remember when OpenAI introduced function calling two years ago — that felt like a big deal. And it was, it was that missing piece: LLMs struggle with simple deterministic stuff — like counting how many rs are in strawberries, and doing basic math. But they’re smart enough to ask for help, if you tell them how to ask.

Basically, you could now prompt LLMs with:
```
What is 2 + 2?
And by the way, if you need a calculator, 
just reply with “CALC: formula” and I’ll give you the result, 
so you can use this information in your final answer.
```
And suddenly they started getting weather, sending emails and searching knowledge bases.

Then came MCP, two years later.

It’s still tool calling, but with some added plumbing: a way to discover tools, communicate results, handle invocation. The protocol design decisions are quite questionable so far, and the docs/SDKs are clearly early-stage — but the direction makes sense. Eventually, it’ll be usable and maybe even nice.

One of the most common questions I see about MCP (right after “Why not just use WebSockets?”) is “Why not just use OpenAPI? The arguments tend to be:

1. Token efficiency — specs are large, and LLMs get overwhelmed or hallucinate more with too much irrelevant context. JSON should be dense and purpose-built.
2. OpenAPI specs are static. MCP supports more dynamic tool usage (whatever that exactly means).

Neither argument feels super convincing to reinvent a whole protocol… but that’s not the point of this post.

I want to go even further back — before OpenAPI — to REST itself.

A decade ago, I was designing a public HTTP API for a SaaS product. Back then, even choosing JSON over XML felt edgy. We spent days arguing about what makes an API "RESTful": what HTTP methods to use, what status codes to return, how to structure paths, all that. And we talked about HATEOAS.

It felt utopian — the idea that you could fully navigate and use an API just from what the server gives you in responses. For machine-consumable JSON APIs, it didn’t really fit. No clear way to describe input schemas, required fields, or methods. It worked fine for things like pagination ("next_page_url"), but for more complex workflows, we quickly dropped it.

Fast forward 10 years — and somehow, I’m back to it. Largely thanks to HTMX and their wonderful essay on [HATEOAS](https://htmx.org/essays/hateoas/). It sparked an idea and led me to open ChatGPT and try this little experiment. [https://chatgpt.com/share/68365c43-61c8-8005-95f2-f6fc8fc814ac](https://chatgpt.com/share/68365c43-61c8-8005-95f2-f6fc8fc814ac)

```
Me:
The goal is to trigger depositing money to an account, 
using HTTP API calls. At the start, you're given 
only the hostname (bank.example.com) 
and the entry-point URL: /accounts/12345. 
You should give me HTTP requests you'd like 
to make (no words, just HTTP requests). 
I'll act as a server. And we'll see if we get the task done.

ChatGPT:
GET /accounts/12345 HTTP/1.1
Host: bank.example.com


Me:
HTTP/1.1 200 OK
<html>
  <body>
    <div>Account number: 12345</div>
    <div>Balance: $100.00 USD</div>
    <div>Links:
      <a href="/accounts/12345/deposits">deposits</a>
      <a href="/accounts/12345/withdrawals">withdrawals</a>
      <a href="/accounts/12345/transfers">transfers</a>
      <a href="/accounts/12345/close-requests">close-requests</a>
    </div>
  </body>
</html>


ChatGPT:
GET /accounts/12345/deposits HTTP/1.1
Host: bank.example.com


Me:
HTTP/1.1 200 OK
<html>
  <body>
    <form method="post" action="/accounts/12345/deposits">
      <input name="amount" type="number" />
      <button>Submit</button>
    </form>
  </body>
</html>


ChatGPT:
POST /accounts/12345/deposits HTTP/1.1
Host: bank.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 11

amount=50
```
So, basically, HTML here fills all the missing pieces: method, endpoint, schema, everything. No additional docs or schemas. Just HTML. LLM handled other standard HTTP patterns (like 401 Unauthorized) all perfectly, no surprises.

So, here we are. HTML over HTTP might already have everything we need for tool self-discovery and usage. It’s human-readable, browser-native, and LLM-friendly. It’s not a static doc — tools and flows can change based on context, user input, or app state. It’s not really verbose. You can drop most of the markup (html, body, and other tags), and it's still totally valid HTML.

And that’s the beauty of it — the same HTML can serve both as a UI for humans and a tool interface for LLMs. You can load it in your browser, click through it manually, and see exactly what the agent would see. No need for separate dev consoles. The browser is your user agent!

So yeah — turns out old-school HTML over HTTP might just be the most future-proof API format we’ve got.
