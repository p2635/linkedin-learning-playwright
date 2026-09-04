# LinkedIn Learning - Playwright Test Automation Portfolio

A test automation project I built while learning Playwright. I've included tests for login flows, checkout, API endpoints, and visual checks across Chrome, Firefox, and Safari — all organized using best practices I learned from the [LinkedIn Learning course][lil-course-url].

**Website under test:** [PracticeSoftwareTesting.com][practice-url]

## Tech Stack

- **Playwright** v1.62.1 (Test automation framework)
- **TypeScript** (Type-safe test code)
- **Node.js** (Runtime environment)
- **dotenv** (Environment configuration)
- **GitHub Actions** (CI/CD integration)

## What's Tested

- **Login, checkout, and homepage flows** — End-to-end tests to make sure the main workflows work
- **API endpoints** — Tests that call the backend API and check the responses
- **Visual checks across browsers** — Screenshots on Chrome, Firefox, and Safari to catch UI breaks
- **Page Object Model** — I organize my tests so page interactions live in one place (easier to maintain)
- **Reused login sessions** — Tests share a saved login so they don't repeat authentication every time
- **Cross-browser testing** — Same tests run on all three major browsers

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation & Running Tests

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npm test

# Run tests in specific browser
npm run test:chromium

# Run tests with UI mode (interactive)
npm run test:ui

# View test results & traces
npx playwright show-report
```

### Test Structure

```
tests/
├── api/              # API endpoint tests
├── homepage/         # Homepage UI tests
├── login/            # Authentication & login tests
├── checkout/         # Checkout flow tests
└── auth.setup.ts     # Shared authentication setup
pages/
└── loginPage.ts      # Page Object Model example
```

## Design Decisions & Testing Patterns

- **Page Object Model**: I keep all page locators and interactions in one place so they're easy to find and update when the website changes.
- **Reused Login Sessions**: I save the login session once instead of logging in for every test — makes tests run faster and the suite more stable.
- **Visual Checks**: I take screenshots on different browsers to spot accidental UI changes.
- **Multiple Browsers**: Tests run on Chrome, Firefox, and Safari so I can spot compatibility issues early.

## Key Features

### Objectives

- Create automated tests using Playwright against web applications
- Analyze and debug Playwright test results
- Apply coding concepts and patterns to Playwright codebases
- Understand how Playwright uses locators to interact with web browsers
- Leverage the Playwright Test function to declare tests and write assertions

## Course Curriculum (for reference)

Playwright Installation and Config

- Installing Playwright
- Updating the Playwright config
- Playwright config browsers and projects
- Exploring the test runner command line interface
- Overview of package.json
- Exploring the VS Code extension
- Exploring the Playwright UI Mode

Creating tests

- Overview of the website under test
- Generating tests with codegen
- Overview of locator strategies in Playwright
- Overview of assertions in Playwright
- Structuring Playwright tests
- Handling cookie authentication in Playwright
- Visual testing in Playwright
- API testing in Playwright
- Automating the right things with Playwright

Maintaining tests

- Introduction to maintaining tests with Playwright
- Playwright screenshots, videos, and reporters
- Playwright trace viewer
- Scaling Playwright tests

## Acknowledgements

This repository was created following the [LinkedIn Learning - Learning Playwright][lil-course-url] course. The course and website structure are credited to the LinkedIn Learning and testing community.

[lil-course-url]: https://www.linkedin.com/learning/learning-playwright/
[practice-url]: https://practicesoftwaretesting.com/
