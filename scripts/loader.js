var stage = Object();

window.addEventListener("load", function() {

stage.status = "onload";

// start dynamic loading
	Modernizr.load([
    {
        // these files are always loaded
        load : [
            "scripts/jquery-1.8.2.min.js",
            "socket.io/socket.io.js",
            "scripts/clientDraw.js",
            "scripts/clientScript.js"
        ],
        // called when all files have finished loading
        // and executing
        
        complete : function() {
            stage.status = "gamePlay";
            console.log("All files loaded!");
            document.getElementById("loadingView").className = "loadingHide";


        }
    }]);
}, false);
