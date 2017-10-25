
$(function(){
	ImageFitCont();
	FixedHeader();
	ProfileGrids();
	DashboardGrids();
	if ($(window).width() < 481) {
	   InfoSlide();
	}
	$('[data-toggle="tooltip"]').tooltip();
  Placeholdem( document.querySelectorAll('.anim-placeholder'));

  Dropzone.autoDiscover = false;
});

// Header Fixing
function FixedHeader() {
	var lastScrollTop = 0, delta = 5;
	$(window).scroll(function(event){
	   var st = $(this).scrollTop();
	
	   if (Math.abs(lastScrollTop - st) <= delta)
		  return;
	
	  if (st > lastScrollTop){
		   // downscroll code
		   $('.site-header').addClass('fixed-head');
	   } else {
		  // upscroll code
		  $('.site-header').removeClass('fixed-head');
	   }
	   lastScrollTop = st;
	});
}

function HomeBannerOverlay(){
    $(window).scroll(function() {
    var scrollTop = $(this).scrollTop();

      $('.banner-overlay').css({
        opacity: function() {
          var elementHeight = $(this).height() - 130;
          return 1 - (elementHeight - scrollTop) / elementHeight;
        }
      });
    });
}

function BadgeSlider() {
	carousel = $('.fav-sticker');
    carousel.itemslide({
        left_sided: true
    });
	
	carousel2 = $('.achieve-badges');
    carousel2.itemslide({
		left_sided: true
    });


    $(window).resize(function () {
        carousel.reload();
		carousel2.reload();
    });
}

function RecentSticker() {
	carousel3 = $('.st-recent-ul');
    carousel3.itemslide({
        left_sided: true
    });
    $(window).resize(function () {
		carousel3.reload();
    });
}

function PopularListing() {
	
	carousel = $('.popu-list-1');
    carousel.itemslide({
		left_sided: true
    });
	
	carousel2 = $('.popu-list-2');
    carousel2.itemslide({
		left_sided: true
    });
	
    $(window).resize(function () {
		carousel.reload();
		carousel2.reload();
    });
}

function ProfileGrids() {
	$('.pf-post-grids .grid').isotope({
	  // options
	  itemSelector: '.pf-post-grids .grid .grid-item',
	  //layoutMode: 'fitRows'
	});
}

function DashboardGrids() {
  var $container = $('.dashboard-grids .grid'),
      filters = {};
  $container.isotope({
    itemSelector : '.dashboard-grids .grid .grid-item',
	  layoutMode: 'masonry',
	  masonry: {
		columnWidth: '.grid-sizer'
	  }
  });
}

function HomeGalleryGrid() {
    $('.gal-mesonry .grid').isotope({
      // options
      itemSelector: '.gal-mesonry .grid .grid-item',
      layoutMode: 'masonry'
    });
}

function GalleryGrid() {
    $('.gallery-grids .grid').isotope({
      // options
      itemSelector: '.gallery-grids .grid .grid-item',
      layoutMode: 'masonry'
    });
}

function InfoSlide() {
	
    var off = 10,
        l = off,
        $As = $('ul.pf-info-slide > li'), 
        speed = 2,
        stack = [],
        pause = false;

    $.each($As, function(){
      var W = $(this).css({
        left: l
      }).width()+off;
      l+=W; 
      stack.push($(this));
    });

    var tick = setInterval(function(){
      if(!pause){
        $.each($As, function(){
          var ml = parseFloat($(this).css('left'))-speed;
          $(this).css({
            left: ml
          });
          if((ml+$(this).width()) < 0){
            var $first = stack.shift(),
                $last = stack[stack.length-1];
            $(this).css({
              left: (parseFloat($last.css('left'))+parseFloat($last.width()))+off
            });
            stack.push($first);
          }
        });
      }
    }, 1000/25);

    $('ul.pf-info-slide').on('mouseover', function(){
      pause = true;
    }).on('mouseout', function(){
      pause = false;
    })
}

function HomeInfoSlide() {
  
    var off = 10,
        l = off,
        $As = $('ul.bnr-info-slide > li'), 
        speed = 2,
        stack = [],
        pause = false;

    $.each($As, function(){
      var W = $(this).css({
        left: l
      }).width()+off;
      l+=W; 
      stack.push($(this));
    });

    var tick = setInterval(function(){
      if(!pause){
        $.each($As, function(){
          var ml = parseFloat($(this).css('left'))-speed;
          $(this).css({
            left: ml
          });
          if((ml+$(this).width()) < 0){
            var $first = stack.shift(),
                $last = stack[stack.length-1];
            $(this).css({
              left: (parseFloat($last.css('left'))+parseFloat($last.width()))+off
            });
            stack.push($first);
          }
        });
      }
    }, 1000/25);

    $('ul.bnr-info-slide').on('mouseover', function(){
      pause = true;
    }).on('mouseout', function(){
      pause = false;
    })
}

function MobileFilter() {
    // var FilterContent = $('#filters')[0].outerHTML;
    // $('.mob-filter-block').html(FilterContent);
    // $('.dashboard-grids #filters').remove();
}

