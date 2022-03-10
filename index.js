var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();
var players = new Array();
var currentPlayer = 0;

// create Totel deck
function createDeck() {
    deck = new Array();
    for (var i = 0; i < values.length; i++) {
        for (var x = 0; x < suits.length; x++) {
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = {
                Value: values[i],
                Suit: suits[x],
                Weight: weight
            };
            deck.push(card);
        }
    }
}

// create Playears 
function createPlayers(num) {
    players = new Array();
    for (var i = 1; i <= num; i++) {
        var hand = new Array();
        var player = {
            Name: 'Player ' + i,
            ID: i,
            Points: 0,
            Hand: hand
        };
        players.push(player);
    }
}

// Create Create plyears UI
function createPlayersUI() {
    document.getElementById('players').innerHTML = ''; //acesss players
    for (var i = 0; i < players.length; i++) {
        var div_player = document.createElement('div'); //create div for players
        var div_playerid = document.createElement('div');
        var div_hand = document.createElement('div'); //dealer site
        var div_points = document.createElement('div');


        // asign class for players UI
        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_player.id = 'player_' + i; //first div for player
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;

        div_playerid.innerHTML = 'Player ' + players[i].ID; //output : 'Player 1'
        div_player.appendChild(div_playerid); //  output : <div> player 1 </div>
        div_player.appendChild(div_hand); // output :  <div id="hand_0"></div>
        div_player.appendChild(div_points); // ouput : <div class="points" id="points_0"></div>
        document.getElementById('players').appendChild(div_player);
        // output : <div id="player_0" class="player"><div>Player 1</div><div id="hand_0"></div><div class="points" id="points_0"></div></div>
    }

    console.log(div_player);
}

