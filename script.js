var dataController = (function() {
    var data = {
        levels: {
            levela: ["gil.png","idan.png"],
            levelb: ["amit.png","avsha.png","liron.png","bar.png"],
            levelc: ["klinger.png","amir.png"],
            leveld: ["avi.jpg","renan.png"]
        },
        finalTeams: {
            finalTeamA: [],
            finalTeamB: []
        }
    }

    var allocatePlayers = function(playersArr) {
        var rand;
        var teamLimit = (playersArr.length)/2;
        var counterA = 0;
        var counterB = 0;

        for (var i=0; i<playersArr.length; i++) {
            rand = Math.round(Math.random());

            if (rand == 1) {
                if (counterA < teamLimit) {
                    data.finalTeams.finalTeamA.push(playersArr[i]);
                    counterA++;
                }
                else {
                    data.finalTeams.finalTeamB.push(playersArr[i]);
                }
            }
            else if (rand == 0) {
                if (counterB < teamLimit) {
                    data.finalTeams.finalTeamB.push(playersArr[i]);
                    counterB++;
                }
                else {
                    data.finalTeams.finalTeamA.push(playersArr[i]);
                }
            }
        }
    }
    
    return {
        allocatePlayersInit: function() {
                allocatePlayers(data.levels.levela);
                allocatePlayers(data.levels.levelb);
                allocatePlayers(data.levels.levelc);
                allocatePlayers(data.levels.leveld);
        },

        getData: function() {
            return data;
        },

        clearTeams: function() {
            data.finalTeams.finalTeamA.length = 0;
            data.finalTeams.finalTeamB.length = 0;
        }
    }
})();


var UIController = (function() {

    return {
        populateListWithItems: function(id_cont_team,list) {
            id_cont_team.appendChild(list);
        },

        clearUILists: function() {
            document.getElementById("id_cont_teama").innerHTML = "";
            document.getElementById("id_cont_teamb").innerHTML = "";    
        }
    }
})();


var controller = (function(dataCtrl,UICtrl) {

    var shuffle = function(arrToShuffle) {
        for (let i = arrToShuffle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrToShuffle[i], arrToShuffle[j]] = [arrToShuffle[j], arrToShuffle[i]];
        }
        return arrToShuffle;
    }

    var populateList = function populateList(arr_team) {
        var list = document.createElement("ul");
        console.log(arr_team);
        arr_team.forEach(element => {
            var listItem = document.createElement("li");
            listItem.innerHTML = `<img src="images/${element}" class="face-img circle responsive-img">`;
            list.appendChild(listItem);
        });

        return list;
    }
    
    return {
        init: function() {
            UICtrl.clearUILists();
            dataCtrl.clearTeams();
            dataCtrl.allocatePlayersInit();
            shuffle(dataCtrl.getData().finalTeams.finalTeamA);
            shuffle(dataCtrl.getData().finalTeams.finalTeamB);
            var listA = populateList(dataCtrl.getData().finalTeams.finalTeamA);
            var listB = populateList(dataCtrl.getData().finalTeams.finalTeamB);
            UICtrl.populateListWithItems(document.getElementById("id_cont_teama"),listA);
            UICtrl.populateListWithItems(document.getElementById("id_cont_teamb"),listB);
            
        }
    }
})(dataController,UIController);

document.getElementById("id_btn_generate").addEventListener("click",controller.init);