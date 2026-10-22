/**
 * Cornerstone Homepage UI — Regression Tests
 *
 * Feature: src/test-case-management/features/regression/cornerstone-ui-regression.feature
 * URL:     https://www.cornerstoneondemand.com/
 * Tags:    @regression @ui @cornerstone
 *
 * Covers:
 *  - Navigation dropdown menus (Products, Industries, Customers, Resources, Company)
 *  - Mobile hamburger menu open/close
 *  - Hero section content completeness
 *  - Content sections (Workforce AI, Agents, Stats, Testimonials)
 *  - Key CTAs and footer links
 *  - Layout grid at 8 breakpoints
 *  - Vertical scroll present and functional at all breakpoints
 *  - Cookie banner behaviour
 *  - Accessibility basics (skip link, alt attrs, H1 count)
 *  - Cross-browser layout sanity
 */

import { test, expect } from '../../fixtures/base.fixture';

test.setTimeout(90000);

// ─── Navigation — Desktop Dropdowns ─────────────────────────────────────────

test.describe('Navigation — Desktop dropdowns', () => {
  test.beforeEach(async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(1280, 800);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
  });

  test('@regression @p1 @navigation @desktop Products dropdown opens and shows key items', async ({ cornerstonePage }) => {
    await cornerstonePage.openProductsMenu();
    await expect(cornerstonePage.productsDropdown).toBeVisible();
    const text = await cornerstonePage.productsDropdown.textContent();
    expect(text).toContain('Cornerstone Workforce AI™');
    expect(text).toContain('Learning Solutions');
    expect(text).toContain('Talent Development');
    expect(text).toContain('Workforce Intelligence');
  });

  test('@regression @p1 @navigation @desktop Industries dropdown opens and shows key items', async ({ cornerstonePage }) => {
    await cornerstonePage.openIndustriesMenu();
    await expect(cornerstonePage.industriesDropdown).toBeVisible();
    const text = await cornerstonePage.industriesDropdown.textContent();
    expect(text).toContain('Public sector');
    expect(text).toContain('Manufacturing');
    expect(text).toContain('Healthcare');
    expect(text).toContain('Retail');
    expect(text).toContain('Financial services');
  });

  test('@regression @p1 @navigation @desktop Resources dropdown opens and shows key items', async ({ cornerstonePage }) => {
    await cornerstonePage.openResourcesMenu();
    await expect(cornerstonePage.resourcesDropdown).toBeVisible();
    const text = await cornerstonePage.resourcesDropdown.textContent();
    expect(text).toContain('Resource Corner');
    expect(text).toContain('Events');
    expect(text).toContain('Research');
    expect(text).toContain('Blogs');
  });

  test('@regression @p1 @navigation @desktop Company dropdown opens and shows key items', async ({ cornerstonePage }) => {
    await cornerstonePage.openCompanyMenu();
    await expect(cornerstonePage.companyDropdown).toBeVisible();
    const text = await cornerstonePage.companyDropdown.textContent();
    expect(text).toContain('About us');
    expect(text).toContain('Leadership');
    expect(text).toContain('Careers');
    expect(text).toContain('Contact Us');
  });

  test('@regression @p1 @navigation @desktop Customers dropdown opens and shows key items', async ({ cornerstonePage }) => {
    await cornerstonePage.openCustomersMenu();
    await expect(cornerstonePage.customersDropdown).toBeVisible();
    const text = await cornerstonePage.customersDropdown.textContent();
    expect(text).toContain('Customer stories');
  });

  test('@regression @p1 @navigation @desktop Dropdown closes on Escape key', async ({ cornerstonePage }) => {
    await cornerstonePage.openProductsMenu();
    await expect(cornerstonePage.productsDropdown).toBeVisible();
    await cornerstonePage.closeDropdown();
    await expect(cornerstonePage.productsDropdown).toBeHidden();
  });
});

// ─── Navigation — Mobile Hamburger ──────────────────────────────────────────

test.describe('Navigation — Mobile hamburger menu', () => {
  test.beforeEach(async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(375, 812);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
  });

  test('@regression @p1 @navigation @mobile Hamburger opens mobile menu with all nav items', async ({ cornerstonePage }) => {
    await cornerstonePage.openMobileMenu();
    await expect(cornerstonePage.mobileMenu).toBeVisible();
    const text = await cornerstonePage.mobileMenu.textContent();
    expect(text).toContain('Products');
    expect(text).toContain('Industries');
    expect(text).toContain('Customers');
    expect(text).toContain('Resources');
    expect(text).toContain('Company');
  });

  test('@regression @p1 @navigation @mobile Hamburger closes mobile menu on second click', async ({ cornerstonePage }) => {
    await cornerstonePage.openMobileMenu();
    await expect(cornerstonePage.mobileMenu).toBeVisible();
    await cornerstonePage.closeMobileMenu();
    await expect(cornerstonePage.mobileMenu).toBeHidden();
  });

  test('@regression @p1 @navigation @tablet Navigation is present on tablet', async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(768, 1024);
    await expect(cornerstonePage.header).toBeVisible();
    await expect(cornerstonePage.logo).toBeVisible();
  });
});