function PhoneNumber() {
    var telInput = $('#phonelink'),
        errorMsg = $('#error-msg'),
        validMsg = $('#valid-msg');

        // initialise plugin
        telInput.intlTelInput({
          initialCountry: 'US',
          //nationalMode: true,
          utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/10.0.5/js/utils.js',
          allowDropdown: false
        });

        var reset = function() {
          telInput.removeClass('error');
          errorMsg.addClass('hide');
          validMsg.addClass('hide');
        };

        // on blur: validate
        telInput.blur(function() {
          reset();
          if ($.trim(telInput.val())) {
            if (telInput.intlTelInput('isValidNumber')) {
              validMsg.removeClass('hide');
            } else {
              telInput.addClass('error');
              errorMsg.removeClass('hide');
            }
          }
        });

        // on keyup / change flag: reset
        telInput.on('keyup change', reset);
}



function CateroryToggle() {
    var CssHeight = $('.hidden-cats').css('max-height'),
        TotalHeight = $('.hidden-cats .container').height();
        //alert(CssHeight);
        //alert(TotalHeight);
    $(document).on('click', '.cat-more', function(){
        $(this).remove();
        $('.load-cats').html('<button type="button" class="btn cat-less"><i class="fa fa-minus-circle"></i> View Less Category</button>');
        $('.hidden-cats').css('max-height', TotalHeight).addClass('shown-cats');
        $('.category-section').addClass('btn-show');
    });
    $(document).on('click', '.cat-less', function(){
        $(this).remove();
        $('.load-cats').html('<button type="button" class="btn cat-more"><i class="fa fa-plus-circle"></i> View More Category</button>');
        $('.hidden-cats').css('max-height', CssHeight).removeClass('shown-cats');
        $('.category-section').removeClass('btn-show');
    });
}

