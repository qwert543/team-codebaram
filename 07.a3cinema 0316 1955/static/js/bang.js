function tableWrite() {
    var userName = document.querySelector("#username").value;
    var userContent = document.querySelector("#content").value;
    var tbody = document.querySelector("tbody");
    var userDate = new Date();
    var year = userDate.getFullYear();
    var month = userDate.getMonth() + 1;
    var date = userDate.getDate();
    var hours = String(userDate.getHours()).padStart(2, "0");
    var minutes = String(userDate.getMinutes()).padStart(2, "0");
    var newtr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    td1.innerText = tbody.rows.length + 1;
    td2.innerText = userName;
    td3.innerText = userContent;
    td4.innerText = `${year}-${month}-${date} ${hours}:${minutes}`;
    newtr.append(td1);
    newtr.append(td2);
    newtr.append(td3);
    newtr.append(td4);
    tbody.appendChild(newtr);
}

$(document).ready(function () {
    show_popup_comment()
});
function show_popup_comment() {
    $.ajax({
        type: "GET",
        url: "/show_popup_comment",
        data: {},
        success: function (response) {
            let rows = response['show_popup']
            for (let i = 0; i < rows.length; i++) {
                let name = rows[i]['name']
                let comment = rows[i]['comment']
                let temp_html = `<tr>
                          <td >${name}</td>
                          <td >${comment}</td>
                        </tr>`
                $('#show_box').append(temp_html)
            }
        }
    })
}
function popup_save() {
    let name = $('#name').val()
    let comment = $('#comment').val()
    $.ajax({
        type: "POST",
        url: "/popup_comment",
        data: { name_give: name, comment_give: comment },
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
}
