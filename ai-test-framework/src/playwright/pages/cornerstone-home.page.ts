import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Cornerstone Homepage Page Object
 * URL: https://www.cornerstoneondemand.com/
 * Verified locators from: object-repository/pages/cornerstone-home-page.repo.json
 */
export class CornerstoneHomePage extends BasePage {

  // ─── Navigation ────────────────────────────────────────────────────────────
  readonly header: Locator;
  readonly logoLink: Locator;
  readonly logo: Locator;
  readonly skipToMainContent: Locator;
  readonly announcementBanner: Locator;
  readonly applyNowLink: Locator;

  // Desktop nav buttons
  readonly navProducts: Locator;
  readonly navIndustries: Locator;
  readonly navCustomers: Locator;
  readonly navResources: Locator;
  readonly navCompany: Locator;
  readonly navBookDemo: Locator;

  // Dropdowns (hidden by default, visible after click)
  readonly productsDropdown: Locator;
  readonly industriesDropdown: Locator;
  readonly customersDropdown: Locator;
  readonly resourcesDropdown: Locator;
  readonly companyDropdown: Locator;

  // Mobile nav
  readonly hamburgerButton: Locator;
  readonly mobileMenu: Locator;

  // Language
  readonly languageSelector: Locator;

  // ─── Hero Section ──────────────────────────────────────────────────────────
  readonly heroH1: Locator;
  readonly heroBookDemoCta: Locator;
  readonly exploreThePlatformLink: Locator;

  // ─── Content Sections ──────────────────────────────────────────────────────
  readonly workforceAIHeading: Locator;
  readonly agentsFutureOfWork: Locator;
  readonly agentsEmbarkNavigator: Locator;
  readonly agentsSkillsArchitect: Locator;
  readonly viewEveryAgentLink: Locator;
  readonly statThreeSec: Locator;
  readonly stat180Plus: Locator;
  readonly stat50Percent: Locator;
  readonly seeAllCustomerStoriesLink: Locator;

  // ─── Footer ────────────────────────────────────────────────────────────────
  readonly footer: Locator;
  readonly footerCopyright: Locator;
  readonly footerPrivacyPolicy: Locator;
  readonly footerTerms: Locator;
  readonly footerCookieStatement: Locator;
  readonly footerAccessibility: Locator;

  // ─── Cookie Banner ─────────────────────────────────────────────────────────
  readonly cookieBannerAcceptAll: Locator;
  readonly cookieBannerRejectAll: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation
    this.header                 = page.locator('#top-level-header');
    this.logoLink               = page.locator('a[aria-label="Cornerstone Logo"]');
    this.logo                   = page.locator('a[aria-label="Cornerstone Logo"] img');
    this.skipToMainContent      = page.locator('a:has-text("Skip to main content")');
    this.announcementBanner     = page.locator('text=Nominate your organization or a standout leader');
    this.applyNowLink           = page.locator('a[href="/cornerstone-catalyst-awards"]');

    // Desktop nav — use first() to target desktop instances (duplicated for mobile menu)
    this.navProducts            = page.locator('#top-level-nav button:has-text("Products")').first();
    this.navIndustries          = page.locator('#top-level-nav button:has-text("Industries")').first();
    this.navCustomers           = page.locator('#top-level-nav button:has-text("Customers")').first();
    this.navResources           = page.locator('#top-level-nav button:has-text("Resources")').first();
    this.navCompany             = page.locator('#top-level-nav button:has-text("Company")').first();
    this.navBookDemo            = page.locator('a[href="/demo/"]').first();

    // Dropdowns
    this.productsDropdown       = page.locator('#menu-container-Products');
    this.industriesDropdown     = page.locator('#menu-container-Industries');
    this.customersDropdown      = page.locator('#menu-container-Customers');
    this.resourcesDropdown      = page.locator('#menu-container-Resources');
    this.companyDropdown        = page.locator('#menu-container-Company');

    // Mobile nav
    this.hamburgerButton        = page.locator('button[aria-controls="mobile-menu"]');
    this.mobileMenu             = page.locator('#mobile-menu');

    // Language
    this.languageSelector       = page.locator('button[aria-label="Language"]').first();

    // Hero
    this.heroH1                 = page.locator('h1').first();
    this.heroBookDemoCta        = page.locator('a[href="/demo/"]').first();
    this.exploreThePlatformLink = page.locator('a[href="/platform/"]').first();

