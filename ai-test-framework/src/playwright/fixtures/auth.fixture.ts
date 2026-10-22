import { test as base, Page } from '@playwright/test';

/**
 * Authentication fixture — reserved for future authenticated flows.
 * Currently not used by Cornerstone public site tests.
 */
type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';
