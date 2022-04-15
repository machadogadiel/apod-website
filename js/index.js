const apiKey = "0rVXRVo6o5fdEbBwflG2ogibzzDXNcT5gNngfVF2"
const url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey
const minDate = new Date(1995, 06, 16)
const maxDate = new Date()

makeRequest(url)

$("#submit-btn").click(function () {
    let inputDate = $("#input-date").val()
    let dateInput = new Date(inputDate)

    if (dateInput >= minDate && dateInput <= maxDate ) {
        makeRequest(url + `&date=${inputDate}`)
    } else {
        setInvalidDateStyle()
    }
});

$("#date").text(getDisplayDate())

function setInvalidDateStyle() {
    const errorText = document.createElement("p")
    
    errorText.innerText = "Your date must be between 1995 June 16th and today's date"
    errorText.style.color =  "#f5001f"
    errorText.setAttribute("id", "#error-text")
    
    $(".info-container").append(errorText)
}


function makeRequest(url) {
    $.ajax({
        url: url,
        success: function (response) {
            let imageElement = $("#apod-image")
            let iframeElement = $("#apod-video")

            if (response.media_type == "video") {
                imageElement.hide()

                iframeElement.attr("src", response.url)
                iframeElement.show()
            }

            imageElement.attr("src", response.url)
            imageElement.attr("alt", response.title)
            
            $("#hdlink").attr("href", response.hdurl)
            $("#explanation-element").text(response.explanation)

        }
    });
}


function getDisplayDate() {
    let date = new Date();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    let currentDay = date.getDate()
    let currentDayName = days[date.getDay()]
    let currentMonthName = months[date.getMonth()]

    var formattedDate = `${currentDayName} | ${currentMonthName} ${currentDay}th`

    return formattedDate;
}