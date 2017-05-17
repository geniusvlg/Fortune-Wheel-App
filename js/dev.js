var loadCallback = function () {
  $('#content').show();
};

$(window).load(function () {
  $h_footer = $('#footer').outerHeight(true);
  $h_window = $(window).outerHeight(true);
  $width = $(window).outerWidth(true);
  if ($h_window > 1060 || $width > 1060)
  {
    $('#wrapper').css("height", $h_window - $h_footer);
    loadCallback();
  }

});

function showPopup(id, content) {

  if (typeof(content) === 'undefined') {

     content = 'Kết nối gặp gián đoạn, vui lòng vào mục quà tặng để kiểm tra kết quả quay. Xin cảm ơn !';
  }

  $('#popup-error div.description').html(content);
  $('#' + id).addClass('open');
  $('#' + id + ' .popup-body').addClass('open');
  $('#' + id).find('.close').click(function () {
    hidePopup(id);
  });
}

function hidePopup(id) {
  $('#' + id).removeClass('open');
}