# Urban Anarchy — Fix Ticket & Implementation Prompt

## Objective

Fix the current Urban Anarchy website without breaking the existing brutalist design system or editorial functionality.

Prioritize:

1. route/content corrections
2. contributor updates
3. footer corrections
4. social link updates
5. responsive layout issues
6. checkout JSON error
7. imaginary/brutalist editorial naming
8. visual content integration from `moodboard_items`

---

# 1. Creative Team Routes

Update the relevant **Creative Team** routes/pages.

Under **Software Development / Web Development**, use:

**Liso Hlatshwayo**

This should be the displayed contributor/person associated with the software development and web development role.

Do not replace this name with an invented name.

---

## Other Creative Team Roles

For the following roles, replace the existing names with fictional editorial names that clearly fit the Urban Anarchy brutalist/editorial identity:

### Publisher & Product

Use an invented name with an underground editorial / brutalist publication feel.

### Magazine Editor

Use an invented name that sounds appropriate for an independent cultural magazine.

### Visual Editor

Use an invented name that sounds appropriate for an experimental visual/editorial publication.

The names must be fictional and distinctive.

Avoid generic corporate-sounding names.

Examples of naming direction:

- industrial
- underground
- art-world
- editorial
- avant-garde
- street-culture

Do not use real public figures.

---

# 2. Contributors Route

Update:

`/contributors`

Replace the current contributor names with a larger set of fictional contributors.

Create multiple imaginary Urban Anarchy contributors covering areas such as:

- music
- photography
- fashion
- art
- culture
- design
- architecture
- street culture
- opinion
- film
- technology

Each contributor should feel believable within an independent brutalist magazine.

Use fictional names only.

Give contributors meaningful editorial roles rather than filler names.

For example:

- writer
- photographer
- visual artist
- culture critic
- music editor
- fashion contributor
- documentary photographer
- design researcher

Do not use placeholder names such as:

"John Doe"
"Jane Doe"
"Test User"

---

# 3. Footer Social Media Links

Update all social media links in the footer.

Every social link should contain an Urban Anarchy branded URL/handle.

Use Urban Anarchy branding consistently, for example:

- Urban Anarchy Instagram
- Urban Anarchy X/Twitter
- Urban Anarchy TikTok
- Urban Anarchy YouTube
- Urban Anarchy Facebook
- Urban Anarchy Pinterest

The links do not need to be verified/working for this implementation.

The important requirement is that they contain an **Urban Anarchy branded destination/handle** rather than generic placeholder URLs.

For example, use the equivalent of:

`urbananarchy`

rather than:

`example.com`

or unrelated accounts.

Do not remove the links simply because they are not currently live.

---

# 4. Footer Hover Effects

Add a clear hover interaction to footer links.

When the user hovers over a footer navigation/social link:

- visual state must change
- link should become obviously interactive
- use the existing Urban Anarchy brutalist visual language
- avoid excessive rounded effects
- avoid generic Bootstrap-style hover states

Suitable effects include:

- underline animation
- text displacement
- border reveal
- slight tracking change
- subtle inversion
- editorial line animation

Maintain accessibility and keyboard focus states.

---

# 5. Footer Header Wrapping Bug

Fix the footer section heading where the final:

**"S"**

is wrapping onto a second line.

Investigate the actual cause instead of simply hiding the character.

Check:

- width constraints
- font sizing
- letter spacing
- line height
- flex/grid behavior
- responsive breakpoints
- container width
- text wrapping rules

The section header should remain visually intentional on desktop and mobile.

Do not globally disable wrapping unless that is appropriate for the component.

---

# 6. Checkout JSON Error

Fix the following runtime error:

```text
Failed to execute 'json' on 'Response':
Unexpected end of JSON input

json @ http://127.0.0.1:5173/src/pages/checkoutpage.jsx:25:7
```

The error occurs in:

`src/pages/checkoutpage.jsx`

around line 25.

Investigate why the frontend assumes the response body is valid JSON.

The implementation must safely handle:

