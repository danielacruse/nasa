//API-NYCKEL <JAJbmFjZkS3NfN7jOzg8S4lt5QqbGdTZ61tgxRRA>
const apiUrlPop ='https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=JAJbmFjZkS3NfN7jOzg8S4lt5QqbGdTZ61tgxRRA';


 //För att fetch ny data
fetch(apiUrlPop)
    .then(response => response.json())
    .then(data => {
        //vad ska vi ggöra med vår data?
        console.log(data.photos);
        //Variabler för att klass och id
        const img = data.photos;
        const camera = data.camera;
        const marsImg = document.querySelector
        ('#mars-container');
        const missingImg = document.querySelector('#nopicturesfound')

        if(img.length !==0){
            console.log('Det finns data');
              ///loop för att loppa igenom data
            img.forEach(photo => {
                console.log(photo.id);
                 //för varje item i array
                console.log(photo);
                //anropar en funk som skapar upp ett nytt kort
                //Skickar med photo in i funktionen
            const newCard = createCard(photo);
             //lägger till det nya kortet  i vår contaiern
             marsImg.append(newCard);
        })
        }else{
            //om det inte finns data skriver vi en console log
            console.log('Det finns ingen data');
            missingImg.textContent = ('There is no photos to show, sorry :(');
        }

 }).catch(error => console.log(`Detta är felet: ${error}`));
      
 
//Funktion som skapar upp ett nytt kort
//Innanför paranteserna skickar vi in datan som kommer från createCard-anropet
 function createCard(photo){
    console.log('createCard körs');
    //Här är det som ska ske för att skapa ett nytt kort
    //Skapa upp nya HTML-element
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const imgDiv = document.createElement('div');
    const img = document.createElement('img');


    //lägga till klass på element
    imgDiv.classList.add('mars-pic');

    

    //Till bild https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG

    //lägga till text
    h2.textContent = photo.rover.name; // Rovers namn
    h3.textContent = photo.earth_date; // Photos Earth date


    //Väg till mars-photon
    img.setAttribute('src' , photo.img_src);


    //Lägger till element i article
    article.append(h2, imgDiv, h3  );
    imgDiv.append(img);


    console.log(article);
    //Skicka tillbala det nya kortet till loopen
    return article;

}
//Skapar variabler för klass och id
const switchBtn = document.querySelector('#dark-mode-toggle');
const bodyRef = document.querySelector('body');
const darkModeKey = ' theme-dark';
const darkModeValue = 'active';
// console.log(switchBtn);
// Lägger till referens till <p>-elementet
const textElement = document.querySelector('.dark-light'); 


// Funktion för att uppdatera texten baserat på om mörkt läge är aktiverat eller inte
function updateText() {
  if(bodyRef.classList.contains('dark')) {
    textElement.textContent = 'Dark-mode';
  } else {
    textElement.textContent = 'Light-mode';
  }
}


//Kontroller om det finns något i localStorage
if(localStorage.getItem(darkModeKey) === darkModeValue){
//OM detta är sant så är localStorage satt och dark ska läggas på body
console.log('Det finns ett localStorage satt');
enabledDarkMode();
}


//Lägga till en lyssnare som lyssnar efter klick
switchBtn.addEventListener('click' , () => {
    //vad ska hända när vi klickar ?
    console.log('Du klickade på switch');
    // bodyRef.classList.toggle('dark');
    //anropa en funktion
    toggleDarkMode();
});

function toggleDarkMode(){
    //Kontrollera om body har klassen dark
    console.log('Nu körs toggleDarkMode');
    //Kontrollera om body har klassen dark
    if(bodyRef.classList.contains('dark')){
        //OM body har klassen dark
        console.log('Klassen dark finns');
        disabledDarkMode();
    }else{
        console.log('Klassen dark finns INTE');
        //OM klassen inte finns så vill vi lägga till klassen
        enabledDarkMode();
    }
}

function enabledDarkMode(){
    //Funktion för att aktivera eller lägga till dark klass
    console.log('enabledDarkMode körs');
    switchBtn.checked = true;
    //Lägga till dark på body
    bodyRef.classList.add('dark');
    //sätta localStorage
    setLocalStorage();
    updateText(); // Uppdaterar texten när mörkt läge aktiveras
}
function disabledDarkMode(){
    //Funktion för att ta bort klassen dark
    console.log('disabledDarkMode');
    bodyRef.classList.remove('dark');
    //Funktion för att ta bort localStorage
    removeLocalStorage();
    updateText(); // Uppdaterar texten när mörkt läge avaktiveras
}
function setLocalStorage(){
    //Funktion för att sätta localStorage
    console.log('setlocalStorage körs');
    //Sätter localStorage med den key och value
    localStorage.setItem(darkModeKey , darkModeValue);
}
function removeLocalStorage(){
    //Funktion för att ta bort localStorage
    console.log('removeLocalStorage körs');
    //ta bort satt localStorage
    localStorage.removeItem(darkModeKey);
}


// Lägger till detta anrop för att säkerställa att texten är korrekt när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem(darkModeKey) === darkModeValue){
      enabledDarkMode();
    } else {
      disabledDarkMode();
    }
  });
  


//Skapa ref till input
const aliasInput = document.querySelector ('#name');
// console.log(aliasInput);
const sendBtn = document.querySelector('#btn-submit');
const textInput = document.querySelector('#resultelement');

//Lyssnare som lyssnar efter när user släpper upp en key
aliasInput.addEventListener('keyup' , () => {
    //Vad ska hända när user släppper upp en key
    // console.log('Du skrev något i input');
    // HÄmta värdet i input
    // console.log(aliasInput.value);
    //Hämta längden på värdet i input
    console.log(aliasInput.value.length);
    let getValueLength = aliasInput.value.length
    //Kontroller så user skrivit 3 tecken
    //Villkoret om getValueLength är större än 2
    if(getValueLength > 2 ){
        //om antalet tecken är större än 2
        console.log('Det är MER än 2 tecken');
        //Btn ska bli enabled
        sendBtn.disabled = false;
    }else{
        //Det är mindre än 2
        console.log('Det är  MINDRE än 2 tecken');
        sendBtn.disabled = true;
    }
    
});

//Lyssnare som lyssnar efter när input är i focus
aliasInput.addEventListener('focus' , () => {
    //Vad ska hända när input är i focus
    console.log('DU står i input');
    //Lägga till klassen focusBorder
    aliasInput.classList.toggle('focusBorder');


});
//Lyssnare som lyssnar efter när input är i focus
aliasInput.addEventListener('blur' , () => {
    //Vad ska hända när input är i focus
    console.log('DU står utanför input');
    //Lägga till klassen focusBorder
    aliasInput.classList.toggle('focusBorder');


});

//Lyssnare som lyssnar efter klick på btn
sendBtn.addEventListener('click' , (event) => {
    //vad ska hända vid klick
    //Avbryter btn deafult beteende
    event.preventDefault();
    const spaceName = aliasInput.value;
    console.log('Du klickade på sendBtn');
    console.log(spaceName);
    textInput.textContent = `Welcome ${spaceName} to the planet Mars :)`;
    //rensa input
    // console.log(aliasInput); 
    aliasInput.value = '';
    //kontorolllera om aliasInput är tomt och sätt bnt till disbled
    if(aliasInput.value === '') {
        //Om det är tomt
        console.log('Det är tomt');
        //bnt ska bli disabled
        sendBtn.disabled = true;
}


});



