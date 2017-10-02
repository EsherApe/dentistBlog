var PageTransitions = (function ($, options) {
    "use strict";
    var defaultStartPage = "home",
        sectionsContainer = $(".subpages"),
        isAnimating = false,
        endCurrentPage = true,
        endNextPage = false,
        windowArea = $(window),
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },

        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],

        // support css animations
        support = Modernizr.cssanimations;

    function init(options) {

        // Get all the .pt-page sections.
        $('.pt-page').each(function () {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });

        // Get all the .pt-wrapper div which is the parent for all pt-div
        sectionsContainer.each(function () {
            if (location.hash === "") {
                $('section[data-id=' + pageStart + ']').addClass('pt-page-current');
            }
        });

        // Adding click event to main menu link
        $('.pt-trigger').on("click", function (e) {
            e.preventDefault();
            if (isAnimating) {
                return false;
            }
            var pageTrigger = $(this);

            activeMenuItem(pageTrigger);

            Animate(pageTrigger);

            location.hash = $(this).attr('href');

        });

        window.onhashchange = function (event) {
            if (location.hash) {
                if (isAnimating) {
                    return false;
                }
                var menuLink = $(menu + ' a[href*="' + location.hash.split('/')[0] + '"]');
                activeMenuItem(menuLink);
                Animate(menuLink);

                ajaxLoader();
            }
        };

        var menu = options.menu,
            pageStart = getActiveSection();

        location.hash = pageStart;
        var menuLink = $(menu + ' a[href*="' + location.hash.split('/')[0] + '"]');

        activeMenuItem(menuLink);

        Animate(menuLink);

        $('body').append('<div id="page-ajax-loaded" class="page-ajax-loaded animated rotateInDownRight"></div>');
        ajaxLoader();
    }

    function getActiveSection() {
        if (location.hash === "") {
            return location.hash = defaultStartPage;
        }
        else {
            return location.hash;
        }
    }

    function activeMenuItem(item) {
        if (!item) {
            return false;
        }

        var navLink = $(item);
        navLink = navLink['0'];
        navLink = $(navLink.parentNode);

        if (navLink) {
            $('ul.site-main-menu li').removeClass('active');
            navLink.addClass('active');
        }
    }

    function ajaxLoader() {
        // Check for hash value in URL
        var ajaxLoadedContent = $('#page-ajax-loaded');

        function showContent() {
            ajaxLoadedContent.removeClass('rotateOutDownRight closed');
            ajaxLoadedContent.show();
            $('body').addClass('ajax-page-visible');
        }

        function hideContent() {
            $('#page-ajax-loaded').addClass('rotateOutDownRight closed');
            $('body').removeClass('ajax-page-visible');
            setTimeout(function () {
                $('#page-ajax-loaded.closed').html('');
                ajaxLoadedContent.hide();
            }, 500);
        }

        var href = $('.ajax-page-load').each(function () {
            href = $(this).attr('href');
            if (location.hash == location.hash.split('/')[0] + '/' + href.substr(0, href.length - 5)) {
                var toLoad = $(this).attr('href');
                showContent();
                ajaxLoadedContent.load(toLoad);
                return false;
            }
        });

        $(document)
            .on("click", ".site-main-menu, #ajax-page-close-button", function (e) { // Hide Ajax Loaded Page on Navigation cleck and Close button
                e.preventDefault();
                hideContent();
                location.hash = location.hash.split('/')[0];
            })
            .on("click", ".ajax-page-load", function () { // Show Ajax Loaded Page
                var hash = location.hash.split('/')[0] + '/' + $(this).attr('href').substr(0, $(this).attr('href').length - 5);
                location.hash = hash;
                showContent();

                return false;
            });
    }

    function Animate($pageTrigger, gotoPage) {

        // Checking for 'data-animation' attribute.
        if (!($pageTrigger.attr('data-animation'))) {
            var animNumber = parseInt(Math.floor(Math.random() * 67) + 1);
            $pageTrigger.data('animation', animNumber);
        }

        var animation = $pageTrigger.data('animation').toString(),
            gotoPage, inClass, outClass, selectedAnimNumber;

        // Check if the delimiter '-' is present then create an animation array list.
        if (animation.indexOf('-') != -1) {
            var randomAnimList = animation.split('-');
            selectedAnimNumber = parseInt(randomAnimList[(Math.floor(Math.random() * randomAnimList.length))]);
        }
        else {
            selectedAnimNumber = parseInt(animation);
        }

        // Checking if the animation number is out of bound, max allowed value is 1 to 67.
        if (selectedAnimNumber > 67) {
            alert("Transition.js : Invalid 'data-animation' attribute configuration. Animation number should not be greater than 67");
            return false;
        }

        switch (selectedAnimNumber) {
            case 1:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 2:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 3:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 4:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 5:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 6:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 7:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 8:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 9:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 10:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 11:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 12:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 13:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 14:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 15:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 16:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 17:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 18:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 19:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 20:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 21:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 22:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 23:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 24:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 25:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 26:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 27:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 28:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 29:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 30:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 31:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 32:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 33:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 34:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 35:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 36:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 37:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 38:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 39:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 40:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 41:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 42:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 43:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 44:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 45:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 46:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 47:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 48:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 49:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 50:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 51:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 52:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 53:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 54:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 55:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 56:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 57:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 58:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 59:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 60:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 61:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 62:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 63:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 64:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 65:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 66:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
            case 67:
                inClass = 'pt-page-moveFromBottomFade';
                outClass = 'pt-page-fade';
                break;
        }

        // This will get the pt-trigger elements parent wrapper div
        var $pageWrapper = sectionsContainer,
            currentPageId = $pageWrapper.data('current'), tempPageIndex,
            linkhref = $pageTrigger.attr('href').split("#"),
            gotoPage = linkhref[1];

        tempPageIndex = currentPageId;

        // Current page to be removed.
        var $currentPage = $('section[data-id="' + currentPageId + '"]');

        // NEXT PAGE
        currentPageId = gotoPage;

        // Check if the current page is same as the next page then do not do the animation
        // else reset the 'isAnimatiing' flag
        if (tempPageIndex != currentPageId) {
            isAnimating = true;

            $pageWrapper.data('current', currentPageId);

            // Next page to be animated.

            var $nextPage = $('section[data-id=' + currentPageId + ']').addClass('pt-page-current');

            windowArea.scrollTop(0);
            var subpagesHeight = windowArea.height();
            $(".subpages").height(subpagesHeight + 50); //50 is the bottom margin value of the pt-page, in the main.css file

            $currentPage.addClass(outClass).on(animEndEventName, function () {
                $currentPage.off(animEndEventName);
                endCurrentPage = true;
                if (endNextPage) {
                    onEndAnimation($pageWrapper, $nextPage, $currentPage);
                    endCurrentPage = false;
                }
            });

            $nextPage.addClass(inClass).on(animEndEventName, function () {
                $nextPage.off(animEndEventName);
                endNextPage = true;
                if (endCurrentPage) {
                    onEndAnimation($pageWrapper, $nextPage, $currentPage);
                    endNextPage = false;
                    isAnimating = false;
                }
            });

        }
        else {
            isAnimating = false;
        }


        // Check if the animation is supported by browser and reset the pages.
        if (!support) {
            onEndAnimation($currentPage, $nextPage);
        }

    }

    function onEndAnimation($pageWrapper, $nextPage, $currentPage) {
        var subpagesHeight = $nextPage.height();
        $(".subpages").height(subpagesHeight + 50); //50 is the bottom margin value of the pt-page, in the main.css file
        resetPage($nextPage, $currentPage);
    }

    function resetPage($nextPage, $currentPage) {
        $currentPage.attr('class', $currentPage.data('originalClassList'));
        $nextPage.attr('class', $nextPage.data('originalClassList') + ' pt-page-current');
    }

    return {
        init: init,
    };

})(jQuery);
