/*
create characters, set health, attack, & counter attack pts
    might need to create objs for each with name & info

1st character selected become your player, rest become enemies
    add class "your-player"
    add class "enemies"
    move selected player to attack and defend spots in 2nd row

create attack button that initiates attack and counterattack from players
    pull hp from player obj, store in new var for battle & update hp
    boost attack points of player-atk with each button clicks
    if your hp goes hits/goes below 0, game over, hit reset
    if your opp goes below 0, option to select new opp


create reset button to reset entire game, incl hp, character back to top 




*/



$(document).ready(function(){

    var p1 = {
        name: "Player 1",
        hp: 140,
        atk: 25,
        ctr_atk: 10,
    }
    var p2 = {
        name: "Player 2",
        hp: 150,
        atk: 20,
        ctr_atk: 20,
    }
    var p3 = {
        name: "Player 3",
        hp: 200,
        atk: 15,
        ctr_atk: 10,
    }
    var p4 = {
        name: "Player 4",
        hp: 120,
        atk: 15,
        ctr_atk: 40,
    }

    var players = [p1, p2, p3, p4]

    var yourPlayer;
    var yourOpp;
    var select;
    var log = "";
    var p1_lock = false
    var p2_lock = false
    var yourHP;
    var oppHP;
    var atk_boost;
    var atk_lock = false;
    var opps = 3;
    var atk_count = 0;
    var gameRunning = false
    var fadeAtk = 0
    var fadeDef = 0

    function flashAtk(){
        $(".player-atk").fadeToggle(600)
        fadeAtk++
    }
    function flashDef(){
        $(".player-def").fadeToggle(600)
        fadeDef++
    }


    var flashAtkInterval = setInterval(flashAtk,1000)
    var flashDefInterval = setInterval(flashDef,1000)
    

    
    $(".player-select").click(function(){

        if(!p1_lock){
            select = $.trim($(this).text()).substring(0,8)      //get character that player chose
            // console.log("Selected: "+select)
            for(var i=0;i<4;i++){
                if (select == players[i].name) {
                    yourPlayer = players[i]                     // assign character object to yourPlayer object
                }
            }
            // console.log("yourPlayer: "+yourPlayer.name)
            $(this).css("visibility","hidden")                  //place on placard
            // $(".player-atk:before").css("top", "0px").css("bottom", "0px").css("left", "0px").css("right", "0px")
            clearInterval(flashAtkInterval)
            if (fadeAtk % 2 == 1) {
                $(".player-atk").fadeToggle(1000)
            }
            $(".player-atk").css("border-color", "rgb(76, 186, 223)").css("background", "black")
            $(".p-atk-name").text(yourPlayer.name).css("color", "rgb(76, 186, 223)")
            $(".p-atk-hp").text(yourPlayer.hp + "HP").css("color", "rgb(76, 186, 223)").css("border-color", "rgb(76, 186, 223)")
            $(this).html("")
            $(".activity-log").animate({scrollTop: 1000}, 3000)
            $(".activity-log").append("You selected: "+yourPlayer.name+"<br>")
            p1_lock = true                                      // lock in yourPlayer
            yourHP = yourPlayer.hp 
        }
        else if(!p2_lock){
            select = $.trim($(this).text()).substring(0, 8)      //get enemy choice from player 
            // console.log("Selected: "+select)
            for (var i = 0; i < 4; i++) {
                if (select == players[i].name) {
                    yourOpp = players[i]                        // assign character to yourOpp
                }
            }
            // console.log("yourOpp: "+yourPlayer.name)
            
            $(this).css("visibility", "hidden")                  //place on placard
            // clearInterval(flashDefInterval)
            // $(".player-def").fadeToggle(
            clearInterval(flashDefInterval)
            if(fadeDef % 2 == 1 && !gameRunning){
                $(".player-def").fadeToggle(1000)
            }
            $(".player-def").css("border-color", "rgb(255, 101, 101)").css("background","black")
            $(".p-def-name").text(yourOpp.name).css("color", "rgb(255, 101, 101)")
            $(".p-def-hp").text(yourOpp.hp + "HP").css("color", "rgb(255, 101, 101)").css("border-color", "rgb(255, 101, 101)")
            $(this).html("")
            $(".activity-log").animate({scrollTop: 1000}, 3000)
            $(".activity-log").append("Your opponent is: " + yourOpp.name + " <br>")
            p2_lock = true                                      // lock in yourOpp
            $(".atk-button").css("visibility", "visible") 
            oppHP = yourOpp.hp                                  // assign variables for hp & atk values to modify during battle
            atk_boost = yourPlayer.atk * (atk_count + 1)
            // console.log("you: "+yourPlayer.name)
            // console.log("enemy: "+yourOpp.name)
            atk_lock = false;
            
        }
    })

    var start = new Date;
    var timer;

    function pad(str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    
    $(".atk-button").click(function(){
        if(!gameRunning){
            timer = window.setInterval(function () {
                $('.timer').text(pad((new Date - start), 20));
            });
            gameRunning = true
        }
        if(gameRunning){
            if(!atk_lock){                                  // prevents extra attack clicks
                oppHP = oppHP - atk_boost                   // update hp values
                yourHP = yourHP - yourOpp.ctr_atk           // print to activity log
                atk_count += 1;
                // console.log("Attack count: "+atk_count)
                // console.log("Attack power: "+atk_boost)
                // console.log("Your HP: "+yourHP)
                // console.log("Opp HP: "+oppHP)
                $(".p-atk-hp").text(yourHP + "HP")
                $(".p-def-hp").text(oppHP + "HP")
                $(".activity-log").animate({
                    scrollTop: 1000
                }, 3000)
                $(".activity-log").append("You attacked " + yourOpp.name + " for <span class='atk-pts'>"+atk_boost+"</span> damage.<br>")
                $(".activity-log").append(yourOpp.name + " counter-attacked you for <span class='atk-pts'>"+yourOpp.ctr_atk+"</span> damage.<br>")
                atk_boost = yourPlayer.atk*(atk_count+1)                     // increase your attack power
                if(yourHP <=0 && oppHP <= 0){
                    atk_lock = true                         
                    window.clearInterval(timer);
                    $(".player-atk").css("border-color", "rgb(85, 85, 85)")
                    $(".p-atk-name").css("color", "rgb(85, 85, 85)");
                    $(".p-atk-hp").css("color", "red").css("border-color", "rgb(85, 85, 85)")
                    $(".player-def").css("border-color", "rgb(85, 85, 85)")
                    $(".p-def-name").css("color", "rgb(85, 85, 85)");
                    $(".p-def-hp").css("color", "red").css("border-color", "rgb(85, 85, 85)")
                    $(".activity-log").animate({
                        scrollTop: 1000
                    }, 3000)
                    $(".activity-log").append("You defeated " + yourOpp.name +", but were killed in the process.<br><span class='try'>Try again.</span><br>")
                    $(".try").fadeToggle(1200).fadeToggle(1200).fadeToggle(1200).fadeToggle(1200)
                    $(".atk-button").css("visibility", "hidden")
                    $(".atk-button:hover").css("visibility", "hidden")
                    $("a").css("color", "rgb(72, 255, 87)").css("border-color", "rgb(72, 255, 87)")
                    
                }
                else if (yourHP <= 0) {                            // if you lose, change color, update activity log
                    atk_lock = true  
                    window.clearInterval(timer);
                    $(".player-atk").css("border-color", "rgb(85, 85, 85)")
                    $(".p-atk-name").css("color", "rgb(85, 85, 85)");
                    $(".p-atk-hp").css("color", "red").css("border-color", "rgb(85, 85, 85)")
                    $(".activity-log").animate({
                        scrollTop: 1000
                    }, 3000)
                    $(".activity-log").append("You were defeated by " + yourOpp.name +".<br><span class='try'>Try again.</span><br>")
                    $(".try").fadeToggle(1200).fadeToggle(1200).fadeToggle(1200).fadeToggle(1200)
                    $(".atk-button").css("visibility", "hidden")
                    $(".atk-button:hover").css("visibility", "hidden")
                    $("a").css("color", "rgb(72, 255, 87)").css("border-color", "rgb(72, 255, 87)")
                }
                else if(oppHP <= 0){                            // if you win, change color, update activity log
                    atk_lock = true
                    opps -= 1;
                    $(".player-def").css("border-color","rgb(85, 85, 85)")
                    $(".p-def-name").css("color", "rgb(85, 85, 85)");
                    $(".p-def-hp").css("color", "red").css("border-color", "rgb(85, 85, 85)")
                    if(opps == 0){
                        window.clearInterval(timer);
                        // $(".player-atk").css("background", "rgb(197, 245, 152)")
                        $(".activity-log").animate({
                            scrollTop: 3000
                        }, )
                        $(".activity-log").append("You defeated " + yourOpp.name +". <br><span class='try'>You are the champion.</span><br>")
                        $(".try").fadeToggle(1200).fadeToggle(1200).fadeToggle(1200).fadeToggle(1200)
                        // $(".activity-log").animate({scrollTop: $('.activity-log').height()})
                        $("a").css("color", "rgb(72, 255, 87)").css("border-color", "rgb(72, 255, 87)")
                    }
                    else{
                        $(".activity-log").animate({
                            scrollTop: 1000
                        }, 3000)
                        $(".activity-log").append("You defeated " + yourOpp.name +". <br>Select your next opponent<span class='ellipsis'>.</span><br>")
                        p2_lock = false                         // allow next character click to be next enemy
                        setInterval(function () {               // created animated ellipsis
                            var th = $(".ellipsis");
                            if (th.text().length < 4) {
                                th.text(th.text() + ".");
                            } else {
                                th.text("");
                            }
                        }, 800);
                    }
                }
    
            }

        }

    })



})
