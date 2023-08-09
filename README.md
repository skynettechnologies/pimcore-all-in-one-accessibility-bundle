# All in One Accessibility
- All in One Accessibility widget improves PIMCore website ADA compliance and browser experience for WCAG 2.1, ATAG 2.0, ADA, Section 508, Australian DDA, 
  European EAA EN 301 549, UK Equality Act (EA), Israeli Standard 5568, California Unruh standards, Ontario AODA, Canada ACA, German BITV, and France RGAA.
- 2 Minute installation
- Screen Reader, dynamic widget color and position, supports multiple languages (40 languages)
- Reduces the risk of time-consuming accessibility lawsuits.
- Use apps to connect to external services and manage data flows

It uses the accessibility interface which handles UI and design related adjustments. All in One Accessibility app enhances your PIMCore website 
accessibility to people with hearing or vision impairments, motor impaired, color blind, dyslexia, cognitive & learning impairments, seizure and epileptic, and ADHD problems. It uses the accessibility interface which handles UI and design related adjustments.

[`pimcore-all-in-one-accessibility-introduction`](https://www.youtube.com/watch?v=PPQMWSzroAA) - introduction of All in One Accessibility widget .

## Pimcore All in One Accessibility Free Version Features:

#### Skip Links
- Skip to Menu
- Skip to Footer
- Skip to Navigation
- Open Accessibility Toolbar
#### Content Adjustments
- Content Scaling
- Readable Fonts
- Highlight Title
- Highlight Links
- Text Magnifier
- Adjust Font Sizing
- Adjust Line Height
- Adjust Letter Spacing
- Align Center
- Align Left
- Align Right
#### Color and Contrast Adjustments
- High Contrast
#### Orientation Adjustments
- Hide Images (Text Only)
  Miscellaneous
- Accessibility Statement
- Dynamic Application Color
- Choose Application Trigger Button Position
- Choose Application Position
- Multi Language
#### Supports 40 languages
- English
- Spanish
- German
- Arabic
- Slovak
- Portuguese
- French
- Italian
- Polish
- Turkish
- Japanese
- Finnish
- Russian
- Hungarian
- Latin
- Greek
- Hebrew
- Bulgarian
- Catalan
- Chinese
- Czech
- Danish
- Dutch
- Hindi
- Indonesian
- Korean
- Lithuanian
- Malay
- Norwegian
- Romanian
- Slovenian
- Swedish
- Thai
- Ukrainian
- Vietnamese
- Bengali
- Sinhala
- Amharic
- Hmong
- Myanmar (Burmese)


## Installation
-   Run `composer require skynettechnologies/pimcore-all-in-one-accessibility-bundle`
-   Add `./bin/console pimcore:bundle:enable ADAPimcoreBundle`
-   Add `<script id="aioa-adawidget" src="{{ AIOA_URL }}"></script>`put this line in your base.html footer

---

## Usage


### default.html.twig
Just add this tag in your base.html footer(your main template of PIMCore website) `<script id="aioa-adawidget" src="{{ AIOA_URL }}"></script>`:
```python
  <footer>
    <script id="aioa-adawidget" src="{{ AIOA_URL }}"></script>
  </footer>
```

