var play = document.getElementById("play");
var repeat = document.getElementById("repeat");
var shuffle = document.getElementById("shuffle");
var add = document.getElementById("add");
var tablebody = document.getElementById("music");
var delbtn = document.getElementsByClassName("delbtn");
var playbtn = document.getElementsByClassName("playbtn");
//var player = document.getElementsByClassName("playbtn");
var audio = document.querySelector("audio");
var songs = ["Cheap Thrills - Sia.mp3","Confident- Ballerina.mp3","Dalida -Le Temps des Fleurs.mp3"];
var i = 0;
var flag = 0;
var noOfDeletedSongs = 0;

for(let j = 0;j < delbtn.length;++j)
{
    delbtn[j].addEventListener("click",function(e){
        let result = confirm("Are you sure you want to delete this song ?");
        if (result) {            
            deleteSong(j);
        }
    });
}
for(let j = 0;j < playbtn.length;++j)
{
    playbtn[j].addEventListener("click",function(e){
        pauseSong(j);
    });
}
play.addEventListener("click",()=>{
    audio.play();
});

repeat.addEventListener("click",()=>{
    //audio.loop='true';
    audio.pause(); 
    audio.currentTime = 0;
    audio.play();
});

shuffle.addEventListener("click",(e)=>{
     audio.src = random_file();
    audio.play();
});

audio.addEventListener("ended",(e)=>{
    e.target.src = songs[i];
    i++;
});

add.addEventListener("change",(e)=>{
    if(add.files.length){
        const songName = getSongName();
            var len = songs.length;
            //len++; 
            var newSong = document.createElement("tr");
        newSong.setAttribute("id",`${len}`);  //add id

            tablebody.appendChild(newSong);
            var td1 = document.createElement("td");   
            newSong.appendChild(td1);
            var td2 = document.createElement("td"); 
            newSong.appendChild(td2);

            var t = document.createTextNode(songName); 
            td1.appendChild(t);

            var deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<img src="delete.jpg" />';
            deleteButton.setAttribute("class","delbtn");

            deleteButton.addEventListener("click",function(e){
                let result = confirm("Are you sure you want to delete this song ?");
                if (result) {            
                    deleteSong(newSong.id);
                }
            });

        var playButton = document.createElement('button');
        playButton.innerHTML = '<img src="resume.jpg" />';
        playButton.setAttribute("class","playbtn");

        playButton.addEventListener("click",function(e){
            pauseSong(newSong.id);
        });
       // td2.appendChild(pauseButton);
        td2.appendChild(deleteButton);
        td2.appendChild(playButton);
        songs.push(songName);
    }
});
function pauseSong(id)
{
    let player = document.getElementsByClassName("playbtn");
    let trArr = document.getElementsByTagName("tr");

    for(let i = 0;i < player.length;++i)
    {
        if(i != id-noOfDeletedSongs){
            player[i].innerHTML = '<img src="resume.jpg" />';
        }
        else{
            player[i].innerHTML = '<img src="pause.jpg" />';
        }
    }
    if(flag % 2 == 0){
        audio.src = trArr[id-noOfDeletedSongs].textContent;
        audio.play();
    }
    else{
        audio.pause();
        player[id-noOfDeletedSongs].innerHTML = '<img src="resume.jpg" />';
    }
    flag++;
}
function getSongName()
{
    return add.files[0].name;
}
function deleteSong(id)
{
    noOfDeletedSongs++;
    let trArr = document.getElementsByTagName("tr");

    let tr = document.getElementById(`${id}`);
    document.getElementById("music").removeChild(tr);
    songs.splice(id, 1);
}
function random_file(){
    return songs[Math.floor(Math.random() * songs.length)];
}
