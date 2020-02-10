let toEdit

let baseUrl = "http://localhost:3000"
$(window).on("load", function () {
    if (localStorage.getItem("access_token")) {
        switchIt("in")
        getComics()
    } else {
        switchIt("out")
    }
})

$(document).ready(function () {
    $("#loginNow").click(function (e) {
        e.preventDefault()
        let email = $("#emailLogin").val()
        let password = $("#passwordLogin").val()
        login(email, password)
    })
    $("#btn-logout").click(function (e) {
        e.preventDefault()
        logout()
    })
    $("#mauRegister").click(function () {
        $("#loginPage").hide()
        $("#registerPage").show()
    })
    $("#mauLogin").click(function () {
        $("#loginPage").show()
        $("#registerPage").hide()
    })
    $("#registerNow").click(function (e) {
        e.preventDefault()
        let email = $("#emailReg").val()
        let password = $("#passwordReg").val()
        let name = $("#nameReg").val()
        register(email, password, name)
    })
    $("#randomise").click(function (e) {
        e.preventDefault()
        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: function (data) {

                $("#emailReg").val(data.results[0].email)
                $("#name").val(data.results[0].name.first)
                $("#passwordReg").val(data.results[0].name.last)
            }
        })
    })
})

function login(email, password) {
    $("#alert").empty()

    // console.log(email, password)
    $.ajax(`${baseUrl}/login`, {
        type: "POST",
        data: {
            email,
            password
        },
        success: function (data) {
            // console.log(data)
            localStorage.setItem("access_token", data.access_token)
            switchIt("in")
            getComics()
        },
        error: function (err) {
            $("#alert").empty()
            $("#alert").append(err.responseJSON)
            $("#alert").show()
        }
    })
}

function register(email, password, name) {
    $.ajax(`${baseUrl}/register`, {
        type: "Post",
        data: {
            email,
            password,
            name
        },
        success: function (data) {
            localStorage.setItem("access_token", data.access_token)
            switchIt("in")
            getComics()
        },
        error: function (err) {
            let errMSG = ""
            // console.log(err)
            for (let i of err.responseJSON) {
                errMSG += i.message + " "
            }
            $("#alert").empty()
            $("#alert").append(errMSG)
            $("#alert").show()
        }
    })
}
function logout() {
    localStorage.clear()
    switchIt("out")
}

function getComics() {
    $("#alert").empty()

    // console.log("masuk get")
    $.ajax(`${baseUrl}/comics`, {
        type: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        success: function (all) {
            // console.log(all)

            $("#comicsCol").empty()
            let isi = generateCardComics(all)
            $("#comicsCol").append(isi)
        },
        error: function (err) {
            console.log(err)
        }

    })
}

function generateCardComics(isian) {
    let appendan = ''
    for (let i of isian) {
        appendan += `
        <div class="col-4 mb-4">
            <div class="card text-center">
              <img
                src="${i.imageUrl}"
                class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${i.title}</h5>
                <p class="card-text">${i.author}</p>
                <button class="btn btn-primary" onclick="editComic(${i.id},'${i.title}', '${i.author}', '${i.imageUrl}')">Edit</button>
              </div>
            </div>
          </div>
        `
    }
    return appendan
}

function editComic(id, title, author, imageUrl) {
    $("#alert").empty()

    getComicById(id)
    $("#updateThis").show()
    $("#titleEdit").val(title)
    $("#authorEdit").val(author)
    $("#imageEdit").val(imageUrl)
    $("#btn-update").click(function (e) {
        // console.log("halo")
        e.preventDefault()
        let title = $("#titleEdit").val()
        let author = $("#authorEdit").val()
        let imageUrl = $("#imageEdit").val()
        editComicnya(toEdit, title, author, imageUrl)
    })
}

function getComicById(id) {
    $.ajax(`${baseUrl}/comics/${id}`, {
        type: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        success: function (data) {
            console.log(data)
            toEdit = data.id
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function editComicnya(id, title, author, imageUrl) {
    $.ajax(`${baseUrl}/comics/${id}`, {
        type: "PUT",
        data: {
            title,
            author,
            imageUrl
        },
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        success: function (data) {
            // $("#updateThis").empty()
            $("#updateThis").hide()
            getComics()
        },
        error: function (err) {
            console.log(err)
            let errMSG = ""
            // console.log(err)
            for (let i of err.responseJSON) {
                errMSG += i.message + " "
            }
            $("#alert").empty()
            $("#alert").append(errMSG)
            $("#alert").show()
        }
    })
}
function switchIt(status) {
    if (status == "in") {
        $("#loginPage").hide()
        $("#home").show()
        $("#registerPage").hide()
        $("#btn-logout").show()
        $("#alert").hide()
        $("#updateThis").hide()
    } else {
        $("#loginPage").show()
        $("#home").hide()
        $("#registerPage").hide()
        $("#btn-logout").hide()
        $("#alert").hide()
        $("#updateThis").hide()
    }
}