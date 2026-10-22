/**
 * Cornerstone Homepage UI — E2E Tests
 *
 * Feature: src/test-case-management/features/e2e/cornerstone-ui-e2e.feature
 * URL:     https://www.cornerstoneondemand.com/
 * Tags:    @e2e @ui @cornerstone
 *
 * Covers:
 *  - Journey 1: Full page scroll on desktop / mobile / tablet
 *  - Journey 2: All nav dropdowns open/close flow on desktop
 *  - Journey 3: Navigate to product page via nav dropdown
 *  - Journey 4: Full mobile nav open → browse → close
 *  - Journey 5: Hero CTA click → demo page navigation (desktop + mobile)
 *  - Journey 6: Nav Book a Demo CTA click
 *  - Journey 7: Footer navigation links
 *  - Journey 8: Cross-device consistency at 9 breakpoints
 *  - Journey 9: Announcement banner Apply Now link
 *  - Journey 10: Scroll to bottom then back to top
 *  - Journey 11: Page reload retains layout
 */

import { test, expect } from '../../fixtures/base.fixture';

test.setTimeout(120000);

// ─── Journey 1: Full Page Scroll ─────────────────────────────────────────────

test.describe('Journey 1 — Full page scroll', () => {
  test('@e2e @p0 @desktop @scroll-journey Full scroll on desktop reveals all key sections', async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(1280, 800);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    // Hero visible at top
    await expect(cornerstonePage.heroH1).toBeVisible();

    // Scroll to Workforce AI
    await cornerstonePage.scrollToSection(cornerstonePage.workforceAIHeading);
    await expect(cornerstonePage.workforceAIHeading).toBeVisible();

    // Scroll to agents
    await cornerstonePage.scrollToSection(cornerstonePage.agentsFutureOfWork);
    await expect(cornerstonePage.agentsFutureOfWork).toBeVisible();

    // Scroll to stats
    await cornerstonePage.scrollToSection(cornerstonePage.statThreeSec);
    await expect(cornerstonePage.statThreeSec).toBeVisible();

    // Scroll to customer stories
    await cornerstonePage.scrollToSection(cornerstonePage.seeAllCustomerStoriesLink);
    await expect(cornerstonePage.seeAllCustomerStoriesLink).toBeVisible();

    // Scroll to footer
    await cornerstonePage.scrollToBottom();
    await expect(cornerstonePage.footer).toBeVisible();

    await cornerstonePage.assertNoHorizontalScroll();
  });

  test('@e2e @p0 @mobile @scroll-journey Full scroll on mobile reveals hero and footer without overflow', async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(375, 812);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    await expect(cornerstonePage.heroH1).toBeVisible();
    await cornerstonePage.scrollThroughPage();
    await cornerstonePage.assertNoHorizontalScroll();
    await expect(cornerstonePage.footer).toBeVisible();
  });

  test('@e2e @p0 @tablet @scroll-journey Full scroll on tablet reveals hero and footer without overflow', async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(768, 1024);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    await expect(cornerstonePage.heroH1).toBeVisible();
    await cornerstonePage.scrollThroughPage();
    await cornerstonePage.assertNoHorizontalScroll();
    await expect(cornerstonePage.footer).toBeVisible();
  });
});

// ─── Journey 2: All Nav Dropdowns Open / Close ───────────────────────────────

