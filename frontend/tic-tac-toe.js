let socket = io();

$('td').click(function() {
    socket.emit('click', this.id);
});

$('button#reset').click(function() {
    socket.emit('reset', null);
});

socket.on('click', function(stuff) {
    $('td#' + stuff[0]).text(stuff[1]);
});

socket.on('reset', function(stuff) {
    $('td').text('');
});

socket.on('max_players', function(stuff) {
    alert(stuff)
})

socket.on('winner', function(stuff) {
    alert(stuff)
})
