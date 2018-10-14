window.addEventListener("charg", main);
var video = document.getElementById('video');
var video_xml;
var lec = false;
var idTest;

function main(){
    var charg = document.getElementById('charger');
    charg.addEventListener('click',chargerRSS);
}

function chargerRSS(){
    var rep = null,titre, son;
    var flux = document.getElementById('division').value;
    var xml = new XMLHttpRequest();
	
    xml.addEventListener('readystatechange',function(){
        if(this.readyState === 4 && this.status === 200) {
            let xml2 = this.responseXML;
			video_xml = xml2.getElementsByTagName("enclosure");
            let titre_xml = xml2.getElementsByTagName("title");
            let liste = document.getElementById("playlist");
			console.log(video_xml);
            for(var i=2; i<titre_xml.length; i++) {
                titre = titre_xml[i].childNodes[0].nodeValue;
                let division = document.createElement("div");
                division.setAttribute("id",(i-2));
                let title = document.createElement("h2");
                let titre_txt = document.createTextNode(titre);
                title.setAttribute("id","titre");
                title.appendChild(titre_txt);
                division.appendChild(title);
                let suppr = document.createElement("button");
                suppr.addEventListener('click',function (ev) {
                    let revSup = ev.target.parentElement;
                    if(revSup.parentNode) 
					{
                        revSup.parentNode.removeChild(revSup);
                    }
                });
                let suppr_txt = document.createTextNode("supprimer");
                suppr.setAttribute("id","supprimer");
                suppr.appendChild(suppr_txt);
                division.appendChild(suppr);
                division.addEventListener("click", function (evt) {
					idTest = division.getAttribute("id");
					var sourced = document.getElementById("source");
					sourced.setAttribute("src",video_xml[idTest].attributes[0].nodeValue);
					video.charg();
                });
                liste.appendChild(division);
            }
        }
    });	
    xml.open('GET','https://cors-anywhere.herokuapp.com/'+flux,true);
    xml.send();

}

function vidPause(){
    if(!lec){
        video.play();
        lec = true;
    }else{
        video.pause();
        lec = false;
    }
}

function lectGrand() { 
    video.width = 1080; 
} 

function lectPetit() { 
    video.width = 480; 
} 

function lectNormal() { 
    video.width = 720; 
} 

function vidSuiv(){
	idTest++;
	var sourced = document.getElementById("source");
	sourced.setAttribute("src",video_xml[idTest].attributes[0].nodeValue);
	video.charg();	
}

function vidPrec(){
	idTest--;
	var sourced = document.getElementById("source");
	sourced.setAttribute("src",video_xml[idTest].attributes[0].nodeValue);
	video.charg();	
}