$(document).ready(function() {
    function checkWidth() {
        var windowSize = $(window).width();

        if ( windowSize >= 768 && windowSize <= 1025 ) {
            $(document).on('click', function(e) {
				var elem = $(e.target).closest('.mob-search-trigger > a'),
					box  = $(e.target).closest('.site-header .navbar-form');
				
				if ( elem.length ) {
					e.preventDefault();
					$('.site-header .navbar-form').toggle();
				}else if (!box.length){
					$('.site-header .navbar-form').hide();
				}
		});
        }
    }

    checkWidth();
    $(window).resize(checkWidth);
	
    // Textarea counter
    $('#cmt-field').keyup(function() {
        var text_length = $(this).val().length;
        $('#cmt-counter').text(($(this).val().length));
    });
    /*$(document).on({
        mouseenter: function () {
             $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
             $(this).toggleClass('open');
        },
        mouseleave: function () {
             setTimeout(function(){ 
                 $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
                 $(this).toggleClass('open');
             }, 100);
        }
    }, '.header-bottom .nav > li.dropdown');*/
     /*$('ul.nav li.dropdown').hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });*/
    if ($(window).width() > 767) {
        $('.header-bottom .nav > li.dropdown').hover(function() {
            $('.dropdown-menu', this).stop( true, true ).fadeIn('fast');
            $(this).toggleClass('open');
            console.log("1");
            //$('i', this).removeClass('fa-angle-down').toggleClass('fa-angle-up');
            $('i', this).removeClass('fa-angle-down').addClass("fa-angle-up");
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).fadeOut('fast');
            $(this).toggleClass('open');
            $('i', this).addClass('fa-angle-down').toggleClass('fa-angle-up');
        });
    }
    
    $(document).on('click', '.btn-conv', function(){
        $('.conv-activity').hide();
        $('.msg-write').show();
    });
    $(document).on('click', '.conv-back', function(e){
        e.preventDefault();
        $('.conv-activity').hide();
        $('.msg-inbox').show();
    });
    $(document).on('click', '.msg-conversations .conv-item', function(){
        $('.conv-activity').hide();
        $('.chat-area').show();
    });
    $(document).on('click', '.msg-box .user-drop-list .list-block .user-row', function(){
        $('.conv-activity').hide();
        $('.chat-area').show();
    });
    $('#MessageBox').on('shown.bs.modal', function () {
        if($('.chat-txtarea').length){
          $('textarea.chat-txtarea').autoResize({
              maxHeight: '100px'
          });
          $(this).keydown(function(e){
              if (e.keyCode == 13 && !e.shiftKey){
                  e.preventDefault();
              }
          });
      }
    });
    $('#MessageBox').on('hidden.bs.modal', function () {
        $('.conv-activity').hide();
        $('.msg-inbox').show();
    });
    
    
    // $('.bd_textarea').autoResize();
    
    $('[data-toggle="popover"]').popover();
    
    $('.tool-drop').on('show.bs.dropdown', function () {
      $('.dropdown-backdrop').remove();
      $(this).children('.dropdown-toggle').after('<div class="dropdown-backdrop"></div>');
        if(!$('.dropdown-close').length){
            $(this).children('.dropdown-menu').append('<span class="dropdown-close"><i class="fa fa-times"></i></span>');
        }
    });
    $(document).on('click', '.static-drop .dropdown-menu', function (e) {
      e.stopPropagation();
    });
    $(document).on('click', '.dropdown-close', function () {
      $('.dropdown-backdrop').trigger('click');
    });
    
    
    if ($(window).width() > 1024) {
        $('.header-tools .tool-dsk').addClass('active');
        $('.tool-dsk.active > a').on('click', function(e){
            e.preventDefault();
        });
    }
    
    $('.tool-mob').on('show.bs.dropdown', function () {
        PhoneNumber();
        setTimeout(function(){ 
             $('#phonelink').focus();
         }, 100);
    });
    
    $('.bd_textarea').on('focus', function(){
       $('.bd_parent').addClass('visible-top');
       $('.attached-cmt').addClass('at-top');
        if (!$('.msg-backdrop').length) {
            $('<div class="msg-backdrop"></div>').insertAfter('.bd_parent');
        }
        setTimeout(function(){ 
             $('.msg-backdrop').addClass('bg-dark');
         }, 100);
        //$('.pf-post-box').append('<span class="msg-bd-close"></span>');
        if (!$('.msg-bd-close').length) {
            $('.bd_parent').prepend('<span class="msg-bd-close"><i class="fa fa-times"></i></span>');
        }
    });
    $(document).on('click', '.msg-bd-close', function(){
        $(this).remove();
        $('.attached-cmt').removeClass('at-top');
        $('.msg-backdrop').removeClass('bg-dark');
        $('.bd_parent').removeClass('visible-top');
        setTimeout(function(){ 
             $('.msg-backdrop').remove();
         }, 300);
    });
    $(document).on('click', '.msg-backdrop', function(){
        $('.msg-bd-close').remove();
        $(this).removeClass('bg-dark');
        $('.bd_parent').removeClass('visible-top');
        $('.attached-cmt').removeClass('at-top');
        setTimeout(function(){ 
             $('.msg-backdrop').remove();
         }, 300);
    });
    
    $('#edit-tags').tagsinput({
      tagClass: 'label label-primary'
    });
    
    $('#AttachSticker').on('shown.bs.modal', function () {
        RecentSticker();
        $(document).on('click', 'ul.list-group > li .sticker-box', function(){
            $('.sticker-tab-panel').addClass('active-next');
            var StTitle = $(this).closest('li').find('.st-title').text();
            $('.st-single-title').text(StTitle);
        });
        $(document).on('click', '.st-back', function(){
            $('.sticker-tab-panel').removeClass('active-next');
        });
        $(document).on('click', '.st-4-msg', function(e){
            var StickerPath = $(this).find('img').attr('src');
            //alert(StickerPath);
            $('.st-4-msg').removeClass('st-active');
            $(this).addClass('st-active');
            e.stopPropagation();
        });
        $(document).on('click', function(e) {
            if ($(e.target).is('.st-4-msg') === false) {
              $('.st-4-msg').removeClass('st-active');
            }
        });
        $(document).on('click', '.st-attach-btn', function(){
            if($('.st-active').length){
                //alert('yes');
                setTimeout(function (){
                    $('.bd_textarea').focus();
                }, 1);
                var AttachPath = $('.st-active').find('img').attr('src');
                // $('.cmt-attached-sticker .st-img').html('<img src="'+AttachPath+'" alt="">');
                $('.cmt-attached-sticker .st-img').html('<img src="'+AttachPath+'" />');
                $('.st-txtbox').addClass('has-st');
                $('.attach-sticker, .msg-ath-st').addClass('disabled-st-btn').attr('data-toggle','');
                $('#AttachSticker').modal('hide');
            }
            else{
                alert('Please select one sticker');
            }
        });
        $(document).on('click', '.st-store-link', function(){
            $('.st-store-pop').addClass('visible-elem');
        });
        $(document).on('click', '.btn-st-cancel', function(e){
            e.preventDefault();
            $('.st-store-pop').removeClass('visible-elem');
        });
        
    });
    $(document).on('click', '.st-clear', function(){
        $('.cmt-attached-sticker .st-img').find('img').remove();
        $('.st-txtbox').removeClass('has-st');
        $('.attach-sticker, .msg-ath-st').removeClass('disabled-st-btn').attr('data-toggle','modal');
    });
    $('#AttachSticker').on('hidden.bs.modal', function () {
        $('.sticker-tab-panel').removeClass('active-next');
    });


    $(document).on('click', '.btn-follow', function(){
        $(this).toggleClass('btn-ungroup');
        $(this).text(function(i, text){
          return text === 'Follow Group' ? 'Unfollow Group' : 'Follow Group';
      });
    });
    $(document).on('click', '.btn-pic', function(){
        $(this).toggleClass('btn-ungroup');
        $(this).text(function(i, text){
          return text === 'Follow Gallery' ? 'Unfollow Gallery' : 'Follow Gallery';
      });
    });

    // Reply UI
    $(document).on('click', '.btn-cmt-reply', function(){
        var GetCMT = $(this).closest('.get-cmt').html();
        // alert(GetCMT);
        $('.attached-cmt').remove();
        $('.comment-section').prepend('<div class="attached-cmt">'+GetCMT+'</div>');
        //$('.bd_textarea').focus();
        setTimeout(function(){
            $('.attached-cmt').addClass('at-top');
            $('.attached-cmt').append('<span class="attched-close">Discard Reply</span>');
            $('html, body').animate({scrollTop: $('.attached-cmt').offset().top -150 }, 'slow');
            $('.bd_textarea').focus();
        },100);
    });
    $(document).on('click', '.attched-close', function(){
        $('.attached-cmt').remove();
        $('.bd_textarea').focus();
        localStorage.removeItem('reply');
    });

    $('#ReportPic').on('hidden.bs.modal', function () {
        $('.panel-collapse.in').collapse('hide');
    });

    $('.widget .mascot-figure .pupil').jqEye({shape: "circle", radius:7});

    $('#UploadPic').on('shown.bs.modal', function () {
      setTimeout(function(){
        //alert();
        //$('#uploadZone').dropzone();
        //var $dropZone = $("#uploadZone").dropzone({ /*options*/ });
        UploadPicZone();
      },100);
    });

    $('#UserMessageBox').on('shown.bs.modal', function () {
      $(this).find('.chat-area').css('display', 'block');
      if($('.user-chat-txtarea').length){
          $('textarea.user-chat-txtarea').autoResize({
              maxHeight: '100px'
          });
          $(this).keydown(function(e){
              if (e.keyCode == 13 && !e.shiftKey){
                  e.preventDefault();
              }
          });
      }
    });

    //Treeview Popover
    // $('.fav-share a').popover({
    //     content: function () {
    //         return $('#popover-content').html();
    //     },
    //     //container: 'body',
    //     html: true,
    //     trigger: 'click hover',
    //     placement: 'top', 
    //     delay: {
    //         show: 100, 
    //         hide: 100
    //     },
    // });


    
    $('.trigger-tree').popover({
        content: function () {
            return $('#tree-popover-content').html();
        },
        //container: 'body',
        html: true,
        trigger: 'click',
        //placement: 'top', 
        delay: {
            show: 100, 
            hide: 100
        },
    }).on('show.bs.popover', function() {
      setTimeout(function(){
        $('.tr-pop').closest('.popover').addClass('pop-pos');
        MakeFovourite();
      },100);
    }).on('shown.bs.popover', function(){
        $('body').prepend('<div class="fav-backdrop"><div>');
        setTimeout(function(){ 
             $('.fav-backdrop').addClass('filing');
         }, 300);
    }).on('hidden.bs.popover', function () {
        $('.favtree').jstree('destroy');
    });

    $(document).on('click', '.fav-backdrop', function(){
      $('.trigger-tree').popover('hide');
      $(this).remove();
    });

    

    // $(document).one('click', '.trigger-tree', function(){
    //   setTimeout(function(){
        
    //    }, 1000);
    // });
    $(document).on('click', '.cancel-fav', function(){
      $('.trigger-tree').popover('hide');
      $('.fav-backdrop').remove();
    });
    $('body').on('hidden.bs.popover', function (e) {
        $(e.target).data("bs.popover").inState = { click: false, hover: false, focus: false }
    });

    


    // Login / register Modal
    $(document).on('click', '.switch-view-user', function(e) {
      e.preventDefault();
      $('.log-container').stop().addClass('active active-user');
    });
    $(document).on('click', '.switch-view-pass', function(e) {
      e.preventDefault();
      $('.log-container').stop().addClass('active active-pass');
    });
    $(document).on('click', '.close', function() {
      $('.log-container').stop().removeClass('active active-user active-pass');
    });

    $(document).on('click', '.toggle-signup-email .btn', function() {
      $('.signup-email').slideDown();
      $(this).remove();
      $('.social-log').removeClass('btn-full');
    });
    $(document).on('click', '.already-member .btn, .log-container .log-footer a', function() {
      setTimeout (function(){
        $('body').addClass('modal-open');
      },500);
    });

    // Congo
    $('#Congratulation').on('show.bs.modal', function () {
        setTimeout (function(){
          $('body').addClass('dark-overlay md-opec');
        },100);
    });
    $('#Congratulation').on('shown.bs.modal', function () {
        setTimeout (function(){
          //animate();
          $('body').removeClass('md-opec');
          $('#Congratulation').find('.modal-content').addClass('animated rollIn');
          setTimeout (function(){
            $('#Congratulation .top-diamond').addClass('visible-elem');
            $('#Congratulation .top-diamond').addClass('animated bounceInDown');
            setTimeout (function(){
              $('.dm-counter').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).data('count')
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
              });
              animate();
            },700);
          },1200);
          setTimeout (function(){
            $('#Congratulation button.close').addClass('visible-elem');
            $('#Congratulation button.close').addClass('animated fadeInDown');
          },3500);
        },500);
    });
    $('#Congratulation').on('hidden.bs.modal', function () {
        $('body').removeClass('dark-overlay');
    });

    // Sticker Card
    $('.st-card', this).one('click', function(){
      $(this).addClass('flipped');
      var bubble_selector = $(this).parents('.sticker-block').find('.bubble_bl').attr('class');
      bubble_selector = bubble_selector.split(' ')[1];
      CreateBubbles('.'+bubble_selector);
      setTimeout (function(){
        $('.aClassName'+bubble_selector).remove();
      },5000);
    });
    $(document).on('click', '.view-all', function(){
      $('.st-card').addClass('flipped');
    });

    $('#StickersModal').on('shown.bs.modal', function () {
      
      setTimeout (function(){
        //$('.sticker-blocks .sticker-block').addClass('visible-elem');
        //$('.sticker-blocks .sticker-block:nth-child(1), .sticker-blocks .sticker-block:nth-child(3), .sticker-blocks .sticker-block:nth-child(4), .sticker-blocks .sticker-block:nth-child(6)').addClass('animated rollIn');
        //$('.sticker-blocks .sticker-block:nth-child(2)').addClass('animated fadeInDown');
        //$('.sticker-blocks .sticker-block:nth-child(5)').addClass('animated fadeInUp');

        $('#trans3DBoxes > div').addClass('vsbl');
        AnimBox();

        setTimeout (function(){
          //$('.sticker-blocks .show-all').addClass('visible-elem');
          //$('.sticker-blocks .show-all').addClass('animated fadeInUp');
          var card = $("#trans3DBoxes > div");

          $('.sticker-block').on("mousemove",function(e) {  
            var ax = -($(window).innerWidth()/2- e.pageX)/40;
            var ay = ($(window).innerHeight()/2- e.pageY)/20;
            card.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");
          });

        ParticleRain();
        },600);

      },500);

    });

    $(document).on('click', '.mob-group', function(){
      $('.category-sidebar').addClass('show-panel');
    });
    $(document).on('click', '.mob-close-panel', function(e){
      e.preventDefault();
      $('.category-sidebar').removeClass('show-panel');
    });

    if ($(window).width() < 767) {
      $('.setting-nav h6').on('click', function(){
          console.log('hi');
          $('.setting-nav ul').slideToggle();
          $(this).toggleClass('set-opn');
      });
    }

});

