// =======================================
// PREMIERSHIP OF DARTS
// DOUBLE TROUBLE CUP
// DATA STORAGE
// VERSION 2.0
// =======================================



let competition = {



    name:
    "Double Trouble Cup",





    groups:{



        A:[
            {name:"Max",    played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]},
            {name:"Ste",    played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]},
            {name:"Ant",    played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]}
        ],


        B:[
            {name:"Amy",    played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]},
            {name:"Cedric", played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]},
            {name:"Mohan",  played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]}
        ],


        C:[
            {name:"Liam",   played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]},
            {name:"Shaun",  played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]},
            {name:"James",  played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]}
        ],


        D:[
            {name:"Adam",   played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]},
            {name:"Dan",    played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]},
            {name:"Ollie",  played:0, wins:0, losses:0, points:0, legDifference:0, averages:[]}
        ]



    },







    fixtures:[
        {id:1,  group:"A", player1:"Max",    player2:"Ste",    date:"", time:"", completed:false, result:null},
        {id:2,  group:"A", player1:"Max",    player2:"Ant",    date:"", time:"", completed:false, result:null},
        {id:3,  group:"A", player1:"Ste",    player2:"Ant",    date:"", time:"", completed:false, result:null},
        {id:4,  group:"B", player1:"Amy",    player2:"Cedric", date:"", time:"", completed:false, result:null},
        {id:5,  group:"B", player1:"Amy",    player2:"Mohan",  date:"", time:"", completed:false, result:null},
        {id:6,  group:"B", player1:"Cedric", player2:"Mohan",  date:"", time:"", completed:false, result:null},
        {id:7,  group:"C", player1:"Liam",   player2:"Shaun",  date:"", time:"", completed:false, result:null},
        {id:8,  group:"C", player1:"Liam",   player2:"James",  date:"", time:"", completed:false, result:null},
        {id:9,  group:"C", player1:"Shaun",  player2:"James",  date:"", time:"", completed:false, result:null},
        {id:10, group:"D", player1:"Adam",   player2:"Dan",    date:"", time:"", completed:false, result:null},
        {id:11, group:"D", player1:"Adam",   player2:"Ollie",  date:"", time:"", completed:false, result:null},
        {id:12, group:"D", player1:"Dan",    player2:"Ollie",  date:"", time:"", completed:false, result:null}
    ],








    knockout:{


        semiFinal1:{


            player1:
            "Group B Winner",


            player2:
            "Group D Winner",


            score1:null,


            score2:null,


            winner:null


        },





        semiFinal2:{


            player1:
            "Group C Winner",


            player2:
            "Group A Winner",


            score1:null,


            score2:null,


            winner:null


        },







        final:{


            player1:null,


            player2:null,


            score1:null,


            score2:null,


            winner:null


        },







        champion:null



    }




};









// =======================================
// INITIAL DATA LOAD
// =======================================


function loadDefaultCompetition(){



    return competition;



}