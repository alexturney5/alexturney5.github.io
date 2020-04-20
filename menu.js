// const fs = require('fs');
var flavorChecks = ["Chocolate", "Coffee", "Strawberry"];
var foodChecks = ["Vegan", "Vegetarian","Gluten-Free","Healthy Choice", "Pescatarian"];
var alcoholChecks = ["Vodka", "Whiskey", "Rum", "Tequila", "Mezcal", "Gin", "Rye", "Brandy", "Sake", "Scotch", "Bourbon"];
var funChecks = ["I'm Feeling Lucky"];
var filterChecks = [];
filterChecks.push(...foodChecks, ...flavorChecks, ...alcoholChecks, ...funChecks);
document.cookie = "SameSite = none;secure";
var filters = [];
var indexImage = 0;
var numberOfImages = 0;
var imageArray;
var topDiv;
// for i'm feeling lucky
var luckyFlag = false;
var luckydict = {};
// for .topTitle top spacing
var atLeastOneFilterMade = false;
var atLeastOneTopTile = false;
var subheads = [];
// end
var buttonContainerBeingUsed = false;
var showErrorFlag = true;
var oddevencount = 0
const main = document.getElementById("mainContainer");
const landing = document.getElementById("splashContain");
const spinner = document.getElementById("spinner");
const urlParams = new URLSearchParams(window.location.search);
const urlType = urlParams.get('grouping');
const urlCompany = urlParams.get('company');
const urlFilter = urlParams.get('filter');
const topTitle = document.getElementById("topTitle");
const filterContainer = document.getElementById("filterContainer");
const backButton = document.getElementById("backButton");
const backImg = document.getElementById("backImg");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
var url;
var myDict = {};

// excel row data
var descriptionText,imgLink,rowType,detailsText,rowCompany,link,pricesText,sizesText,titleText,ingredientsText,filterText,disclaimerText,OOSFlag,quantityText,caloriesText,markdownText,wifiText,hoursText;

gifCreation(urlCompany,urlType);
url = createURL(urlFilter, urlCompany);

if ( urlFilter === "I'm Feeling Lucky" ) {
  console.log("luckyFlag: " + luckyFlag);
  luckyFlag = true;
}


if ( urlCompany == null ) {
  $("#mainContainer").children().hide();
  landing.className = "show";
  $('body').addClass('splash');
} else {
  console.log("normalmenu");
  $("#splashContain").children().hide();
}

