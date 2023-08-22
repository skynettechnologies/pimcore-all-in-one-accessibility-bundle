# All in One Accessibility

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
  
####Color and Contrast Adjustments
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

