//ページトップへ戻る
$pageTop = $('#js-pageTop');

$(window).scroll(function () {
  if ($(this).scrollTop() > 300) {
    $pageTop.addClass('is-show');
  } else {
    $pageTop.removeClass('is-show');
  }
});
$pageTop.on('click', function () {
  $('body,html').animate({
    scrollTop: 0
  }, 300);
  return false;
});


//ハンバーガーメニュー
$btnMenu = $('.js-btnMenu');
$gnav = $('.js-headerNav');
$btnMenu.on('click', function () {
  $btnMenu.toggleClass('is-active');
  $gnav.addClass('is-show')
  $gnav.animate({ width: 'toggle' }, 200);
});
$(document).on('click', function (e) {
  console.log(e.target);
  if (!$(e.target).closest($gnav).length && !$(e.target).closest($btnMenu).length) {
    if ($gnav.hasClass('show')) {
      $gnav.removeClass('show')
      $btnMenu.toggleClass('active');
      $gnav.animate({ width: 'toggle' }, 200);
    }
  }
})
