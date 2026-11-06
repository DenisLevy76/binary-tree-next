# Dependency maintenance implementation plan

Goal: Modernize dependencies while preserving the Pages Router and current behavior.

Architecture: Keep existing components, CSS and tree algorithms. Change only dependency integration and tooling.

Tech stack: Next.js, React, TypeScript, Yarn Classic.

- [x] Inspect registry versions, peer constraints and official migration guides.
- [x] Update package.json and regenerate yarn.lock; remove unused react-modal/react-d3-tree.
- [x] Adapt next/link anchors and explicit React children types.
- [x] Replace invalid legacy lint configuration with supported ESLint configuration; retain formatting conventions.
- [x] Run install, audit, lint, typecheck, production build and runtime smoke checks.
- [x] Document versions, runtime requirements and any remaining limitations.
