var typewriter = document.getElementById("typewriter");
var counter = 1;
var lineList = ["i like to take pictures. you can click on the camera if you want to see some examples.", "i like to climb on big nice rocks.", "i think this typewriter effect is very c00l.", "some people say i look like a surfer dude but the truth is i can't surf (yet).", "some people say i look like a surfer dude but the truth is i can't surf (yet)."];
typewriterLoop();
function typewriterLoop() {
    typewriter.addEventListener("animationend", function () {
        setTimeout(function () {
            typewriter.classList.remove("anim-typewriter" + counter);
            document.body.scrollTop;
            typewriter.innerHTML = lineList[counter - 1];
          
            if (counter === 5) { 
                typewriter.removeEventListener("animationend", function(){
                    typewriter.innerHTML = lineList[counter - 1];
                    
                });
            }
            else {
                typewriter.classList.add("anim-typewriter" + (counter + 1));
                counter++;
            }
            
        }, 2700);
    });
}