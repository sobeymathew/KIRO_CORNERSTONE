/**
 * Cornerstone Homepage — Visual Regression Tests
 *
 * Feature: src/test-case-management/features/regression/cornerstone-visual-regression.feature
 * URL:     https://www.cornerstoneondemand.com/
 * Tags:    @visual-regression @ui @cornerstone
 *
 * HOW IT WORKS:
 *  First run  → Playwright captures baseline screenshots into:
 *               src/playwright/tests/regression/__screenshots__/
 *  Every run  → Pixel-diffs against baseline. Test FAILS if diff exceeds threshold.
 *  Update     → Run with --update-snapshots flag to refresh baselines.
 *
 * RUN COMMANDS:
 *  First run (generate baselines):
 *    npx playwright test cornerstone-visual-regression --project=chromium --update-snapshots
 *
 *  Subsequent runs (compare):
 *    npx playwright test cornerstone-visual-regression --project=chromium
 *
 *  All browsers:
 *    npx playwright test cornerstone-visual-regression
 *
 * Covers:
 *  - Full page snapshots at 9 breakpoints
 *  - Above-the-fold viewport snapshots at 3 breakpoints
 *  - Section-level snapshots (header, hero, Workforce AI, agents, stats, footer)
 *  - Nav dropdown open-state snapshots
 *  - Mobile menu open-state snapshot
 *  - Cookie banner snapshot
 *  - Header & hero layout drift detection with tight threshold (1%)
 *  - Announcement banner snapshot
 */

import { test, expect } from '../../fixtures/base.fixture';

test.setTimeout(120000);

// Pixel diff threshold — 2% tolerance for anti-aliasing / font rendering differences
const DEFAULT_THRESHOLD = 0.02;
// Tight threshold for structural layout checks
const TIGHT_THRESHOLD = 0.01;

// ─── Full Page Snapshots — 9 Breakpoints ─────────────────────────────────────

const FULL_PAGE_BREAKPOINTS = [
  { width: 1920, height: 1080, label: 'full-hd-1920x1080'   },
  { width: 1440, height: 900,  label: 'wide-1440x900'        },
  { width: 1280, height: 800,  label: 'desktop-1280x800'     },
  { width: 1024, height: 768,  label: 'laptop-1024x768'      },
  { width: 768,  height: 1024, label: 'tablet-768x1024'      },
  { width: 425,  height: 900,  label: 'mobile-l-425x900'     },
  { width: 375,  height: 812,  label: 'mobile-s-375x812'     },
  { width: 360,  height: 800,  label: 'android-360x800'      },
  { width: 320,  height: 568,  label: 'mobile-xs-320x568'    },
];

for (const bp of FULL_PAGE_BREAKPOINTS) {
  test(`@visual-regression @p0 @full-page Full page snapshot matches baseline at ${bp.label}`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
    await cornerstonePage.scrollToTop();

    // Allow fonts & images to settle
    await cornerstonePage.page.waitForTimeout(1000);

    await expect(cornerstonePage.page).toHaveScreenshot(
      `homepage-full-page-${bp.label}.png`,
      {
        fullPage: true,
        maxDiffPixelRatio: DEFAULT_THRESHOLD,
        animations: 'disabled',
      }
    );
  });
}

// ─── Above-the-Fold Snapshots ─────────────────────────────────────────────────

const ATF_BREAKPOINTS = [
  { width: 1280, height: 800,  label: 'desktop-1280x800'  },
  { width: 768,  height: 1024, label: 'tablet-768x1024'   },
  { width: 375,  height: 812,  label: 'mobile-375x812'    },
];

for (const bp of ATF_BREAKPOINTS) {
  test(`@visual-regression @p0 @above-fold Above-fold viewport snapshot matches baseline at ${bp.label}`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
    await cornerstonePage.page.waitForTimeout(800);

    await expect(cornerstonePage.page).toHaveScreenshot(
      `homepage-atf-${bp.label}.png`,
      {
        fullPage: false,
        maxDiffPixelRatio: DEFAULT_THRESHOLD,
        animations: 'disabled',
      }
    );
  });
}