function shuffle() {
    // for 1000 turns
    // switch the values of two random cards
    for (var i = 0; i < 1000; i++) {
        var location1 = Math.floor((Math.random() * deck.length)); //this funtion help to ganarte random card upto deck for location 1
        var location2 = Math.floor((Math.random() * deck.length)); //this is for location 
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}
// when usar click on start button its value change to restrart 
function startblackjack() {
    document.getElementById('btnStart').value = 'Restart';
    document.getElementById("status").style.display = "none";
    // deal 2 cards to every player object
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(2);
    createPlayersUI();
    dealHands();
    document.getElementById('player_' + currentPlayer).classList.add('active'); //output : its create the both site player with suffle card
}


// for deal and hit and stand show
function dealHands() {
    // alternate handing cards to each player
    // 2 cards each
    for (var i = 0; i < 2; i++) //for card each 2 loop
    {
        for (var x = 0; x < players.length; x++) //for 2 players loop
        {
            var card = deck.pop(); //pop from deck
            players[x].Hand.push(card); // insert first card in playes hand then dealer and return to player and then dealer
            renderCard(card, x); //display the card
            updatePoints(); //update point
        }
    }

    updateDeck();
}
//update and render card in both player side one by one
function renderCard(card, player) {
    var hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
}


//its UI for and Icon for Card
function getCardUI(card) {
    var el = document.createElement('div');
    var icon = '';
    if (card.Suit == 'Hearts')
        icon = '&hearts;';
    else if (card.Suit == 'Spades')
        icon = '&spades;';
    else if (card.Suit == 'Diamonds')
        icon = '&diams;';
    else
        icon = '&clubs;';

    el.className = 'card';
    el.innerHTML = card.Value + '<br/>' + icon;
    return el;
}

// returns the number of points that a player has in hand
function getPoints(player) {
    var points = 0;
    for (var i = 0; i < players[player].Hand.length; i++) {
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

function updatePoints() {
    for (var i = 0; i < players.length; i++) {
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}

function hitMe() {
    // pop a card from the deck to the current player
    // check if current player new points are over 21
    var card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    updateDeck();
    check();
}

function stay() {
    // move on to next player, if any
    if (currentPlayer != players.length - 1) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');
    } else {
        end();
    }
}

function end() {
    var winner = -1;
    var score = 0;

    for (var i = 0; i < players.length; i++) {
        if (players[i].Points > score && players[i].Points < 22) {
            winner = i;
        }

        score = players[i].Points;
    }

    document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;
    document.getElementById("status").style.display = "inline-block";
}

function check() {
    if (players[currentPlayer].Points > 21) {
        document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
        document.getElementById('status').style.display = "block";
        end();
    }
}

function updateDeck() {
    document.getElementById('deckcount').innerHTML = deck.length;
}

window.addEventListener('load', function () {
    createDeck();
    shuffle();
    createPlayers(1);
});



/*
        deck = {
        0: {Value: '5', Suit: 'Spades', Weight: 5}
1: {Value: '10', Suit: 'Diamonds', Weight: 10}
2: {Value: '6', Suit: 'Hearts', Weight: 6}
3: {Value: '9', Suit: 'Diamonds', Weight: 9}
4: {Value: '10', Suit: 'Clubs', Weight: 10}
5: {Value: 'K', Suit: 'Clubs', Weight: 10}
6: {Value: '3', Suit: 'Spades', Weight: 3}
7: {Value: 'A', Suit: 'Clubs', Weight: 11}
8: {Value: '9', Suit: 'Hearts', Weight: 9}
9: {Value: 'J', Suit: 'Hearts', Weight: 10}
10: {Value: '9', Suit: 'Spades', Weight: 9}
11: {Value: 'K', Suit: 'Hearts', Weight: 10}
12: {Value: 'J', Suit: 'Diamonds', Weight: 10}
13: {Value: '6', Suit: 'Diamonds', Weight: 6}
14: {Value: '4', Suit: 'Spades', Weight: 4}
15: {Value: 'Q', Suit: 'Diamonds', Weight: 10}
16: {Value: '4', Suit: 'Clubs', Weight: 4}
17: {Value: '10', Suit: 'Hearts', Weight: 10}
18: {Value: 'K', Suit: 'Diamonds', Weight: 10}
19: {Value: 'A', Suit: 'Spades', Weight: 11}
20: {Value: '7', Suit: 'Diamonds', Weight: 7}
21: {Value: '6', Suit: 'Spades', Weight: 6}
22: {Value: '6', Suit: 'Clubs', Weight: 6}
23: {Value: '4', Suit: 'Diamonds', Weight: 4}
24: {Value: '2', Suit: 'Diamonds', Weight: 2}
25: {Value: '9', Suit: 'Clubs', Weight: 9}
26: {Value: 'K', Suit: 'Spades', Weight: 10}
27: {Value: '10', Suit: 'Spades', Weight: 10}
28: {Value: 'Q', Suit: 'Hearts', Weight: 10}
29: {Value: '2', Suit: 'Spades', Weight: 2}
30: {Value: '4', Suit: 'Hearts', Weight: 4}
31: {Value: '5', Suit: 'Diamonds', Weight: 5}
32: {Value: 'Q', Suit: 'Clubs', Weight: 10}
33: {Value: '7', Suit: 'Spades', Weight: 7}
34: {Value: 'A', Suit: 'Hearts', Weight: 11}
35: {Value: '8', Suit: 'Diamonds', Weight: 8}
36: {Value: 'J', Suit: 'Spades', Weight: 10}
37: {Value: '2', Suit: 'Hearts', Weight: 2}
38: {Value: '5', Suit: 'Hearts', Weight: 5}
39: {Value: '8', Suit: 'Hearts', Weight: 8}
40: {Value: '7', Suit: 'Hearts', Weight: 7}
41: {Value: '3', Suit: 'Diamonds', Weight: 3}
42: {Value: '8', Suit: 'Spades', Weight: 8}
43: {Value: '3', Suit: 'Clubs', Weight: 3}
44: {Value: '2', Suit: 'Clubs', Weight: 2}
45: {Value: '8', Suit: 'Clubs', Weight: 8}
46: {Value: 'A', Suit: 'Diamonds', Weight: 11}
47: {Value: '5', Suit: 'Clubs', Weight: 5}
        }


players = {
    0: {Name: 'Player 1', ID: 1, Points: 21, Hand: Array(3)}
1: {Name: 'Player 2', ID: 2, Points: 20, Hand: Array(3)}
length: 2
}
*/