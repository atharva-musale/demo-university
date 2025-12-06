# Demo University

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/atharva-musale/demo-university.git
cd demo-university
```

### Install Dependencies

```bash
npm install
```

### Run the Application

Start the Angular development server:

```bash
npm start
```

The application will be available at `http://localhost:4200`

### Run JSON Servers

To work with student and teacher data, start the JSON servers in separate terminals:

**For Students (Port 4000):**
```bash
npm run serve-students
```

**For Teachers (Port 5000):**
```bash
npm run serve-teachers
```

### Run Tests

```bash
npm test
```

## DOM Emulators

Now since the default test runner is vitest, we have an option with dom emulators: jsdom (default) and happy-dom.

| Feature | JSDOM | Happy DOM |
| --- | --- | --- |
| Focus | Browser-like accuracy, comprehensive emulation | Performance, speed, essential APIs |
| Performance | Slower, more resource-intensive | Faster, lighter footprint |
| Features | Broad API coverage, CSS, layout support | Essential APIs, optimized for speed |
| Use Cases | Complex web app testing, full browser simulations | Fast unit/integration tests, simple DOM structures |
| Maturity | More established, larger community | Newer, gaining popularity |

## Steps to take

1. Install deps
2. Modify angular json. No need for polyfills, etc since it relies on artifacts taken from build target. It specifies the build target to use for the unit test build in the format `project:target[:configuration]`. This defaults to the `build` target of the current project with the `development` configuration. You can also pass a comma-separated list of configurations. Example: `project:target:production,staging`.
3. Change types in tsconfig.
4. Use angular schematics with additional `--add-imports` flag to get imports per file from vitest. (OR do we want to define types and paths in tsconfig).

## Globals

Use runnerconfig to change it.
```json
"test": {
  "builder": "@angular/build:unit-test",
  "options": {
    "tsConfig": "tsconfig.spec.json",
    "buildTarget": "refx-demo-test:build",
    "runnerConfig": "vitest.config.ts"
  }
}
```
And then in the config file:
```ts

export default defineConfig({
  test: {
    globals: false
  }
})
```
Refer to https://vitest.dev/config/ this for more.

## Mocking and other guides:
https://vitest.dev/guide/mocking#timers
https://cookbook.marmicode.io/angular/testing/migrating-to-vitest
Migration guide: https://angular.dev/update-guide?v=20.0-21.0&l=3
Testing migration: https://angular.dev/guide/testing/migrating-to-vitest
