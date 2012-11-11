

window.addEventListener("load", function() {

// start dynamic loading
	Modernizr.load([
    {
        // these files are always loaded
        load : [
            "/scripts/jquery-1.8.2.min.js",
            "/socket.io/socket.io.js",
            "/scripts/clientScript.js"
        ],
        // called when all files have finished loading
        // and executing
        
        complete : function() {
             console.log("All files loaded!");


        }
    }]);
}, false);