showSpinner();
fetch(url,{mode: "cors"})
.then((resp) => resp.json()) // transform the data into json
.then(function(data) {
    hideSpinner();
    let jsonResponse = data.message.values; //PIPEDREAM
    //HEROKU let jsonResponse = data.message.values;
    var arrayLength = jsonResponse.length;
    var arrayCount=0;
    // go through each row of the google sheet
    for (var i = 0; i < arrayLength; i++) {
        setJsonVariables(jsonResponse,i);
        // MENU
        if (isMenu()) {
            incrementOddEvenCount()
            showErrorFlag = false;
            if (rowType=="menu") {
                createMenuCarouselAndName(one, descriptionText, imgLink, rowID, wifiText, detailsText, hoursText, link);
            } else if (rowType=="section") {
                createMenuButton(one, descriptionText, link, rowCompany,imgLink, stylingText);
            }
        }
        // SUB MENU
        else if (rowType == urlType && rowCompany == urlCompany) {
            incrementOddEvenCount()
            showErrorFlag = false;
            backButton.setAttribute("href","?grouping=menu&company="+urlCompany);
            backImg.src = "https://alexturney.com/imgBin/xcta.png"
            if (luckyFlag) {
              buildLuckyDict(jsonResponse, i);
            } else {
              console.log(filterText);
              console.log(filters);
              createButtonFilters(filterText,filters);
              createSubMenuItem(one, descriptionText, link, imgLink, rowID, ingredientsText, sizesText, pricesText, detailsText, disclaimerText);
            }
        }
    } // end for loop
    // this section is to create top Title spacing once we know if filters were used and top title was used
    if (subheads.length >= 1) {
      console.log("subheads: "+subheads);
      console.log("atLeastOneFilterMade: "+atLeastOneFilterMade);
      console.log("atLeastOneTopTile: "+atLeastOneTopTile);
      if (atLeastOneFilterMade == false && atLeastOneTopTile == false) {
            $('.toptopTitle').css("margin-top","80px");
        } else if (atLeastOneFilterMade == true && atLeastOneTopTile == false) {
            $('.toptopTitle').css("margin-top","24px");
        } else if (atLeastOneFilterMade == false && atLeastOneTopTile == true) {
            $('.toptopTitle').css("margin-top","80px");
        } else if (atLeastOneFilterMade == true && atLeastOneTopTile == true) {
            $('.toptopTitle').css("margin-top","0px");
        }
    }
    if ( luckyFlag ) {
      console.log(luckydict);
      console.log(Object.keys(luckydict).length);
      var luckyNumber = Math.floor(Math.random() * Object.keys(luckydict).length) + 1;
      createButtonFilters(["I'm Feeling Lucky"],[]);
      buildLuckySubMenu(luckyNumber - 1);
    }
    filterButtonColor();  //this needs to be last  we should clean this up and remove it...
    if (showErrorFlag) {
        displayError();
    }
}) // END DOING WORK ON JSON
.then(() => {
    var buttonwidth = $(".buttonTable").width();
    $(".buttonTable").height(buttonwidth*.75);
    $(".wifiShowHide").click(function(){
        if ($('.wifiName').hasClass("hidden")) {
            $('.wifiName').removeClass("hidden").addClass("visible");
            $('.wifiPass').removeClass("hidden").addClass("visible");
        } else {
            $('.wifiName').removeClass("visible").addClass("hidden");
            $('.wifiPass').removeClass("visible").addClass("hidden");
        }
    });
    var clicked = false;
    $(".name").click(function(){
        incrementLikes($(this).text());
    });
})
.catch(function(error) {
    displayError();
    console.log(error);
});

// function incrementLikes(tempText) {
//   loadJSON('./likes.json', (data) => {
//     // if (err) {
//     //     console.log(err)
//     //     return
//     // }
//     if (typeof urlCompany != "undefined" || tempText != "undefined") {
//       // console.log(data['companies'][urlCompany]['likes']);
//       console.log(data);
//       console.log("pass typeof")
//       console.log(data.companies);
//       console.log(urlCompany);
//       if ( data['companies'][urlCompany]['likes'].hasOwnProperty(tempText) ){
//         console.log(data['companies'][urlCompany]['likes'][tempText]);
//         data.companies[urlCompany].likes[tempText]+=1;
//       } else {
//         var tempString = tempText;
//         var tempObj = { tempString: 1 };
//         console.log(tempObj);
//         data['companies'][urlCompany]['likes'][tempString]=1;
//       }
//     } else {
//       console.log("no company provided");
//     }
//   console.log(data);
//   // fs.writeFile('./likes.json', JSON.stringify(data), (err) => {
//   //       if (err) console.log('Error writing file:', err)
//   //   })
//   })
// }

function getLikes(tempText){
  var tempUrl = "https://gsheets.herokuapp.com/getLikes?company="+urlCompany+"&name="+tempText;
  fetch(tempUrl,{mode: "cors"})
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // Read the response as json.
      return response.json();
    })
    .then(function(responseAsJson) {
      // Do stuff with the JSON
      console.log(responseAsJson);
    })
    .catch(function(error) {
      console.log('Looks like there was a problem: \n', error);
    });
}

