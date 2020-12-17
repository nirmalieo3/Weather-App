const appid = '7b935f26e7452e8e607a4c09fb10f184';


window.addEventListener('load', function() {
    
    document.querySelector('#meteo').addEventListener('submit', function(event) {
        event.preventDefault();
        
        let citta = document.querySelector('#citta').value;
        let stateCode = document.querySelector('#stateCode').value;

       
        creaCardMeteoPromise(citta, stateCode);

    })
})



function caricaMeteoPromise(cityName, stateCode) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.status);
                }
            }
        }
        xhr.open('GET',`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode}&appid=${appid}&units=metric&lang=en/`)
        // effettuiamo la richiesta con send
        xhr.send();
    })
}


function creaCardMeteoPromise(cityName, stateCode) {
    caricaMeteoPromise(cityName, stateCode).then(
        (info) => {
           
            let icon =  `http://openweathermap.org/img/w/${info.weather[0].icon}.png`

            console.log(info);
            let card = `
            <div>
                <img src="${icon}">
                <h2>${info.name}</h2>
                <p> Temperature: ${info.main.temp}</p>
                <p> Temperature Max: ${info.main.temp_max}</p>
                <p> Temperature Min: ${info.main.temp_min}</p>
                <p> Condition: ${info.weather[0].description}</p>
            </div>
            `


            document.querySelector('#container').innerHTML = card
        },
        (error) => {
            alert(`c'è stato un errore ${error}`)
        }
    )
}

    