var originalLeave = $.fn.popover.Constructor.prototype.leave;
$.fn.popover.Constructor.prototype.leave = function(obj){
  var self = obj instanceof this.constructor ?
    obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
  var container, timeout;

  originalLeave.call(this, obj);

  if(obj.currentTarget) {
    container = $(obj.currentTarget).siblings('.popover')
    timeout = self.timeout;
    container.one('mouseenter', function(){
      clearTimeout(timeout);
      container.one('mouseleave', function(){
        $.fn.popover.Constructor.prototype.leave.call(self, self);
      });
    });
  }
};

function isTouchDevice() {
    return true == ("ontouchstart" in window && screen.width <= 1024 || window.DocumentTouch && document instanceof DocumentTouch);
}
if (isTouchDevice() === true) {
    //alert('Touch Device');
	$('body').addClass('is-touch');
	$('.gal-thumb').prepend('<span class="thumb-info-i" data-toggle="popover"><i class="fa fa-info"></i></span>');
	$('.thumb-info-i').popover({
        content: function () {
            return $(this).closest('li').find('.gal-thumb-details').html();
        },
        container: 'body',
        html: true,
        trigger: 'click',
        placement: 'top',
        delay: {
            show: 100, 
            hide: 100
		  }
    });
	$('body').on('click', function (e) {
		$('[data-toggle="popover"]').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				$(this).popover('hide');
			}
		});
	});
} else {
    //alert('Not a Touch Device');
	$('body').addClass('no-touch');
	$('.gal-thumb > a').popover({
        content: function () {
            return $(this).closest('li').find('.gal-thumb-details').html();
        },
        //container: 'body',
        html: true,
        trigger: 'click hover',
        placement: 'top', 
        delay: {
            show: 100, 
            hide: 100
        },
    });
}