//  FUNCTIONS FUNCTIONS FUNCTIONS
function createButtonFilters(filterText, filters){
    var matchexists = 0;
    for (f of filterText) {
        var matchexists = 0;
        for (filter of filters) {
            if ( filter == f ) {
                matchexists = 1;
            }
        }
        if (matchexists == 0) {
            if (f != null) {
                filters.push(f);
                if (f != "n/a") {
                    if (urlFilter != null && f!=urlFilter) {
                    } else {
                        $("#filterContainer").addClass("filterContainerStyling");
                        let aforfilterbutton = createNode("a");
                        aforfilterbutton.setAttribute("id",f);
                        aforfilterbutton.setAttribute("class","filterbutton");
                        if (urlFilter != null) {
                            aforfilterbutton.setAttribute('href', "?grouping="+urlType+"&company="+urlCompany);
                        } else {
                            aforfilterbutton.setAttribute('href', "?grouping="+urlType+"&company="+urlCompany+"&filter="+f);
                        }
                        aforfilterbutton.innerText=f;
                        append(filterContainer,aforfilterbutton);
                        atLeastOneFilterMade = true;
                    }
                }
            }
        }
    }
}


function buildLuckyDict(jsonResponse, i){
    // excel row data
    luckydict[i] = jsonResponse[i];
}

function buildLuckySubMenu(luckyNumber){
    var tempArray = luckydict[luckyNumber];
    console.log(luckyNumber);
    console.log(tempArray);
    setLuckyJsonVariables(tempArray);
    createSubMenuItem(one, descriptionText, link, imgLink, rowID, ingredientsText, sizesText, pricesText, detailsText, disclaimerText);
}

function createCirclesTwo(rowID, a){
  if (myDict[rowID]["numberOfImages"] > 1) {
    var i;
    let circleContainer = createNode('div');
    circleContainer.setAttribute('class', 'circleContainer');
    append(a, circleContainer);
    let circleInnerContainer = createNode('div');
    circleInnerContainer.setAttribute('class', 'circleInnerContainer');
    append(circleContainer, circleInnerContainer);
    for (i = 0; i < myDict[rowID]["numberOfImages"]; i++) {
      let circle = createNode('div'); // container for everything
      circle.setAttribute('class', 'circle');
      circle.setAttribute('id', 'circle'+i);
      append(circleInnerContainer, circle);
      if (i==myDict[rowID]["indexImage"]) {
        $('#circle'+i).css("background-color","grey");
      } else {
        $('#circle'+i).css("background-color","grey");
      }
    }
    var tempWidth = 20 * myDict[rowID]["numberOfImages"];
    $(".circleInnerContainer").css("width",tempWidth + "px");
  }
}

function createSwipingCarousel(urlType, rowID, key, imageArray, appendTo, link){
  if (imageArray.length == 1) {
      let singleImage = createNode('div');
      if (urlType === "menu") {
          singleImage.setAttribute('class', 'mainMenuSingleImage');
      } else {
          singleImage.setAttribute('class', 'singleImage');
      }
      singleImage.setAttribute('id',0)
      var tempCSS = "background-image: url("+imageArray[0]+");"
      if ( link[0] !=  "n/a" ) {
        singleImage.setAttribute("onclick","window.location='"+link[0]+"';");
      }
      singleImage.setAttribute("style",tempCSS);
      append(appendTo,singleImage);
  } else {
    for (i = 0; i < imageArray.length; i++) {
      let innerCarousel = createNode('div');
      innerCarousel.setAttribute('class', 'innerCarousel');
      innerCarousel.setAttribute('id',i)
      myDict[rowID] = {"key":key,"imageArray":imageArray,"indexImage":0,"numberOfImages":imageArray.length};
      numberOfImages++; // this is redundant if we keep the dictionary;
      var tempCSS = "background-image: url("+imageArray[i]+");"
      if ( i < link.length ) {
        if ( link[i] !=  "n/a" ) {
          innerCarousel.setAttribute("onclick","window.location='"+link[i]+"';");
        }
      }
      innerCarousel.setAttribute("style",tempCSS);
      append(appendTo,innerCarousel);
      if (i==imageArray.length - 1 && imageArray.length > 1) {
        let dummyDiv = createNode('p');
        dummyDiv.setAttribute('class', 'dummyDiv');
        append(appendTo,dummyDiv);
      }
    }
  }
}