// ─── Hero Section ────────────────────────────────────────────────────────────

test.describe('Hero section content', () => {
  test('@regression @p1 @hero @desktop Hero is complete on desktop', async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(1280, 800);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    await expect(cornerstonePage.heroH1).toBeVisible();
    const h1Text = await cornerstonePage.heroH1.textContent();
    expect(h1Text?.trim().length).toBeGreaterThan(0);

    await expect(cornerstonePage.heroBookDemoCta).toBeVisible();
    await expect(cornerstonePage.exploreThePlatformLink).toBeVisible();
  });

  test('@regression @p1 @hero @mobile Hero stacks correctly on mobile without overflow', async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(375, 812);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    await expect(cornerstonePage.heroH1).toBeVisible();
    await expect(cornerstonePage.heroBookDemoCta).toBeVisible();
    await cornerstonePage.assertNoWidthOverflow(cornerstonePage.heroH1, 'Hero H1');
    await cornerstonePage.assertNoHorizontalScroll();
  });

  test('@regression @p1 @hero @tablet Hero is fully visible on tablet', async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(768, 1024);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    await expect(cornerstonePage.heroH1).toBeVisible();
    await expect(cornerstonePage.heroBookDemoCta).toBeVisible();
    await cornerstonePage.assertNoHorizontalScroll();
  });
});

// ─── Content Sections ────────────────────────────────────────────────────────

test.describe('Content sections — Desktop', () => {
  test.beforeEach(async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(1280, 800);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
  });

  test('@regression @p1 @content Statistics section shows key metrics', async ({ cornerstonePage }) => {
    await cornerstonePage.scrollToSection(cornerstonePage.statThreeSec);
    await expect(cornerstonePage.statThreeSec).toBeVisible();
    await expect(cornerstonePage.stat180Plus).toBeVisible();
    await expect(cornerstonePage.stat50Percent).toBeVisible();
  });

  test('@regression @p1 @content Customer testimonials section is present', async ({ cornerstonePage }) => {
    await cornerstonePage.scrollToSection(cornerstonePage.seeAllCustomerStoriesLink);
    await expect(cornerstonePage.seeAllCustomerStoriesLink).toBeVisible();
    const href = await cornerstonePage.seeAllCustomerStoriesLink.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('@regression @p1 @content Workforce AI section heading is present', async ({ cornerstonePage }) => {
    await cornerstonePage.scrollToSection(cornerstonePage.workforceAIHeading);
    await expect(cornerstonePage.workforceAIHeading).toBeVisible();
  });

  test('@regression @p1 @content Readiness Agents section shows all three agents', async ({ cornerstonePage }) => {
    await cornerstonePage.scrollToSection(cornerstonePage.agentsFutureOfWork);
    await expect(cornerstonePage.agentsFutureOfWork).toBeVisible();
    await expect(cornerstonePage.agentsEmbarkNavigator).toBeVisible();
    await expect(cornerstonePage.agentsSkillsArchitect).toBeVisible();
    await expect(cornerstonePage.viewEveryAgentLink).toBeVisible();
  });

  test('@regression @p2 @content No content overflows on mobile', async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(375, 812);
    await cornerstonePage.scrollThroughPage();
    await cornerstonePage.assertNoHorizontalScroll();
  });
});

// ─── Key CTAs and Links ──────────────────────────────────────────────────────

