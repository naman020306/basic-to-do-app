To-Do App

A simple, no-framework To-Do List app built with plain HTML, CSS, and JavaScript. Tasks can have a due time and priority, and everything is saved in your browser so your list is still there next time you open the page.

Features
Add tasks (press Enter or click Add)
Delete tasks
Mark a task done by clicking on it (strikethrough)
Optional due time per task
Priority levels — Low / Medium / High (shown as a colored dot)
Filters — All / Active / Done
Task counter (e.g. "2 task(s) left · 5 total")
Dark mode toggle (🌙 / ☀️) — your choice is remembered
Saves automatically to localStorage, so tasks persist after a refresh
File Structure
todo-app/
├── index.html   # page structure / markup
├── style.css    # layout, colors, light & dark theme
├── script.js    # all app logic (add, delete, done, filters, storage)
└── README.md    # this file
How to Run
Download index.html, style.css, and script.js into the same folder — the app won't work if they're split across different folders, since index.html loads the other two by relative path.
Double-click index.html to open it in your browser.
Start adding tasks.

No build step, no dependencies, no server required.

How to Use
Action	How
Add a task	Type in the text box, optionally set a time/priority, then press Enter or click Add
Mark done / undone	Click the task text
Delete a task	Click Delete on the task
Filter tasks	Use the All / Active / Done buttons
Switch theme	Click the 🌙 / ☀️ button top-right
Notes on Data Storage

Tasks and your theme preference are saved in the browser's localStorage, scoped to wherever you're opening the file from. This means:

Data persists across refreshes and browser restarts.
Data is not synced across devices or browsers — it lives only in the browser you added the tasks in.
If your browser blocks localStorage (rare, but can happen when opening files directly via file://), the app still works for the current session — it just won't remember tasks after you close the tab. Check the browser console (right-click → Inspect → Console) if you notice tasks not saving.
Troubleshooting
Nothing happens when I click Add → Open the browser console (right-click → Inspect → Console) and check for a red error. This usually means script.js isn't loading — confirm all three files are in the same folder.
Dark mode doesn't stick → Your browser may be blocking localStorage for local files; try running the folder through a local server instead of opening index.html directly.
Styles look broken → Make sure style.css sits next to index.html, not in a subfolder.
