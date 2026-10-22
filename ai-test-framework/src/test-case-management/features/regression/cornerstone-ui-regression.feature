# Source: https://www.cornerstoneondemand.com/
# Suite: Regression — Full layout, navigation, content, interaction & cross-browser validation
# Covers: Navigation menus, dropdowns, sections, links, typography, images, forms, accessibility

@regression @ui @cornerstone
Feature: Cornerstone Homepage UI Regression
  As a QA engineer
  I want to validate all UI components, content sections, and interactions
  So that no regression is introduced across layout, navigation, and content

  Background:
    Given I navigate to the Cornerstone homepage

  # ─── NAVIGATION — DESKTOP ────────────────────────────────────────────────────

  @regression @p1 @navigation @desktop
  Scenario: Products mega menu opens on hover/click on desktop
    Given the viewport is set to "1280" x "800"
    When I click on the "Products" nav link
    Then the Products dropdown menu should be visible
    And the dropdown should contain "Cornerstone Workforce AI™"
    And the dropdown should contain "Learning Solutions"
    And the dropdown should contain "Talent Development"
    And the dropdown should contain "Workforce Intelligence"

  @regression @p1 @navigation @desktop
  Scenario: Industries mega menu opens on hover/click on desktop
    Given the viewport is set to "1280" x "800"
    When I click on the "Industries" nav link
    Then the Industries dropdown menu should be visible
    And the dropdown should contain "Public sector"
    And the dropdown should contain "Manufacturing"
    And the dropdown should contain "Healthcare"
    And the dropdown should contain "Retail"
    And the dropdown should contain "Financial services"

  @regression @p1 @navigation @desktop
  Scenario: Resources mega menu opens on hover/click on desktop
    Given the viewport is set to "1280" x "800"
    When I click on the "Resources" nav link
    Then the Resources dropdown menu should be visible
    And the dropdown should contain "Resource Corner"
    And the dropdown should contain "Events"
    And the dropdown should contain "Research"
    And the dropdown should contain "Blogs"

  @regression @p1 @navigation @desktop
  Scenario: Company mega menu opens on hover/click on desktop
    Given the viewport is set to "1280" x "800"
    When I click on the "Company" nav link
    Then the Company dropdown menu should be visible
    And the dropdown should contain "About us"
    And the dropdown should contain "Leadership"
    And the dropdown should contain "Careers"
    And the dropdown should contain "Contact Us"

  @regression @p1 @navigation @desktop
  Scenario: Customers menu opens on click on desktop
    Given the viewport is set to "1280" x "800"
    When I click on the "Customers" nav link
    Then the Customers dropdown menu should be visible
    And the dropdown should contain "Customer stories"

  # ─── NAVIGATION — MOBILE ─────────────────────────────────────────────────────

  @regression @p1 @navigation @mobile
  Scenario: Hamburger menu opens and shows nav links on mobile
    Given the viewport is set to "375" x "812"
    When I click the hamburger menu icon
    Then the mobile navigation menu should be visible
    And the mobile menu should contain "Products"
    And the mobile menu should contain "Industries"
    And the mobile menu should contain "Customers"
    And the mobile menu should contain "Resources"
    And the mobile menu should contain "Company"

  @regression @p1 @navigation @mobile
  Scenario: Hamburger menu closes when clicked again on mobile
    Given the viewport is set to "375" x "812"
    When I click the hamburger menu icon
    And I click the hamburger menu icon again
    Then the mobile navigation menu should not be visible

  @regression @p1 @navigation @tablet
  Scenario: Navigation is functional on tablet viewport
    Given the viewport is set to "768" x "1024"
    Then the main navigation should be present
    And the "Book a Demo" CTA should be visible

  # ─── HERO SECTION ────────────────────────────────────────────────────────────

  @regression @p1 @hero @desktop
  Scenario: Hero section content is complete on desktop
    Given the viewport is set to "1280" x "800"
    Then the hero heading should be visible
    And the hero heading should contain text
    And the hero subheading should be visible
    And the "Book Demo" CTA button should be visible
    And the "Explore the Platform" link should be visible

  @regression @p1 @hero @mobile
  Scenario: Hero section stacks correctly on mobile
    Given the viewport is set to "375" x "812"
    Then the hero heading should be visible
    And the hero heading should not overflow the viewport width
    And the "Book Demo" CTA button should be visible

  @regression @p1 @hero @tablet
  Scenario: Hero section is fully visible on tablet
    Given the viewport is set to "768" x "1024"
    Then the hero heading should be visible
    And the "Book Demo" CTA button should be visible
    And there should be no horizontal scroll

  # ─── CONTENT SECTIONS ────────────────────────────────────────────────────────

  @regression @p1 @content @desktop
  Scenario: Statistics section displays key metrics on desktop
    Given the viewport is set to "1280" x "800"
    When I scroll to the statistics section
    Then the stat "3 sec" should be visible
    And the stat "180+" should be visible
    And the stat "50%" should be visible

  @regression @p1 @content @desktop
  Scenario: Customer testimonials section is visible on desktop
    Given the viewport is set to "1280" x "800"
    When I scroll to the customer stories section
    Then at least one customer quote should be visible
    And at least one customer name should be visible
    And the "See All Customer Stories" link should be visible

  @regression @p1 @content @desktop
  Scenario: Cornerstone Workforce AI section is present
    Given the viewport is set to "1280" x "800"
    When I scroll to the Workforce AI section
    Then the "Meet Cornerstone Workforce AI™" heading should be visible

  @regression @p1 @content @desktop
  Scenario: Readiness Agents section displays all agents
    Given the viewport is set to "1280" x "800"
    When I scroll to the agents section
    Then the "Future of Work" agent should be visible
    And the "Embark Navigator" agent should be visible
    And the "Skills Architect" agent should be visible
    And the "View Every Agent" link should be visible

  @regression @p2 @content @mobile
  Scenario: Content sections stack vertically on mobile without overflow
    Given the viewport is set to "375" x "812"
    When I scroll through the entire page
    Then there should be no horizontal scroll at any point
    And no content section should overflow the viewport

  # ─── LINKS & CTAs ────────────────────────────────────────────────────────────

  @regression @p1 @links @desktop
  Scenario Outline: Key CTA links are present and have valid href on desktop
    Given the viewport is set to "1280" x "800"
    Then the "<link_text>" link should be visible
    And the "<link_text>" link should have a non-empty href

    Examples:
      | link_text              |
      | Book a Demo            |
      | Explore the Platform   |
      | See Integrations       |
      | View Every Agent       |
      | See All Customer Stories |

  @regression @p1 @links @desktop
  Scenario Outline: Footer links are present and functional
    Given the viewport is set to "1280" x "800"
    When I scroll to the footer
    Then the footer "<link_text>" link should be visible
    And the footer "<link_text>" link should have a non-empty href

    Examples:
      | link_text                |
      | Privacy Policy           |
      | Terms and Conditions     |
      | Cookie Statement         |
      | Contact Us               |
      | Careers                  |
      | Accessibility            |

  # ─── TYPOGRAPHY & IMAGES ─────────────────────────────────────────────────────

  @regression @p2 @typography @desktop
  Scenario: No text overflow or clipping on desktop
    Given the viewport is set to "1280" x "800"
    Then no visible text should be clipped or hidden due to overflow
    And the page font should be loaded and rendered

  @regression @p2 @images @desktop
  Scenario: Images load without broken src on desktop
    Given the viewport is set to "1280" x "800"
    Then all visible images should have a valid src attribute
    And no images should render as broken

  @regression @p2 @images @mobile
  Scenario: Images are responsive and do not overflow on mobile
    Given the viewport is set to "375" x "812"
    Then all visible images should fit within the viewport width

  # ─── LAYOUT GRID ─────────────────────────────────────────────────────────────

  @regression @p1 @layout @responsive
  Scenario Outline: Page layout adapts correctly at each breakpoint
    Given the viewport is set to "<width>" x "<height>"
    Then the main content area should be visible
    And there should be no horizontal scroll
    And the header should be fully within the viewport width
    And the footer should be fully within the viewport width

    Examples:
      | width | height | breakpoint |
      | 1920  | 1080   | full-hd    |
      | 1440  | 900    | wide       |
      | 1280  | 800    | desktop    |
      | 1024  | 768    | laptop     |
      | 768   | 1024   | tablet     |
      | 425   | 900    | mobile-l   |
      | 375   | 812    | mobile-s   |
      | 320   | 568    | mobile-xs  |

  # ─── CROSS-BROWSER SPECIFIC ──────────────────────────────────────────────────

  @regression @p1 @cross-browser
  Scenario: Page renders consistently with no broken layout markers
    Given the viewport is set to "1280" x "800"
    Then the hero section should be visible
    And the navigation should be visible
    And the footer should be visible
    And there should be no horizontal scroll
    And no "undefined" or "NaN" text should appear on the page

  @regression @p2 @cross-browser @fonts
  Scenario: Custom fonts render correctly across browsers
    Given the viewport is set to "1280" x "800"
    Then the page heading font should not fall back to a monospace font
    And text should not appear as blank boxes or squares

  # ─── COOKIE BANNER ───────────────────────────────────────────────────────────

  @regression @p1 @cookie-banner
  Scenario: Cookie consent banner appears on first load
    Given I open a fresh browser session on the homepage
    Then the cookie consent banner should be visible
    And the "Accept All" button should be visible
    And the "Reject All" button should be visible

  @regression @p1 @cookie-banner
  Scenario: Cookie consent banner dismisses on Accept All
    Given I open a fresh browser session on the homepage
    When I click the "Accept All" cookie button
    Then the cookie consent banner should not be visible

  @regression @p1 @cookie-banner
  Scenario: Cookie consent banner dismisses on Reject All
    Given I open a fresh browser session on the homepage
    When I click the "Reject All" cookie button
    Then the cookie consent banner should not be visible

  # ─── ACCESSIBILITY BASICS ────────────────────────────────────────────────────

  @regression @p2 @accessibility
  Scenario: Page has a valid and visible skip-to-content link
    Given the viewport is set to "1280" x "800"
    Then the "Skip to main content" link should be present in the DOM

  @regression @p2 @accessibility
  Scenario: All images have alt attributes
    Given the viewport is set to "1280" x "800"
    Then all img elements should have an alt attribute

  @regression @p2 @accessibility
  Scenario: Page has exactly one H1 tag
    Given the viewport is set to "1280" x "800"
    Then the page should have exactly one H1 element

  # ─── VERTICAL SCROLL ─────────────────────────────────────────────────────────

  @regression @p1 @layout @vertical-scroll
  Scenario Outline: Page is vertically scrollable at all breakpoints
    Given the viewport is set to "<width>" x "<height>"
    Then the page content height should exceed the viewport height
    And scrolling down should change the vertical scroll position

    Examples:
      | width | height | breakpoint |
      | 1920  | 1080   | full-hd    |
      | 1440  | 900    | wide       |
      | 1280  | 800    | desktop    |
      | 1024  | 768    | laptop     |
      | 768   | 1024   | tablet     |
      | 425   | 900    | mobile-l   |
      | 375   | 812    | mobile-s   |
      | 320   | 568    | mobile-xs  |

  @regression @p1 @layout @vertical-scroll
  Scenario: Vertical scrollbar is rendered on desktop
    Given the viewport is set to "1280" x "800"
    Then the vertical scrollbar should be present in the layout

  @regression @p2 @layout @vertical-scroll
  Scenario: Scroll position resets to top on page reload
    Given the viewport is set to "1280" x "800"
    When I scroll down "800" pixels
    And I reload the page
    Then the vertical scroll position should be "0"
