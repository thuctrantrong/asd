const music = new Audio('accests/audio/1.mp3');


const songs = [
    {
        id:'1',
        songName:`Trời hôm nay mưa <br>
        <div class="subtitle">Trọng Thức</div>`,
        poster:"accests/img/1.jpg"
    },
    {
        id:'2',
        songName:`Anh nhớ ra <br>
        <div class="subtitle">Trọng Thức</div>`,
        poster:"accests/img/2.jpg"
    },
    {
        id:'3',
        songName:`Thêm bao lâu<br>
        <div class="subtitle">Trọng Thức</div>`,
        poster:"accests/img/3.jpg"
    },
    {
        id:'4',
        songName:`ngày khác lạ <br>
        <div class="subtitle">Duy Hào</div>`,
        poster:"accests/img/4.jpg"
    },
    {
        id:'5',
        songName:`Die with a smile <br>
        <div class="subtitle">Duy Hào</div>`,
        poster:"accests/img/5.jpg"
    },
    {
        id:'6',
        songName:`Baby <br>
        <div class="subtitle">Bình Bi Ber</div>`,
        poster:"accests/img/6.jpg"
    },
    {
        id:'7',
        songName:`Chìm Sould <br>
        <div class="subtitle">Anh Hiệp</div>`,
        poster:"accests/img/7.jpg"
    },
    {
        id:'8',
        songName:`Too Sweet <br>
        <div class="subtitle">Anh Hiệp</div>`,
        poster:"accests/img/8.jpg"
    },
    {
        id:'9',
        songName:`Bình yên <br>
        <div class="subtitle">Chó Béo</div>`,
        poster:"accests/img/9.jpg"
    },
    {
        id:'10',
        songName:`Hà Nội <br>
        <div class="subtitle">Chó Béo</div>`,
        poster:"accests/img/10.jpg"
    },
    {
        id:'11',
        songName:`Sài Gòn <br>
        <div class="subtitle">Chó Béo</div>`,
        poster:"accests/img/11.jpg"
    },
    {
        id:'12',
        songName:`BadBye <br>
        <div class="subtitle">2 Con Chó</div>`,
        poster:"accests/img/12.jpg"
    },
    {
        id:'13',
        songName:`Phố không em <br>
        <div class="subtitle">Anh Hiệp</div>`,
        poster:"accests/img/13.jpg"
    },
    {
        id:'14',
        songName:`'Một đời' <br>
        <div class="subtitle">Hửu Thọ</div>`,
        poster:"accests/img/14.jpg"
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0){
        music.play();

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();

        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
})


const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        makeAllPlay();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');

        music.src = `accests/audio/${index}.mp3`;
        poster_master_play.src = `accests/img/${index}.jpg`;
        music.play();

        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let{songName} = ele;
            title.innerHTML = songName;
        })

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');

        // music.addEventListener('ended', () => {
        //     masterPlay.classList.add('bi-play-fill');
        //     masterPlay.classList.remove('bi-pause-fill');
        //     wave.classList.remove('active2');
        // })
    })
});

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);

    if (sec < 10){
        sec = `0${sec}`;
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);

    if (sec1 < 10){
        sec1 = `0${sec1}`;
    }                                                   
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;

    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', () => {
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
    index ++;
    music.src = `accests/audio/${index}.mp3`;
    poster_master_play.src = `accests/img/${index}.jpg`;
    music.play();

    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let{songName} = ele;
        title.innerHTML = songName;
    })

    makeAllPlay();
    document.getElementsByClassName('playlistPlay')[index - 1].classList.remove('bi-play-circle-fill');
    document.getElementsByClassName('playlistPlay')[index - 1].classList.add('bi-pause-circle-fill');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {
    if(vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `accests/audio/${index}.mp3`;
    poster_master_play.src = `accests/img/${index}.jpg`;
    music.play();

    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let{songName} = ele;
        title.innerHTML = songName;
    })

    makeAllPlay();
    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
    
})

next.addEventListener('click', () => {
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }
    music.src = `accests/audio/${index}.mp3`;
    poster_master_play.src = `accests/img/${index}.jpg`;
    music.play();

    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let{songName} = ele;
        title.innerHTML = songName;
    })

    makeAllPlay();
    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
    
})

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
})

right_scroll.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
})

let left_scroll_artist = document.getElementById('left_scroll_artist');
let right_scroll_artist = document.getElementById('right_scroll_artist');
let item = document.getElementsByClassName('item')[0];

left_scroll_artist.addEventListener('click', () => {
    item.scrollLeft -= 330;
})

right_scroll_artist.addEventListener('click', () => {
    item.scrollLeft += 330;
})

