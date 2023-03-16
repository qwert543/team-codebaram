
// ↓ 알바 지원, 폼데이터로 app.py로 보냄 //
function posting() {
    let imgurl = $('#imgurl').val()
    let name = $('#name').val()
    let age = $('#age').val()
    let mbti = $('#mbti').val()
    let hobby = $('#hobby').val()
    let recommendmovie = $('#recommendmovie').val()
    let goal = $('#goal').val()
    let tmi = $('#tmi').val()

    let formData = new FormData();
    formData.append("imgurl_give", imgurl);
    formData.append("name_give", name);
    formData.append("age_give", age);
    formData.append("mbti_give", mbti);
    formData.append("hobby_give", hobby);
    formData.append("recommendmovie_give", recommendmovie);
    formData.append("goal_give", goal);
    formData.append("tmi_give", tmi);

    fetch('/movie', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data["msg"])
        window.location.reload()
    })
}
