# Source: https://www.cornerstoneondemand.com/
# Suite: Smoke — Core homepage UI & responsiveness checks
# Breakpoints: Desktop (1280px), Laptop (1024px), Tablet (768px), Mobile-L (425px), Mobile-S (375px)

@smoke @ui @cornerstone
Feature: Cornerstone Homepage UI & Responsiveness — Smoke
  As a QA engineer
  I want to verify the Cornerstone homepage renders correctly
  So that critical UI elements are visible and functional at every breakpoint

  Background:
    Given I navigate to the Cornerstone homepage

  # ─── DESKTOP (1280px) ────────────────────────────────────────────────────────

  @smoke @p0 @desktop @responsive
  Scenario Outline: Homepage loads and hero section is visible on desktop
    Given the viewport is set to "<width>" x "<height>"
    Then the page title should contain "Cornerstone"
    And the hero heading should be visible
    And the hero "Book Demo" CTA button should be visible
    And there should be no horizontal scroll

    Examples:
      | width | height | label   |
      | 1280  | 800    | desktop |
      | 1440  | 900    | large   |
      | 1920  | 1080   | full-hd |

  @smoke @p0 @desktop @navigation
  Scenario: Primary navigation is visible and fully rendered on desktop
    Given the viewport is set to "1280" x "800"
    Then the main navigation bar should be visible
    And the "Products" nav link should be visible
    And the "Industries" nav link should be visible
    And the "Customers" nav link should be visible
    And the "Resources" nav link should be visible
    And the "Company" nav link should be visible
    And the "Book a Demo" nav CTA should be visible
    And the hamburger menu should NOT be visible

  @smoke @p0 @desktop @footer
  Scenario: Footer is present and visible on desktop
    Given the viewport is set to "1280" x "800"
    When I scroll to the bottom of the page
    Then the footer should be visible
    And the footer copyright text should contain "Cornerstone"
    And the footer "Privacy Policy" link should be visible
    And the footer "Terms and Conditions" link should be visible

  # ─── TABLET (768px) ──────────────────────────────────────────────────────────

  @smoke @p0 @tablet @responsive
  Scenario: Homepage renders correctly on tablet viewport
    Given the viewport is set to "768" x "1024"
    Then the page title should contain "Cornerstone"
    And the hero heading should be visible
    And there should be no horizontal scroll
    And the logo should be visible

  @smoke @p0 @tablet @navigation
  Scenario: Navigation adapts on tablet viewport
    Given the viewport is set to "768" x "1024"
    Then the main navigation should be present
    And there should be no horizontal scroll

  # ─── MOBILE (375px) ──────────────────────────────────────────────────────────

  @smoke @p0 @mobile @responsive
  Scenario Outline: Homepage renders correctly on mobile viewports
    Given the viewport is set to "<width>" x "<height>"
    Then the page title should contain "Cornerstone"
    And the hero heading should be visible
    And there should be no horizontal scroll
    And the logo should be visible

    Examples:
      | width | height | device    |
      | 375   | 812    | iphone-se |
      | 390   | 844    | iphone-14 |
      | 425   | 900    | mobile-l  |
      | 360   | 800    | android   |

  @smoke @p0 @mobile @navigation
  Scenario: Hamburger menu is present on mobile
    Given the viewport is set to "375" x "812"
    Then the hamburger menu icon should be visible
    And the desktop nav links should NOT be visible

  @smoke @p0 @mobile @cta
  Scenario: CTA button is visible and not cut off on mobile
    Given the viewport is set to "375" x "812"
    Then the hero CTA button should be visible
    And the CTA button should not overflow the viewport width

  # ─── CROSS-BREAKPOINT ────────────────────────────────────────────────────────

  @smoke @p0 @responsive @cross-breakpoint
  Scenario Outline: No horizontal scroll at any standard breakpoint
    Given the viewport is set to "<width>" x "<height>"
    Then there should be no horizontal scroll

    Examples:
      | width | height | breakpoint |
      | 1280  | 800    | desktop    |
      | 1024  | 768    | laptop     |
      | 768   | 1024   | tablet     |
      | 425   | 900    | mobile-l   |
      | 375   | 812    | mobile-s   |

  @smoke @p0 @responsive @logo
  Scenario Outline: Logo is always visible at all breakpoints
    Given the viewport is set to "<width>" x "<height>"
    Then the Cornerstone logo should be visible

    Examples:
      | width | height | breakpoint |
      | 1280  | 800    | desktop    |
      | 768   | 1024   | tablet     |
      | 375   | 812    | mobile     |

  # ─── VERTICAL SCROLL ─────────────────────────────────────────────────────────

  @smoke @p0 @responsive @vertical-scroll
  Scenario Outline: Page is vertically scrollable at all breakpoints
    Given the viewport is set to "<width>" x "<height>"
    Then the page content should extend beyond the viewport height
    And the vertical scroll position should change when scrolling down

    Examples:
      | width | height | breakpoint |
      | 1280  | 800    | desktop    |
      | 768   | 1024   | tablet     |
      | 375   | 812    | mobile-s   |

  @smoke @p0 @desktop @vertical-scroll
  Scenario: Vertical scrollbar renders correctly on desktop
    Given the viewport is set to "1280" x "800"
    Then the page should have a vertical scrollbar or overlay scroll indicator
    And the page content should extend beyond the viewport height
