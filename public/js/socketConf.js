var socket = io();
var author;

$(window).on("load", function () {
  $("#Login").modal("show");
});

$("#login").submit(function (event) {
  event.preventDefault();
  author = $("input[name=username]").val();
  $("#login").hide();
  $(".modal").remove();
  $(".modal-backdrop").remove();
});

function renderMessage(message) {
  if (author == message.author) {
    $(".messages").append(
      '<div class="card my-3 border border-success" style="width: 90%;"><h5 class="card-title mx-3 mt-2">' +
        message.author +
        ':</h5> <p class="card-text mx-4 pb-2">' +
        message.message +
        "</p></div>"
    );
  } else {
    $(".messages").append(
      '<div class="card my-3 border border-secondary" style="width: 90%; float: right;"><h5 class="card-title mx-3 mt-2">' +
        message.author +
        ':</h5> <p class="card-text mx-4 pb-2">' +
        message.message +
        "</p></div>"
    );
  }
}

socket.on("previousMessages", function (messages) {
  for (message of messages) {
    renderMessage(message);
  }
});

socket.on("receivedMessage", function (message) {
  renderMessage(message);
});

$("#chat").submit(function (event) {
  event.preventDefault();

  var message = $("input[name=message]").val();

  if (author.length && message.length) {
    var messageObject = { author: author, message: message };
    renderMessage(messageObject);
    socket.emit("sendMessage", messageObject);
  }

  document.getElementById("inputMessage").value = "";
});