function MakeFovourite() {

  var _data = [
            { "id": "ajson1", "parent": "#", "text": "My Favorites", "state": {"opened": true, "delete" : false}, "li_attr" : { "class" : "my-fav" }, "data" : { "file" : false } },
            { "id": "ajson2", "parent": "ajson1", "text": "Nature", "data" : { "file" : true }, "state": {"opened": true} },
            { "id": "ajson3", "parent": "ajson1", "text": "Cars", "data" : { "file" : true } },
            { "id": "ajson4", "parent": "ajson2", "text": "kjs", "data": {"file": true}, "state": {"opened": true, "selected": true}}
        ];
  console.log($('.favtree'));
  $('.favtree').jstree({
      core: {
        check_callback: true,
        data: _data
    },
      plugins : ["contextmenu","contextmenubtn"],
      "contextmenu" : {
          "items" : customMenu
      },
      "ui" : {
          "initially_select" : [ "root" ]
      }
  });
  // var selectedNode = $('.favtree').jstree(true).get_selected(true);
 
  //  var id = [],
  //    parent = [],
  //    text = [];
  //  for(var i = 0, j = selectedNode.lenght; i<j; i++)
  //  {
  //    id.push(selectedNode.id);
  //    parent.push(selectedNode.parent);
  //    text.push(selectedNode.text);
  //  }
  //  console.log("id--", id);
  //  console.log("parent--", id);
  //  console.log("text--", id);
}
function customMenu(node) {
    // The default set of all items
    var items = {
        createItem: { // The "create" menu item
            label: "Add Folder",
            action: function (data) {
                var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                inst.create_node(obj, {}, "last", function (new_node) {
                    new_node.data = {file: true};
                    new_node.text = "New Folder";
                    setTimeout(function () { inst.edit(new_node); },0);
                });
            }
        },
        renameItem: { // The "rename" menu item
            label: "Rename",
            action: function (data) {
                var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                inst.edit(obj);
                //alert(node.text);
                setTimeout(function(){
                  console.log($('.jstree-node').html());
                },1000);
                
            }
        },
        deleteItem: { // The "delete" menu item
            label: "Delete",
            action: function (data) {
                //alert('Any images inside this folder will be moved to the top level: My Favorites');
                
                var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                if(inst.is_selected(obj)) {
                    //inst.delete_node(inst.get_selected());
                    $('#ConfirmDelete').addClass('visible-elem');
                    //alert(node.text);
                    $('#conf_txt').html('Are you sure want to delete <strong>' + node.text +'</strong>?');
                }
                else {
                    //inst.delete_node(obj);
                }
                // if ( confirm("Are you sure want to delete " + node.text + "?") ) {
                //     inst.delete_node(obj);
                // }

                                
                $(document).on('click', '.del-item', function(){
                  inst.delete_node(obj);
                  $('#ConfirmDelete').removeClass('visible-elem');
                });
                $(document).on('click', '.cancel-del-tree', function(){
                  $('#ConfirmDelete').removeClass('visible-elem');
                });
            }
        }
    };

    if (node.children.length > 0) { 
      console.log('Hehe',node.children.length);
      console.log('h--',items.deleteItem._disabled);
            items.deleteItem._disabled = true;
      items.renameItem._disabled = true;
    }

    return items;
}


