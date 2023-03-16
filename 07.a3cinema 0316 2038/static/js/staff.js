$(document).ready(function () {
    listing();
});
function open_box() {
    $('#box').show()
}

function close_box() {
    $('#box').hide()
}
// ↓ 알바 명단 가져오기  //
function listing() {
    $.ajax({
        type: 'GET',
        url: '/movie',
        data: {},
        success: function (response) {
            let rows = response['moviedb']
            for (let i = 0; i < rows.length; i++) {
                let name = rows[i]['name']
                let age = rows[i]['age']
                let mbti = rows[i]['mbti']
                let imgurl = rows[i]['imgurl']
                let hobby = rows[i]['hobby']
                let recommendmovie = rows[i]['recommendmovie']
                let goal = rows[i]['goal']
                let tmi = rows[i]['tmi']
                let num = rows[i]['num']
                let temp_html = `<div class="col">
                                            <div class="card h-100">
                                                <img src="${imgurl}"
                                                    class="card-img-top">
                                                <div class="card-body">
                                                    <h5 class="card-name">${name}<p class="badge">알바</p></h5>
                                                    <p class="card-age">${age}</p>
                                                    <p class="card-mbti">${mbti}</p>
                                                    <p class="card-hobby">${hobby}</p>
                                                    <p class="card-recommendmovie">${recommendmovie}</p>
                                                    <p class="card-goal">${goal}</p>
                                                    <p class="card-tmi">${tmi}</p>
                                                </div>
                                            </div>
                                        </div>`
                $('#cards-box').append(temp_html)
            }
        }
    })
}
// ↓ 댓글 작성  //
function savecomment() {
    let name = $('#name').val()
    let comment = $('#comment').val()
    $.ajax({
        type: 'POST',
        url: '/savecomment',
        data: { name_give: name, comment_give: comment },
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    });
}

$(document).ready(function () {
    show_all()
});

function show_all() {
    $('#mycomment_son').empty()
    $.ajax({
        type: "GET",
        url: "/show_comment",
        data: {},
        success: function (response) {
            let rows = response['show']
            for (let i = 0; i < rows.length; i++) {
                let name = rows[i]['name']
                let comment = rows[i]['comment']
                let temp_html = `<div class="card">
                                            <div class="card-body">
                                                <blockquote class="blockquote mb-0">
                                                    <p>${comment}</p>
                                                    <footer class="blockquote-footer">${name}</footer>
                                                </blockquote>
                                            </div>
                                        </div>`
                $('#mycomment_son').append(temp_html)
            }
        }
    })
}
function open_comment() {
    $('#mycomment').show()
}
function close_comment() {
    $('#mycomment').hide()
}

