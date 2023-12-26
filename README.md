# All in One Accessibility

[`pimcore-all-in-one-accessibility-introduction`](https://www.youtube.com/watch?v=PPQMWSzroAA) - introduction of All in One Accessibility widget .

All in One Accessibility widget improves pimcore website ADA compliance and browser experience for ADA, WCAG 2.1 & 2.2, Section 508, Australian DDA, European EAA EN 301 549, UK Equality Act (EA), Israeli Standard 5568, California Unruh, Ontario AODA, Canada ACA, German BITV, France RGAA, Brazilian Inclusion Law (LBI 13.146/2015), Spain UNE 139803:2012, JIS X 8341 (Japan), Italian Stanca Act and Switzerland DDA Standards.

It uses the accessibility interface which handles UI and design related adjustments. All in One Accessibility app enhances your pimcore website accessibility to people with hearing or vision impairments, motor impaired, color blind, dyslexia, cognitive & learning impairments, seizure and epileptic, and ADHD problems.

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

#### Supports 65 languages
- English
- Italian
- French
- German
- Russian
- Spanish
- Finnish
- Portuguese
- Arab
- Polish
- Hungarian
- Slovak
- Japanese
- Turkish
- Greek
- Latin
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
- Malay
- Norwegian
- Romanian
- Slovenian
- Swedish
- Thai
- Ukrainian
- Vietnamese
- Bengali
- Lithuanian
- Sinhala
- Amharic
- Hmong
- Burmese
- Latvian
- Estonian
- Serbian
- Portuguese (Brazil)
- Chinese Traditional
- Croatian
- Georgian
- Hawaiian
- Welsh
- Cebuano
- Samoan
- Haitian Creole
- Faroese
- Montenegrin
- Australian
- Azeri
- Basque
- Canada
- Filipino
- Galician
- Norwegian
- Persian
- Punjabi
- Spanish (Mexico)
- United Kingdom


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

