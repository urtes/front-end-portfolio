function headerBackground_scroll() {
    var header_limit = 50;
    if (header_limit < scrollY) {
        $('header').removeClass('black');
    } else {
        $('header').addClass('black');
    }
    return;
}

function header_scroll() {
    var navs = $('#main_nav > a').length,
        href_value,
        scroll_top;

    for (var i = 0; i < navs; i++) {
        href_value = $('#main_nav > a').eq(i).attr('href');

        if (i === navs - 1) {
            scroll_top = scrollY + 300; /* hack */
        } else {
            scroll_top = scrollY;
        }

        if (scroll_top >= $(href_value).offset().top
            && scroll_top < $(href_value).offset().top + $(href_value).height()
        ) {
            $('#main_nav > a').removeClass('active');
            $('#main_nav > a[href="' + href_value + '"]').addClass('active');
        }
    }
}

/* ICON BLOCKS */

function renderIcons(data) {
    var HTML_about = '';
    var HTML_footer = '';

    for (var i = 0; i < 5; i++) {

        HTML_about += '<i class="main-icon fa fa-' + data[i] + '"></i>';
        HTML_footer += '<i class="main-icon fa fa-' + data[i] + '"></i>';
    }

    $('#about .about-icons').html(HTML_about);
    $('.footer .footer-icons').html(HTML_footer);

    return;
}

/* SERVICES */

function renderServiceBlocks(data) {
    var HTML = '';

    for (var i = 0; i < 3; i++) {
        HTML += renderOneServiceBlock(data[i]);
    }
    $('#services > div > div').html(HTML);

    return;
}

function renderOneServiceBlock(renderData) {
    var HTML = '<div class="service-box">\
                    <i class="fa fa-'+ renderData.ikona + '"></i>\
                    <h4>'+ renderData.title + '</h4>\
                    <p>'+ renderData.tekstas + '</p>\
                </div>';
    return HTML;
}

/* BLOGS */

function renderBlogBlocks(data) {
    var HTML = '';

    for (var i = 0; i < 3; i++) {
        HTML += renderOneBlogBlock(data[i]);
    }
    $('#blog > div > div').html(HTML);

    return;
}

function renderOneBlogBlock(renderData) {
    var HTML = '<div class="blogs-box">\
                    <img class="blogs-image" src="img/'+ renderData.image + '.jpg" alt="Blog-image">\
                    <div class="blogs-content">\
                        <h4>'+ renderData.h4 + '</h4>\
                        <h5>'+ renderData.h5 + '</h5>\
                        <p>'+ renderData.text + '</p>\
                        <div><a href="#" class="main-button">'+ renderData.link + '</a></div>\
                    </div>\
                </div>';
    return HTML;
}

/* PORTFOLIO */

function renderPortfolioGallery(data) {
    var HTML = '';

    HTML += renderPortfolioGalleryFilter(data);
    HTML += renderPortfolioGalleryContent(data);

    $('#portfolio_gallery').html(HTML);

    return;
}

function renderPortfolioGalleryFilter(data) {
    var unikalus_tagai = [],
        ar_unikalus = 0,
        ka_itraukti = '';

    for (var i = 0; i < data.length; i++) {
        ar_unikalus = 0;
        ka_itraukti = data[i].tagas;

        if (ka_itraukti !== '' &&
            typeof (ka_itraukti) === 'string') {
            for (var e = 0; e < unikalus_tagai.length; e++) {
                if (ka_itraukti.toLowerCase() === unikalus_tagai[e].toLowerCase()) {
                    ar_unikalus++;
                }
            }
            if (ar_unikalus === 0) {
                unikalus_tagai.push(ka_itraukti.toLowerCase());
            }
        } else {
            console.log('Sorry, text is required');
        }
    }

    var HTML = '<div id="portfolio_filter">\
                    <div class="active">ALL</div>';
    for (var i = 0; i < unikalus_tagai.length; i++) {
        HTML += '<div>' + unikalus_tagai[i] + '</div>';
    }
    HTML += '</div>';
    return HTML;
}

function renderPortfolioGalleryContent(data) {
    var HTML = '<div id="portfolio_content">';
    for (var i = 0; i < data.length; i++) {
        HTML += renderOnePortfolioElement(data[i]);
    }
    HTML += '</div>';
    return HTML;
}

function renderOnePortfolioElement(data) {

    var HTML = '';
    if (data.tagas !== '' &&
        typeof (data.tagas) === 'string' &&
        data.nuotrauka !== '') {

        var HTML = '<div class="portfolio-item">\
                        <div class="black-layer"></div>\
                        <img class="portfolio-image" src="img/'+ data.nuotrauka + '.jpg" alt="portfolio-image">\
                        <div class="tekstines-vertes">\
                            <div class="title-2">'+ data.pavadinimas + '</div>\
                            <label class="tag">'+ data.tagas.toLowerCase() + '</label>\
                        </div>\
                    </div>';
    }
    return HTML;
}

function toglePortfolioItemsVisibility() {

    $(".portfolio-item").mouseenter(function () {
        $(this).find(".title-2").show();
        $(this).find(".tag").show();
    });

    $(".portfolio-item").mouseleave(function () {
        $(this).find(".title-2").hide();
        $(this).find(".tag").hide();
    });

    return;
}

function filterPortfolioItems() {

    $('#portfolio_gallery').on('click', '#portfolio_filter > div', function () {

        var tag = $(this).text(),
            kiekis = $('#portfolio_content > .portfolio-item').length,
            element;

        if (tag === 'ALL') {
            for (var i = 0; i < kiekis; i++) {
                element = $('#portfolio_content > .portfolio-item').eq(i);
                element.css('display', 'block');
            }
        } else {
            for (var j = 0; j < kiekis; j++) {
                element = $('#portfolio_content > .portfolio-item').eq(j);
                if (tag === element.find('.tag').text()) {
                    element.css('display', 'block');
                } else {
                    element.css('display', 'none');
                }
            }
        }

    });

    return;
}

/* TESTIMONIALS */

var slideIndex = 1;
showSlides(slideIndex);

var side;
function plusSlides(n) {
    side = n;
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        $('.slide').removeClass('slide-right');
        $('.slide').removeClass('slide-left');
    }
    
    if (side < 0) {
        $('.slide').addClass('slide-right');
    }

    if (side >= 0) {
        $('.slide').addClass('slide-left');
    }

    slides[slideIndex-1].style.display = "block";
}

/* RESPONSIVE */

function ressizePortfolioItem() {
    
    var height = $('.portfolio-item').height();
    var width = $('.portfolio-item').width();
    
    if ($('.row').width() < 1193 ) {
        height = width;
        $(".portfolio-item").css('height', height+'px');

    }
}

function ressizeAboutImage() {
    
    var height = $('.about-image-container').height();
    var width = $('.about-image-container').width();
    
    if ($('.row').width() < 1193 ) {
        height = width;
        $(".about-image-container").css('height', height+'px');

    }
}