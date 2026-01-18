# CORNERSTONE - Modern Charity Platform

A clean, minimal charity/NGO website designed with modern UI principles and visual storytelling.

## Design Overview

CORNERSTONE is a fundraising and charity platform with a contemporary, minimal aesthetic. The design emphasizes clarity, simplicity, and ease of use while maintaining visual appeal and emotional connection.

## Color Palette

- **Primary Black:** `#000000` - Navigation buttons and primary CTAs
- **Text Dark:** `#1a1a1a` - Main heading text
- **Text Gray:** `#666666` - Body text and descriptions
- **Background Light:** `#f7f7f7` - Page background
- **White:** `#FFFFFF` - Cards and content areas
- **Accent Blue:** `#5B8DEE` - Highlights and accents
- **Icon Background:** `#E8EBF0` - Icon circles and subtle backgrounds

## Typography

- **Font Family:** Space Grotesk (Google Fonts)
- Clean, modern geometric sans-serif throughout
- Font weights: 300, 400, 500, 600, 700
- Emphasis on readability and hierarchy
- Perfect for headings and body text

## Icons

- **FontAwesome 6.5.1** - Professional icon library
- All icons replaced from emojis to FontAwesome for consistency
- Scalable vector icons throughout the site
- Includes social media, action, and UI icons

## Pages

### 1. Home (`index.html`)
**Key Features:**
- Hero section with rounded corners and background image
- "Make your Impact" tagline with "Help fund it here" heading
- White "Start fundraising" CTA button
- Featured topics section with 3 cards:
  - Start fundraising → Raise money for charity
  - Browse charities → Donate to charity
  - Start crowdfunding → Raise money for your own cause
- Mini cards grid showcasing quick actions
- "What to expect" section with step-by-step guide
- "Play Your Part" section with image grid
- "Your story starts here" banner section

### 2. About (`about.html`)
**Key Features:**
- Clean hero section
- Biblical quote block (Psalm 118:22)
- Organization narrative and philosophy
- Team grid with 4 members displayed horizontally
- Core values displayed as feature cards
- Call-to-action banner

### 3. Get Involved (`involved.html`)
**COMPLETELY REDESIGNED FOR CLARITY**
**Key Features:**
- Clear 3-option overview: Donate, Volunteer, Other Ways
- Dedicated donation section with 4 tiers:
  - $10 - The Pebble (Foundation Level)
  - $50 - The Brick (Building Level)
  - $100 - The Pillar (Support Level)
  - $500+ - The Cornerstone (Transformational Level)
- Custom donation amount input
- Impact statistics section with visual icons
- Comprehensive volunteer application form with:
  - Personal information section
  - Skills & availability section
  - Clear field labels and descriptions
- Other ways to help: Share, Corporate Partnership, Planned Giving
- Final multi-CTA banner
- Everything organized with clear section IDs for navigation

### 4. Sign In (`signin.html`)
**MODERN SPLIT-SCREEN DESIGN**
**Left Side - Welcome & Features:**
- Beautiful blue gradient background with decorative circles
- "Welcome Back to CORNERSTONE" heading
- Warm welcome message
- 3 feature highlights with icons:
  - Track Your Impact
  - Manage Donations
  - Join the Community
- Biblical quote (Psalm 118:22)

**Right Side - Sign In Form:**
- Clean, focused authentication form
- Social sign-in options (Google, Facebook, Apple)
- Email/password authentication
- "Forgot password?" link
- "Remember me" checkbox
- Link to sign-up page
- Professional, minimal design

### 5. Sign Up (`signup.html`)
**MODERN SPLIT-SCREEN DESIGN**
**Left Side - Thank You & Benefits:**
- Beautiful blue gradient background
- "Join CORNERSTONE Today" heading
- Thank you message for joining
- 3 benefit highlights with icons:
  - Make an Impact
  - Secure & Transparent
  - Stay Updated
- Social proof (15,000+ members)

**Right Side - Registration Form:**
- User-friendly registration form
- Social sign-up options (Google, Facebook, Apple)
- Full name, email, password fields
- Password confirmation
- Terms & Conditions agreement
- Link to sign-in page
- Clean, modern layout

## File Structure

