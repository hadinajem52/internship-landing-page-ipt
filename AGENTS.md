# IPT Smart Landing Page

## Project source of truth

- Figma: https://www.figma.com/design/1Qfr1dMFaZPDsvu5s7qKHS/IPT-SMART-APPROVED--Copy-?node-id=1-4129&m=dev
- Target frame: `Landing page 5` (`1:4129`), designed at 1512 px wide.
- Treat Figma as the visual source of truth for copy, assets, typography, colors, spacing, cropping, and composition.
- The page is a scroll-driven experience. Oversized artwork and elements crossing section boundaries are intentional, not layout mistakes.
- Do not invent animation behavior when it is not documented. Ask for a prototype/reference or propose a small, reviewable interpretation.

## Technology

- Build with semantic HTML, SCSS, and vanilla JavaScript.
- Do not introduce React, Vue, Svelte, or another UI framework.
- Use ES modules and small scene-focused JavaScript modules rather than a single large script.
- Compile SCSS through the project's build tooling; do not hand-edit generated CSS.
- A motion library such as GSAP/ScrollTrigger may be added for coordinated scroll timelines after its use is agreed. Prefer native CSS and browser APIs for simple effects.

## Delivery strategy

Work section by section. Do not build the entire page statically and postpone all motion until the end.

1. Establish global foundations: fonts, tokens, reset, container rules, breakpoints, and reusable primitives.
2. Build the hero statically and make it responsive.
3. Implement and visually validate the hero scroll behavior as the motion proof of concept.
4. Repeat `static layout -> responsive check -> motion -> visual check` for each subsequent scene.
5. Finish with full-page timing, transitions, accessibility, and performance testing.

Suggested scene boundaries:

- Hero
- Introduction and benefits
- App feature / phone scene
- Fuel in three steps
- IPT rewards and OMT cashback
- Collect points
- Getting started
- IPT Mobility
- Stay connected, support, download, and footer

## Architecture

- Give every major scene a clear HTML section, a dedicated SCSS block/partial, and a focused JavaScript initializer when it has behavior.
- Prefer reusable HTML patterns and data-driven JavaScript for repeated cards, steps, rewards, and social items.
- Do not create one page-wide animation timeline. Compose independent scene timelines so they can be debugged and disabled separately.
- Separate layout transforms from animated transforms. Add an animation wrapper when centering, rotation, or positioning already depends on `transform`.
- Prefer normal document flow and CSS layout. Use absolute positioning only where the composition genuinely layers artwork.
- Use `position: sticky` for simple pinned layouts and the selected motion library for coordinated, scrubbed timelines.
- Do not add a smooth-scroll library until the native-scroll implementation is working and there is a demonstrated need.
- Use consistent, component-like class names and SCSS nesting kept shallow. Avoid styling through element IDs or deeply coupled descendant selectors.
- JavaScript must tolerate a scene being absent: query its root first and return without error when it is not present.
- Expose an explicit cleanup function for listeners, observers, media queries, and animation instances when the tooling or page lifecycle requires it.

## Motion rules

- Motion must support the content hierarchy rather than obscure it.
- Animate `transform` and `opacity` when possible; avoid scroll-linked layout properties such as `top`, `left`, `width`, or `height`.
- Define scroll triggers relative to scene elements, not fragile page-wide pixel offsets.
- Scope selectors and animation contexts to the owning section and clean up listeners, observers, and animation instances when reinitializing or unloading.
- Validate one complete timeline before applying the pattern across multiple elements.
- Desktop may use pinning, scrubbed timelines, and layered parallax. Mobile should use shorter travel distances, fewer pinned sequences, and simpler effects.
- Respect `prefers-reduced-motion`: important content must remain present and readable with motion disabled.
- Never make animation a prerequisite for accessing copy, navigation, or calls to action.

## Responsive implementation

- The 1512 px frame is a desktop reference, not a canvas to scale uniformly.
- Recompose sections at smaller breakpoints instead of shrinking the entire desktop layout.
- Preserve image focal points and deliberate cropping.
- Prevent horizontal overflow at every supported viewport.
- Verify at minimum a small phone, a tablet/narrow laptop, the desktop design width, and a wide desktop.
- On touch devices, avoid hover-only behavior and excessive scroll locking.

## Figma workflow

- Inspect the specific scene or sublayer in Figma before implementing it; the full frame is too large for reliable one-shot extraction.
- Use stable Figma node IDs when recording implementation notes.
- Export or reuse original assets at an appropriate resolution. Do not substitute screenshots for text or UI that should remain semantic HTML.
- Preserve text exactly unless the user approves editorial changes.
- If a motion specification, prototype, or reference video becomes available, record its mapping to scenes before changing timelines.

## Quality bar

- Use semantic HTML and accessible controls with visible keyboard focus.
- Supply meaningful alternative text for informative images and empty alt text for decorative artwork.
- Avoid unnecessary dependencies and abstractions.
- Keep components focused and code direct; do not add comments that merely restate the code.
- Optimize large raster assets and avoid loading below-the-fold media eagerly.
- Prevent cumulative layout shift by reserving media dimensions.
- No console errors, broken assets, duplicate event handlers, or animation cleanup warnings.

## Verification before considering a scene complete

- Compare the static scene against the Figma screenshot at its reference width.
- Check responsive layout at the required viewport sizes.
- Test the scene at the start, middle, and end of its scroll range.
- Test fast scrolling, reverse scrolling, refresh in the middle of the page, and browser resizing.
- Test with reduced motion enabled.
- Run the repository's available lint, typecheck, test, and production build commands.
- Report any intentional visual or motion deviation from Figma.

## Change discipline

- Keep changes scoped to the scene being implemented and preserve unrelated user work.
- Do not perform broad visual rewrites while fixing a localized issue.
- Do not commit generated screenshots, temporary exports, or diagnostic recordings unless explicitly requested.
- Do not add or replace the framework, animation stack, or scrolling library without explaining the tradeoff first.