function createImageCarouselTwo(rowID, key, imageArray){
    var tempCSS = "background-image: url("+imageArray[0]+");"
    topDiv.setAttribute("style",tempCSS);
    topDiv.setAttribute("id",rowID);
    myDict[rowID] = {"key":key,"imageArray":imageArray,"indexImage":0,"numberOfImages":imageArray.length};
}

function changeImageCarouselTwo(rowID){
    incrementImageIndexTwo(rowID);
    var tempIndex = myDict[rowID]["indexImage"];
    var tempCSS = "url("+myDict[rowID]["imageArray"][tempIndex]+");"
    tempID = "#"+rowID;
    $(tempID).css("background-image","url("+myDict[rowID]["imageArray"][tempIndex]+")");
    for (i = 0; i < myDict[rowID]["numberOfImages"]; i++) {
      if (i==myDict[rowID]["indexImage"]) {
        $('#circle'+i).css("background-color","#F0F0F0");
      } else {
        $('#circle'+i).css("background-color","grey");
      }
    }
}

function incrementImageIndexTwo(rowID){
  if (myDict[rowID]["indexImage"] + 1 == myDict[rowID]["numberOfImages"]){
    myDict[rowID]["indexImage"] = 0;
  } else {
    myDict[rowID]["indexImage"] = myDict[rowID]["indexImage"] + 1;
  }
}

function printDict(rowID) {
    console.log(myDict[rowID]["imageArray"]);
    console.log(myDict[rowID]["indexImage"]);
    console.log(myDict[rowID]["numberOfImages"]);
}

//debug
function debug() {
  if (urlCompany == null) {
    console.log('Company in URL is NULL');
  } else {
    console.log('Company: ' + urlCompany + '   Grouping: ' + urlType);
  }
}

function displayError() {
    let errorLabel = createNode('p'); // container for top
    errorLabel.setAttribute('class', 'errorLabel');
    append(one,errorLabel);
    errorLabel.innerText = "Sorry, the interwebs had a small bloop.";
}

function filterButtonColor() {
    if (urlFilter != null) {
        $( ".filterbutton" ).addClass( "clickedFilter" );
        $( ".filterbutton" ).removeClass( "unclickedFilter" );
    } else {
        $( ".filterbutton" ).addClass( "unclickedFilter" );
        $( ".filterbutton" ).removeClass( "clickedFilter" );
    }
}

function createURL(urlfilter, urlcompany) {
  var return_url = "empty";
  for (var i = 0; i < filterChecks.length; i++) {
    if (urlFilter === filterChecks[i]) {
        return_url = 'https://en81wl1zurcp76s.m.pipedream.net/?company='+urlCompany+'&filter='+filterChecks[i];
    }
  }
  if (return_url=="empty") {
    return_url = 'https://en81wl1zurcp76s.m.pipedream.net/?company='+urlCompany;
    }
  return return_url;
}

function gifCreation(urlcompany, urltype) {
  if (urlcompany=="barista" && urltype!="menu") {
    $("#gif").attr("src", "143.gif");
    $("#gifContainer").css("visibility","visible");
  } else if (urlcompany=="saltandstraw" && urltype!="menu") {
    $("#gif").attr("src", "icecream.gif");
    $("#gifContainer").css("visibility","visible");
  } else if (urlcompany=="lulu" && urltype!="menu") {
    $("#gif").attr("src", "share.png");
    $("#gifContainer").css("visibility","visible");
  }
}

