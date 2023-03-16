$(document).ready(function () {
    // ↓ 알바 지원하기 팝업 열기 함수  //
    $('#parttime').on('click', function () {
        $('#popup_iframe').attr('src', '/popup');
        $('#popup').fadeIn(200);
        $('.popup').scrollTop(0);
    })
    // ↓ 알바지원 팝업 닫기 함수 //
    $(".close_popup_btn").click(function () {
        $("#popup").fadeOut(200);
    });
});