// ─── Section Snapshots — Navigation Bar ──────────────────────────────────────

test('@visual-regression @p1 @section Nav bar snapshot matches baseline on desktop', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.page.waitForTimeout(500);

  await expect(cornerstonePage.header).toHaveScreenshot(
    'nav-bar-desktop-1280.png',
    { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
  );
});

test('@visual-regression @p1 @section Nav bar snapshot matches baseline on mobile', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(375, 812);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.page.waitForTimeout(500);

  await expect(cornerstonePage.header).toHaveScreenshot(
    'nav-bar-mobile-375.png',
    { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
  );
});

// ─── Section Snapshots — Hero ────────────────────────────────────────────────

const HERO_BREAKPOINTS = [
  { width: 1280, height: 800,  label: 'desktop-1280' },
  { width: 768,  height: 1024, label: 'tablet-768'   },
  { width: 375,  height: 812,  label: 'mobile-375'   },
];

for (const bp of HERO_BREAKPOINTS) {
  test(`@visual-regression @p1 @section Hero section snapshot matches baseline at ${bp.label}`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
    await cornerstonePage.page.waitForTimeout(800);

    // Capture viewport (above fold = hero)
    await expect(cornerstonePage.page).toHaveScreenshot(
      `hero-section-${bp.label}.png`,
      {
        fullPage: false,
        maxDiffPixelRatio: DEFAULT_THRESHOLD,
        animations: 'disabled',
        clip: { x: 0, y: 69, width: bp.width, height: bp.height - 69 }, // exclude sticky header
      }
    );
  });
}

// ─── Section Snapshots — Workforce AI ────────────────────────────────────────

test('@visual-regression @p1 @section Workforce AI section snapshot matches baseline', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.scrollToSection(cornerstonePage.workforceAIHeading);
  await cornerstonePage.page.waitForTimeout(500);

  await expect(cornerstonePage.workforceAIHeading).toHaveScreenshot(
    'workforce-ai-heading-desktop-1280.png',
    { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
  );
});

// ─── Section Snapshots — Agents ───────────────────────────────────────────────

test('@visual-regression @p1 @section Agents section snapshot matches baseline', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.scrollToSection(cornerstonePage.agentsFutureOfWork);
  await cornerstonePage.page.waitForTimeout(500);

  await expect(cornerstonePage.agentsFutureOfWork).toHaveScreenshot(
    'agents-future-of-work-desktop-1280.png',
    { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
  );
});

// ─── Section Snapshots — Statistics ──────────────────────────────────────────

test('@visual-regression @p1 @section Stats section snapshot matches baseline', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.scrollToSection(cornerstonePage.statThreeSec);
  await cornerstonePage.page.waitForTimeout(500);

  await expect(cornerstonePage.statThreeSec).toHaveScreenshot(
    'stats-3sec-desktop-1280.png',
    { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
  );
});

// ─── Section Snapshots — Footer ──────────────────────────────────────────────

test('@visual-regression @p1 @section Footer snapshot matches baseline on desktop', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.scrollToBottom();
  await cornerstonePage.page.waitForTimeout(500);

  await expect(cornerstonePage.footer).toHaveScreenshot(
    'footer-desktop-1280.png',
    { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
  );
});

test('@visual-regression @p1 @section Footer snapshot matches baseline on mobile', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(375, 812);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.scrollToBottom();
  await cornerstonePage.page.waitForTimeout(500);

  await expect(cornerstonePage.footer).toHaveScreenshot(
    'footer-mobile-375.png',
    { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
  );
});

// ─── Nav Dropdown Open-State Snapshots ───────────────────────────────────────