function buildAbout(detailsText, appendTo){
  let tempAbout = createNode('div');
  tempAbout.setAttribute('class','about')
  tempAbout.innerText = detailsText;
  append(appendTo,tempAbout);
}

function buildHours(hoursText, appendTo){
  let tempHours = createNode('div');
  tempHours.setAttribute('class','hours')
  tempHours.innerText = hoursText;
  append(appendTo,tempHours);
}

function buildWifi(wifi, appendTo){
  let tempClickWifi = createNode('div');
  tempClickWifi.setAttribute('class','wifiShowHide')
  tempClickWifi.innerText = "Show Wifi";
  append(appendTo,tempClickWifi);
  let tempWifiContainer = createNode('div');
  tempWifiContainer.setAttribute('class','wifiContainer')
  append(appendTo,tempWifiContainer);
  let tempWifiName = createNode('p');
  tempWifiName.setAttribute('class','wifiName');
  tempWifiName.classList.add('hidden');
  let tempWifiPass = createNode('p');
  tempWifiPass.setAttribute('class','wifiPass')
  tempWifiPass.classList.add('hidden');
  wifi = wifi.split('//');
  tempString = "Wifi Network: " + wifi[0];
  if (wifi[1] != null){
    tempString = tempString + "\n Wifi Password: " + wifi[1];
  }
  tempWifiName.innerText = tempString;
  append(tempWifiContainer,tempWifiName);
}

function incrementOddEvenCount(){
  oddevencount = oddevencount + 1;
}

function isMenu() {
  if (urlType=="menu" && rowCompany == urlCompany && (
            rowType == "menu" || rowType == "section")) {
    return true;
  } else {
    return false;
  }
}

function setLuckyJsonVariables(tempArray){
  // excel row data
  rowID = tempArray[0];
  descriptionText = tempArray[1];
  imgLink = tempArray[2];
  imgLink = imgLink.split(',');
  rowType = tempArray[3];
  detailsText = tempArray[4];
  rowCompany = tempArray[5];
  link = tempArray[6];
  pricesText = tempArray[7];
  sizesText = tempArray[8];
  titleText = tempArray[9];
  ingredientsText = tempArray[10];
  ingredientsText = ingredientsText.split('//');
  filterText = tempArray[11];
  filterText = filterText.split(',');
  disclaimerText = tempArray[12];
  OOSFlag = tempArray[13];
  quantityText = tempArray[14];
  caloriesText = tempArray[15];
  markdownText = tempArray[16];
  wifiText = tempArray[17];
  hoursText = tempArray[18];
}

function setJsonVariables(jsonresponse,i){
  // excel row data
  rowID = jsonresponse[i][0];
  descriptionText = jsonresponse[i][1];
  imgLink = jsonresponse[i][2];
  imgLink = imgLink.split(',');
  rowType = jsonresponse[i][3];
  detailsText = jsonresponse[i][4];
  rowCompany = jsonresponse[i][5];
  link = jsonresponse[i][6];
  link = link.split(',');
  pricesText = jsonresponse[i][7];
  sizesText = jsonresponse[i][8];
  titleText = jsonresponse[i][9];
  ingredientsText = jsonresponse[i][10];
  ingredientsText = ingredientsText.split('//');
  filterText = jsonresponse[i][11];
  filterText = filterText.split(',');
  disclaimerText = jsonresponse[i][12];
  stylingText = jsonresponse[i][13];
  quantityText = jsonresponse[i][14];
  caloriesText = jsonresponse[i][15];
  markdownText = jsonresponse[i][16];
  wifiText = jsonresponse[i][17];
  hoursText = jsonresponse[i][18];
}

function showSpinner() {
  spinner.className = "show";
}

function hideSpinner() {
  spinner.className = spinner.className.replace("show", "");
}

function createNode(element) { return document.createElement(element); }
function append(parent, el) { return parent.appendChild(el); }

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
}

function loadJSON(filepath, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', filepath, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}