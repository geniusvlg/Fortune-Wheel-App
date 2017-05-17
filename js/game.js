loadCallback = function () {
  $scrolling_h = $('#scrolling').outerHeight(true);
 
  $h_header = $('#header').outerHeight(true);
  $h_footer = $('#footer').outerHeight(true);
  $h_window = $(window).outerHeight(true);
  $h_content = $h_window - ($h_header + $h_footer + $scrolling_h);
  $width = $(document).outerWidth(true);

  $('#content').css('height', $h_content).show();
  $('.turn').css('bottom', $h_footer + 10);
  $('.btn-share-home').css('bottom', $h_footer + 10);
  $h_content = $('#content').outerHeight(true);
  var a_canvas;
  
 
 if ($width > $h_content + 20) {
    a_canvas = $h_content - 20;
  }
  else {
    console.log("BINGO")
    a_canvas = $width - 40;
  }
  $('#canvas').css('margin-top', $scrolling_h/2 + "px");
  $('#canvas').css('width', a_canvas + "px");
  $('#canvas').css('height', a_canvas + "px");
};

isPlay = false;
function rotateImg() {
  if ($('#canvas button').hasClass('inactive')) {
    alert("Bạn đã hết lượt quay, vui lòng quay lại vào ngày mai. Xin cảm ơn!");
    return;
  }

  if (isPlay == false) {
    var turn = $('#total-turn').html();
    $('#total-turn').html(parseInt(turn) - 1);
    $('#canvas button').css('opacity', '0.7');
    $('#mask').fadeIn(200);
//    var k = Math.floor((Math.random() * 11) + 0);
//    var round = Math.floor((Math.random() * 8) + 6);
    isPlay = true;
    setTimeout(function () {
      play();
    }, 200);

  }
}

function play() {
  var round = 14;
  var ang = round * 360;
  var token = $('#my_token').val();

  $('#wheel').rotate({
    angle: 0,
    animateTo: ang,
    duration: 14000,
//      easing: $.easing.easeInOutQuart,
  });

  var ok = $.ajax({
    url: $('#url_rotate').val(),
    dataType: 'json',
    data: {token: token},
    success: function (data) {
      if (data.result) {
        $('#my_token').val(data.token);
        ang = data.angle + ang;
        $('#wheel').rotate({
          animateTo: ang,
          duration: 15000,
//            easing: $.easing.easeInOutQuart,
          callback: function () {
            token = $('#my_token').val();
//            var url_reward = $('#url_reward').val();
//            url_reward = url_reward + "?win=" + data.win + "&token=" + token;
//            $.get(url_reward);

            if(data.type == "SHARE"){
              data.note += "<br><br><img style='cursor:pointer' onclick='shareFB(1)' src='/wap/images/btn-share.png' />";
            }
            $('#popup-result div.bold').html(data.message);
            $('#popup-result div.description').html(data.note);

            $('#mask').hide();
            showPopup('popup-result');
            if (data.turn <= 0) {
              $('#canvas button').addClass('inactive');
            }
            else {
              $('#canvas button').css('opacity', '1');
              isPlay = false;
            }
            $('#total-turn').html(data.turn);
          }
        });
      }
      else {
        stop();
        $('#popup-result div.description').html(data.message);
        showPopup('popup-error');
        setTimeout(function () {
          location.reload();
        }, 1500);
      }
    },
    error: function () {
      stop();
      showPopup('popup-error');
      setTimeout(function () {
        location.reload();
      }, 1500);
    },
    timeout: 10000
  });
}

function stop() {
  $('#canvas').hide();
  $('#mask').hide();
}
