# Binary Tree Interface Redesign Implementation Plan

> Execute inline in the existing workspace. The user has authorized the redesign; preserve unrelated edits.

**Goal:** Apply the reference's dark, precise visual language to the binary tree visualizer and team page, with a usable responsive laboratory.

**Architecture:** Keep Next.js Pages Router, React 17, CSS Modules, and the existing tree algorithms. Share theme tokens and navigation; build an SVG canvas with traversal feedback, zoom, and fullscreen. Keep generation, history, and traversal state in the existing context.

**Tech Stack:** Next.js 10, React 17, TypeScript, CSS Modules, react-icons.

## Tasks

- [x] Replace global styles, fonts, header, and navigation with dark surfaces, thin borders, blue accents, and responsive navigation. Files: `src/styles/globals.css`, `src/pages/_document.tsx`, `src/pages/_app.tsx`, `src/components/Header/*`, `src/components/NavigationBar/*`.
- [x] Build the introductory section and laboratory layout; style tree generation and traversal controls and history. Files: `src/pages/index.tsx`, `src/styles/Home.module.css`, `src/components/Algorithm/*`, `src/components/History/*`.
- [x] Add an initial sample tree, bounded generation, animated traversal state, clearable history, and a responsive SVG canvas with zoom, pan, reset, and fullscreen. Files: `src/contexts/ContextTree.tsx`, `src/components/TreeGraph/*`. Preserve `NodeTree` traversal methods.
- [x] Restyle team profiles and verify desktop/mobile pages, tree generation, four traversals, canvas controls, history clearing, and keyboard interaction. Run `yarn tsc --noEmit` and the production build with the project's compatible Node runtime. Files: `src/pages/staff.tsx`, `src/styles/staff.module.css`, `src/components/StaffComponent/*`.

## Design context

The creator provided a reference defining the dark, minimal, technical tone. The app is a university data-structures visualizer; the default audience is students learning binary trees. The optional audience question received no response, so the stated student audience assumption was used. Use Portuguese interface text to match the request.

## Verification

Check the initial 15-node example, generation boundaries 1–63, pre/in/post-order and breadth-first traversal outputs, animation cancellation when changing trees, zoom limits, fullscreen Escape, history clearing, team links, and absence of horizontal overflow at 375px. Use browser screenshots to inspect the final composition.

## Results

- TypeScript and production build passed. The existing Next.js 10.1.3 requires Node 14; used a temporary Node 14.21.3 runtime without changing dependencies. Node 24 fails on the original PostCSS package exports.
- Browser checks passed for expected outputs of all four animated traversals, validation boundaries, 1/63-node generation, cancellation, node details, zoom by button and keyboard, dragging, centering, fullscreen, clearable history, and shared state across navigation.
- Desktop and mobile screenshots reviewed for both pages. No page errors or horizontal overflow at widths 320, 375, 768, 1024, 1440, and 1920.
- Utility assertions passed for traversal sequences, initial tree height/balance, and unique random values at 1/7/15/63 nodes.
- User's existing `.vscode/settings.json` edit was preserved.