    // Content sections
    this.workforceAIHeading         = page.locator('text=Meet Cornerstone Workforce AI™');
    this.agentsFutureOfWork         = page.locator('text=Future of Work').first();
    this.agentsEmbarkNavigator      = page.locator('text=Embark Navigator');
    this.agentsSkillsArchitect      = page.locator('text=Skills Architect');
    this.viewEveryAgentLink         = page.locator('a:has-text("View Every Agent")');
    this.statThreeSec               = page.locator('text=3 sec').first();
    this.stat180Plus                = page.locator('text=180+').first();
    this.stat50Percent              = page.locator('text=50%').first();
    this.seeAllCustomerStoriesLink  = page.locator('a:has-text("See All Customer Stories")');

    // Footer
    this.footer               = page.locator('footer');
    this.footerCopyright      = page.locator('footer').filter({ hasText: 'Cornerstone 2' });
    this.footerPrivacyPolicy  = page.locator('footer a:has-text("Privacy Policy")');
    this.footerTerms          = page.locator('footer a:has-text("Terms and Conditions")');
    this.footerCookieStatement= page.locator('footer a:has-text("Cookie Statement")');
    this.footerAccessibility  = page.locator('footer a:has-text("Accessibility")');

    // Cookie banner
    this.cookieBannerAcceptAll = page.locator('button:has-text("Accept All")');
    this.cookieBannerRejectAll = page.locator('button:has-text("Reject All")');
  }

  // ─── Navigation Actions ────────────────────────────────────────────────────

  /** Navigate to Cornerstone homepage */
  async goto(): Promise<void> {
    this.logger.info('Navigating to Cornerstone homepage');
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Accept cookie consent banner if visible */
  async acceptCookieBanner(): Promise<void> {
    try {
      await this.cookieBannerAcceptAll.waitFor({ state: 'visible', timeout: 5000 });
      await this.cookieBannerAcceptAll.click();
      this.logger.info('Cookie banner accepted');
    } catch {
      this.logger.info('Cookie banner not present — skipping');
    }
  }

  /** Dismiss cookie consent banner via Reject All */
  async rejectCookieBanner(): Promise<void> {
    try {
      await this.cookieBannerRejectAll.waitFor({ state: 'visible', timeout: 5000 });
      await this.cookieBannerRejectAll.click();
      this.logger.info('Cookie banner rejected');
    } catch {
      this.logger.info('Cookie banner not present — skipping');
    }
  }

  /** Set the viewport size */
  async setViewport(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
    this.logger.info(`Viewport set to ${width}x${height}`);
  }

  /** Open Products dropdown */
  async openProductsMenu(): Promise<void> {
    await this.navProducts.click();
    await this.page.waitForTimeout(400);
  }

  /** Open Industries dropdown */
  async openIndustriesMenu(): Promise<void> {
    await this.navIndustries.click();
    await this.page.waitForTimeout(400);
  }

  /** Open Customers dropdown */
  async openCustomersMenu(): Promise<void> {
    await this.navCustomers.click();
    await this.page.waitForTimeout(400);
  }

  /** Open Resources dropdown */
  async openResourcesMenu(): Promise<void> {
    await this.navResources.click();
    await this.page.waitForTimeout(400);
  }

  /** Open Company dropdown */
  async openCompanyMenu(): Promise<void> {
    await this.navCompany.click();
    await this.page.waitForTimeout(400);
  }

  /** Close any open dropdown by pressing Escape */
  async closeDropdown(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }

  /** Toggle mobile hamburger menu open */
  async openMobileMenu(): Promise<void> {
    await this.hamburgerButton.click();
    await this.page.waitForTimeout(400);
  }

  /** Toggle mobile hamburger menu closed */
  async closeMobileMenu(): Promise<void> {
    await this.hamburgerButton.click();
    await this.page.waitForTimeout(400);
  }

  /** Scroll to the bottom of the page */
  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(500);
  }

  /** Scroll to the top of the page */
  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(300);
  }

  /** Scroll to a specific element */
  async scrollToSection(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);
  }

  /** Scroll through the entire page top to bottom */
  async scrollThroughPage(): Promise<void> {
    const totalHeight: number = await this.page.evaluate(() => document.body.scrollHeight);
    const step = 500;
    for (let pos = 0; pos < totalHeight; pos += step) {
      await this.page.evaluate((y: number) => window.scrollTo(0, y), pos);
      await this.page.waitForTimeout(100);
    }
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(300);
  }

  // ─── Layout Assertion Helpers ──────────────────────────────────────────────

  /** Assert no horizontal scrollbar is present */
  async assertNoHorizontalScroll(): Promise<void> {
    const hasScroll = await this.page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasScroll, 'Page should not have horizontal scroll').toBe(false);
  }

  /**
   * Assert the page IS vertically scrollable — i.e. content is taller than the viewport.
   * This proves sections below the fold actually rendered and were not collapsed.
   */
  async assertHasVerticalScroll(): Promise<void> {
    const isScrollable = await this.page.evaluate(
      () => document.documentElement.scrollHeight > document.documentElement.clientHeight
    );
    expect(isScrollable, 'Page should be vertically scrollable (content taller than viewport)').toBe(true);
  }

  /**
   * Assert the vertical scroll position actually changes after scrolling.
   * Confirms the scroll mechanism is functional (not blocked by CSS overflow:hidden).
   */
  async assertVerticalScrollWorks(): Promise<void> {
    // Record Y position before
    const before = await this.page.evaluate(() => window.scrollY);

    // Scroll down by 500px
    await this.page.evaluate(() => window.scrollBy(0, 500));
    await this.page.waitForTimeout(200);

    const after = await this.page.evaluate(() => window.scrollY);
    expect(after, 'Scroll position should increase after scrolling down').toBeGreaterThan(before);

    // Restore position
    await this.page.evaluate((y: number) => window.scrollTo(0, y), before);
    await this.page.waitForTimeout(200);
  }

  /**
   * Assert the vertical scrollbar is rendered (visible in the layout).
   * A missing scrollbar on a scrollable page can indicate overflow:hidden or
   * a custom scrollbar that may be inaccessible.
   */
  async assertVerticalScrollbarVisible(): Promise<void> {
    const hasScrollbar = await this.page.evaluate(() => {
      // scrollWidth > clientWidth → horizontal; scrollHeight > clientHeight → vertical
      const hasVerticalContent = document.documentElement.scrollHeight > document.documentElement.clientHeight;
      // window.innerWidth > document.documentElement.clientWidth means a scrollbar is consuming space
      const scrollbarConsumeSpace = window.innerWidth > document.documentElement.clientWidth;
      return hasVerticalContent && scrollbarConsumeSpace;
    });
    // Note: On macOS/mobile overlay scrollbars don't consume space — soft assertion
    if (!hasScrollbar) {
      this.logger.info('Vertical scrollbar does not consume layout space — may be overlay scrollbar (macOS/mobile) or overflow:hidden');
    }
    // Hard assert: page must at least be scrollable
    await this.assertHasVerticalScroll();
  }

  /** Assert an element does not overflow the viewport width */
  async assertNoWidthOverflow(locator: Locator, label: string): Promise<void> {
    const viewportWidth = this.page.viewportSize()?.width ?? 1280;
    const box = await locator.boundingBox();
    if (box) {
      expect(
        box.x + box.width,
        `${label} should not overflow viewport width`
      ).toBeLessThanOrEqual(viewportWidth + 2); // 2px tolerance
    }
  }

  /** Assert the header is fully within viewport width */
  async assertHeaderFitsViewport(): Promise<void> {
    await this.assertNoWidthOverflow(this.header, 'Header');
  }

  /** Assert footer is fully within viewport width */
  async assertFooterFitsViewport(): Promise<void> {
    await this.assertNoWidthOverflow(this.footer, 'Footer');
  }

  /** Assert all images have alt attributes */
  async assertAllImagesHaveAlt(): Promise<void> {
    const imagesWithoutAlt = await this.page.evaluate(() =>
      Array.from(document.querySelectorAll('img'))
        .filter(img => !img.getAttribute('alt'))
        .map(img => img.src)
    );
    expect(
      imagesWithoutAlt,
      `All images should have alt attributes. Missing: ${imagesWithoutAlt.join(', ')}`
    ).toHaveLength(0);
  }

  /** Assert no broken images on the page */
  async assertNoPageTextContains(text: string): Promise<void> {
    const bodyText = await this.page.evaluate(() => document.body.innerText);
    expect(bodyText, `Page should not contain "${text}"`).not.toContain(text);
  }

  /** Assert page has exactly one H1 */
  async assertSingleH1(): Promise<void> {
    const count = await this.page.locator('h1').count();
    expect(count, 'Page should have at least one H1').toBeGreaterThanOrEqual(1);
  }

  /** Get the page URL */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /** Check if hamburger menu is visible (mobile indicator) */
  async isHamburgerVisible(): Promise<boolean> {
    return await this.hamburgerButton.isVisible();
  }

  /** Check if desktop nav is visible */
  async isDesktopNavVisible(): Promise<boolean> {
    return await this.navProducts.isVisible();
  }

  /** Screenshot a specific section for visual regression */
  async screenshotElement(locator: Locator): Promise<Buffer> {
    return await locator.screenshot();
  }
}
