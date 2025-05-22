---
tags: 
title: Nosos Notes - Home
enableToc: false
date created: Wednesday, August 2nd 2023, 8:37:53 pm
date modified: 2025-01-27
date: 2024-02-17
---

<div class="landing-header-content"> <img src="./z_attachments/logo5.png" alt="Nosos Notes Logo" class="landing-logo" width="245"> <div class="search landing-search-override"> <!-- Added landing-search-override class --> <button class="search-button"> <p>Search</p> <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"> <title>Search</title> <g class="search-path" fill="none"> <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4"></path> <circle cx="8" cy="8" r="7"></circle> </g> </svg> </button> <div class="search-container"> <div class="search-space"> <input autocomplete="off" class="search-bar" name="search" type="text" aria-label="Search for something" placeholder="Search for something..."> <div class="search-layout" data-preview="true"> <div class="results-container"></div> <div class="preview-container"></div> </div> </div> </div> </div> </div>


<style>
/* quartz/static/css/custom-landing.css */

/* ... your existing custom-landing.css styles ... */

/* Styles for the new header content wrapper */
.landing-page .landing-header-content {
    text-align: center; /* This helps center inline-block children */
    padding: 20px 0;    /* Add some spacing */
}

/* Styles for the logo */
.landing-page .landing-logo {
    display: block;       /* Make the image a block element */
    margin-left: auto;    /* Auto margins for horizontal centering */
    margin-right: auto;
    margin-bottom: 25px;  /* Space between logo and search bar */
    /* width: 245px; is already set in HTML, or you can control it here: */
    /* max-width: 245px; */
    /* height: auto; /* Maintain aspect ratio if using max-width */
}

/* Styles for the search bar wrapper on the landing page */
.landing-page .landing-search-override {
    /* To center the search box div itself */
    margin-left: auto;
    margin-right: auto;
    
    /* The search component might be 100% width by default.
       Set a max-width if you want it to be narrower than the page
       and visibly centered. Adjust this value as needed. */
    max-width: 600px; /* Example: max width for the search component */

    /* Quartz's search often has its own padding/margins.
       You might need to inspect and override them if the above isn't enough.
       For example, its internal elements might have their own alignment. */
}

/* Optional: If the search button itself needs to be centered within its parent,
   and it's not already. Quartz's search CSS usually handles this. */
.landing-page .landing-search-override .search-button {
    /* display: block; /* If it's inline and you want to center it with margin:auto */
    /* margin: 0 auto 10px auto; /* Center block button, add space below */
}

/* Ensure other landing page content has some top margin if needed */
.landing-page .content > p:first-of-type, /* Target the "Back" link if it's the first p */
.landing-page .content > blockquote:first-of-type { /* Target the "Welcome" blockquote */
    margin-top: 30px;
}

/* Specific styling for the "Back" link if it's a blockquote */
.landing-page .content > blockquote:first-of-type {
    /* You might want to style this differently than other blockquotes */
    text-align: center; /* Center the "Back" link text */
    /* border: none; */
    /* background: none; */
}

</style>