- valid JSON responses
- empty response bodies
- HTTP errors
- backend error responses
- non-JSON responses
- network failures
- failed checkout requests

Do not blindly call:

```javascript
response.json();
```

without considering whether the server actually returned JSON.

Implement proper response handling.

For example, verify the response before parsing and provide a useful checkout error state when parsing fails.

Do not hide the underlying backend problem.

If the backend is incorrectly returning an empty/non-JSON response, fix the backend response where appropriate so frontend and backend use a consistent response contract.

---

# 7. Checkout Error States

Checkout should never crash because a response cannot be parsed.

Provide a graceful user-facing error state such as:

**"Unable to process checkout. Please try again."**

The UI should remain usable.

Do not expose raw JavaScript errors to the customer.

The console should still provide enough diagnostic information for development.

---

# 8. General API Response Safety

Review the checkout API request flow for similar unsafe assumptions.

Check:

- `fetch()`
- response status handling
- response headers
- JSON parsing
- empty response bodies
- backend error payloads

Use consistent handling for:

```text
2xx success
4xx client errors
5xx server errors
network errors
empty responses
invalid JSON
```

---

# 9. Moodboard Images

The project contains a Pinterest-inspired image folder named:

`moodboard_items`

Use these images as the visual source for the Urban Anarchy site.

Integrate appropriate images into the site where the existing layout supports them.

Use them especially for:

- hero/editorial stories
- magazine cards
- contributor imagery
- visual sections
- article imagery
- culture/fashion/art sections
- editorial feature blocks

Do not use every image automatically.

Select images based on the role they play within the editorial layout.

Do not modify the images destructively.

---

# 10. Magazine Feel

While implementing the fixes, strengthen the site's identity as an independent brutalist magazine.

Keep the existing Urban Anarchy aesthetic but make content feel more editorial.

Use:

- stronger editorial headlines
- clear article hierarchy
- category labels
- contributor attribution
- publication dates
- image-led story layouts
- asymmetric grids
- strong separators
- oversized typography where appropriate

Do not redesign the entire application while fixing bugs.

Functional fixes take priority.

---

# 11. Do Not Break Existing Functionality

Before modifying components, inspect how the existing routing and shared components work.

Do not unnecessarily replace:

- routing
- authentication
- article loading
- navigation
- footer architecture
- API contracts
- existing responsive components

Preserve existing working behavior.

Make targeted changes.

---

# 12. Acceptance Criteria

The implementation is complete when:

### Creative Team

- `/` or the relevant Creative Team route shows **Liso Hlatshwayo** under Software Development/Web Development.
- Publisher & Product has a fictional Urban Anarchy-style name.
- Magazine Editor has a fictional Urban Anarchy-style name.
- Visual Editor has a fictional Urban Anarchy-style name.

### Contributors

- `/contributors` contains multiple fictional contributors.
- Names and roles fit the Urban Anarchy editorial identity.
- No generic placeholder names remain.

### Footer

- Footer social links contain Urban Anarchy branding.
- Footer links have visible hover states.
- Footer headings do not incorrectly wrap.
- Footer remains responsive.

### Checkout

The following error no longer crashes the page:

```text
Unexpected end of JSON input
```

Checkout safely handles:

- successful JSON
- failed HTTP responses
- empty responses
- invalid JSON
- network errors

### Visual Content

- `moodboard_items` is actually used where appropriate.
- Images enhance the editorial/magazine identity.
- Existing Urban Anarchy brutalist styling remains intact.

---

# 13. QA

After implementation:

1. Run the frontend.
2. Test the Creative Team routes.
3. Test `/contributors`.
4. Test footer links and hover states.
5. Test desktop, tablet and mobile footer layouts.
6. Test checkout success.
7. Test checkout failure.
8. Test an empty API response.
9. Test an invalid/non-JSON response.
10. Check browser console for new runtime errors.
11. Verify there are no broken imports or routes.
12. Verify the `moodboard_items` assets load correctly.

Do not mark the task complete until the checkout JSON parsing error has been addressed and the affected routes/UI have been tested.
