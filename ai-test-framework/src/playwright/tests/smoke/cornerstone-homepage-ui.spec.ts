/**
 * Cornerstone Homepage UI — Smoke Tests
 *
 * Feature: src/test-case-management/features/smoke/cornerstone-homepage-ui.feature
 * URL:     https://www.cornerstoneondemand.com/
 * Tags:    @smoke @ui @cornerstone
 *
 * Covers:
 *  - Desktop / Tablet / Mobile viewport rendering
 *  - Hero section visibility
 *  - Navigation (desktop vs hamburger)
 *  - Footer presence
 *  - CTA button visibility
 *  - No horizontal scroll at all breakpoints
 *  - Vertical scroll present and functional at all breakpoints
 *  - Logo always visible
 */

import { test, expect } from '../../fixtures/base.fixture';

test.setTimeout(60000);

// ─── Breakpoint matrix ──────────────────────────────────────────────────────
const DESKTOP_BREAKPOINTS = [
  { width: 1280, height: 800,  label: 'desktop-1280' },
  { width: 1440, height: 900,  label: 'desktop-1440' },
  { width: 1920, height: 1080, label: 'full-hd-1920' },
];

const MOBILE_BREAKPOINTS = [
  { width: 375, height: 812, label: 'iphone-375'  },
  { width: 390, height: 844, label: 'iphone14-390' },
  { width: 425, height: 900, label: 'mobile-l-425' },
  { width: 360, height: 800, label: 'android-360'  },
];

// ─── Desktop — Hero & Page Load ─────────────────────────────────────────────

for (const bp of DESKTOP_BREAKPOINTS) {
  test(`@smoke @p0 @desktop Homepage loads and hero is visible at ${bp.label}`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    await expect(cornerstonePage.heroH1).toBeVisible();
    await expect(cornerstonePage.heroBookDemoCta).toBeVisible();
    await cornerstonePage.assertNoHorizontalScroll();

    const title = await cornerstonePage.getTitle();
    expect(title).toContain('Cornerstone');
  });
}

// ─── Desktop — Navigation ───────────────────────────────────────────────────

test('@smoke @p0 @desktop @navigation Primary nav is visible and hamburger hidden on desktop', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await expect(cornerstonePage.header).toBeVisible();
  await expect(cornerstonePage.navProducts).toBeVisible();
  await expect(cornerstonePage.navIndustries).toBeVisible();
  await expect(cornerstonePage.navCustomers).toBeVisible();
  await expect(cornerstonePage.navResources).toBeVisible();
  await expect(cornerstonePage.navCompany).toBeVisible();
  await expect(cornerstonePage.navBookDemo).toBeVisible();

  // Hamburger should be hidden on desktop (CSS hidden via xl:hidden)
  const hamburgerVisible = await cornerstonePage.hamburgerButton.isVisible();
  expect(hamburgerVisible, 'Hamburger should not be visible on desktop').toBe(false);
});

// ─── Desktop — Footer ───────────────────────────────────────────────────────

test('@smoke @p0 @desktop @footer Footer is visible with copyright and key links', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.scrollToBottom();

  await expect(cornerstonePage.footer).toBeVisible();
  await expect(cornerstonePage.footerPrivacyPolicy).toBeVisible();
  await expect(cornerstonePage.footerTerms).toBeVisible();

  const footerText = await cornerstonePage.footer.textContent();
  expect(footerText).toContain('Cornerstone');
});

// ─── Tablet — Rendering ─────────────────────────────────────────────────────

test('@smoke @p0 @tablet Homepage renders correctly on tablet (768x1024)', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(768, 1024);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  const title = await cornerstonePage.getTitle();
  expect(title).toContain('Cornerstone');

  await expect(cornerstonePage.heroH1).toBeVisible();
  await expect(cornerstonePage.logo).toBeVisible();
  await cornerstonePage.assertNoHorizontalScroll();
});

// ─── Mobile — Rendering ─────────────────────────────────────────────────────

for (const bp of MOBILE_BREAKPOINTS) {
  test(`@smoke @p0 @mobile Homepage renders correctly on mobile at ${bp.label}`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    const title = await cornerstonePage.getTitle();
    expect(title).toContain('Cornerstone');

    await expect(cornerstonePage.heroH1).toBeVisible();
    await expect(cornerstonePage.logo).toBeVisible();
    await cornerstonePage.assertNoHorizontalScroll();
  });
}

// ─── Mobile — Hamburger Menu ─────────────────────────────────────────────────

test('@smoke @p0 @mobile @navigation Hamburger menu is visible and desktop nav hidden on mobile', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(375, 812);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await expect(cornerstonePage.hamburgerButton).toBeVisible();

  // Desktop nav links should not be visible at mobile width
  const desktopNavVisible = await cornerstonePage.navProducts.isVisible();
  expect(desktopNavVisible, 'Desktop nav should be hidden on mobile').toBe(false);
});

test('@smoke @p0 @mobile @cta CTA button is visible and fits within mobile viewport', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(375, 812);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await expect(cornerstonePage.heroBookDemoCta).toBeVisible();
  await cornerstonePage.assertNoWidthOverflow(cornerstonePage.heroBookDemoCta, 'Hero CTA button');
});

// ─── Cross-Breakpoint — No Horizontal Scroll ────────────────────────────────

const ALL_BREAKPOINTS = [
  { width: 1280, height: 800,  label: 'desktop'   },
  { width: 1024, height: 768,  label: 'laptop'    },
  { width: 768,  height: 1024, label: 'tablet'    },
  { width: 425,  height: 900,  label: 'mobile-l'  },
  { width: 375,  height: 812,  label: 'mobile-s'  },
];

for (const bp of ALL_BREAKPOINTS) {
  test(`@smoke @p0 @responsive No horizontal scroll at ${bp.label} (${bp.width}px)`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
    await cornerstonePage.assertNoHorizontalScroll();
  });
}

// ─── Cross-Breakpoint — Logo always visible ──────────────────────────────────

const LOGO_BREAKPOINTS = [
  { width: 1280, height: 800,  label: 'desktop' },
  { width: 768,  height: 1024, label: 'tablet'  },
  { width: 375,  height: 812,  label: 'mobile'  },
];

for (const bp of LOGO_BREAKPOINTS) {
  test(`@smoke @p0 @responsive Logo is visible at ${bp.label} (${bp.width}px)`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
    await expect(cornerstonePage.logo).toBeVisible();
  });
}

// ─── Vertical Scroll — Present & Functional ──────────────────────────────────

const VERTICAL_SCROLL_BREAKPOINTS = [
  { width: 1280, height: 800,  label: 'desktop'  },
  { width: 768,  height: 1024, label: 'tablet'   },
  { width: 375,  height: 812,  label: 'mobile-s' },
];

for (const bp of VERTICAL_SCROLL_BREAKPOINTS) {
  test(`@smoke @p0 @responsive Vertical scroll is present at ${bp.label} (${bp.width}px)`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    // Page content must extend beyond the viewport
    await cornerstonePage.assertHasVerticalScroll();
  });
}

for (const bp of VERTICAL_SCROLL_BREAKPOINTS) {
  test(`@smoke @p0 @responsive Vertical scroll mechanism works at ${bp.label} (${bp.width}px)`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    // Scrolling down must actually change scroll position (not blocked by overflow:hidden)
    await cornerstonePage.assertVerticalScrollWorks();
  });
}

test('@smoke @p0 @desktop Vertical scrollbar renders correctly on desktop', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await cornerstonePage.assertVerticalScrollbarVisible();
});
