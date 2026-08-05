# Cup Competitions — Premiership of Darts

Lives inside the Singles League site at `/cups/`, so it deploys with the
same push and shares the same header. Currently holds one competition:
the Double Trouble Cup (12 players, 4 groups, group stage into a knockout).

## What changed from the version you sent over

The original app stored everything in the browser's `localStorage` — which
meant results only ever existed on whoever's device entered them. Nobody
else, not even the same person on a different device, would see them.

`storage.js` now talks to Supabase instead — **your own project**, the same
one behind Chalkboard and Ralph's Day, not Dan's. Everything else (groups,
fixtures, the knockout bracket, all the existing pages) works exactly as
before; only *where* the data lives has changed. It also does a quiet
refresh every 20 seconds and whenever the tab regains focus, so if someone
else enters a result, you'll see it without needing to manually reload.

I also found and fixed two real bugs while testing this — both existed in
the original file before I touched storage at all (I checked by reproducing
them with your original code untouched):

- The homepage crashed if a group had no players in it yet — which is
  exactly the state the competition starts in.
- A duplicated block of code in `knockout.js` was sitting outside any
  function, so it ran the instant the page loaded, before any tournament
  data existed yet — crashing the main competition page on first visit.

Both are fixed. A brand new, empty competition now loads cleanly on both
pages.

## One thing to run before it works

In **your own** Supabase project (Dashboard → SQL Editor → New query):

```sql
-- paste the contents of supabase-setup.sql and run it
```

This adds one new table, `cup_competitions` — additive, safe, doesn't touch
anything else in your project.

## Setting up the groups

Right now the competition starts empty — `groups: { A: [], B: [], C: [], D: [] }`
in `data.js`. Add the real player names for each group there before sharing
the link round, e.g.:

```js
groups: {
  A: ["Max", "Ste", "Ollie"],
  B: ["Adam", "Dan", "Liam"],
  C: ["Shaun", "Cedric", "Ant"],
  D: ["James", "Mohan", "..."]
}
```

## Deploying

Same repo as the Singles League site, so it's one push:

```
mv ~/Downloads/index.html ~/Desktop/singles-league/index.html
mkdir -p ~/Desktop/singles-league/cups
mv ~/Downloads/cups/* ~/Desktop/singles-league/cups/
cd ~/Desktop/singles-league
git add index.html cups/
git commit -m "Add Cup Competitions, backed by Supabase instead of localStorage"
git push
```

Live a minute later at:

- **maxalfc23.github.io/singles-league/** — the "🏆 Cups" button now sits in
  the header
- **maxalfc23.github.io/singles-league/cups/** — the Cups homepage directly

## Worth knowing

- **Same trust model as Chalkboard** — no login, open database rules,
  anyone with the link can enter or change a result. Fine for a friendly
  competition, not for anything sensitive.
- **Adding more cups later** (Christmas Cup, Couples Cup) is straightforward
  — each just needs its own `id` in the `cup_competitions` table and its own
  page, following the same pattern as Double Trouble.
