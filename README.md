# Single Page Application Template

This is a template for SPA applications developed in our company.

## How to scaffold a project with this template?

1. Make sure you have `node` and `degit` installed
2. Create a new folder for your project:

```
mkdir my-project
cd my-project
```

3. Transplant contents to your folder:

```
degit --mode=git https://github.com/Bereyziat-Development/bdev-react-spa
```

4. Create `.env` as per exaple file
5. Install libraries with `npm i`
6. Run the app `npm run dev`
7. You can now initialize a new git repo and start developing you app!

## Resources

- https://github.com/Rich-Harris/degit
- https://nodejs.org/en/
- notion manual

## Libraries which are included in SPA standard template.

- Lang: Typescript
- UI Lib: React
- CSS: Tailwind (utility classes) + SCSS (main styling)
- Component Library: Shadcn/ui
- API Request Handling: Axios
- Asynchronous Data Management: Tanstack Query
- Client-side Routing: React Router
- Bundler: Vite
- Linter: ESLint with custom config
- Code Formatter: Prettier
- Unit and Integration Testing : Vitest + RTL
- Git hooks: Husky

Refer to Notion Page for a manual for this template

## Suggested Libraries

- State Management: React Context
- Form builder: Formik
- E2E: Playwright
- Internationalisation: React-intl