test('@e2e @p0 @desktop @nav-journey User explores all top-level nav menus in sequence', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  // Products
  await cornerstonePage.openProductsMenu();
  await expect(cornerstonePage.productsDropdown).toBeVisible();
  await cornerstonePage.closeDropdown();
  await expect(cornerstonePage.productsDropdown).toBeHidden();

  // Industries
  await cornerstonePage.openIndustriesMenu();
  await expect(cornerstonePage.industriesDropdown).toBeVisible();
  await cornerstonePage.closeDropdown();
  await expect(cornerstonePage.industriesDropdown).toBeHidden();

  // Resources
  await cornerstonePage.openResourcesMenu();
  await expect(cornerstonePage.resourcesDropdown).toBeVisible();
  await cornerstonePage.closeDropdown();
  await expect(cornerstonePage.resourcesDropdown).toBeHidden();

  // Company
  await cornerstonePage.openCompanyMenu();
  await expect(cornerstonePage.companyDropdown).toBeVisible();
  await cornerstonePage.closeDropdown();
  await expect(cornerstonePage.companyDropdown).toBeHidden();

  // Homepage should still be displayed
  expect(cornerstonePage.page.url()).toContain('cornerstoneondemand.com');
});

// ─── Journey 3: Navigate to Product Page via Dropdown ────────────────────────

test('@e2e @p0 @desktop @nav-journey Navigate to a product page from nav dropdown', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await cornerstonePage.openProductsMenu();
  await expect(cornerstonePage.productsDropdown).toBeVisible();

  const viewAllProducts = cornerstonePage.page.locator('a[href="/products/"]').first();
  await expect(viewAllProducts).toBeVisible();
  await viewAllProducts.click();

  await cornerstonePage.page.waitForLoadState('domcontentloaded');
  expect(cornerstonePage.page.url()).not.toBe('https://www.cornerstoneondemand.com/');
  expect(cornerstonePage.page.url()).toContain('cornerstoneondemand.com');
});

// ─── Journey 4: Full Mobile Nav Open → Browse → Close ────────────────────────

test('@e2e @p0 @mobile @nav-journey Full mobile nav open-browse-close journey', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(375, 812);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  // Open hamburger
  await cornerstonePage.openMobileMenu();
  await expect(cornerstonePage.mobileMenu).toBeVisible();

  // Verify all sections present
  const menuText = await cornerstonePage.mobileMenu.textContent();
  expect(menuText).toContain('Products');
  expect(menuText).toContain('Industries');
  expect(menuText).toContain('Resources');

  // Close hamburger
  await cornerstonePage.closeMobileMenu();
  await expect(cornerstonePage.mobileMenu).toBeHidden();

  // Homepage content still visible
  await expect(cornerstonePage.heroH1).toBeVisible();
});

test('@e2e @p0 @mobile @nav-journey Mobile nav Products sub-items expand on tap', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(375, 812);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await cornerstonePage.openMobileMenu();
  await expect(cornerstonePage.mobileMenu).toBeVisible();

  // Click Products in mobile menu
  const mobileProductsBtn = cornerstonePage.mobileMenu.locator('button:has-text("Products")').first();
  await mobileProductsBtn.click();
  await cornerstonePage.page.waitForTimeout(500);

  // Sub-items should now be visible
  const productsContainer = cornerstonePage.page.locator('#menu-container-Products');
  await expect(productsContainer).toBeVisible();
  const containerText = await productsContainer.textContent();
  expect(containerText).toContain('Learning Solutions');
});

// ─── Journey 5: Hero CTA → Demo Page Navigation ──────────────────────────────

test('@e2e @p0 @desktop @cta-journey Hero Book Demo CTA navigates to demo page on desktop', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await expect(cornerstonePage.heroBookDemoCta).toBeVisible();
  await cornerstonePage.heroBookDemoCta.click();
  await cornerstonePage.page.waitForLoadState('domcontentloaded');

  const url = cornerstonePage.page.url();
  expect(url).toMatch(/demo|contact|book/i);
});

test('@e2e @p0 @mobile @cta-journey Hero Book Demo CTA navigates to demo page on mobile', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(375, 812);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await expect(cornerstonePage.heroBookDemoCta).toBeVisible();
  await cornerstonePage.heroBookDemoCta.click();
  await cornerstonePage.page.waitForLoadState('domcontentloaded');

  const url = cornerstonePage.page.url();
  expect(url).toMatch(/demo|contact|book/i);
});