function UploadPicZone() {
  $('#uploadZone').dropzone({
    // url: 'http://dn-api.us-east-1.elasticbeanstalk.com/api/upload',
    url: 'http://localhost:8083/api/upload',
    paramName: 'photo',
    maxFilesize: 50,
    clickable: '.fileinput-button',
    thumbnailWidth: 700,
    thumbnailHeight: null,
    uploadMultiple: false, 
    maxFiles: 1,
    addRemoveLinks: true,
    acceptedFiles: '.png,.jpg',
    init: function() {
      this.on("sending", function(file, xhr, formData) {
        formData.append("step", "upload");
        var storageUser = localStorage.getItem('currentUser');
        var storageuser = JSON.parse(storageUser);
        var uid =  storageuser.id;
        formData.append("uid", uid);
      });
      this.on('success', function(file, responseText) {
        setTimeout(function(){
          $('#UploadPic').modal('hide');
          // window.location.href = 'wallpaper.html';
          // location.assign('http://beta.desktopnexus.com/#/wallpaper/' + responseText.img_id);
          // location.assign('http://beta.desktopnexus.com/wallpaper/' + responseText.img_id);
          location.assign('http://localhost:4200/wallpaper/' + responseText.img_id);
        },2000);
      });
    }
  });
  document.onpaste = function(event){
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (index in items) {
      var item = items[index];
      if (item.kind === 'file') {
        // adds the file to your dropzone instance
        // myDropzone.addFile(item.getAsFile())
        $('#uploadZone').doropzone.addFile(item.getAsFile());
      }
    }
  }
}

function EditProfile() {
  $('.pf-about-box .edit').on('click', function(e){
    e.preventDefault();
    $(this).hide();
    $('.about-txt').each(function(){
      var content = $(this).html();
      $(this).html('<textarea>' + content + '</textarea>');
    });
    $('.pf-about-box .save-pro').show();
  });

  $('.pf-about-box .save-pro').on('click', function(e){
    e.preventDefault();
    $(this).hide();
    $('.pf-about-box textarea').each(function(){
      var content = $(this).val();//.replace(/\n/g,"<br>");
      $(this).html(content);
      $(this).contents().unwrap();    
    }); 
    $('.pf-about-box .edit').show(); 
  });
}


function AnimBox(){
  var trans3DDemo = $("#trans3DDemo"), 
      trans3DBoxes = $("#trans3DBoxes"),// div containing all the orange boxes
      boxes = $("#trans3DBoxes > div"), // all orange boxes   
        slider = $("#slider"), 
        play_btn = $("#play_btn").button(),
      threeDTimeline = new TimelineLite({onUpdate:updateSlider}); //onUpdate allows the slider to stay in sync as animation plays
      
  //transformPerspective gives the element its own vanishing point
  //perspective allows all the child elements (orange boxes) to share the same vanishing point with each other
  //transformStyle:"preserve3d" allows the child elements to maintain their 3D position (noticeable only when their parent div is rotated in 3D space)
  TweenLite.set(trans3DBoxes, {css:{transformPerspective:400, perspective:400, transformStyle:"preserve-3d"}}); //saves a dozen lines of vendor-prefixed css ;)

  //random explosion effect   
  boxes.each(function (index, element) {
    threeDTimeline.from(element, 1, {css:{z:100,  rotationX:getRandom(-260, 200), rotationY:getRandom(-260, -200), autoAlpha:0}}, "explode");
  }) ;


  //jQueryUI Slider

  function updateSlider(){}
    
  function getRandom(max, min){
    return Math.floor(Math.random() * (1 + max - min) + min);
  } 

}


