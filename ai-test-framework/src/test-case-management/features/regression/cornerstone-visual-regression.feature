# Source: https://www.cornerstoneondemand.com/
# Suite: Visual Regression — Pixel-diff screenshot comparison using Playwright toHaveScreenshot()
# How it works:
#   First run  → captures baseline screenshots (stored in __screenshots__ folder)
#   Subsequent → pixel-diffs against baseline; test FAILS if pixels differ beyond threshold
# Covers: Full page, above-fold, sections, navigation, footer — at every breakpoint & browser

@visual-regression @ui @cornerstone
Feature: Cornerstone Homepage Visual Regression
  As a QA engineer
  I want to capture and compare pixel-level screenshots at every breakpoint
  So that any unintended design change is automatically detected

  Background:
    Given I navigate to the Cornerstone homepage
    And I accept the cookie consent banner

  # ─── FULL PAGE SNAPSHOTS ─────────────────────────────────────────────────────

  @visual-regression @p0 @full-page @snapshot
  Scenario Outline: Full page screenshot matches baseline at each breakpoint
    Given the viewport is set to "<width>" x "<height>"
    When I scroll to the top of the page
    Then the full page screenshot should match the baseline "<snapshot_name>"

    Examples:
      | width | height | breakpoint  | snapshot_name                        |
      | 1920  | 1080   | full-hd     | homepage-full-page-1920x1080         |
      | 1440  | 900    | wide        | homepage-full-page-1440x900          |
      | 1280  | 800    | desktop     | homepage-full-page-1280x800          |
      | 1024  | 768    | laptop      | homepage-full-page-1024x768          |
      | 768   | 1024   | tablet      | homepage-full-page-768x1024          |
      | 425   | 900    | mobile-l    | homepage-full-page-425x900           |
      | 375   | 812    | mobile-s    | homepage-full-page-375x812           |
      | 360   | 800    | android     | homepage-full-page-360x800           |
      | 320   | 568    | mobile-xs   | homepage-full-page-320x568           |

  # ─── ABOVE THE FOLD SNAPSHOTS ────────────────────────────────────────────────

  @visual-regression @p0 @above-fold @snapshot
  Scenario Outline: Above-the-fold viewport screenshot matches baseline
    Given the viewport is set to "<width>" x "<height>"
    Then the viewport screenshot should match the baseline "<snapshot_name>"

    Examples:
      | width | height | breakpoint | snapshot_name                      |
      | 1280  | 800    | desktop    | homepage-atf-1280x800              |
      | 768   | 1024   | tablet     | homepage-atf-768x1024              |
      | 375   | 812    | mobile-s   | homepage-atf-375x812               |

  # ─── SECTION-LEVEL SNAPSHOTS ─────────────────────────────────────────────────

  @visual-regression @p1 @section @snapshot @desktop
  Scenario: Navigation bar screenshot matches baseline on desktop
    Given the viewport is set to "1280" x "800"
    Then the navigation bar screenshot should match the baseline "nav-bar-desktop-1280"

  @visual-regression @p1 @section @snapshot @mobile
  Scenario: Navigation bar screenshot matches baseline on mobile
    Given the viewport is set to "375" x "812"
    Then the navigation bar screenshot should match the baseline "nav-bar-mobile-375"

  @visual-regression @p1 @section @snapshot @desktop
  Scenario: Hero section screenshot matches baseline on desktop
    Given the viewport is set to "1280" x "800"
    Then the hero section screenshot should match the baseline "hero-section-desktop-1280"

  @visual-regression @p1 @section @snapshot @mobile
  Scenario: Hero section screenshot matches baseline on mobile
    Given the viewport is set to "375" x "812"
    Then the hero section screenshot should match the baseline "hero-section-mobile-375"

  @visual-regression @p1 @section @snapshot @tablet
  Scenario: Hero section screenshot matches baseline on tablet
    Given the viewport is set to "768" x "1024"
    Then the hero section screenshot should match the baseline "hero-section-tablet-768"

  @visual-regression @p1 @section @snapshot @desktop
  Scenario: Workforce AI section screenshot matches baseline on desktop
    Given the viewport is set to "1280" x "800"
    When I scroll to the Workforce AI section
    Then the Workforce AI section screenshot should match the baseline "workforce-ai-section-desktop-1280"

  @visual-regression @p1 @section @snapshot @desktop
  Scenario: Agents section screenshot matches baseline on desktop
    Given the viewport is set to "1280" x "800"
    When I scroll to the agents section
    Then the agents section screenshot should match the baseline "agents-section-desktop-1280"

  @visual-regression @p1 @section @snapshot @desktop
  Scenario: Customer statistics section screenshot matches baseline on desktop
    Given the viewport is set to "1280" x "800"
    When I scroll to the statistics section
    Then the statistics section screenshot should match the baseline "stats-section-desktop-1280"

  @visual-regression @p1 @section @snapshot @desktop
  Scenario: Customer testimonials section screenshot matches baseline on desktop
    Given the viewport is set to "1280" x "800"
    When I scroll to the customer stories section
    Then the testimonials section screenshot should match the baseline "testimonials-section-desktop-1280"

  @visual-regression @p1 @section @snapshot @desktop
  Scenario: Footer screenshot matches baseline on desktop
    Given the viewport is set to "1280" x "800"
    When I scroll to the footer
    Then the footer screenshot should match the baseline "footer-desktop-1280"

  @visual-regression @p1 @section @snapshot @mobile
  Scenario: Footer screenshot matches baseline on mobile
    Given the viewport is set to "375" x "812"
    When I scroll to the footer
    Then the footer screenshot should match the baseline "footer-mobile-375"

  # ─── NAVIGATION OPEN STATE SNAPSHOTS ────────────────────────────────────────

  @visual-regression @p1 @nav-state @snapshot @desktop
  Scenario: Products dropdown open state matches baseline on desktop
    Given the viewport is set to "1280" x "800"
    When I click on the "Products" nav link
    And the Products dropdown is visible
    Then the products dropdown screenshot should match the baseline "nav-products-open-desktop-1280"

  @visual-regression @p1 @nav-state @snapshot @desktop
  Scenario: Industries dropdown open state matches baseline on desktop
    Given the viewport is set to "1280" x "800"
    When I click on the "Industries" nav link
    And the Industries dropdown is visible
    Then the industries dropdown screenshot should match the baseline "nav-industries-open-desktop-1280"

  @visual-regression @p1 @nav-state @snapshot @mobile
  Scenario: Mobile menu open state matches baseline
    Given the viewport is set to "375" x "812"
    When I click the hamburger menu icon
    And the mobile navigation menu is visible
    Then the mobile menu screenshot should match the baseline "nav-mobile-open-375"

  # ─── COOKIE BANNER SNAPSHOT ──────────────────────────────────────────────────

  @visual-regression @p1 @cookie-banner @snapshot
  Scenario: Cookie consent banner screenshot matches baseline on desktop
    Given I open a fresh browser session on the homepage
    And the cookie consent banner is visible
    Then the cookie banner screenshot should match the baseline "cookie-banner-desktop-1280"

  @visual-regression @p1 @cookie-banner @snapshot
  Scenario: Cookie consent banner screenshot matches baseline on mobile
    Given the viewport is set to "375" x "812"
    And I open a fresh browser session on the homepage
    And the cookie consent banner is visible
    Then the cookie banner screenshot should match the baseline "cookie-banner-mobile-375"

  # ─── CROSS-BROWSER VISUAL SNAPSHOTS ─────────────────────────────────────────

  @visual-regression @p1 @cross-browser @snapshot
  Scenario Outline: Above-fold layout matches baseline across browsers at desktop
    Given the viewport is set to "1280" x "800"
    Then the viewport screenshot should match the baseline "<snapshot_name>" with threshold "0.02"

    Examples:
      | browser   | snapshot_name                          |
      | chromium  | homepage-atf-chromium-1280x800         |
      | firefox   | homepage-atf-firefox-1280x800          |
      | webkit    | homepage-atf-webkit-1280x800           |

  @visual-regression @p1 @cross-browser @snapshot
  Scenario Outline: Above-fold layout matches baseline across browsers on mobile
    Given the viewport is set to "375" x "812"
    Then the viewport screenshot should match the baseline "<snapshot_name>" with threshold "0.02"

    Examples:
      | browser        | snapshot_name                              |
      | mobile-chrome  | homepage-atf-mobile-chrome-375x812         |
      | mobile-safari  | homepage-atf-mobile-safari-375x812         |

  # ─── ANNOUNCEMENT BANNER SNAPSHOT ────────────────────────────────────────────

  @visual-regression @p2 @section @snapshot @desktop
  Scenario: Announcement banner screenshot matches baseline on desktop
    Given the viewport is set to "1280" x "800"
    Then the announcement banner screenshot should match the baseline "announcement-banner-desktop-1280"

  # ─── LAYOUT DIFF DETECTION ───────────────────────────────────────────────────

  @visual-regression @p0 @layout-diff @snapshot
  Scenario Outline: No pixel drift detected in header at key breakpoints
    Given the viewport is set to "<width>" x "<height>"
    Then the header screenshot should match the baseline "<snapshot_name>" with threshold "0.01"

    Examples:
      | width | height | snapshot_name               |
      | 1280  | 800    | header-desktop-1280x800     |
      | 768   | 1024   | header-tablet-768x1024      |
      | 375   | 812    | header-mobile-375x812       |

  @visual-regression @p0 @layout-diff @snapshot
  Scenario Outline: No pixel drift detected in hero section at key breakpoints
    Given the viewport is set to "<width>" x "<height>"
    Then the hero section screenshot should match the baseline "<snapshot_name>" with threshold "0.01"

    Examples:
      | width | height | snapshot_name              |
      | 1280  | 800    | hero-desktop-1280x800      |
      | 768   | 1024   | hero-tablet-768x1024       |
      | 375   | 812    | hero-mobile-375x812        |
