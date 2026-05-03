# eBay E2E Automation Tests

Playwright-based end-to-end tests for eBay.com with Allure reporting.

## Tech Stack

- **Playwright** - Test automation framework
- **TypeScript** - Type-safe JavaScript
- **Allure** - Test reporting
- **dotenv** - Environment variable management

## Project Structure

```
qaExercise/
├── pages/           # Page Object Model classes
├── services/        # Business logic layer
├── tests/           # Test specifications
├── data/            # Test data (JSON)
├── utils/           # Utility functions
└── screenshots/     # Test failure screenshots
```

## Getting Started

```bash
npm install
npx playwright install --with-deps
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/e2e.spec.ts

# Run with UI mode
npx playwright test --ui

# Run single browser
npx playwright test --project=chromium

# View Allure report
npx allure serve allure-results
```

## Configuration

- **Base URL:** `https://www.ebay.com/`
- **Browsers:** Chromium, Firefox, Webkit
- **Test Data:** `data/testData.json`
- **Credentials:** Set in `.env` file (`EBAY_USER`, `EBAY_PASS`)

## Test Flow

1. Login to eBay
2. Search for items under a max price
3. Add items to cart
4. Verify cart total doesn't exceed limit
5. Clear cart

## CI/CD

GitHub Actions workflow: `.github/workflows/playwright.yml`

## Reports

- **Live Report:** [View Allure Report](https://770gay.github.io/QaPlaywrightExercise)
- **Local:** Run `npx allure serve allure-results` to view results locally