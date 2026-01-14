# Contributing to Lavansh's Portfolio

Thanks for your interest in contributing! This document explains the process for reporting issues, requesting features, and submitting code changes.

Please note: this repository is primarily a personal portfolio. Contributions are welcome (fixes, improvements, docs), but they may be reviewed with a focus on design intent and personal preference.

## Table of Contents
- [Reporting Issues](#reporting-issues)
- [Suggesting Features](#suggesting-featues)
- [Development Workflow](#development-workflow)
- [Coding Style](#coding-style)
- [Pull Request Process](#pull-request-process)
- [Testing & Linting](#testing--linting)
- [Security](#security)
- [Code of Conduct](#code-of-conduct)

## Reporting Issues

- Use GitHub Issues to report bugs or unexpected behavior. Provide:
  - A clear title
  - Steps to reproduce
  - Expected vs actual behavior
  - Browser / OS / Node versions where relevant
  - Minimal reproduction (codesandbox, stacblitz, or repository steps)

## Suggesting Features

- Open an issue describing the feature, otivation, and an example of expected behavior or UX. Label suggestions as `enhancement`.

## Development Workflow

1. Fork the repository and create a topic branch from `main`:

```sh
git clone https://github.com/lavansh1306/lavansh-Portfolio.git
git checkout -b feat/my-feature
```

2. Make small, focused commits. Rebase or merge `main` before opening a PR.

3. Push your branch and open a Pull Request against  `main`.

## Coding Style

- The project uses React + TypeScript with Vite and Tailwind CSS. Follow these guidelines:
  - Use TypeScript for new code; prefer explicit types where helpful.
  - Keep components small and focused.
  - Use Tailwind utility classes for styling and prefer existing design tokens.
  - Use `shadcn/ui` and Radix primitives when applicable for consistent accessibility.
  - Write JSDoc/TSDoc for complex utils or exported functions.

- Formatting & linters:
  - Run the linter before committing: `npm run lint`.
  - Apply code formatting (prettier rules are recommended by the project tooling).

## Pull Request Process

- Open a PR with a clear title and description. Include:
  - What you changed and why
  - Screenshots or GIFs for UI changes
  - Any migration or upgrade notes

- PR checklist (fill before requesting review):
  - [ ] Branch rebased with `main`
  - [ ] All linters pass (`npm run lint`)
  - [ ] No unrelated changes included
  - [ ] New code is covered by tests where applicable

## Testing & Linting

- Linting: `npm run lint`
- Add tests for new components or utilities if they contain logic that benefits from unit tests. (The repo currently focuses on UI/visuals; consider lightweight unit tests for non-UI code.)

## Security

- If you find a security vulnerability, please do not open a public issue. Instead, contact the repository owner privately via the GitHub profile or email address listed in the profile.

## Code of Conduct

- Be respectful and constructive. This is a small personal project and contributions should be collaborative and kind.

If you'd like, I can also add a `CODE_OF_CONDUCT.md` file and a simple PR template to streamline contributions — tell me if you want those added and I will create them and push to the repo.

Thank you for considering a contribution! 🙏
