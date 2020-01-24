AFRAME.registerComponent('ground', {

  init: function () {

    let entries = [];
    let choice = 0;

    document.getElementById('greenWasClicked').addEventListener('click', function () {
      sessionStorage.setItem('clickedButton', this.id);
      updateChoice(); //indicate which entry is being shown
      getEntries(); //get entries with the current choice value and the increase by 1
    });

    document.getElementById('redWasClicked').addEventListener('click', function () {
      sessionStorage.setItem('clickedButton', this.id);
      updateChoice(); //indicate which entry is being shown
      getEntries(); //get entries with the current choice value and the decrease by 1
    });

    function updateChoice() {
      if (sessionStorage.getItem('clickedButton') == 'greenWasClicked' && choice < sessionStorage.getItem('entryMaxIndex')) {
        choice++;
      } else if (sessionStorage.getItem('clickedButton') == 'redWasClicked' && choice > 0) {
        choice--;
      };
    }; //initiated when green/red button is clicked

    async function getEntries() {
      //Google Drive > Charts_00_KLMH
      let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1ERkNK_-OYiWFhQ9YOHAL_NjYyh6YKOXBgkA877vxyWs/1/public/values?alt=json");
      entries = await jsonData.json();
      processEntries();
    }; //initiated when green/red button is clicked

    function processEntries() {

      sessionStorage.setItem('entryMaxIndex', (entries.feed.openSearch$totalResults.$t - 1));

      //values that are found before the 'ENTRY' section of the JSON stream
      let myTotEnt = entries.feed.openSearch$totalResults.$t;

      //TARGETS: referenced ID's of AFRAME ELEMENTS
      let myTotEntTarg = 'totalEntries'; //element ID
      let myEthnicTarg = 'myDescription'; //element ID

      //VARIABLES: referenced JSON ENDPOINTS that are common for each entry
      let mySheet = entries.feed.title.$t;
      let myEthnic = entries.feed.entry[choice].gsx$ethnicity.$t;

      //OUTPUT for the values that are common for each entry
      document.getElementById(myEthnicTarg).setAttribute('text', 'value', mySheet + " - " + myEthnic);
      document.getElementById(myTotEntTarg).setAttribute('text', 'value', (choice + 1) + ' of ' + myTotEnt);

      let mySettings = [
        { //#1 COLUMN - Less than 18
          myColumnTargetElement: 'c1', // target element
          myNumericalValueTargetElement: 'n1', //numerical value
          myText: 'Less than 18', // explanatory text
          myXVal: 1, //X-axis position
          myGsxRef: 'lessthan18' //JSON feed GSX$ endpoint
            },
        { //#2 COLUMN - Between 18 and 64
          myColumnTargetElement: 'c2', // target element
          myNumericalValueTargetElement: 'n2', //numerical value
          myText: 'Between 18 and 64', // explanatory text
          myXVal: 2, //X-axis position
          myGsxRef: 'between18and64' //JSON feed GSX$ endpoint
            },
        { //#3 COLUMN - Greater than 64
          myColumnTargetElement: 'c3', // target element
          myNumericalValueTargetElement: 'n3', //numerical value
          myText: 'Greater than 64', // explanatory text
          myXVal: 3, // X-axis position
          myGsxRef: 'greaterthan64' //JSON feed GSX$ endpoint
            }
          ];

      //inserting the object contents into a-scene entities
      mySettings.forEach((setting, index) => {

        //VARIABLES dependent on mySettings
        let myNumValTarg = setting.myNumericalValueTargetElement;
        let myColYTarg = setting.myColumnTargetElement;
        let myColYText = setting.myText;
        let myColYRef = eval(`entries.feed.entry[choice].gsx$${setting.myGsxRef}.$t`);
        //let myColYRef = eval('entries.feed.entry[choice].gsx$' + setting.myGsxRef + '.$t');
        let myColXVal = setting.myXVal;

        console.log(myColYRef);

        //OUTPUT dependent on mySettings (values that change for each column)
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

        //closes mySettings.forEach loop
      });

      //closes processEntries() function
    }; //initiated by getEntries()

    //closes init function
  }

  //closes register component function
});