// Wallpaper animated icons
;(function(window) {

  'use strict';

  // taken from mo.js demos
  function isIOSSafari() {
    var userAgent;
    userAgent = window.navigator.userAgent;
    return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
  };

  // taken from mo.js demos
  function isTouch() {
    var isIETouch;
    isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
  };
  
  // taken from mo.js demos
  var isIOS = isIOSSafari(),
    clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

  function extend( a, b ) {
    for( var key in b ) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function Animocon(el, options) {
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );

    this.checked = false;

    this.timeline = new mojs.Timeline();
    
    for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
      this.timeline.add(this.options.tweens[i]);
    }

    var self = this;
    this.el.addEventListener(clickHandler, function() {
      if( self.checked ) {
        self.options.onUnCheck();
      }
      else {
        self.options.onCheck();
        self.timeline.replay();
      }
      self.checked = !self.checked;
    });
  }

  Animocon.prototype.options = {
    tweens : [
      new mojs.Burst({})
    ],
    onCheck : function() { return false; },
    onUnCheck : function() { return false; }
  };

  // grid items:
  var items = document.querySelectorAll('.mojs-icon');

  function init() {

   /* Icon 1 */
    var el1 = items[0].querySelector('button.icobutton'), el1span = el1.querySelector('span');
    el1span.style.WebkitTransformOrigin = el1span.style.transformOrigin = '-10% 50%';
    new Animocon(el1, {
      tweens : [
        // burst animation
        new mojs.Burst({
          parent:     el1,
          count:      6,
          radius:     {40:90},
          angle:      135,
          degree:     90,
          children: {
            fill :      [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
            scale:      1,
            radius:     { 7 : 0 },
            opacity:    0.6,
            duration:   1500,
            delay:      350,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        }),
        // burst animation
        new mojs.Burst({
          parent:   el1,
          count:    6,
          angle:    45,
          degree:  -90,
          radius:   {40:100},
          children: {
            fill:       [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
            scale:      1,
            radius:     { 7 : 0 },
            opacity:    0.6,
            duration:   1500,
            delay:      550,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        }),
        // ring animation
        new mojs.Shape({
          parent:   el1,
          radius:   {0: 50},
          fill:     'transparent',
          stroke:   '#988ADE',
          strokeWidth: {35:0},
          opacity:    0.6,
          duration:   750,
          easing:     mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        // ring animation
        new mojs.Shape({
          parent:       el1,
          radius:       {0: 50},
          fill:         'transparent',
          stroke:       '#988ADE',
          strokeWidth:  {35:0},
          opacity:      0.6,
          duration:     750,
          delay:        200,
          easing:       mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        // icon scale animation
        new mojs.Tween({
          duration : 1500,
          onUpdate: function(progress) {
            if(progress > 0.3) {
              var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
              el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1) rotate3d(0,0,1,' + 90*(1-elasticOutProgress) + 'deg)';
            }
            else {
              el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(0,0,1)';
            }
          }
        })
      ],
      onCheck : function() {
        el1.style.color = '#1f55a7';
      },
      onUnCheck : function() {
        el1.style.color = '#aab8c2';  
      }
    });
    /* Icon 1 */

    /* Icon 2 */
    var el2 = items[1].querySelector('button.icobutton'), el2span = el2.querySelector('span');
    new Animocon(el2, {
      tweens : [
        // ring animation
        new mojs.Shape({
          parent: el2,
          duration: 750,
          type: 'circle',
          radius: {0: 40},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {35:0},
          opacity: 0.2,
          top: '45%',
          easing: mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        new mojs.Shape({
          parent: el2,
          duration: 500,
          delay: 100,
          type: 'circle',
          radius: {0: 20},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.2,
          x : 40, 
          y : -60,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: el2,
          duration: 500,
          delay: 180,
          type: 'circle',
          radius: {0: 10},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.5,
          x: -10, 
          y: -80,
          isRunLess: true,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: el2,
          duration: 800,
          delay: 240,
          type: 'circle',
          radius: {0: 20},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.3,
          x: -70, 
          y: -10,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: el2,
          duration: 800,
          delay: 240,
          type: 'circle',
          radius: {0: 20},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.4,
          x: 80, 
          y: -50,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: el2,
          duration: 1000,
          delay: 300,
          type: 'circle',
          radius: {0: 15},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.2,
          x: 20, 
          y: -100,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: el2,
          duration: 600,
          delay: 330,
          type: 'circle',
          radius: {0: 25},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.4,
          x: -40, 
          y: -90,
          easing: mojs.easing.sin.out
        }),
        // icon scale animation
        new mojs.Tween({
          duration : 1200,
          easing: mojs.easing.ease.out,
          onUpdate: function(progress) {
            if(progress > 0.3) {
              var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
              el2span.style.WebkitTransform = el2span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
            }
            else {
              el2span.style.WebkitTransform = el2span.style.transform = 'scale3d(0,0,1)';
            }
          }
        })
      ],
      onCheck : function() {
        el2.style.color = '#e2264d';
      },
      onUnCheck : function() {
        el2.style.color = '#aab8c2';
      }
    });
    /* Icon 2 */

   /* Icon 3 */
    var el3 = items[2].querySelector('button.icobutton'), el3span = el3.querySelector('span');
    el3span.style.WebkitTransformOrigin = el3span.style.transformOrigin = '-10% 50%';
    new Animocon(el3, {
      tweens : [
        // burst animation
        new mojs.Burst({
          parent:     el3,
          count:      6,
          radius:     {40:90},
          angle:      135,
          degree:     90,
          children: {
            fill :      [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
            scale:      1,
            radius:     { 7 : 0 },
            opacity:    0.6,
            duration:   1500,
            delay:      350,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        }),
        // burst animation
        new mojs.Burst({
          parent:   el3,
          count:    6,
          angle:    45,
          degree:  -90,
          radius:   {40:100},
          children: {
            fill:       [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
            scale:      1,
            radius:     { 7 : 0 },
            opacity:    0.6,
            duration:   1500,
            delay:      550,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        }),
        // ring animation
        new mojs.Shape({
          parent:   el3,
          radius:   {0: 50},
          fill:     'transparent',
          stroke:   '#988ADE',
          strokeWidth: {35:0},
          opacity:    0.6,
          duration:   750,
          easing:     mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        // ring animation
        new mojs.Shape({
          parent:       el3,
          radius:       {0: 50},
          fill:         'transparent',
          stroke:       '#988ADE',
          strokeWidth:  {35:0},
          opacity:      0.6,
          duration:     750,
          delay:        200,
          easing:       mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        // icon scale animation
        new mojs.Tween({
          duration : 1500,
          onUpdate: function(progress) {
            if(progress > 0.3) {
              var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
              el3span.style.WebkitTransform = el3span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1) rotate3d(0,0,1,' + 90*(1-elasticOutProgress) + 'deg)';
            }
            else {
              el3span.style.WebkitTransform = el3span.style.transform = 'scale3d(0,0,1)';
            }
          }
        })
      ],
      onCheck : function() {
        el3.style.color = '#1f55a7';
      },
      onUnCheck : function() {
        el3.style.color = '#aab8c2';  
      }
    });
    /* Icon 3 */

    /* Icon 4 */
    var el4 = items[3].querySelector('button.icobutton'), el4span = el4.querySelector('span');
    new Animocon(el4, {
      tweens : [
        // ring animation
        new mojs.Shape({
          parent: el4,
          duration: 750,
          type: 'circle',
          radius: {0: 40},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {35:0},
          opacity: 0.2,
          top: '45%',
          easing: mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        new mojs.Shape({
          parent: el4,
          duration: 500,
          delay: 100,
          type: 'circle',
          radius: {0: 20},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.2,
          x : 40, 
          y : -60,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: el4,
          duration: 500,
          delay: 180,
          type: 'circle',
          radius: {0: 10},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.5,
          x: -10, 
          y: -80,
          isRunLess: true,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: el4,
          duration: 800,
          delay: 240,
          type: 'circle',
          radius: {0: 20},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.3,
          x: -70, 
          y: -10,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: el4,
          duration: 800,
          delay: 240,
          type: 'circle',
          radius: {0: 20},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.4,
          x: 80, 
          y: -50,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: el4,
          duration: 1000,
          delay: 300,
          type: 'circle',
          radius: {0: 15},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.2,
          x: 20, 
          y: -100,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: el4,
          duration: 600,
          delay: 330,
          type: 'circle',
          radius: {0: 25},
          fill: 'transparent',
          stroke: '#e2264d',
          strokeWidth: {5:0},
          opacity: 0.4,
          x: -40, 
          y: -90,
          easing: mojs.easing.sin.out
        }),
        // icon scale animation
        new mojs.Tween({
          duration : 1200,
          easing: mojs.easing.ease.out,
          onUpdate: function(progress) {
            if(progress > 0.3) {
              var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
              el4span.style.WebkitTransform = el4span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
            }
            else {
              el4span.style.WebkitTransform = el4span.style.transform = 'scale3d(0,0,1)';
            }
          }
        })
      ],
      onCheck : function() {
        el4.style.color = '#e2264d';
      },
      onUnCheck : function() {
        el4.style.color = '#aab8c2';
      }
    });
    /* Icon 4 */
    
    /* Icon 5 */
    var el5 = items[4].querySelector('button.icobutton'), el5span = el5.querySelector('span');
    new Animocon(el5, {
      tweens : [
        // burst animation
        new mojs.Burst({
          parent:     el5,
          count:      6,
          radius:     {40:90},
          children: {
            fill:       [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
            opacity:    0.6,
            scale:      1,
            radius:     { 7: 0 },
            duration:   1500,
            delay:      300,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        }),
        // ring animation
        new mojs.Shape({
          parent:       el5,
          type:         'circle',
          scale:        { 0: 1 },
          radius:       50,
          fill:         'transparent',
          stroke:       '#988ADE',
          strokeWidth:  {35:0},
          opacity:      0.6,
          duration:     750,
          easing:       mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        // icon scale animation
        new mojs.Tween({
          duration : 1100,
          onUpdate: function(progress) {
            if(progress > 0.3) {
              var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
              el5span.style.WebkitTransform = el5span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
            }
            else {
              el5span.style.WebkitTransform = el5span.style.transform = 'scale3d(0,0,1)';
            }
          }
        })
      ],
      onCheck : function() {
        el5.style.color = '#988ADE';
      },
      onUnCheck : function() {
        el5.style.color = '#C0C1C3';  
      }
    });
    /* Icon 5 */

    /* Icon 6 */
    var el6 = items[5].querySelector('button.icobutton'), el6span = el6.querySelector('span');
    el6span.style.WebkitTransformOrigin = el6span.style.transformOrigin = '-10% 50%';
    new Animocon(el6, {
      tweens : [
        // burst animation
        new mojs.Burst({
          parent:     el6,
          count:      6,
          radius:     {40:90},
          angle:      135,
          degree:     90,
          children: {
            fill :      [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
            scale:      1,
            radius:     { 7 : 0 },
            opacity:    0.6,
            duration:   1500,
            delay:      350,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        }),
        // burst animation
        new mojs.Burst({
          parent:   el6,
          count:    6,
          angle:    45,
          degree:  -90,
          radius:   {40:100},
          children: {
            fill:       [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
            scale:      1,
            radius:     { 7 : 0 },
            opacity:    0.6,
            duration:   1500,
            delay:      550,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        }),
        // ring animation
        new mojs.Shape({
          parent:   el6,
          radius:   {0: 50},
          fill:     'transparent',
          stroke:   '#988ADE',
          strokeWidth: {35:0},
          opacity:    0.6,
          duration:   750,
          easing:     mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        // ring animation
        new mojs.Shape({
          parent:       el6,
          radius:       {0: 50},
          fill:         'transparent',
          stroke:       '#988ADE',
          strokeWidth:  {35:0},
          opacity:      0.6,
          duration:     750,
          delay:        200,
          easing:       mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        // icon scale animation
        new mojs.Tween({
          duration : 1500,
          onUpdate: function(progress) {
            if(progress > 0.3) {
              var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
              el6span.style.WebkitTransform = el6span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1) rotate3d(0,0,1,' + 90*(1-elasticOutProgress) + 'deg)';
            }
            else {
              el6span.style.WebkitTransform = el6span.style.transform = 'scale3d(0,0,1)';
            }
          }
        })
      ],
      onCheck : function() {
        el6.style.color = '#1f55a7';
      },
      onUnCheck : function() {
        el6.style.color = '#aab8c2';  
      }
    });
    /* Icon 6 */

   

   

    

    

    

   
   

   

    
    
    
  }
  
  init();

})(window);


























