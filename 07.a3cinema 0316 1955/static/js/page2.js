$(document).ready(function () {
    rec_movie_list();
    // ↓ 팝업창 열기, i값 어떻게든 가져와서 /popmovie/i //
    $('#screens').on('click', '.card-front', function () {
        let i = $(this).attr('id').replace('screen', '');
        // alert(i)
        $('#popmovie_iframe').attr('src', '/popmovie/' + i);
        $('#popmovie').fadeIn(200);
        $('.popmovie').scrollTop(0);
    })

    $(".close_popup_btn").click(function () {
        $('#popmovie').fadeOut(200);
    });
});
// ↓ 팝업창 닫기 //
function close_popup() {
    $("#popmovie").fadeOut(200);
}

// ↓ 추천영화 url과 코멘트 폼에 실어서 app.py로 보내줌 //
function rec_movie_post() {
    let url = $('#recipient-name').val()
    let comment = $('#message-text').val()
    let star = $('#star').val()
    let formData = new FormData();

    formData.append("url_give", url);
    formData.append("comment_give", comment);
    formData.append("star_give", star)

    fetch('/recommend', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data['msg'])
        window.location.reload()
    })
}
// ↓ 상영관 이름 붙여주는 함수, 이름 붙이면서 i값 받아옴 //
function rec_movie_list() {
    fetch('/recommend').then((res) => res.json()).then((data) => {
        let rows = data['rec_movie']
        $('#screens').empty()
        rows.forEach((a, index) => {
            let i = index + 1
            let temp_html = `<div id="screen${index}" class="card-front col">
                                <div >
                                    <div class="box">${i}관</div>
                                    <div class="watch_movie">
                                    </div>
                                </div>
                            </div>`
            $('#screens').append(temp_html)
        })
    })
}
