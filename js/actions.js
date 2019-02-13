"use strict";

$(document).ready(function(){
    
headerBackground_scroll();
header_scroll();

renderServiceBlocks( service_data );
renderPortfolioGallery( portfolio_data );
toglePortfolioItemsVisibility();
renderBlogBlocks( blog_data );
filterPortfolioItems();
renderIcons( icons_data );
ressizePortfolioItem();
ressizeAboutImage();


// on scroll - update header background
$(window).scroll(function(){
    headerBackground_scroll();
    header_scroll();
});

// responsive
$(window).resize(function(){
    ressizePortfolioItem();
    ressizeAboutImage();
});

});