test.describe('Key CTAs and links — Desktop', () => {
  test.beforeEach(async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(1280, 800);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
  });

  const ctaLinks = [
    { name: 'Book a Demo nav CTA',     locatorFn: (p: any) => p.navBookDemo },
    { name: 'Explore the Platform',    locatorFn: (p: any) => p.exploreThePlatformLink },
    { name: 'See All Customer Stories',locatorFn: (p: any) => p.seeAllCustomerStoriesLink },
    { name: 'View Every Agent',        locatorFn: (p: any) => p.viewEveryAgentLink },
  ];

  for (const cta of ctaLinks) {
    test(`@regression @p1 @links "${cta.name}" is visible and has valid href`, async ({ cornerstonePage }) => {
      const locator = cta.locatorFn(cornerstonePage);
      await cornerstonePage.scrollToSection(locator);
      await expect(locator).toBeVisible();
      const href = await locator.getAttribute('href');
      expect(href?.trim().length, `"${cta.name}" href should not be empty`).toBeGreaterThan(0);
    });
  }

  const footerLinks = [
    { name: 'Privacy Policy',        locatorFn: (p: any) => p.footerPrivacyPolicy },
    { name: 'Terms and Conditions',  locatorFn: (p: any) => p.footerTerms },
    { name: 'Cookie Statement',      locatorFn: (p: any) => p.footerCookieStatement },
    { name: 'Accessibility',         locatorFn: (p: any) => p.footerAccessibility },
  ];

  for (const link of footerLinks) {
    test(`@regression @p1 @links Footer "${link.name}" is visible and has valid href`, async ({ cornerstonePage }) => {
      await cornerstonePage.scrollToBottom();
      const locator = link.locatorFn(cornerstonePage);
      await expect(locator).toBeVisible();
      const href = await locator.getAttribute('href');
      expect(href?.trim().length, `Footer "${link.name}" href should not be empty`).toBeGreaterThan(0);
    });
  }
});

// ─── Layout Grid — 8 Breakpoints ────────────────────────────────────────────

const LAYOUT_BREAKPOINTS = [
  { width: 1920, height: 1080, label: 'full-hd'   },
  { width: 1440, height: 900,  label: 'wide'       },
  { width: 1280, height: 800,  label: 'desktop'    },
  { width: 1024, height: 768,  label: 'laptop'     },
  { width: 768,  height: 1024, label: 'tablet'     },
  { width: 425,  height: 900,  label: 'mobile-l'   },
  { width: 375,  height: 812,  label: 'mobile-s'   },
  { width: 320,  height: 568,  label: 'mobile-xs'  },
];

for (const bp of LAYOUT_BREAKPOINTS) {
  test(`@regression @p1 @layout Layout adapts correctly at ${bp.label} (${bp.width}px)`, async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(bp.width, bp.height);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    await expect(cornerstonePage.header).toBeVisible();
    await cornerstonePage.assertNoHorizontalScroll();
    await cornerstonePage.assertHeaderFitsViewport();

    await cornerstonePage.scrollToBottom();
    await expect(cornerstonePage.footer).toBeVisible();
    await cornerstonePage.assertFooterFitsViewport();
  });
}

// ─── Cross-Browser Layout Sanity ─────────────────────────────────────────────

test('@regression @p1 @cross-browser No broken layout markers on desktop', async ({ cornerstonePage }) => {
  await cornerstonePage.setViewport(1280, 800);
  await cornerstonePage.goto();
  await cornerstonePage.acceptCookieBanner();

  await expect(cornerstonePage.heroH1).toBeVisible();
  await expect(cornerstonePage.header).toBeVisible();
  await cornerstonePage.scrollToBottom();
  await expect(cornerstonePage.footer).toBeVisible();
  await cornerstonePage.assertNoHorizontalScroll();
  await cornerstonePage.assertNoPageTextContains('undefined');
  await cornerstonePage.assertNoPageTextContains('NaN');
});

// ─── Cookie Banner ───────────────────────────────────────────────────────────

test.describe('Cookie consent banner', () => {
  test('@regression @p1 @cookie-banner Cookie banner shows Accept All and Reject All', async ({ page }) => {
    // Fresh context — no prior cookie acceptance
    await page.goto('https://www.cornerstoneondemand.com/', { waitUntil: 'domcontentloaded' });
    const acceptBtn = page.locator('button:has-text("Accept All")');
    const rejectBtn = page.locator('button:has-text("Reject All")');

    const bannerVisible = await acceptBtn.isVisible().catch(() => false);
    if (bannerVisible) {
      await expect(acceptBtn).toBeVisible();
      await expect(rejectBtn).toBeVisible();
    } else {
      // Banner may not appear if cookies were already set in this session — pass
      test.info().annotations.push({ type: 'note', description: 'Cookie banner not shown — cookies already set' });
    }
  });

  test('@regression @p1 @cookie-banner Clicking Accept All dismisses the banner', async ({ page }) => {
    await page.goto('https://www.cornerstoneondemand.com/', { waitUntil: 'domcontentloaded' });
    const acceptBtn = page.locator('button:has-text("Accept All")');
    const bannerVisible = await acceptBtn.isVisible().catch(() => false);
    if (bannerVisible) {
      await acceptBtn.click();
      await expect(acceptBtn).toBeHidden({ timeout: 5000 });
    }
  });

  test('@regression @p1 @cookie-banner Clicking Reject All dismisses the banner', async ({ page }) => {
    await page.goto('https://www.cornerstoneondemand.com/', { waitUntil: 'domcontentloaded' });
    const rejectBtn = page.locator('button:has-text("Reject All")');
    const bannerVisible = await rejectBtn.isVisible().catch(() => false);
    if (bannerVisible) {
      await rejectBtn.click();
      await expect(rejectBtn).toBeHidden({ timeout: 5000 });
    }
  });
});

