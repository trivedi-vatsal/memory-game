let min = 0, sec = 0, hours = 0;
let stop = 0;

window.onload = function () {
    setInterval(function () {
        if (stop !== 1) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            if (min === 60) {
                hours++;
                min = 0;
                sec = 0;
            }
            $('.timer').html(hours + ':' + min + ':' + sec);
        }

    }, 1000);
};

//Create a list for cards
let cards = [];
let cardsName = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
let openCards = [];

//Display the cards on the page
$('.deck').each(function () {
    $(this).find('li').each(function () {
        cards.push($(this));
    });
});

let temp = 0;

cardsName = shuffle(cardsName);

let cardNumber = 0;

$('.deck').each(function () {
    $(this).find('li').find('i').each(function () {
        $(this).removeAttr('class');
        $(this).addClass(cardsName[cardNumber]);
        cardNumber++;
    });
});

$('.deck').each(function () {
    $(this).find('li').find('i').each(function () {
        let tempClass = $($(cards[temp][0]).find('i')[0]).attr('class');
        $(this).removeAttr('class');
        $(this).addClass(tempClass);
        temp++;
    });
});

// Shuffle function
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let moves = 0, stars = 3;

//reset unmatched cards
removeProperties = function (prop) {
    setTimeout(function () {
        prop.removeClass('show open animated pulse');
        openCards[0].removeClass('show open animated pulse');
        openCards = [];
    }, 150);
};

//matching function
showCard = function (clickEvent) {
    clickEvent.on('click', function () {
        moves++;
        //star rating according to moves
        if (moves === 16) {

        } else if (moves > 16 && moves <= 25) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 2;
        } else if (moves > 25) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 1;
        }
        $('.moves').html(moves);
        //already matched cards
        if ((openCards.length % 2) === 0) {
            $(this).addClass('show open animated pulse');
            $(this).off('click');
            openCards.push($(this));
        }
        //cards are selected for matching
        else if (openCards.length !== 0) {
            $(this).addClass('show open animated pulse');
            let self = $(this);
            for (let i = 0; i < openCards.length; i++) {
                //if cards match
                if (openCards[i].find('i').attr('class') === self.find('i').attr('class')) {
                    self.removeClass('animated pulse');
                    self.addClass('show match animated tada');
                    openCards[i].removeClass('animated pulse');
                    openCards[i].addClass('show match animated tada');
                    //console.log('match');
                    $(this).off('click');
                    openCards = [];
                    break;
                }
                //cards don't match
                else {
                    self.addClass('show open animated pulse');
                    removeProperties(self);
                    openCards[0].on('click', showCard(openCards[0]));
                    //console.log('no match');
                }
            }
        }
        //show modal if all the cards are matched
        if ($('.deck').find('.match').length === 16) {
            setTimeout(function () {
                $('.deck').each(function () {
                    swal({
                        title: '!! Hurrah !!',
                        type: 'success',
                        text: 'Won the game. Moves used ' + moves + '. You have got ' + stars + ' Stars. Time taken ' + hours + ':' + min + ':' + sec + ' ',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonText: 'Play Again',
                        confirmButtonColor: '#0000FF',
                        cancelButtonText: 'Close',
                        cancelButtonColor: '#FF0000'
                    }).then(function () {
                        location.reload();
                    }, function (dismiss) {
                        //console.log('Yes');
                    });

                });
            }, 300);
            stop = 1;
            $('.timer').hide();
            $('.timer').html('0:0:0');
            $('.timer').show();
        }
    });
};

for (let i = 0; i < cards.length; i++) {
    cards[i].on('click', showCard(cards[i]));
}

$('.restart').on('click', function () {
    location.reload();
});