```
web/
├── index.html          ← Home page
├── about.html          ← About/For Charities
├── involved.html       ← Get Involved (REDESIGNED & CLEAR)
├── signin.html         ← Sign In page (NEW)
├── signup.html         ← Sign Up page (NEW)
├── README.md           ← Documentation
├── css/
│   └── style.css      ← Complete styling (960+ lines)
└── images/
    ├── hero-bg.jpg    ← Hero background image
    ├── about-bg.jpg   ← About page background
    └── README.txt     ← Image guidelines
```

## Design Features

### Clean & Minimal
- Generous white space
- Subtle shadows (`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)`)
- Rounded corners (6-20px)
- Light color palette with high contrast text

### Card-Based Layout
- Feature cards with icon circles
- Consistent padding (2rem)
- Hover effects with shadow increase
- Header section with label and icon

### Responsive Grid System
- 3-column grid for feature cards
- 4-column grid for team members
- 2-column grid for donation tiers
- Mobile-responsive breakpoints at 768px and 1024px

### Visual Elements
- SVG icons for scalability
- Circular icon backgrounds
- Gradient backgrounds for banners
- Clean typography hierarchy

## Key Components

### Navigation
- Logo: "CORNERSTONE" (left-aligned)
- Links: How it works, For charities, For individuals, Sign in
- Black "Get Start" button (right-aligned)
- Sticky header with 1px border

### Hero Section
- Max-width 1280px container
- Rounded 20px corners
- Height: 480px
- Background image with gradient overlay
- Centered content with white text

### Feature Cards
```css
- Background: white
- Padding: 2rem
- Border-radius: 12px
- Shadow: subtle (0 4px 12px rgba(0,0,0,0.08))
- Hover: shadow increase
```

### Forms
- Clean input fields with 1px border
- Focus state: border changes to black
- Consistent padding: 0.75rem 1rem
- Full-width submit buttons

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile, tablet, and desktop
- CSS Grid and Flexbox layout
- No JavaScript required for basic functionality

## Setup Instructions

1. Open `index.html` in your web browser
2. Navigate between pages using the header navigation
3. No server or build process required - pure HTML/CSS

## Customization

### Change Colors
Edit CSS variables in `style.css` (lines 8-18):
```css
:root {
  --primary-black: #000000;
  --accent-blue: #5B8DEE;
  /* ... etc */
}
```

### Add Images
1. Place images in `/images` folder
2. Update background URLs in CSS or HTML
3. Recommended size: 1920x1080px for hero images

### Modify Layout
- Feature grid: `.feature-grid` (3 columns)
- Team grid: `.team-grid` (4 columns)
- Donation grid: `.donation-grid` (2 columns)

## Design Principles

1. **Clarity First:** Every element has a clear purpose
2. **Visual Hierarchy:** Typography and spacing guide the eye
3. **Consistency:** Repeated patterns create familiarity
4. **Accessibility:** High contrast ratios and readable fonts
5. **Simplicity:** Remove unnecessary decoration

## Future Enhancements

- [ ] Add JavaScript for mobile menu toggle
- [ ] Integrate payment processing (Stripe/PayPal)
- [ ] Add form validation and submission handling
- [ ] Implement smooth scroll animations
- [ ] Add campaign progress tracking
- [ ] Create admin dashboard
- [ ] Multilingual support

## Credits

**Design Inspiration:** Modern charity platforms with clean aesthetics  
**Typography:** Space Grotesk (Google Fonts)  
**Icons:** FontAwesome 6.5.1  
**Layout:** CSS Grid and Flexbox

## Recent Updates (Latest Version)

✅ **Font Updated:** Now using Space Grotesk for better readability  
✅ **Modern Split-Screen Auth:** Beautiful split-screen sign-in/sign-up pages  
✅ **Welcome Messages:** Engaging welcome and thank you messages on auth pages  
✅ **Get Involved Page:** Completely redesigned for maximum clarity  
✅ **Better Organization:** Clear sections with IDs for easy navigation  
✅ **All Links Working:** Proper navigation throughout the site  
✅ **FontAwesome Icons:** All emojis replaced with professional icons  
✅ **Responsive Design:** Mobile-friendly authentication pages  

---

*Building foundations for brighter futures.*  
**CORNERSTONE** - Every contribution matters, every life is valuable.