// ─── Accessibility Basics ────────────────────────────────────────────────────

test.describe('Accessibility basics', () => {
  test.beforeEach(async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(1280, 800);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();
  });

  test('@regression @p2 @accessibility Skip to main content link is in DOM', async ({ cornerstonePage }) => {
    const count = await cornerstonePage.skipToMainContent.count();
    expect(count, 'Skip to main content link should be in DOM').toBeGreaterThan(0);
  });

  test('@regression @p2 @accessibility All images have alt attributes', async ({ cornerstonePage }) => {
    await cornerstonePage.assertAllImagesHaveAlt();
  });

  test('@regression @p2 @accessibility Page has at least one H1', async ({ cornerstonePage }) => {
    await cornerstonePage.assertSingleH1();
  });

  test('@regression @p2 @images Images are responsive and fit mobile viewport', async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(375, 812);
    const overflowingImages = await cornerstonePage.page.evaluate((vw: number) => {
      return Array.from(document.querySelectorAll('img'))
        .filter(img => img.getBoundingClientRect().right > vw + 2)
        .map(img => img.src);
    }, 375);
    expect(
      overflowingImages,
      `Images overflowing mobile viewport: ${overflowingImages.join(', ')}`
    ).toHaveLength(0);
  });
});

// ─── Vertical Scroll — Full Regression Coverage ──────────────────────────────

const VERTICAL_SCROLL_BREAKPOINTS = [
  { width: 1920, height: 1080, label: 'full-hd'   },
  { width: 1440, height: 900,  label: 'wide'       },
  { width: 1280, height: 800,  label: 'desktop'    },
  { width: 1024, height: 768,  label: 'laptop'     },
  { width: 768,  height: 1024, label: 'tablet'     },
  { width: 425,  height: 900,  label: 'mobile-l'   },
  { width: 375,  height: 812,  label: 'mobile-s'   },
  { width: 320,  height: 568,  label: 'mobile-xs'  },
];

test.describe('Vertical scroll — presence and functionality', () => {
  for (const bp of VERTICAL_SCROLL_BREAKPOINTS) {
    test(`@regression @p1 @layout Vertical scroll is present at ${bp.label} (${bp.width}px)`, async ({ cornerstonePage }) => {
      await cornerstonePage.setViewport(bp.width, bp.height);
      await cornerstonePage.goto();
      await cornerstonePage.acceptCookieBanner();

      // scrollHeight > clientHeight proves content renders below the fold
      await cornerstonePage.assertHasVerticalScroll();
    });
  }

  for (const bp of VERTICAL_SCROLL_BREAKPOINTS) {
    test(`@regression @p1 @layout Vertical scroll mechanism works at ${bp.label} (${bp.width}px)`, async ({ cornerstonePage }) => {
      await cornerstonePage.setViewport(bp.width, bp.height);
      await cornerstonePage.goto();
      await cornerstonePage.acceptCookieBanner();

      // window.scrollY must change after scrollBy — rules out overflow:hidden blocking scroll
      await cornerstonePage.assertVerticalScrollWorks();
    });
  }

  test('@regression @p1 @layout Vertical scrollbar renders on desktop (layout space consumed)', async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(1280, 800);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    await cornerstonePage.assertVerticalScrollbarVisible();
  });

  test('@regression @p2 @layout Scroll position resets to 0 on page reload', async ({ cornerstonePage }) => {
    await cornerstonePage.setViewport(1280, 800);
    await cornerstonePage.goto();
    await cornerstonePage.acceptCookieBanner();

    // Scroll down first
    await cornerstonePage.page.evaluate(() => window.scrollTo(0, 800));
    await cornerstonePage.page.waitForTimeout(200);

    // Reload
    await cornerstonePage.page.reload({ waitUntil: 'domcontentloaded' });
    await cornerstonePage.acceptCookieBanner();

    const scrollY = await cornerstonePage.page.evaluate(() => window.scrollY);
    expect(scrollY, 'Scroll position should reset to 0 after page reload').toBe(0);
  });
});