test('@visual-regression @p1 @nav-state Products dropdown open-state snapshot matches baseline', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.openProductsMenu();
  await expect(cornerstonePage.productsDropdown).toBeVisible();
  await cornerstonePage.page.waitForTimeout(400);

  await expect(cornerstonePage.productsDropdown).toHaveScreenshot(
    'nav-products-open-desktop-1280.png',
    { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
  );
});

test('@visual-regression @p1 @nav-state Industries dropdown open-state snapshot matches baseline', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.openIndustriesMenu();
  await expect(cornerstonePage.industriesDropdown).toBeVisible();
  await cornerstonePage.page.waitForTimeout(400);

  await expect(cornerstonePage.industriesDropdown).toHaveScreenshot(
    'nav-industries-open-desktop-1280.png',
    { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
  );
});

// ─── Mobile Menu Open-State Snapshot ─────────────────────────────────────────

test('@visual-regression @p1 @nav-state Mobile menu open-state snapshot matches baseline', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(375, 812);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.openMobileMenu();
  await expect(cornerstonePage.mobileMenu).toBeVisible();
  await cornerstonePage.page.waitForTimeout(400);

  await expect(cornerstonePage.mobileMenu).toHaveScreenshot(
    'nav-mobile-open-375.png',
    { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
  );
});

// ─── Cookie Banner Snapshot ───────────────────────────────────────────────────

test('@visual-regression @p1 @cookie-banner Cookie banner snapshot matches baseline on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://www.cornerstoneondemand.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  const acceptBtn = page.locator('button:has-text("Accept All")');
  const bannerVisible = await acceptBtn.isVisible().catch(() => false);

  if (bannerVisible) {
    // Find the banner container
    const banner = page.locator('[class*="privacy"], [id*="ketch"]').first();
    await expect(banner).toHaveScreenshot(
      'cookie-banner-desktop-1280.png',
      { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
    );
  } else {
    test.skip(true, 'Cookie banner not visible — cookies already accepted in this session');
  }
});

// ─── Announcement Banner Snapshot ────────────────────────────────────────────

test('@visual-regression @p2 @section Announcement banner snapshot matches baseline', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.page.waitForTimeout(500);

  await expect(cornerstonePage.announcementBanner).toHaveScreenshot(
    'announcement-banner-desktop-1280.png',
    { maxDiffPixelRatio: DEFAULT_THRESHOLD, animations: 'disabled' }
  );
});

// ─── Layout Drift Detection — Header (tight threshold 1%) ────────────────────

const HEADER_DRIFT_BREAKPOINTS = [
  { width: 1280, height: 800,  label: 'desktop-1280x800'  },
  { width: 768,  height: 1024, label: 'tablet-768x1024'   },
  { width: 375,  height: 812,  label: 'mobile-375x812'    },
];

for (const bp of HEADER_DRIFT_BREAKPOINTS) {
  test(`@visual-regression @p0 @layout-diff No pixel drift in header at ${bp.label}`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
    await cornerstonePage.page.waitForTimeout(500);

    await expect(cornerstonePage.header).toHaveScreenshot(
      `header-${bp.label}.png`,
      {
        maxDiffPixelRatio: TIGHT_THRESHOLD,
        animations: 'disabled',
      }
    );
  });
}

// ─── Layout Drift Detection — Hero (tight threshold 1%) ──────────────────────

for (const bp of HEADER_DRIFT_BREAKPOINTS) {
  test(`@visual-regression @p0 @layout-diff No pixel drift in hero at ${bp.label}`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
    await cornerstonePage.page.waitForTimeout(800);

    await expect(cornerstonePage.page).toHaveScreenshot(
      `hero-${bp.label}.png`,
      {
        fullPage: false,
        maxDiffPixelRatio: TIGHT_THRESHOLD,
        animations: 'disabled',
        clip: { x: 0, y: 0, width: bp.width, height: Math.min(bp.height, 700) },
      }
    );
  });
}
