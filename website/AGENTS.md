# AlMithaq Website — Engineering Instructions

## Project Stack

Framework:
Astro

UI:
React

Language:
TypeScript

Styling:
Tailwind CSS

Package Manager:
npm


---

# Architecture Rules

Astro is the default framework.

Prefer Astro components for:

- Static sections
- Marketing pages
- SEO content
- Layouts


Use React only when needed for:

- Interactive elements
- Stateful components
- Complex user interfaces


Do not use React for simple static content.


---

# Project Structure

Maintain a clean structure:

src/
├── components/
├── layouts/
├── pages/
├── styles/
└── assets/


Create files only when they provide clear value.


---

# Code Quality

Before completing any feature, verify:

npm run lint

npm run format:check

npm run build


All checks must pass.


---

# Styling Rules

Use Tailwind CSS.

Prefer:

- Reusable utility patterns
- Consistent spacing
- Design tokens
- Responsive layouts


Avoid:

- Inline styles
- Duplicate CSS
- Random values without purpose


---

# React Rules

React components must:

- Use TypeScript
- Be reusable
- Avoid unnecessary state
- Avoid unnecessary client-side JavaScript


Use hydration directives only when required.


---

# Dependency Rules

Before installing a new package:

Explain:

1. Why it is required
2. What problem it solves
3. Why existing tools cannot solve it


Avoid unnecessary dependencies.

Performance is more important than adding features quickly.


---

# Performance Rules

Prioritize:

- Fast loading
- SEO
- Accessibility
- Mobile performance


Avoid:

- Heavy libraries without justification
- Excessive JavaScript
- Large unoptimized assets


---

# Brand Protection

Follow the parent AlMithaq CLAUDE.md instructions.

Important:

NIVO assets are protected.

Do not:

- Modify NIVO artwork
- Redesign logos
- Change brand colors
- Create alternative identities

without approval.


---

# Development Workflow

For major changes:

1. Explain the plan.
2. Wait for approval.
3. Implement step-by-step.
4. Verify the result.


Prefer simple, maintainable solutions.