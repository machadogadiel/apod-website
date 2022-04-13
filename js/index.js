const apiKey = "0rVXRVo6o5fdEbBwflG2ogibzzDXNcT5gNngfVF2"
const url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey

makeRequest(url)

$("#input-date").on("change", function () {

    setTimeout(function () {
        let date = $("#input-date").val()

        makeRequest(url + `&date=${date}`)
    }, 2000);

});

let dateText = $("#date")

dateText.text(getDate())

function makeRequest(url) {
    $.ajax({
        url: url,
        success: function (response) {
            let linkElement = $("#hdlink")
            let imageElement = $("#apod-image")
            let iframeElement = $("#apod-video")
            let inputDateElement = $("#input-date")
            let explanationElement = $("#explanation-element")

            imageElement.attr("src", response.url)
            imageElement.attr("alt", response.title)
            linkElement.attr("href", response.hdurl)
            inputDateElement.attr("value", response.date)            

            explanationElement.text(response.explanation)

            if (response.media_type == "video") {
                imageElement.hide()

                iframeElement.attr("src", response.url)
                iframeElement.show()
            }
        },
        error: function (error) {
            console.log(error)
        },
    });
}

function getDate() {
    var date = new Date();

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

    let currentDayNum = date.getDate()
    let currentDayName = days[date.getDay()]
    let currentMonth = months[date.getMonth()]

    console.log(date.getMonth())
    console.log(date.getDay())

    var formattedDate = `${currentDayName} | ${currentMonth} ${currentDayNum}th`

    return formattedDate;
}