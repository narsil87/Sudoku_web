function Login() {
    loadSyncPost();
}

function ClearLocalStorage() {
    alert("Local storage cleared");
    localStorage.clear();
}
console.log(loadSyncPost);
console.log(loadDoc);

//play game event
function playGameEvent() {
    alert("play game event has been pressed been ");
    loadSudoGame();

}

//loads user infor from xml file
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            UserInfoFunct(xhttp);
        }
    };
    xhttp.open("GET", "userinfo.xml", true);
    //alert("loadDoc_opened");
    xhttp.send();
}
//gets data from xmml file
function UserInfoFunct(xml) {
  //  alert("xml pressed");
    var i;
    var xmlDoc = xml.responseXML;
    var table = "";
    var x = xmlDoc.getElementsByTagName("user");
    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
        x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
        "</td><td>" +" "+"<br>"+
        x[i].getElementsByTagName("userid")[0].childNodes[0].nodeValue +
        "</td></td>" + " " + "<br>" +
        x[i].getElementsByTagName("email")[0].childNodes[0].nodeValue +
       "</td> <td>" + " " + "<br>" +
       x[i].getElementsByTagName("score")[0].childNodes[0].nodeValue +
       "</td></tr>"+"<br>";
    }
    document.getElementById("userDataDiv").innerHTML = table;
    document.getElementById("userNameDiv").innerHTML = table;
    window.open("sudoku.html");
}
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("test.json", function (text) {
    var data = JSON.parse(text);
    console.log(data);
});


function LoadUserInfo() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            LoadUSerInof(xhttp);
        }
    };
   
    xhttp.open("GET", "userinfo.xml", true);
   // alert("sudogrid_opened");
    xhttp.send();
}

function PlayLoadGame() {
    resetGame();
    LoadUserInfo();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            PlayLoadedG(xhttp);
        }
    };

    xhttp.open("GET", "sudokugrid.xml", true);
    alert("sudogrid_opened");
    xhttp.send();
}
function PlayLoadedG(xml) {
    //alert("playsave game pressed");
    var i;
    var celID;
    var ceVal;
    var xmlDoc = xml.responseXML;
    var table = "";
    var x = xmlDoc.getElementsByTagName("CELL");
    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
        x[i].getElementsByTagName("IDX")[0].childNodes[0].nodeValue +
        "</td><td>" + " " + "<br>" +
        x[i].getElementsByTagName("VALUE")[0].childNodes[0].nodeValue +
        "</td></tr>" + " " + "<br>";
        cells[x[i].getElementsByTagName("IDX")[0].childNodes[0].nodeValue].innerHTML = x[i].getElementsByTagName("VALUE")[0].childNodes[0].nodeValue;
    }
    //Display all the value from the xml
    //document.getElementById("XMLData").innerHTML = table;
}
function LoadUSerInof(xml) {
    //alert("xml pressed");
    var i;
    var xmlDoc = xml.responseXML;
    var table = "";
    var x = xmlDoc.getElementsByTagName("user");
    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
        x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
        "</td><td>" +" "+"<br>"+
        x[i].getElementsByTagName("userid")[0].childNodes[0].nodeValue +
        "</td></td>" + " " + "<br>" +
        x[i].getElementsByTagName("email")[0].childNodes[0].nodeValue +
       "</td> <td>" + " " + "<br>" +
       x[i].getElementsByTagName("score")[0].childNodes[0].nodeValue +
       "</td></tr>"+"<br>";
    }
    document.getElementById("userNameDiv").innerHTML = table;
}


//valdiates user id and password
function loadSyncPost() {
   alert("login pressed");
    var name = document.getElementById("NameInput").value;
    var password = document.getElementById("PassInput").value;
    var data = "userName="+ name+ "&password="+ password;
    var ajax = new XMLHttpRequest();

    ajax.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send(data);
    jsonText = JSON.parse(ajax.responseText);
    //get div to dipslay output
    var dataDiv = document.getElementById("LoginR");
    var userNDiv = document.getElementById("userNameDiv");

    if (ajax.status == 200 && jsonText.result=="valid") {
        //get name, password and time stamp
        var loginText = jsonText.userName + " "+ jsonText.timestamp;
        //Stores user info in Local Storage
        window.localStorage.setItem("cs2550timestamp", loginText);
        //displays success of login is accepted
        dataDiv.innerHTML = "Login was successful!";
        userNDiv.innerHTML = loginText;
        
        //when login succeed the sudoku grid window opens
        window.open("sudoku.html");
    } else {
        //displays message if input was invalid
        dataDiv.innerHTML = "Invalid user name and password.";
    }
}


//
function cellClickedEvent(cell) {
    alert("cell click");
    cell.innerHTML = '3';
    box.HtmlElement = cell[i];
}


function resetGame() {
    //alert("reset called");
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '&nbsp;';
    }
}
// Updates the HTML element to display the current value
SudokuBox.prototype.UpdateValue = function () {
    if (this.HtmlElement == null)
        return;

    this.HtmlElement.innerHTML = this.Value;
};

//get id
SudokuBox.prototype.getId = function () {
    return this.Id;
}
//get uniq cell Id
SudokuBox.prototype.getBlock = function () {
    return this.Block;
}
SudokuBox.prototype.getUniqId = function () {
    return this.UniqueId;
}
SudokuBox.prototype.getValue = function () {
    return this.Value;
}
//not sure
var cell = this.Id + '_' + this.Block;

function SudokuBox(id, block) {
    this.Id = id;
    this.Block = block;
    this.HtmlElement = null;
    this.UniqueId = this.Id + '_' + this.Block.Id;

    this.Value = 0;
}
var UI = block + "_" + box;
var block;
var box;
var blockIdx;
var boxIdx;
for (blockIdx = 0; blockIdx < sudoGrid.AllBlocks.length; blockIdx++) {
    block = sudoGrid.AllBlocks[blockIdx];

    for (boxIdx = 0; boxIdx < block.Boxes.length; boxIdx++) {
        box = sudoGrid.AllBoxes[boxIdx];
        box.UpdateValue();
    }
}
function getTableLocation() {
    document.getElementById('tr').innerHTML = this.cells;
}

var cells = document.getElementById('tr');
function submit() {
    var name = document.getElementById("NameInput");
    var password = document.getElementById("PassInput");
    var age = document.getElementById("AgeInput");
    var gender = document.getElementById("gender");
    var data1 = "name:" + name.value;
    var data2 = "password:" + password.value;
    var data3 = "Age:" + age.value;
    var data4 = "gender:" + gender.value;

    var totalData = data1 + " " + data2 + " " + data3+" "+data4
    var coBox = document.getElementById("comBox");
    coBox.value = totalData;
    alert("user data recived");
}
function moveCake() {
    var time = 0;
    alert("move down");
    var cakeImg = document.getElementById("cakeImg");
    cakeImg.style.top = "654px";
    time += top;
    if (time < 5000) {
        setTimeout(moveCake, 100);
    }
}


function moveup() {
    alert("move up");
    var cakeImg = document.getElementById("cakeImg");
    cakeImg.style.top = "-1px";
}



