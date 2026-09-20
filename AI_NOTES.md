# AI_NOTES

**Tool:** Claude Code (Claude Opus 5) in VS Code.

For this task, I set the overall architecture and the rules for how state should be handled up front, then worked through the implementation together with Claude in small steps. I reviewed each step, adjusted the direction when needed, and simplified parts where I felt the solution could be clearer.

Some parts I wrote myself, some were drafted by Claude and then adapted. I got the most value from using it for styling, iteration and getting a working version quickly, while keeping the technical decisions and final implementation under my control.

---

## The prompts

**Setting the ground rules up front:**

> We'll be working on a technical task for an interview. The goal is to build the solution incrementally — first we make a plan, then we execute it step by step. After each step we stop so I can review it before continuing.
>
> Requirements:
>
> - Angular project with standalone components, no NgModules.
> - Services for the HTTP calls.
> - State managed with standard Angular signals.
> - The full list of countries kept in one signal.
> - The filtered list `displayedCountries` kept in a separate plain signal.
> - A separate `applyFilters()` method that: takes the current filter values, filters the list, sorts the result, takes the first 12, and writes it with `displayedCountries.set(result)`.
>
> The idea is to keep the logic simple and clear.
>
> First we make a short plan and define the main steps. Then we do one step at a time — after each finished step we stop for review, and only then move on to the next.

**Keeping the stack simple:**

> Use plain CSS, not SCSS. The task isn't complex, so the result should be simple and easy to read, without unnecessary layers.

---

## What I got the most value from

- Version-aware details I would otherwise have had to look up: `withFetch()` is deprecated in Angular 22 because fetch is now the default, so `provideHttpClient()` alone is enough.
- Catching a small inconsistency in the brief: the provided data contains 31 countries rather than 30.
- The styling work, which is where I get a lot of value from AI: the continent colour tokens shared between the cards and the legend, `object-fit: contain` on flags so a square flag like Switzerland isn't cropped, and both theme palettes.
- The filtering and sorting logic. I described the shape I wanted — two plain signals and one explicit `applyFilters()` — and Claude turned that into a first version quickly. I then reviewed it, simplified it and tightened the details.
- Iteration speed. It gets me to a working first version quickly, which leaves more time for the details and for improving the implementation.

---

## What I changed or simplified

- **It proposed SCSS.** I chose plain CSS instead because the task is small and I wanted to keep the styling easy to read.
- **Its first `ThemeService` was more complex than necessary** — try/catch, helper methods and a type alias for a small amount of logic. I simplified it and wrote the final version myself.
- **It initially suggested that `localStorage` throws in private browsing.** I questioned that, and Claude corrected the answer. This was a good reminder to verify technical details when they matter rather than accepting an explanation without checking it.
- Along the way, we also caught a few implementation details together, such as the `fb.group` typing issue, a missing `return` in a filter callback, and making sure `applyFilters()` runs after the data is loaded.

---

## The most useful review

Late on, I pasted screenshots of the running app and asked Claude to review the result.

It spotted that the cards were in file order rather than alphabetical and traced it to `sortCountries()` returning the list unsorted in the default case.

The bug had already been committed and pushed. The project compiled cleanly, `ng build` was green, and the code looked correct on a read-through, but the rendered result was still wrong.

It was a good example of why I review the running application and not just the code and build output.

---

## Would I ship this as-is?

Not without reviewing and running it.

I see AI as a development partner rather than something that should make all the decisions for me. It is extremely useful for getting to a good first version quickly, exploring solutions, handling repetitive work and iterating on ideas. My role is still to define the direction, understand the code, review the result and make the final decisions.

What I check before considering the implementation finished:

- **Behaviour, not just compilation.** I run the application and check the actual result.
- **The error path.** I break the fetch on purpose (DevTools → Block request URL) rather than assuming the error branch works.
- **Accessibility claims.** Lighthouse plus a keyboard pass, in both themes — automated audits only cover part of it.
- **Statements about APIs and versions.** When something is version-specific or important to the implementation, I verify it rather than relying only on the explanation.
- **Leftovers.** A `console.log` reached a commit once, and the artificial delay sat at 200ms for a while — both easy to miss in a diff.
