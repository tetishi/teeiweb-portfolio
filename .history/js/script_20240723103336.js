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
