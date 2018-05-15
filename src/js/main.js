// Get the video
var videoWrapper = $(".video-wrapper");
var video = $(".myVideo").get(0);

//Get region one
var regionONE = $(".region-one");

// Get the button
var btn = $(".play-button span");
var close = $(videoWrapper).find('.video-close');


$(btn).on('click', function () {
    playVideo();
    $(videoWrapper).addClass('visible');
    $(regionONE).addClass('overlay');
});
$(close).on('click', function () {
    $(regionONE).addClass('overlay-fade-out');
    setTimeout(function () {
        $(regionONE).removeClass('overlay');
        $(regionONE).removeClass('overlay-fade-out');
        $(videoWrapper).removeClass('visible');
    }, 350);

    video.pause();
});
$(video).on('click', function () {
    playAndPause();
});

function playVideo() {
    video.play();
}

// Pause and play the video, and change the button text
function playAndPause() {

    if (video.paused) {
        video.play();
        console.log("PLAY")
        // $(btn).removeClass("glyphicon-play");
        // $(btn).addClass("glyphicon-pause");
    } else {
        video.pause();
        // $(btn).removeClass("glyphicon-pause");
        // $(btn).addClass("glyphicon-play");
    }
}


// var flyingTextOffset = $('#content').find(".region-two");
//
// var offset;
// var windowHeight = $(window).height();
//
// $(window).on("scroll", function () {
//     offset = $(window).scrollTop() - flyingTextOffset.offset().top;
//     console.log(offset);
//     console.log(windowHeight);
//     if (offset >= -windowHeight && offset <= 0) {
//         // section entering the viewport)
//         $(flyingTextOffset).css({"scale": "1", "opacity": "1"});
//         $(flyingTextOffset).css("translateY", '"' + offset * 100 / windowHeight + '"');
//     } else if (offset > 0 && offset <= windowHeight) {
//         // console.log("SECOND")
//         // //section leaving the viewport
//         // scale = (1 - ( offset * 0.3 / windowHeight));
//         // opacity = ( 1 - ( offset / windowHeight) );
//         // translateY = 0;
//         // boxShadowBlur = 40 * (offset / windowHeight);
//     }
// });


var $animation_elements = $('.animation-element');
var $fixed_elements = $('.fixed-element');
var $fixed_element_offset = $fixed_elements.offset().top;
var $window = $(window);


function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);



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

    $.each($fixed_elements, function() {
        var $element = $(this);

        console.log( $fixed_element_offset)
        //check to see if this current container is within viewport
        if (window.pageYOffset >= $fixed_element_offset -30) {
            $element.addClass('fixed');
        }
        else {
            $element.removeClass('fixed');
        }
    });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

$.fn.moveIt = function(){
    var $window = $(window);
    var instances = [];

    $(this).each(function(){
        instances.push(new moveItItem($(this)));
    });

    window.addEventListener('scroll', function(){
        var scrollTop = $window.scrollTop();
        instances.forEach(function(inst){
            inst.update(scrollTop);
        });
    }, {passive: true});
}

var moveItItem = function(el){
    this.el = $(el);
    this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop){
    this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
};

// Initialization
$(function(){
    $('[data-scroll-speed]').moveIt();
});