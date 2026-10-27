// Niche website templates: one page per business type at /templates/<slug>.
// Each entry is written for its niche (no shared filler), so every page earns
// its place. `example` is a real site built with Youmake, shown only when set:
// add one per niche once its owner has agreed to be featured.

export interface TemplateExample {
  /** Live URL of a site built with Youmake. */
  url: string;
  /** Who it's for, e.g. "Maya & Jon's wedding". */
  name: string;
  /** Screenshot under public/, e.g. /images/templates/wedding.webp. */
  image?: string;
}

export interface NicheTemplate {
  slug: string;
  /** Short niche name used in headings, e.g. "Wedding". */
  name: string;
  /** Primary keyword first, then variants (from OpenSEO, US, Oct 2026). */
  keywords: string[];
  title: string;
  description: string;
  intro: string;
  /** Pages or sections the site needs, in order. */
  sections: { name: string; purpose: string }[];
  features: string[];
  /** Ready-to-paste Youmake prompt. */
  prompt: string;
  tips: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  related: string[];
  example?: TemplateExample;
  updated: string;
}

export const templates: NicheTemplate[] = [
  {
    slug: 'wedding-website',
    name: 'Wedding',
    keywords: ['wedding website builder', 'wedding website template', 'wedding website design', 'wedding website'],
    title: 'Wedding Website Template: Build Yours With AI',
    description: 'A wedding website template you build by describing it: RSVP form, schedule, travel info and registry links, on your own domain. Copy the prompt and make it yours.',
    intro: 'Your wedding website does three jobs: tell guests where and when, collect RSVPs without a spreadsheet of texts, and answer the questions you would otherwise get fifty times. Describe your wedding once and Youmake builds the site around it, with your names, colors and details.',
    sections: [
      { name: 'Home', purpose: 'Your names, the date, the city and a photo, with a countdown and an RSVP button.' },
      { name: 'Our story', purpose: 'How you met, a few photos, and the proposal story your guests will ask about anyway.' },
      { name: 'Schedule', purpose: 'Ceremony, reception and any welcome drinks or brunch, each with time, venue and dress code.' },
      { name: 'Travel and stay', purpose: 'Venue addresses with map links, hotel blocks with booking codes, and airport or parking notes.' },
      { name: 'RSVP', purpose: 'A form with attendance, meal choice, dietary needs and plus-ones, with a clear deadline.' },
      { name: 'Registry and FAQ', purpose: 'Links to your registries and answers on kids, dress code, photos and gifts.' },
    ],
    features: [
      'RSVP form that stores answers in a database you can export, not just an email inbox',
      'Mobile-first layout: most guests open the link from a text message',
      'Optional password so only invited guests see the details',
      'Your own domain, such as mayaandjon.com, instead of a long platform URL',
    ],
    prompt: 'Build a wedding website for Maya and Jon, getting married on June 14, 2027 in Santa Barbara, California. Pages: Home with our names, date, a countdown and an RSVP button; Our Story with three short paragraphs and a photo grid; Schedule with the welcome drinks (Friday 7pm), ceremony (Saturday 4pm) and reception (Saturday 6pm), each with venue, address and dress code; Travel with two hotel blocks and a map link for each venue; RSVP form with name, attending yes/no, meal choice (fish, beef, vegetarian), dietary notes and plus-one name, deadline May 1; Registry with two links; FAQ about kids, parking and photos. Elegant style: ivory background, sage green accents, a serif font for headings. Mobile-first.',
    tips: [
      { title: 'Put the RSVP deadline everywhere', body: 'On the home page, the RSVP page and the confirmation message. Caterers need final numbers about three to four weeks out, so set your deadline before that.' },
      { title: 'Write the FAQ before guests ask', body: 'Kids, plus-ones, parking, dress code and whether you want phones away during the ceremony. Every answer on the site is a text you don\'t have to send.' },
      { title: 'Keep the data, not just the page', body: 'Store RSVPs in a real database so you can export the guest list for the caterer and the seating chart, rather than copying answers out of emails.' },
    ],
    faq: [
      { q: 'Can I make a wedding website with AI?', a: 'Yes. Describe your wedding (names, date, venues, the pages you want and the style) and Youmake builds the full site, which you then refine by chatting.' },
      { q: 'Can I use my own domain for my wedding website?', a: 'Yes. Youmake publishes to your own custom domain, so guests get a short, memorable link.' },
      { q: 'Is there a free wedding website template?', a: 'Youmake has no free plan; you can try it for 3 days for $1. The prompt on this page is free to copy and use.' },
    ],
    related: ['photography-website', 'personal-website', 'landing-page'],
    updated: '2026-10-27',
  },
  {
    slug: 'portfolio-website',
    name: 'Portfolio',
    keywords: ['portfolio website template', 'portfolio website builder', 'portfolio website examples', 'ai portfolio generator'],
    title: 'Portfolio Website Template: Build Yours With AI',
    description: 'A portfolio website template built from a description: project case studies, about, services and contact, fast and on your own domain. Copy the prompt and start.',
    intro: 'A portfolio has one job: get the right person to contact you. That means a few strong projects explained well, a clear line about what you do, and an obvious way to reach you. Describe your work and Youmake builds a portfolio around it that you can keep editing as you add projects.',
    sections: [
      { name: 'Hero', purpose: 'One sentence on what you do and for whom, with your best project image and a contact button.' },
      { name: 'Selected work', purpose: 'Four to six projects as cards, each opening a case study.' },
      { name: 'Case study pages', purpose: 'The problem, your role, the process and the result, with images and one number if you have it.' },
      { name: 'About', purpose: 'A short bio, a photo and the tools or skills clients look for.' },
      { name: 'Services or rates', purpose: 'What you take on and how to start, so the right clients self-select.' },
      { name: 'Contact', purpose: 'A short form or a booking link, plus your email and profiles.' },
    ],
    features: [
      'Case study template you can duplicate for every new project',
      'Fast-loading, optimized images, since a portfolio is mostly pictures',
      'A contact form that lands in your inbox, or a calendar booking link',
      'Your own domain and the code exported to GitHub, so the site is yours',
    ],
    prompt: 'Build a portfolio website for Lena Ortiz, a freelance brand designer in Austin who works with food and beverage startups. Hero: "Brand identities for food and drink startups" with a contact button. Selected work: six project cards (name, client type, one image) that open case study pages with sections for the brief, my role, the process (3 images) and the result. About page with a short bio and photo. Services page with three packages (logo, full identity, packaging) and "starting at" prices. Contact page with a form (name, email, budget range, project details). Minimal style: off-white background, black text, one terracotta accent color, large images. Mobile-friendly.',
    tips: [
      { title: 'Fewer, better projects', body: 'Four great case studies beat twenty thumbnails. Pick the work that matches the clients you want next.' },
      { title: 'Explain the thinking', body: 'Clients hire your judgment, not just your output. One paragraph on the problem and one on your decision makes a case study.' },
      { title: 'Make contact effortless', body: 'Put a contact button in the header and at the end of every case study, not only on the contact page.' },
    ],
    faq: [
      { q: 'How do I make a portfolio website with AI?', a: 'Describe who you are, the work you want to show and the style you like. Youmake builds the pages, and you add or swap projects by asking in chat.' },
      { q: 'What should a portfolio website include?', a: 'A one-line positioning statement, four to six case studies, an about page, your services and a clear way to contact you.' },
      { q: 'Can I export my portfolio code?', a: 'Yes. Youmake lets you export the project code or sync it to GitHub, and publish to your own domain.' },
    ],
    related: ['personal-website', 'photography-website', 'landing-page'],
    updated: '2026-10-27',
  },
  {
    slug: 'landing-page',
    name: 'Landing page',
    keywords: ['landing page template', 'landing page templates', 'landing page examples', 'ai landing page generator'],
    title: 'Landing Page Template: Build One With AI in Minutes',
    description: 'A landing page template built from a description: headline, benefits, social proof, pricing and a signup form that converts. Copy the prompt and launch your page.',
    intro: 'A landing page has one goal, and every section should push toward it: a waitlist signup, a demo request or a purchase. Describe your product and your goal, and Youmake builds a page with the structure that converts, which you then sharpen by chatting.',
    sections: [
      { name: 'Hero', purpose: 'A specific headline about the outcome, one supporting line, and a single call to action.' },
      { name: 'Problem', purpose: 'The pain your visitor recognizes, in their words.' },
      { name: 'How it works', purpose: 'Three steps, so the product feels simple.' },
      { name: 'Benefits', purpose: 'Three to four outcomes, each with a short proof point.' },
      { name: 'Social proof', purpose: 'Testimonials, customer logos or a real number.' },
      { name: 'Pricing or offer', purpose: 'What it costs or what they get, with the same call to action again.' },
      { name: 'FAQ and final CTA', purpose: 'Answer the objections, then ask one more time.' },
    ],
    features: [
      'One goal and one primary button, repeated down the page',
      'A signup or waitlist form that saves leads to a database',
      'Fast load and a clean mobile layout, since most ad traffic is mobile',
      'Payments with Stripe if the page sells directly',
    ],
    prompt: 'Build a landing page for "Shelfie", an app that tells home cooks what they can make with what is already in their pantry. Goal: waitlist signups. Hero: "Cook dinner from what you already have" with an email signup. Sections: the problem (wasted groceries, no ideas at 6pm), how it works in three steps (scan your pantry, get recipes, cook), four benefits with icons, three short testimonials from beta users, a pricing teaser (free during beta), an FAQ with five questions, and a final signup form. Save signups to a database. Bright, friendly style: white background, tomato red accents, rounded cards. Mobile-first.',
    tips: [
      { title: 'One page, one goal', body: 'Every extra link is an exit. Remove navigation that leads away from the signup.' },
      { title: 'Lead with the outcome', body: 'Visitors care about what changes for them, not your feature list. Put the result in the headline.' },
      { title: 'Repeat the call to action', body: 'Add the same button after the benefits, after the proof and at the end, with the same words each time.' },
    ],
    faq: [
      { q: 'Can AI build a landing page for me?', a: 'Yes. Describe the product, the audience and the goal, and Youmake builds the page, including a working signup form.' },
      { q: 'What makes a good landing page?', a: 'A specific headline, one goal, clear benefits, real proof and the same call to action repeated down the page.' },
      { q: 'Can my landing page take payments?', a: 'Yes. Connect Stripe in Youmake to take payments or deposits directly from the page.' },
    ],
    related: ['portfolio-website', 'ecommerce-website', 'personal-website'],
    updated: '2026-10-27',
  },
  {
    slug: 'nonprofit-website',
    name: 'Nonprofit',
    keywords: ['nonprofit website builder', 'nonprofit website design', 'nonprofit website template', 'charity website template'],
    title: 'Nonprofit Website Template: Build Yours With AI',
    description: 'A nonprofit website template built from a description: mission, programs, impact, events and a donate button, on your own domain. Copy the prompt and launch.',
    intro: 'A nonprofit site has to earn trust in seconds: what you do, who it helps, and proof that donations matter. Describe your organization and Youmake builds a site that tells that story and makes giving and volunteering easy.',
    sections: [
      { name: 'Home', purpose: 'Your mission in one sentence, a real photo, an impact number and a donate button.' },
      { name: 'About and team', purpose: 'Your story, your board and staff, and how you are governed.' },
      { name: 'Programs', purpose: 'Each program with who it serves, where, and its results.' },
      { name: 'Impact', purpose: 'Numbers, stories and annual reports, so donors see where money goes.' },
      { name: 'Get involved', purpose: 'Volunteer sign-up, events and partner information.' },
      { name: 'Donate', purpose: 'One-time and monthly giving, with what each amount funds.' },
    ],
    features: [
      'Donation payments through Stripe, with one-time and monthly options',
      'Volunteer and event sign-up forms that save to a database',
      'Clear impact reporting: numbers, stories and downloadable reports',
      'Accessible design: readable fonts, good contrast and alt text',
    ],
    prompt: 'Build a website for "Green Blocks", a nonprofit in Detroit that turns vacant lots into community gardens. Home: mission ("Growing food and neighbors on Detroit\'s empty lots"), a hero photo, three impact numbers (lots restored, pounds of food grown, volunteers) and a Donate button. About page with our story and a team grid. Programs page with three programs (garden builds, youth farming, free produce stands). Impact page with stories and a link to the annual report. Get Involved page with a volunteer sign-up form (name, email, availability) and upcoming workdays. Donate page with $25, $50, $100 and custom amounts, one-time or monthly, explaining what each amount funds. Warm, hopeful style: cream background, deep green and sunflower yellow. Accessible and mobile-friendly.',
    tips: [
      { title: 'Show impact, not activity', body: '"1,200 families fed" lands harder than "we run food programs". Put one number on the home page.' },
      { title: 'Tie amounts to outcomes', body: 'Tell donors what $25 or $100 does. Specific outcomes make it easier to give.' },
      { title: 'Make volunteering one form', body: 'Name, email and availability. Ask the rest later, by email.' },
    ],
    faq: [
      { q: 'How do I build a nonprofit website with AI?', a: 'Describe your mission, programs and how people can help. Youmake builds the site, and you connect Stripe to accept donations.' },
      { q: 'Can a nonprofit website accept donations?', a: 'Yes. Connect Stripe in Youmake to take one-time or recurring donations on your own domain.' },
      { q: 'What pages does a nonprofit website need?', a: 'Home, about, programs, impact, ways to get involved, and a donate page.' },
    ],
    related: ['church-website', 'landing-page', 'restaurant-website'],
    updated: '2026-10-27',
  },
  {
    slug: 'church-website',
    name: 'Church',
    keywords: ['church website template', 'church website builder', 'church website design'],
    title: 'Church Website Template: Build Yours With AI',
    description: 'A church website template built from a description: service times, sermons, ministries, events and online giving, easy to update. Copy the prompt and start.',
    intro: 'Most people visit a church website before they visit the church. They want service times, the address, what to expect and whether they will feel welcome. Describe your church and Youmake builds a site that answers those questions first and is easy for your team to keep current.',
    sections: [
      { name: 'Home', purpose: 'Service times, address and a warm welcome for first-time visitors.' },
      { name: 'Plan your visit', purpose: 'What a Sunday looks like, parking, kids\' programs and what to wear.' },
      { name: 'Sermons', purpose: 'Recent messages with video or audio, sorted by series.' },
      { name: 'Ministries', purpose: 'Kids, youth, small groups and outreach, each with a contact.' },
      { name: 'Events', purpose: 'Upcoming events with dates, details and sign-up.' },
      { name: 'Give', purpose: 'Online giving, one-time or recurring.' },
    ],
    features: [
      'Service times and address on every page, in the footer',
      'A "Plan your visit" page written for newcomers',
      'Online giving through Stripe',
      'Event and small-group sign-up forms',
    ],
    prompt: 'Build a website for Grace Community Church in Columbus, Ohio. Home: "You\'re welcome here" with service times (Sundays 9am and 11am), the address and a Plan Your Visit button. Plan Your Visit page: what a service is like, parking, kids\' check-in and dress code. Sermons page with a grid of recent messages (title, speaker, date, video link) grouped by series. Ministries page: kids, youth, small groups and local outreach, each with a short description and contact. Events page with upcoming events and a sign-up form. Give page for online giving, one-time or monthly. Service times and address in the footer of every page. Warm, welcoming style: white and soft blue, friendly photos, easy-to-read fonts.',
    tips: [
      { title: 'Write for the first-time visitor', body: 'Members already know the schedule. The site is mostly for someone deciding whether to come this Sunday.' },
      { title: 'Keep times and address everywhere', body: 'Put them in the footer so they are one glance away on every page.' },
      { title: 'Make updating easy', body: 'Pick one person to post sermons and events weekly. A stale events page signals a quiet church.' },
    ],
    faq: [
      { q: 'Can I build a church website with AI?', a: 'Yes. Describe your church, services and ministries, and Youmake builds the site; you update events and sermons by chatting.' },
      { q: 'Can people give online through the website?', a: 'Yes. Connect Stripe in Youmake to accept one-time or recurring giving.' },
      { q: 'What should a church website include?', a: 'Service times, address, a plan-your-visit page, sermons, ministries, events and a way to give.' },
    ],
    related: ['nonprofit-website', 'landing-page', 'personal-website'],
    updated: '2026-10-27',
  },
  {
    slug: 'ecommerce-website',
    name: 'Ecommerce',
    keywords: ['ecommerce website template', 'online store template', 'ecommerce website builder'],
    title: 'Ecommerce Website Template: Build a Store With AI',
    description: 'An ecommerce website template built from a description: product catalog, product pages, cart and Stripe checkout, on your own domain. Copy the prompt and start selling.',
    intro: 'A small online store needs fewer things than the big platforms sell you: good product pages, a simple cart, a checkout you trust and clear shipping and returns. Describe what you sell and Youmake builds the store, with payments through your own Stripe account.',
    sections: [
      { name: 'Home', purpose: 'Your best products, what makes the brand different, and a shop button.' },
      { name: 'Shop', purpose: 'All products with filters by category and price.' },
      { name: 'Product pages', purpose: 'Photos, description, variants, price, reviews and add-to-cart.' },
      { name: 'Cart and checkout', purpose: 'A short cart and a Stripe checkout.' },
      { name: 'About', purpose: 'Who makes the products and why, which builds trust.' },
      { name: 'Shipping, returns and contact', purpose: 'Clear policies and a way to reach you.' },
    ],
    features: [
      'Stripe checkout connected to your own account',
      'Products and orders stored in a database you control (for example Supabase)',
      'Product variants such as size or color',
      'Fast, mobile-first product pages with optimized images',
    ],
    prompt: 'Build an online store for "Clay & Co", a small ceramics studio in Portland selling handmade mugs, bowls and planters. Home: a hero with our best-selling mug, three featured products and a short brand story. Shop page with category filters (mugs, bowls, planters) and price sort. Product pages with a photo gallery, description, glaze color variants, price, stock count and add to cart. Cart and checkout with Stripe. About page about the studio. Shipping and returns page, and a contact form. Store products and orders in a database. Earthy, minimal style: warm white, clay brown and a muted green.',
    tips: [
      { title: 'Product photos do the selling', body: 'Use three or more photos per product, including one in use. It answers questions before they are asked.' },
      { title: 'Show shipping costs early', body: 'Surprise costs at checkout are the top reason carts are abandoned. Put shipping info on the product page.' },
      { title: 'Start small', body: 'Launch with your best ten products and add the rest once orders come in.' },
    ],
    faq: [
      { q: 'Can AI build an ecommerce website?', a: 'Yes. Describe your products and brand, and Youmake builds the store; connect Stripe for checkout and a database such as Supabase for products and orders.' },
      { q: 'Do I need Shopify to sell online?', a: 'No. A store built with Youmake takes payments through your own Stripe account and runs on your own domain.' },
      { q: 'Can I export my store\'s code?', a: 'Yes. Youmake lets you export the code or sync it to GitHub.' },
    ],
    related: ['landing-page', 'restaurant-website', 'portfolio-website'],
    updated: '2026-10-27',
  },
  {
    slug: 'real-estate-website',
    name: 'Real estate',
    keywords: ['real estate website template', 'real estate website builder', 'real estate agent website'],
    title: 'Real Estate Website Template: Build Yours With AI',
    description: 'A real estate website template built from a description: listings, neighborhood guides, a home valuation form and agent bio, on your own domain. Copy the prompt.',
    intro: 'Buyers and sellers use an agent\'s website to decide whether to call. The best ones show local expertise, current listings and an easy way to ask for a home valuation. Describe your market and Youmake builds the site around it.',
    sections: [
      { name: 'Home', purpose: 'Your area, a featured listing and a "What\'s my home worth?" button.' },
      { name: 'Listings', purpose: 'Current properties with photos, price, beds, baths and square footage.' },
      { name: 'Listing pages', purpose: 'A gallery, details, a map and a showing request form.' },
      { name: 'Neighborhoods', purpose: 'Guides to the areas you sell in: schools, prices, lifestyle.' },
      { name: 'Sell with me', purpose: 'Your process and a home valuation request form.' },
      { name: 'About and reviews', purpose: 'Your bio, sales record and client reviews.' },
    ],
    features: [
      'Listings stored in a database you can update yourself',
      'Showing-request and home-valuation lead forms',
      'Neighborhood guide pages, which help you rank for local searches',
      'Your own domain and branding, separate from your brokerage page',
    ],
    prompt: 'Build a real estate website for Daniel Kim, a realtor in Raleigh, North Carolina. Home: "Raleigh homes, honest advice" with a featured listing, three neighborhoods and a "What\'s my home worth?" button. Listings page with property cards (photo, price, beds, baths, square feet, neighborhood) and filters. Listing detail pages with a photo gallery, description, map and a showing request form. Neighborhood guides for North Hills, Five Points and Cary. Sell With Me page with my process and a home valuation form (address, beds, baths, timeline). About page with my bio, sales stats and client reviews. Store listings and leads in a database. Clean, trustworthy style: white, navy and a gold accent.',
    tips: [
      { title: 'Own your neighborhoods', body: 'A guide page for each area you know well is useful to buyers and helps you show up in local searches.' },
      { title: 'Lead with a valuation offer', body: 'Sellers want to know what their home is worth. A short form is the best lead source on the site.' },
      { title: 'Keep listings current', body: 'Remove sold homes or mark them sold. Stale listings cost trust.' },
    ],
    faq: [
      { q: 'Can I build a real estate website with AI?', a: 'Yes. Describe your market and listings, and Youmake builds the site with listing pages and lead forms backed by a database.' },
      { q: 'What should a realtor website include?', a: 'Listings, neighborhood guides, a home valuation form, your bio, reviews and clear contact options.' },
      { q: 'Can I use my own domain?', a: 'Yes. Youmake publishes to your own custom domain.' },
    ],
    related: ['construction-website', 'landing-page', 'personal-website'],
    updated: '2026-10-27',
  },
  {
    slug: 'restaurant-website',
    name: 'Restaurant',
    keywords: ['restaurant website template', 'restaurant website builder', 'restaurant website design'],
    title: 'Restaurant Website Template: Build Yours With AI',
    description: 'A restaurant website template built from a description: menu, hours, location, reservations and online ordering links, mobile-first. Copy the prompt and launch.',
    intro: 'People open a restaurant website on their phone with one of four questions: what\'s on the menu, are you open, where are you, and can I book. Describe your restaurant and Youmake builds a fast, mobile-first site that answers all four on the first screen.',
    sections: [
      { name: 'Home', purpose: 'A hero photo, today\'s hours, the address and buttons to book or order.' },
      { name: 'Menu', purpose: 'The menu as real text with prices and dietary labels, not a PDF.' },
      { name: 'Reservations', purpose: 'A booking form, or a link to your reservation system.' },
      { name: 'About', purpose: 'The chef, the story and what makes the food yours.' },
      { name: 'Private events', purpose: 'Group dining and catering with an inquiry form.' },
      { name: 'Location and contact', purpose: 'Map, parking, phone and opening hours.' },
    ],
    features: [
      'Menu as searchable text, so search engines and customers can read it',
      'Hours, address and phone on the first screen',
      'Reservation or catering inquiry forms that save to a database',
      'Fast mobile layout with tap-to-call',
    ],
    prompt: 'Build a website for "Nonna Rosa", a family Italian restaurant in Chicago\'s Little Italy. Home: a hero photo of fresh pasta, today\'s hours, the address, and Book a Table and Order Pickup buttons. Menu page as text (not PDF) with sections for antipasti, pasta, mains and desserts, prices, and vegetarian and gluten-free labels. Reservations page with a form (date, time, party size, name, phone). About page with the family story and the chef. Private Events page with a group dining inquiry form. Location page with a map, parking info and hours. Tap-to-call phone number in the header on mobile. Warm, rustic style: cream, deep red and olive green, a classic serif font.',
    tips: [
      { title: 'Never use a PDF menu', body: 'Text menus load faster on phones, can be read by search engines, and are easier to update.' },
      { title: 'Hours on the first screen', body: '"Are they open now?" is the most common question. Answer it without a scroll.' },
      { title: 'Keep the menu current', body: 'An old price or a dish you dropped frustrates guests. Update it whenever the menu changes.' },
    ],
    faq: [
      { q: 'Can AI build a restaurant website?', a: 'Yes. Describe your restaurant, menu and the actions you want (book, order, call), and Youmake builds a mobile-first site.' },
      { q: 'Should my menu be a PDF?', a: 'No. A text menu loads faster on phones and can be found by search engines.' },
      { q: 'Can I take reservations on my website?', a: 'Yes. Youmake can build a reservation form that saves bookings to a database, or link to the system you already use.' },
    ],
    related: ['ecommerce-website', 'landing-page', 'wedding-website'],
    updated: '2026-10-27',
  },
  {
    slug: 'photography-website',
    name: 'Photography',
    keywords: ['photography website template', 'photographer website builder', 'photography portfolio website'],
    title: 'Photography Website Template: Build Yours With AI',
    description: 'A photography website template built from a description: full-screen galleries, packages, a booking form and client reviews, on your own domain. Copy the prompt.',
    intro: 'A photographer\'s website is judged in the first image. It needs big, fast galleries, clear packages and an easy way to book. Describe your specialty and Youmake builds a site that puts your photos first.',
    sections: [
      { name: 'Home', purpose: 'A full-width signature image, your specialty and a booking button.' },
      { name: 'Galleries', purpose: 'Collections by type (weddings, portraits, brands), each with a lightbox.' },
      { name: 'Packages', purpose: 'What each package includes and its starting price.' },
      { name: 'About', purpose: 'Your photo, your approach and where you work.' },
      { name: 'Reviews', purpose: 'Client testimonials with a photo from each shoot.' },
      { name: 'Book a session', purpose: 'A booking inquiry form with date, type and location.' },
    ],
    features: [
      'Large, optimized images that still load fast on phones',
      'Gallery collections with a full-screen lightbox',
      'Booking inquiry form that saves to a database',
      'Deposits through Stripe when a client books',
    ],
    prompt: 'Build a website for Ava Chen Photography, a wedding and portrait photographer in Seattle. Home: a full-width hero image, "Natural, candid wedding photography in the Pacific Northwest" and a Check My Availability button. Galleries page with three collections (weddings, engagements, family portraits) using a masonry grid and a full-screen lightbox. Packages page with three wedding packages and starting prices. About page with my photo and approach. Reviews page with five testimonials. Book page with an inquiry form (names, date, venue, package, message) and an option to pay a deposit with Stripe. Minimal style that lets the photos lead: white space, thin black serif headings.',
    tips: [
      { title: 'Curate hard', body: 'Show your best 20 images per collection, not 200. Visitors judge you by your weakest photo.' },
      { title: 'Compress, don\'t shrink', body: 'Use large images, optimized for the web, so galleries stay sharp without loading slowly.' },
      { title: 'Show starting prices', body: 'A "starting at" price filters inquiries to clients who fit your budget.' },
    ],
    faq: [
      { q: 'Can I build a photography website with AI?', a: 'Yes. Describe your specialty, collections and packages, and Youmake builds the galleries, booking form and pages.' },
      { q: 'Can clients book and pay a deposit on my site?', a: 'Yes. Youmake can build a booking form and take deposits through your own Stripe account.' },
      { q: 'Can I use my own domain?', a: 'Yes. Youmake publishes to your own custom domain.' },
    ],
    related: ['portfolio-website', 'wedding-website', 'personal-website'],
    updated: '2026-10-27',
  },
  {
    slug: 'personal-website',
    name: 'Personal',
    keywords: ['personal website template', 'resume website template', 'personal website builder'],
    title: 'Personal Website Template: Build Yours With AI',
    description: 'A personal website template built from a description: bio, resume, projects, writing and contact, on your own domain. Copy the prompt and have it live today.',
    intro: 'A personal website is the page that comes up when someone searches your name: a recruiter, a client or a conference organizer. It should say who you are, what you have done and how to reach you. Describe yourself and Youmake builds it.',
    sections: [
      { name: 'Home', purpose: 'Your name, a one-line description, a photo and links to your profiles.' },
      { name: 'About', purpose: 'A short bio in your own voice.' },
      { name: 'Resume', purpose: 'Experience, education and skills, with a downloadable PDF.' },
      { name: 'Projects', purpose: 'Things you built, wrote or led, each with a link.' },
      { name: 'Writing or talks', purpose: 'Articles, podcasts or talks, if you have them.' },
      { name: 'Contact', purpose: 'A short form or your email.' },
    ],
    features: [
      'Your own domain, ideally yourname.com',
      'A resume section that is real text, not only a PDF',
      'Fast and simple, so it works on every phone',
      'Easy to update by chatting when your role changes',
    ],
    prompt: 'Build a personal website for Sam Rivera, a product manager in New York who writes about AI products. Home: my name, "Product manager building AI tools people actually use", a photo and links to LinkedIn and X. About page with a short bio. Resume page with experience (three roles), education and skills, plus a Download PDF button. Projects page with four project cards (title, one line, link). Writing page listing my articles with dates. Contact page with a short form. Clean, modern style: white, charcoal text, one blue accent, lots of white space.',
    tips: [
      { title: 'Buy your name as a domain', body: 'yourname.com is the easiest link to share and the strongest page for searches of your name.' },
      { title: 'Write the bio in first person', body: 'It reads warmer and is easier to adapt for talks and profiles.' },
      { title: 'Keep it current', body: 'Update your role and projects when they change; an outdated site looks abandoned.' },
    ],
    faq: [
      { q: 'How do I make a personal website with AI?', a: 'Describe who you are, your experience and the pages you want, and Youmake builds the site, which you can update by chatting.' },
      { q: 'What should a personal website include?', a: 'A short bio, your resume, projects or writing, and a way to contact you.' },
      { q: 'Can I put my resume on my website?', a: 'Yes. Add it as a text page and include a downloadable PDF.' },
    ],
    related: ['portfolio-website', 'photography-website', 'landing-page'],
    updated: '2026-10-27',
  },
  {
    slug: 'construction-website',
    name: 'Construction',
    keywords: ['construction website template', 'construction website builder', 'construction company website'],
    title: 'Construction Website Template: Build Yours With AI',
    description: 'A construction company website template built from a description: services, project gallery, service area and a quote request form. Copy the prompt and win more bids.',
    intro: 'Homeowners and developers check a contractor\'s website to answer one question: can I trust them with my project? Licenses, past work and reviews answer it. Describe your company and Youmake builds a site that shows them and collects quote requests.',
    sections: [
      { name: 'Home', purpose: 'What you build, your service area, a project photo and a quote button.' },
      { name: 'Services', purpose: 'Each service (new builds, remodels, additions) with its own section.' },
      { name: 'Projects', purpose: 'Before-and-after galleries with the scope and timeline.' },
      { name: 'About', purpose: 'Your team, years in business, licenses and insurance.' },
      { name: 'Reviews', purpose: 'Client testimonials, ideally with project photos.' },
      { name: 'Request a quote', purpose: 'A form with project type, budget range, timeline and photos.' },
    ],
    features: [
      'Quote request form that saves leads to a database',
      'Before-and-after project galleries',
      'License, insurance and warranty information shown clearly',
      'Service area page for local searches',
    ],
    prompt: 'Build a website for "Summit Builders", a residential construction company in Denver, Colorado. Home: "Custom homes and remodels across the Denver metro" with a project photo, three services and a Request a Quote button. Services page: custom homes, kitchen and bath remodels, home additions, each with a description and photos. Projects page with before-and-after galleries, each with scope and timeline. About page with the team, 18 years in business, license number and insurance. Reviews page with testimonials. Request a Quote form (name, phone, address, project type, budget range, timeline, photo upload). Store quote requests in a database. Solid, professional style: white, slate gray and safety orange.',
    tips: [
      { title: 'Show proof of trust', body: 'License number, insurance and years in business belong on the home page, not buried on About.' },
      { title: 'Before and after sells', body: 'Pairs of photos show your work faster than any description.' },
      { title: 'Ask for the details you need', body: 'Project type, budget range and timeline on the quote form help you prioritize the right leads.' },
    ],
    faq: [
      { q: 'Can AI build a construction company website?', a: 'Yes. Describe your services, area and past projects, and Youmake builds the site with a quote form backed by a database.' },
      { q: 'What should a contractor website include?', a: 'Services, a project gallery, licenses and insurance, reviews, your service area and a quote request form.' },
      { q: 'Can I use my own domain?', a: 'Yes. Youmake publishes to your own custom domain.' },
    ],
    related: ['plumbing-website', 'real-estate-website', 'landing-page'],
    updated: '2026-10-27',
  },
  {
    slug: 'plumbing-website',
    name: 'Plumbing',
    keywords: ['plumbing website design', 'plumbing website template', 'plumber website builder'],
    title: 'Plumbing Website Template: Build Yours With AI',
    description: 'A plumbing website template built from a description: emergency call button, services, service area, reviews and online booking. Copy the prompt and get more calls.',
    intro: 'Most people who visit a plumber\'s website have a problem right now. The site has to show the phone number, whether you handle emergencies, and that you serve their area, in the first few seconds. Describe your business and Youmake builds a site designed for that moment.',
    sections: [
      { name: 'Home', purpose: 'A tap-to-call phone number, "24/7 emergency service" if you offer it, and your service area.' },
      { name: 'Services', purpose: 'Leaks, drains, water heaters, repiping and installations, each with a short page.' },
      { name: 'Service area', purpose: 'The towns and neighborhoods you cover, for local searches.' },
      { name: 'Pricing', purpose: 'Call-out fees or "free estimates", so callers know what to expect.' },
      { name: 'Reviews', purpose: 'Recent customer reviews with first names and towns.' },
      { name: 'Book service', purpose: 'An online booking form for non-emergency jobs.' },
    ],
    features: [
      'Tap-to-call button fixed on mobile screens',
      'Service area pages for every town you cover',
      'Booking form that saves jobs to a database',
      'License and insurance shown on every page',
    ],
    prompt: 'Build a website for "FlowRight Plumbing", a licensed plumber in Phoenix, Arizona offering 24/7 emergency service. Home: a large tap-to-call phone number, "24/7 emergency plumbing in Phoenix and Scottsdale", three trust badges (licensed, insured, upfront pricing) and a Book Service button. Services page with sections for leak repair, drain cleaning, water heaters and repiping. Service Area page listing Phoenix, Scottsdale, Tempe and Mesa. Pricing page explaining our call-out fee and free estimates. Reviews page with six reviews. Book Service form (name, phone, address, problem, preferred time) saved to a database. Keep the phone number fixed at the bottom of the screen on mobile. Clear, trustworthy style: white, deep blue and a bright accent for the call button.',
    tips: [
      { title: 'Phone number above everything', body: 'On mobile, keep a call button visible at all times. Emergencies don\'t scroll.' },
      { title: 'One page per town', body: 'People search "plumber near me" and "plumber in <town>". A short page for each area you serve helps you appear.' },
      { title: 'Be upfront about pricing', body: 'Explaining your call-out fee or free estimate removes the biggest reason people hesitate to call.' },
    ],
    faq: [
      { q: 'Can AI build a plumbing website?', a: 'Yes. Describe your services, service area and how customers reach you, and Youmake builds a mobile-first site with tap-to-call and online booking.' },
      { q: 'What should a plumber website include?', a: 'A visible phone number, emergency availability, services, service area, pricing approach, reviews and a booking form.' },
      { q: 'Can I use my own domain?', a: 'Yes. Youmake publishes to your own custom domain.' },
    ],
    related: ['construction-website', 'landing-page', 'real-estate-website'],
    updated: '2026-10-27',
  },
];

export function getTemplate(slug: string): NicheTemplate | undefined {
  return templates.find((template) => template.slug === slug);
}
