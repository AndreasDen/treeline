(function () {
    "use strict";
    if (typeof jQuery === 'undefined') {
        window.addEventListener('load', onLoad);
    } else {
        onLoad();
    }

    function onLoad() {
        allVideoFunctions();
        elementsAnimation();
        scrollSpeed();
        triggerModal();
    }
}());

function allVideoFunctions() {
    // Get the container
    var container = $("#main");
    // Get the video wrapper
    var videoWrapper = $(".video-wrapper");
    // Get the video
    var video = $(".myVideo").get(0);

    //show video
    showVideo();
    //hide video
    hideVideo();

    $(video).on('click', function () {
        playAndPause();
    });


    // Pause and play the video
    function playAndPause() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    function showVideo() {
        // Get the button
        var btn = $(".play-button span");
        // play, show Video and set overlay on click
        $(btn).on('click', function () {
            video.play();
            $(videoWrapper).addClass('visible');
            $(container).addClass('overlay');
        });
    }

    function hideVideo() {
        //Get the close cta
        var close = $(videoWrapper).find('.video-close');
        // pause, hide Video and remove overlay on click
        $(close).on('click', function () {
            $(container).addClass('overlay-fade-out');
            setTimeout(function () {
                $(container).removeClass('overlay overlay-fade-out');
                $(videoWrapper).removeClass('visible');
            }, 350);
            video.pause();
        });
    }
}
function elementsAnimation() {
    var $animation_elements = $('.animation-element');
    var $fixed_elements = $('.fixed-element');
    var $fixed_element_offset = $fixed_elements.offset().top;
    var $window = $(window);

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        //set class in-view on elements
        $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position < window_bottom_position - 100)) {
                $element.addClass('in-view');
            } else {
                $element.removeClass('in-view');
            }
        });

        //set class fixed on elements
        $.each($fixed_elements, function () {
            var $element = $(this);

            //check to see if this current container is within viewport
            if (window.pageYOffset >= $fixed_element_offset - 30) {
                $element.addClass('fixed');
            }
            else {
                $element.removeClass('fixed');
            }
        });
    }
}
function scrollSpeed() {

    $.fn.moveIt = function () {
        var $window = $(window);
        var instances = [];

        $(this).each(function () {
            instances.push(new moveItItem($(this)));
        });

        window.addEventListener('scroll', function () {
            var scrollTop = $window.scrollTop();
            instances.forEach(function (inst) {
                inst.update(scrollTop);
            });
        }, {passive: true});
    }

    var moveItItem = function (el) {
        this.el = $(el);
        this.speed = parseInt(this.el.attr('data-scroll-speed'));
    };

    moveItItem.prototype.update = function (scrollTop) {
        this.el.css('transform', 'translate(-50%,' + -(scrollTop / this.speed) + 'px)');
    };

// Initialization
    $(function () {
        $('[data-scroll-speed]').moveIt();
    });
}
function triggerModal() {
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })
}







