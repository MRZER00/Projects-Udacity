/* Global Variables */


// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=d8053dd91f382329fa7febe83c12cac7&units=imperial';
const url = 'https://api.openweathermap.org/data/2.5/weather?zip='

 

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

// Event Listeners
document.getElementById('generate').addEventListener('click', performAction);

async function performAction(){
    const zip = document.querySelector('#zip').value;
    const feeling = document.querySelector('#feelings').value;    

    const response = await fetch(url+zip+apiKey);
    const data = await response.json()
    // console.log(data)
    try{
        console.log(data);
        postData('/all', {temp:data.main.temp, date: newDate, feel:feeling, city:data.name} );

        // Function to GET Project Data
        retrieveData()
    }
    catch(error){
        // appropriately handle the error
        console.log('error',error)
    }
}

const retrieveData = async (e) =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML =allData.date;
    document.getElementById("city").innerHTML =allData.city;
    }
    catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }
}
    

const postData = async ( url = '', data={})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
      console.log("error", error);
    }
}
