

$(document).ready(function () {
    get_rec_movie()
    $("#close_popup_btn").click(function () {
        // $('html, body').css({
        //     'overflow': 'auto'
        // });
        $("#popmovie").fadeOut(200);
    });
});
function get_rec_movie() {
    fetch(`/recommend/{{num}}`).then((res) => res.json()).then((data) => {
        let rows = data['rec_movie']

        // $('#flippedcard').empty()
        // rows.forEach((a, index) => {
        // let i = index + 1
        let comment = rows['comment']
        let title = rows['title']
        let image = rows['image']
        let star = rows['star']

        let star_repeat = '⭐'.repeat(star)

        $("#url").attr('src', image)
        $("#title").text(title)
        $("#comment").text(comment)
        $("#star").text(star_repeat)
        // console.log(rows)
        // let temp_html = `<div id="flippedcard${i}" class="row row-cols-1 row-cols-md-5 g-4 card-back">
        //                     <img class="mov-img" src="${image}">
        //                     <h5 class="mov-name">${title}</h5>
        //                     <div class="mov-comment">${comment}</div>
        //                 </div>`
        // $('#flippedcard').append(temp_html)
        $('temp_box').empty()
    })
}