// ─── Journey 6: Nav Book a Demo CTA ──────────────────────────────────────────

test('@e2e @p0 @desktop @cta-journey Nav Book a Demo CTA navigates to demo page', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await expect(cornerstonePage.navBookDemo).toBeVisible();
  await cornerstonePage.navBookDemo.click();
  await cornerstonePage.page.waitForLoadState('domcontentloaded');

  const url = cornerstonePage.page.url();
  expect(url).toMatch(/demo|contact|book/i);
});

// ─── Journey 7: Footer Navigation ────────────────────────────────────────────

test('@e2e @p1 @desktop @footer-journey Footer sections are all present', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.scrollToBottom();

  const footerText = await cornerstonePage.footer.textContent();
  expect(footerText).toContain('PLATFORM');
  expect(footerText).toContain('SOLUTIONS');
  expect(footerText).toContain('COMPANY');
  expect(footerText).toContain('RESOURCES');
});

test('@e2e @p1 @desktop @footer-journey Privacy Policy link in footer navigates correctly', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();
  await cornerstonePage.scrollToBottom();

  await expect(cornerstonePage.footerPrivacyPolicy).toBeVisible();
  await cornerstonePage.footerPrivacyPolicy.click();
  await cornerstonePage.page.waitForLoadState('domcontentloaded');

  const url = cornerstonePage.page.url();
  expect(url).toContain('privacy');
});

// ─── Journey 8: Cross-Device Consistency at 9 Breakpoints ────────────────────

const CROSS_DEVICE_BREAKPOINTS = [
  { width: 1920, height: 1080, label: 'full-hd'      },
  { width: 1440, height: 900,  label: 'wide-desktop'  },
  { width: 1280, height: 800,  label: 'desktop'       },
  { width: 1024, height: 768,  label: 'laptop'        },
  { width: 768,  height: 1024, label: 'tablet'        },
  { width: 425,  height: 900,  label: 'mobile-l'      },
  { width: 375,  height: 812,  label: 'iphone'        },
  { width: 360,  height: 800,  label: 'android'       },
  { width: 320,  height: 568,  label: 'mobile-xs'     },
];

for (const bp of CROSS_DEVICE_BREAKPOINTS) {
  test(`@e2e @p1 @responsive Core journey is consistent at ${bp.label} (${bp.width}px)`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    await expect(cornerstonePage.heroH1).toBeVisible();
    await cornerstonePage.assertNoHorizontalScroll();

    await cornerstonePage.scrollThroughPage();
    await cornerstonePage.assertNoHorizontalScroll();

    await expect(cornerstonePage.footer).toBeVisible();
  });
}

// ─── Journey 9: Announcement Banner ──────────────────────────────────────────

test('@e2e @p2 @desktop @banner-journey Announcement banner Apply Now link navigates', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await expect(cornerstonePage.applyNowLink).toBeVisible();
  const href = await cornerstonePage.applyNowLink.getAttribute('href');
  expect(href).toContain('catalyst');
});

// ─── Journey 10: Scroll to Bottom then Back to Top ───────────────────────────

test('@e2e @p2 @desktop @scroll-journey Scroll to bottom then back to top restores hero visibility', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await cornerstonePage.scrollToBottom();
  await expect(cornerstonePage.footer).toBeVisible();

  await cornerstonePage.scrollToTop();
  await expect(cornerstonePage.heroH1).toBeVisible();
  await expect(cornerstonePage.header).toBeVisible();
});

// ─── Journey 11: Page Reload Retains Layout ──────────────────────────────────

test('@e2e @p2 @desktop @refresh-journey Page reload retains correct layout', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await cornerstonePage.page.reload({ waitUntil: 'domcontentloaded' });
  await cornerstonePage.acceptCookieBanner();

  await expect(cornerstonePage.heroH1).toBeVisible();
  await expect(cornerstonePage.header).toBeVisible();
  await cornerstonePage.assertNoHorizontalScroll();
});
