# Source: https://www.cornerstoneondemand.com/
# Suite: E2E — Full user journeys across devices and browsers
# Covers: Complete page scroll, navigation flows, menu interactions, CTA journeys, multi-page navigation

@e2e @ui @cornerstone
Feature: Cornerstone Homepage E2E User Journeys
  As a QA engineer
  I want to validate complete end-to-end user journeys on the Cornerstone website
  So that real user flows work correctly across all devices and browsers

  Background:
    Given I navigate to the Cornerstone homepage

  # ─── JOURNEY 1: FULL PAGE SCROLL — DESKTOP ───────────────────────────────────

  @e2e @p0 @desktop @scroll-journey
  Scenario: E2E: Full homepage scroll journey on desktop reveals all sections
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    When I scroll through the entire page from top to bottom
    Then the hero section should be visible at the top
    And the "Meet Cornerstone Workforce AI™" section should be encountered
    And the agents section should be encountered
    And the customer statistics section should be encountered
    And the customer testimonials section should be encountered
    And the "Book a Demo" section should be encountered
    And the footer should be visible at the bottom

  @e2e @p0 @mobile @scroll-journey
  Scenario: E2E: Full homepage scroll journey on mobile reveals all sections
    Given the viewport is set to "375" x "812"
    And I accept the cookie consent banner
    When I scroll through the entire page from top to bottom
    Then the hero section should be visible at the top
    And the customer testimonials section should be encountered
    And the footer should be visible at the bottom
    And there should be no horizontal scroll throughout the journey

  @e2e @p0 @tablet @scroll-journey
  Scenario: E2E: Full homepage scroll journey on tablet reveals all sections
    Given the viewport is set to "768" x "1024"
    And I accept the cookie consent banner
    When I scroll through the entire page from top to bottom
    Then the hero section should be visible at the top
    And the footer should be visible at the bottom
    And there should be no horizontal scroll throughout the journey

  # ─── JOURNEY 2: NAVIGATION MENU FLOW — DESKTOP ───────────────────────────────

  @e2e @p0 @desktop @nav-journey
  Scenario: E2E: User explores all top-level navigation menus on desktop
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    When I click on the "Products" nav link
    Then the Products dropdown should open
    When I press Escape to close the dropdown
    And I click on the "Industries" nav link
    Then the Industries dropdown should open
    When I press Escape to close the dropdown
    And I click on the "Resources" nav link
    Then the Resources dropdown should open
    When I press Escape to close the dropdown
    And I click on the "Company" nav link
    Then the Company dropdown should open
    When I press Escape to close the dropdown
    Then the homepage should still be displayed

  @e2e @p0 @desktop @nav-journey
  Scenario: E2E: User navigates to a product page from the nav dropdown
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    When I click on the "Products" nav link
    And the Products dropdown is visible
    And I click the "View All Products" link in the dropdown
    Then a new page or section should load
    And the URL should change from the homepage URL

  @e2e @p0 @desktop @nav-journey
  Scenario: E2E: User navigates to Customer Stories from nav
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    When I click on the "Customers" nav link
    And I click "Customer stories" in the dropdown
    Then a customer stories page should load
    And the URL should contain "customer"

  # ─── JOURNEY 3: MOBILE NAV FLOW ──────────────────────────────────────────────

  @e2e @p0 @mobile @nav-journey
  Scenario: E2E: Full mobile navigation open-browse-close journey
    Given the viewport is set to "375" x "812"
    And I accept the cookie consent banner
    When I click the hamburger menu icon
    Then the mobile navigation menu should be visible
    And the mobile menu should contain "Products"
    And the mobile menu should contain "Industries"
    And the mobile menu should contain "Resources"
    When I click the hamburger menu close button
    Then the mobile navigation menu should not be visible
    And the homepage content should still be visible

  @e2e @p0 @mobile @nav-journey
  Scenario: E2E: User expands a section in the mobile nav menu
    Given the viewport is set to "375" x "812"
    And I accept the cookie consent banner
    When I click the hamburger menu icon
    And the mobile navigation menu is visible
    And I tap "Products" in the mobile menu
    Then the Products sub-items should expand in the mobile menu
    And sub-items should include "Learning Solutions" or equivalent

  # ─── JOURNEY 4: CTA BUTTON FLOW ──────────────────────────────────────────────

  @e2e @p0 @desktop @cta-journey
  Scenario: E2E: User clicks hero Book Demo CTA on desktop
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    When I click the "Book Demo" CTA in the hero section
    Then the page should navigate to a demo booking page
    And the URL should contain "demo" or "contact" or "book"

  @e2e @p0 @mobile @cta-journey
  Scenario: E2E: User clicks Book Demo CTA on mobile
    Given the viewport is set to "375" x "812"
    And I accept the cookie consent banner
    When I click the "Book Demo" CTA in the hero section
    Then the page should navigate to a demo booking page
    And the URL should contain "demo" or "contact" or "book"

  @e2e @p0 @desktop @cta-journey
  Scenario: E2E: User clicks nav Book a Demo CTA on desktop
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    When I click the "Book a Demo" button in the navigation bar
    Then the page should navigate to a demo booking page
    And the URL should contain "demo" or "contact" or "book"

  # ─── JOURNEY 5: LANGUAGE SWITCHER ────────────────────────────────────────────

  @e2e @p1 @desktop @language-journey
  Scenario: E2E: User switches language on desktop
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    When I click the language selector "en"
    Then the language options should be visible
    And the options should include "en" "br" "de" "es" "fr"

  # ─── JOURNEY 6: FOOTER NAVIGATION FLOW ──────────────────────────────────────

  @e2e @p1 @desktop @footer-journey
  Scenario: E2E: User navigates using footer links on desktop
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    When I scroll to the footer
    Then the footer link categories should be visible
    And the "PLATFORM" section should be present in the footer
    And the "SOLUTIONS" section should be present in the footer
    And the "COMPANY" section should be present in the footer
    And the "RESOURCES" section should be present in the footer

  @e2e @p1 @desktop @footer-journey
  Scenario: E2E: User clicks Privacy Policy in footer and lands on correct page
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    When I scroll to the footer
    And I click the "Privacy Policy" link in the footer
    Then a privacy policy page should load
    And the URL should contain "privacy"

  # ─── JOURNEY 7: CROSS-DEVICE CONSISTENCY JOURNEYS ────────────────────────────

  @e2e @p1 @responsive @cross-device
  Scenario Outline: E2E: Core homepage journey is consistent across all device sizes
    Given the viewport is set to "<width>" x "<height>"
    And I accept the cookie consent banner
    When I scroll through the entire page from top to bottom
    Then the hero section should be visible
    And the footer should be visible
    And there should be no horizontal scroll throughout the journey
    And no content should be cut off or hidden due to overflow

    Examples:
      | width | height | device      |
      | 1920  | 1080   | full-hd     |
      | 1440  | 900    | wide-desktop|
      | 1280  | 800    | desktop     |
      | 1024  | 768    | laptop      |
      | 768   | 1024   | tablet      |
      | 425   | 900    | mobile-l    |
      | 375   | 812    | iphone      |
      | 360   | 800    | android     |
      | 320   | 568    | mobile-xs   |

  # ─── JOURNEY 8: ANNOUNCEMENT BANNER ─────────────────────────────────────────

  @e2e @p2 @desktop @banner-journey
  Scenario: E2E: Announcement banner is visible and its link works on desktop
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    Then the top announcement banner should be visible
    And the "Apply Now" link in the banner should be visible
    When I click the "Apply Now" link
    Then the page should navigate to a new URL

  # ─── JOURNEY 9: BACK TO TOP / PAGE REFRESH ───────────────────────────────────

  @e2e @p2 @desktop @scroll-journey
  Scenario: E2E: User scrolls to bottom then back to top on desktop
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    When I scroll to the bottom of the page
    And I scroll back to the top of the page
    Then the hero section should be visible again
    And the navigation bar should be visible

  @e2e @p2 @desktop @refresh-journey
  Scenario: E2E: Page reloads correctly and retains layout
    Given the viewport is set to "1280" x "800"
    And I accept the cookie consent banner
    When I reload the page
    Then the hero section should be visible
    And the navigation bar should be visible
    And there should be no horizontal scroll
