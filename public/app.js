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
            $("#articles").append(arDiv);
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
                let noteTitle = $("<div>")
                let noteBody = $("<div>")
                noteTitle.text("Title: " + title)
                oldNotes.append(noteTitle)
                noteBody.text("Body: " + body)
                oldNotes.append(noteBody)
                $('#' + id).append(oldNotes)
            })
        })
    })

})