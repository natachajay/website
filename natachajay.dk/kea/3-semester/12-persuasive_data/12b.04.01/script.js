// WEBPAGE_01
// A-FRAME VIZ

AFRAME.registerComponent('ground', {
    init: function() {
        
        let entries = [];
        let choice = 0;
        document.getElementById("greenWasClicked").addEventListener('click', function() {
            sessionStorage.setItem('clickedButton', this.id);
            updateChoice(); // which entry is being shown
            getEntries(); // get entry with correct choice value + 1
        });
        
        document.getElementById("redWasClicked").addEventListener('click', function() {
            sessionStorage.setItem('clickedButton', this.id);
            updateChoice(); // which entry is being shown
            getEntries(); // get entry with correct choice value - 1
        });
        
        function updateChoice() {
            if (sessionStorage.getItem("clickedButton") == 'greenWasClicked' && choice < sessionStorage.getItem("entryMaxIndex")) {
                choice++;
            } else if (sessionStorage.getItem('clickedButton') == 'redWasClicked' && choice > 0) {
                choice--;
            };
        };
        
        async function getEntries() {
            let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1ERkNK_-OYiWFhQ9YOHAL_NjYyh6YKOXBgkA877vxyWs/1/public/full?alt=json");
            entries = await jsonData.json();
            processEntries();
        };

        function processEntries() {
            sessionStorage.setItem('entryMaxIndex', (entries.feed.openSearch$totalResults.$t -1));

            let myTotEnt = entries.feed.openSearch$totalResults.$t;

            let myTotEntTarg = 'totalEntries'; // element ID
            let myEthnicTarg = 'myDescription'; // element ID

            let mySheet = entries.feed.title.$t;
            let myEthnic = entries.feed.entry[choice].gsx$ethnicity.$t;

            document.getElementById(myEthnicTarg).setAttribute('text', 'value', mySheet + " - " + myEthnic);
            document.getElementById(myTotEntTarg).setAttribute('text', 'value', (choice + 1) + ' of ' + myTotEnt);

            let mySettings = [
                {
                    myColumnTargetElement: 'c1',
                    myNumericalValueTargetElement: 'n1',
                    myText: 'Less than 18',
                    myXVal: 1,
                    myGsxRef: 'lessthan18'
                },
                {
                    myColumnTargetElement: 'c2',
                    myNumericalValueTargetElement: 'n2',
                    myText: 'Between 18 and 64',
                    myXVal: 2,
                    myGsxRef: 'between18and64'
                },
                {
                    myColumnTargetElement: 'c3',
                    myNumericalValueTargetElement: 'n3',
                    myText: 'Greater than 64',
                    myXVal: 3,
                    myGsxRef: 'greaterthan64'
                }
            ];

            // SETTING IS UNDEFINED???
            mySettings.forEach((setting, index) => {
                let myNumValTarg = setting.myNumericalValueTargetElement;
                let myColYTarg = setting.myColumnTargetElement;
                let myColYText = setting.myText;
                let myColYRef = eval(`entries.feed.entry[choice].gsx$${setting.myGsxRef}.$t`);
                let myColXVal = setting.myXVal;

                console.log(myColYRef);

                document.getElementById(myNumValTarg).setAttribute('text', 'value', myColYText + ' = ' + myColYRef);
                document.getElementById(myNumValTarg).setAttribute('position', {
                    x: myColXVal,
                    y: 0.5,
                    z: 0.5
                });
                document.getElementById(myColYTarg).setAttribute('geometry', 'height', (myColYRef / 1000000));
                document.getElementById(myColYTarg).setAttribute('position', {
                    x: myColXVal,
                    y: ((myColYRef / 1000000) / 2),
                    z: 0
                });
                document.getElementById(myColYTarg).setAttribute('scale', {
                    x: 1,
                    y: 1,
                    z: 1
                });
            });
        };
    }
});



// WEBPAGE_02
// VIDEO VIDEO VIDEO

AFRAME.registerComponent('play-on-vrdisplayactivate-or-enter-vr', {
  init: function () {
    this.playVideo = this.playVideo.bind(this);
    this.playVideoNextTick = this.playVideoNextTick.bind(this);
  },
  play: function () {
    window.addEventListener('vrdisplayactivate', this.playVideo);
    this.el.sceneEl.addEventListener('enter-vr', this.playVideoNextTick);
  },
  pause: function () {
    this.el.sceneEl.removeEventListener('enter-vr', this.playVideoNextTick);
    window.removeEventListener('vrdisplayactivate', this.playVideo);
  },
  playVideoNextTick: function () {
    setTimeout(this.playVideo);
  },
  playVideo: function () {
    var video = this.el.components.material.material.src;
    if (!video) { return; }
    video.play();
  }
});

AFRAME.registerComponent('play-on-window-click', {
  init: function () {
    this.onClick = this.onClick.bind(this);
  },
  play: function () {
    window.addEventListener('click', this.onClick);
  },
  pause: function () {
    window.removeEventListener('click', this.onClick);
  },
  onClick: function (evt) {
    var video = this.el.components.material.material.src;
    if (!video) { return; }
    video.play();
  }
});

AFRAME.registerComponent('hide-once-playing', {
  schema: {type: 'selector'},
  init: function () {
    this.onPlaying = this.onPlaying.bind(this);
    this.onPause = this.onPause.bind(this);
  },
  play: function () {
    if (this.data) {
      this.data.addEventListener('playing', this.onPlaying);
      this.data.addEventListener('pause', this.onPause);
    }
  },
  pause: function () {
    if (this.data) {
      this.data.removeEventListener('playing', this.onPlaying);
      this.data.removeEventListener('pause', this.onPause);
    }
  },
  onPlaying: function (evt) {
    this.el.setAttribute('visible', false);
  },
  onPause: function (evt) {
    this.el.setAttribute('visible', true);
  }
});

// LINKS LINKS LINKS

// One hardcoded link in each component (new tab)
AFRAME.registerComponent("mylink1", {
init: function() {
  this.el.addEventListener("click",
    function(e) {
    window.open('https://stackoverflow.com', '_blank');
  })
}
});

// One hardcoded link in each component (same tab)
AFRAME.registerComponent("mylink2", {
init: function() {
  this.el.addEventListener("click",
    function(e) {
     window.location.href = "http://google.com";
  })
}
});

// Component with URL added by programmer (same tab)
AFRAME.registerComponent('urlthiswindow', {
schema: {type: 'string', default: 'https://kea.dk'},

init: function () {
  var url = this.data;
  this.el.addEventListener('click', function () {
    window.location.href = eval('"' + url + '"');
  });
}
});

// Component with URL added by programmer (new tab)
AFRAME.registerComponent('urlnewwindow', {
schema: {type: 'string', default: 'https://kea.dk'},

init: function () {
  var url = this.data;
  this.el.addEventListener('click', function () {
  eval('window.open("' + url + '", "_blank")');
  });
}
});