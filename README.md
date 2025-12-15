# Demo University

An Angular application for managing college students and teachers with comprehensive testing using Vitest.

## Features

- **Student Management**: Register students with personal details, academic information, and subjects
- **Teacher Management**: Faculty application system with experience and salary tracking
- **Authentication**: Guard-protected admin section with role-based access
- **Form Validation**: Material Design forms with custom validators and navigation guards
- **Responsive UI**: Material Design components for a modern user experience
- **Testing**: Comprehensive unit tests with Vitest in browser mode using Playwright

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

## Using Vitest for unit testing

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

### Generate Coverage Report

```bash
npm run coverage
```

Coverage reports are saved to `./coverage/` directory:
- **HTML Report**: `coverage/index.html` - Open in browser for interactive report
- **JSON Report**: `coverage/coverage-final.json` - Machine-readable data
- **LCOV Report**: `coverage/lcov.info` - For CI/CD integration
- **Console**: Text summary displayed in terminal

### Why V8 Coverage?

When using Vitest's browser mode, only the V8 coverage provider is supported. Istanbul requires code instrumentation incompatible with browser environments. V8 uses Chrome's built-in coverage which works seamlessly with browser mode.

## Resources

- [Vitest Configuration](https://vitest.dev/config/)
- [Vitest Mocking Guide](https://vitest.dev/guide/mocking)
- [Angular Testing Migration](https://angular.dev/guide/testing/migrating-to-vitest)
- [Angular Update Guide](https://angular.dev/update-guide?v=20.0-21.0&l=3)
- [Vitest Angular Cookbook](https://cookbook.marmicode.io/angular/testing/migrating-to-vitest)
