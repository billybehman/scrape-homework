$(document).ready(function () {

    $.getJSON("/articles", function (data) {
        for (var i = 0; i < data.length; i++) {
            let arDiv = $("<div>")
            arDiv.attr("id", data[i]._id)
            arDiv.text("Title: " + data[i].title)
            let linkDiv = $("<a>")
            linkDiv.attr("href", data[i].link)
            linkDiv.text("link")
            arDiv.append(linkDiv)
            let noteBtn = $("<button>")
            noteBtn.text("Add Note")
            noteBtn.addClass("addNote")
            arDiv.append(noteBtn)
            let seeNoteBtn = $("<button>")
            seeNoteBtn.text("See Notes")
            seeNoteBtn.addClass("seeNotes")
            arDiv.append(seeNoteBtn)
            arDiv.addClass("articles")
            $("#articles").prepend(arDiv);
        }
    }).then(function () {
        $(".addNote").on("click", function () {
            let id = $(this).parent([0]).attr("id")
            let titleInput = $("<input type='text'>")
            titleInput.attr("id", "titleInput")
            let titleInputLabel = $("<label for='titleIntput'>")
            titleInputLabel.text("Note Title")
            let bodyInput = $("<input type='text' name='bodyInput'>")
            bodyInput.attr("id", "bodyInput")
            let bodyInputLabel = $("<label for='bodyIntput'>")
            bodyInputLabel.text("Note Body")
            let submitBtn = $("<button>")
            submitBtn.text("submit")
            $('#' + id).append(titleInputLabel)
            $('#' + id).append(titleInput)
            $('#' + id).append(bodyInputLabel)
            $('#' + id).append(bodyInput)
            $('#' + id).append(submitBtn)
            submitBtn.on("click", function () {
                $.ajax({
                    method: "POST",
                    url: "/articles/" + id,
                    data: {
                        title: $("#titleInput").val(),
                        body: $("#bodyInput").val()
                    }
                })
                    .then(function (data) {
                        console.log(data);
                    });
                    window.location.reload()
            })
            
        })
        $(".seeNotes").on("click", function() {
            let id = $(this).parent([0]).attr("id")
            $.ajax({
                method: "GET",
                url: "/articles/" + id,
            }).then(function(data) {
                console.log(data)
                let oldNotes = $("<div>")
                let title = data.note.title
                let body = data.note.body
                let noteID = data.note._id
                let noteTitle = $("<div>")
                let noteBody = $("<div>")
                noteTitle.text("Title: " + title)
                oldNotes.append(noteTitle)
                noteBody.text("Body: " + body)
                let deleteBtn = $("<button>")
                deleteBtn.text("deleteNote")
                deleteBtn.addClass("deleteNote")
                deleteBtn.attr("id", noteID)
                oldNotes.append(deleteBtn)
                oldNotes.append(noteBody)
                $('#' + id).append(oldNotes)
            }).then(function() {
                $(".deleteNote").on("click", function() {
                    let id = $(this).attr("id")
                    console.log(id)
                    $.ajax({
                        method: "DELETE",
                        url: "/articles/" + id,
                    })
                    window.location.reload()
                })
            })
        })
    })

    $("#deleteAll").on("click", function() {
        $.ajax({
            method: "DELETE",
            url: "/articles-delete"
        })
        window.location.reload()
    })

})