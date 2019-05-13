window.onload = function() {
    $(".fighter").on("click", chooseFighter);
};

var fighterPicked = false;
var enemyPicked = false;
var victories = 0;
var player = "";
var opponent = "";
var lukeSky = {
    fullName: "Luke Skywalker",
    hp: 400,
    baseAttack: 20,
    attackJump: 70,
    counter: 40
};

var hanSolo = {
    fullName: "Han Solo",
    hp: 410,
    baseAttack: 90,
    attackJump: 30,
    counter: 50
};

var obiWan = {
    fullName: "Obi-Wan Kenobi",
    hp: 300,
    baseAttack: 150,
    attackJump: 50,
    counter: 80
};

var docEva = {
    fullName: "Doctor Evazan",
    hp: 480,
    baseAttack: 60,
    attackJump: 40,
    counter: 20
};

var Greedo = {
    fullName: "Greedo",
    hp: 390,
    baseAttack: 80,
    attackJump: 40,
    counter: 30
};

var Ponda = {
    fullName: "Ponda Baba",
    hp: 550,
    baseAttack: 120,
    attackJump: 30,
    counter: 40
};

$("#luke-stat").html(lukeSky.hp);
$("#han-stat").html(hanSolo.hp);
$("#obi-stat").html(obiWan.hp);
$("#evazan-stat").html(docEva.hp);
$("#greedo-stat").html(Greedo.hp);
$("#ponda-stat").html(Ponda.hp);

function chooseFighter() {
    if (fighterPicked === false) {
        console.log("this is " + $(this).attr("id"));
        $("#battle-ground").append($(this));
        $(this).addClass("ally");
        $(this).removeClass("fighter");
        $(".fighter").addClass("enemy bg-danger text-light");
        $(".enemy").removeClass("bg-light");
        $("#battle-ground").append($("#pick-fighter"));
        $("#pick-fighter").html("Who will you battle?");
        
    }
    fighterPicked = true;
    
};


$(".fighter").on("click", function chooseEnemy() {
    if (($(this).hasClass("enemy") === true) && (enemyPicked === false)) {
        $("#battle-ground").append($(this));
        $(this).addClass("your-enemy");
        $("#pick-fighter").detach();
        var btn = $('<input/>').attr({
            type: "button",
            id: "field",
            value: "Battle!"
        });
        $("#battle-actions").append(btn);
        enemyPicked = true;
    }
    setupBattle();
    $("#field").on("click", function theAction() {
        $("#thirdLine").html("");
        console.log("start battle!");
        player.baseAttack = player.baseAttack + player.attackJump;
        opponent.hp = opponent.hp - player.baseAttack;
        player.hp = player.hp - opponent.counter;
        $(".ally").find("span").html(player.hp);
        $(".your-enemy").find("span").html(opponent.hp);
        $("#firstLine").html("You deal " + player.baseAttack + " damage to your opponent!");
        $("#secondLine").html("Your opponent deals " + opponent.counter + " damage to you!");
        gameState(player, opponent);
        hasWon(victories);

    }); 

});

function setupBattle() {
    if ($(".ally").is("#luke")) {
        console.log("player is Luke");
        player = lukeSky;
    } else if ($(".ally").is("#obi")) {
        console.log("player is Obi-wan");
        player = obiWan;
    } else if ($(".ally").is("#han")) {
        console.log("player is Han Solo");
        player = hanSolo;
    } else if ($(".ally").is("#greedo")) {
        console.log("player is Greedo");
        player = Greedo;
    } else if ($(".ally").is("#evazan")) {
        console.log("player is Dr. Evazan");
        player = docEva;
    } else if ($(".ally").is("#ponda")) {
        console.log("player is Ponda Baba");
        player = Ponda;
    } 

    if ($(".your-enemy").is("#luke")) {
        console.log("Luke is your opponent");
        opponent = lukeSky;
    } else if ($(".your-enemy").is("#obi")) {
        console.log("Obi-Wan is your opponent");
        opponent = obiWan;
    } else if ($(".your-enemy").is("#han")) {
        console.log("Han Solo is your opponent");
        opponent = hanSolo;
    } else if ($(".your-enemy").is("#evazan")) {
        console.log("Dr. Evazan is your opponent");
        opponent = docEva;
    } else if ($(".your-enemy").is("#greedo")) {
        console.log("Greedo is your opponent");
        opponent = Greedo;
    } else if ($(".your-enemy").is("#ponda")) {
        console.log("Ponda Baba is your opponent");
        opponent = Ponda;
    }
};

function gameState(player, opponent) {
    if ((player.hp <= 0) && (opponent.hp > 0)) {
        console.log("You lose! game over!");
        $("#thirdLine").html("Your opponent wins... Game Over");
        $("#field").detach();
        resetAll();
    } else if ((player.hp <= 0) && (opponent.hp <= 0)) {
        console.log("tie! But you still lose...");
        $("#thirdLine").html("You strike each other down... Game Over");
        $("#field").detach();
        resetAll();
    } else if ((player.hp > 0) && (opponent.hp <= 0)) {
        console.log("you win!");
        $("#thirdLine").html("Victory is yours! Choose next opponent");
        enemyPicked = false;
        victories += 1;
        $("#field").detach();
        $(".your-enemy").detach();
        $("#battle-ground").append('<h2 class="float-none back-drop p-2" id="pick-fighter">Choose another Opponent</h2>');
    } 
};

function hasWon(victories) {
    if ((victories >= 5) && (player.hp > 0)) {
        alert("You are the champion of the Cantina!!");
        $("#pick-fighter").detach();
        $("#thirdLine").html("Victory is yours!");
        resetAll();
        return true;
        }
    return false;
};

function resetAll() {
    var lastBtn = $('<input/>').attr({
        type: "button",
        id: "unDone",
        value: "Play Again?"
    });
    $("#battle-actions").append(lastBtn);
    $("#end-game").append(lastBtn);
    $("#unDone").on("click", function () {
        console.log("do over");
        location.reload();
    })
};
