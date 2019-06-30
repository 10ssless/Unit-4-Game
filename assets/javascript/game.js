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
        hp: 100,
        atk: 20,
        ctr_atk: 20,
    }
    var p2 = {
        name: "Player 2",
        hp: 120,
        atk: 15,
        ctr_atk: 25,
    }
    var p3 = {
        name: "Player 3",
        hp: 150,
        atk: 30,
        ctr_atk: 20,
    }
    var p4 = {
        name: "Player 4",
        hp: 90,
        atk: 10,
        ctr_atk: 15,
    }

    var players = [p1, p2, p3, p4]

    var yourPlayer;
    var enemies;
    var select;
    var log = "";

    $(".player-select").click(function(){
        select = $.trim($(this).text()).substring(0,8)      //get name from player choice
        console.log("Selected: "+select)
        if(select == p1.name){
            yourPlayer = p1
        }
        else if(select == p2.name){
            yourPlayer = p2
        }
        else if(select == p3.name){
            yourPlayer = p3
        }
        else if(select == p4.name){
            yourPlayer = p4
        }
        console.log("yourPlayer: "+yourPlayer.name)
        
        
        
        
        
        
        // for(var i=0;i<4;i++){
        //     var playerObj = players[i]
        //     // console.log("playerObj "+typeof playerObj)
        //     var name = players[i].name
        //     console.log(name+" "+select)
        //     if(name.equals(select)){
        //         yourPlayer = players[i]         // assign player obj to yourPlayer
        //         yp_name = yourPlayer.name
        //         console.log("yp_name: "+yp_name)
        //     }
        //     else{
        //         console.log("didnt work")
        //     }
        // }
        // console.log("You selected: " + yourPlayer["name"])
        // log += "You selected: "+yourPlayer[name]+" ";

        $(this).css("visibility","hidden")
        $(".p-atk-name").text(yourPlayer.name).css("color","black");
        $(".p-atk-hp").text(yourPlayer.hp+"HP").css("color","black")
        $(this).html("")
        $(".activity-log").append("You selected: "+yourPlayer.name)

    })






















})
