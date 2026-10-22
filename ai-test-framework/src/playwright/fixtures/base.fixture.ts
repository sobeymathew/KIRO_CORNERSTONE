import { test as base } from '@playwright/test';
import { CornerstoneHomePage } from '../pages/cornerstone-home.page';

/**
 * Extended test fixtures providing Cornerstone page objects.
 * Import this instead of @playwright/test in all test files.
 */
type PageFixtures = {
  cornerstonePage: CornerstoneHomePage;
};

export const test = base.extend<PageFixtures>({
  cornerstonePage: async ({ page }, use) => {
    await use(new CornerstoneHomePage(page));
  },
});

export { expect } from '@playwright/test';
