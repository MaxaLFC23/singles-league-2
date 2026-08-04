# Singles League — Season 3

The league's live fixtures, table, playoffs, and stats site. A single static
page (`index.html`) that talks to a Supabase database, so it runs on GitHub
Pages with no server of your own — the same setup as Chalkboard.

## Before you publish — one thing worth deciding

This file currently points at a Supabase project that isn't yours:

```
SUPABASE_URL = 'https://gtoozehjbvvowignlrzi.supabase.co'
```

That's presumably your colleague's project. The site will work fine hosted
from your own GitHub repo while still pointing at it — nothing about *where*
the frontend lives changes who owns the *data*. But it does mean:

- Any future database change (new columns, tables, fixing something) needs
  **their** Supabase login, not yours — the same friction Chalkboard had
  before it got its own project.
- If they ever delete or lock you out of that project, this site breaks.

If you're happy sharing that backend with them, no action needed — just
publish as-is. If you'd rather have full control (matching how Chalkboard
runs under your own account), say so and I'll help migrate the `results`
table's data into a Supabase project of your own and repoint the two
constants near the top of `index.html`. Either is a reasonable choice —
just flagging it so it's a decision, not an accident.

## No access control on entering results

Right now anyone who opens the site can click a fixture and submit a result
— there's no password or identity check at all, more open even than
Chalkboard. If you'd like the same kind of admin-password gate we built
there, that's a quick add — just ask.

## Publish on GitHub Pages

Same routine as Chalkboard. From the folder holding `index.html`:

```
gh auth switch --user MaxaLFC23
cd ~/Downloads/singles-league
git init
git branch -M main
git add index.html README.md
git commit -m "Add Singles League site"
gh repo create singles-league --public --source=. --remote=origin --push
gh api --method POST repos/MaxaLFC23/singles-league/pages -f "source[branch]=main" -f "source[path]=/"
```

Live a minute later at:

**https://maxalfc23.github.io/singles-league/**

## Making future changes

Once it's live, every change follows the same loop:

1. I make the edit and hand you an updated `index.html`.
2. Move it into your repo folder, overwriting the old one.
3. `git add index.html && git commit -m "..." && git push`
4. Give Pages a minute, hard-refresh (Cmd+Shift+R) to see it.

## What's in this file

- **Fixtures, League Table, Players, Playoffs, Hall of Fame, Season Stats** —
  six tabs, all computed client-side from one Supabase table called
  `results` (one row per fixture: winner, scores, checkout, averages,
  referee notes).
- **Player list and colours** are hardcoded near the top of the script
  (`PLAYERS` / `COLORS`) — edit those directly to add or rename a player.
- **Fixture structure** (who plays who, which week, the playoff bracket) is
  also hardcoded in the script, computed from seeding — the database only
  ever stores *results*, not the schedule itself.
- A `seedIfNeeded()` step runs once on load and only fills in a result if
  that fixture has no row yet in the database — safe to redeploy without
  risk of overwriting real results.
