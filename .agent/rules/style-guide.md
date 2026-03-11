# Rule: React & Next.js Best Practices
# Activation: Always On

- Use Next.js App Router conventions (e.g., `page.tsx`, `layout.tsx`, `route.ts`).
- Ensure all React code is compatible with React 19 patterns (e.g., using Actions, `use` hook where appropriate).
- Use TypeScript for all files (`.ts` or `.tsx`).
- Styling must use Tailwind CSS v3 utility classes. Avoid custom CSS unless absolutely necessary.
- UI components should prioritize using shadcn/ui components.
- Keep components small and focused. 
- Use Server Components by default; only use `'use client'` when interactivity or browser APIs are required.
