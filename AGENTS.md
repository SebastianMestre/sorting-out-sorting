This project is a recreation of the 1980 video "Sorting Out Sorting" by the University of Toronto.

https://www.youtube.com/watch?v=gv0JUEqaAXo

https://www.youtube.com/watch?v=JdXoUgYQebM

# Tech stack

- Vanilla JS
- HTML

That's it.

No frameworks, no libraries, no build tools, no npm, no bundlers, no package managers, no nothing.

# Architecture and Code Organization

The video is composed by a set of clips that play in sequence.

There is one code file per clip, plus a lot of shared code.

The user can navigate to src/index.html?clip=1 to see the first clip, src/index.html?clip=2 to see the second clip, etc.

This is managed client side by the browser.

The code for each clip lives at `src/clips/clip${n}.js`