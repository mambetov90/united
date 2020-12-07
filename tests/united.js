module.exports = {
    'Test': function (browser) {
        const google = browser.page.united();
        const timeOut = 60000;

        //a. Navigate to https://www.united.com
        google.navigate()
            .assert.title('United Airlines - Airline Tickets, Travel Deals and Flights')
            .assert.visible('@flightRoot')

            //b. Fill the search criteria:
            //i. One-way flight
            .click('@flightRoot')
            .click('@departureFrom')
            .click('@clearBrn')

            //ii. From “New York JFK” to “Miami, FL, US (MIA - All Airports)”
            .setValue('@departureFrom', 'Riga, LV (RIX)')
            .pause(1000)
            .assert.visible('@arriveTo')
            .click('@arriveTo')
            .click('@clearBrn')
            .setValue('@arriveTo', 'New York, NY, US (NYC - All Airports)')
            .assert.visible('@departDate')
            .click('@departDate')
            .click('@clearDateBtn')

            //iii. Depart date August 20th
            .setValue('@departDate', 'Dec 10')

            //iv. Economy class
            //c. Click Find flights
            .waitForElementVisible('@submit', timeOut)
            .click('@submit')

            //d. In the flight table:
            .waitForElementVisible('@tableWithFlights', timeOut)
            .assert.urlContains('https://www.united.com/ual/en/US/flight-search/book-a-flight/')

            //i. Sort the flights by Economy (Most Restricted), lowest price first
            .waitForElementVisible('@sortEconomFlights', timeOut)
            .click('@sortEconomFlights')
        let flightData = {'Depart': '', 'Arrive': '', 'Stops': '', 'Duration': '', 'Price': ''}

        browser.elements('css selector', 'ul[id="flight-result-list-revised"] li[class*=flight-block-fares]', function (elements) {
            elements.value.forEach(function (item, i) {
                browser.getText('css selector', 'ul[id=flight-result-list-revised] li[data-trip-index="' + i + '"] div[class="flight-time flight-time-depart"]', function (depart) {
                    browser.getText('css selector', 'ul[id=flight-result-list-revised] li[data-trip-index="' + i + '"] div[class="flight-time flight-time-arrive"]', function (arrive) {
                        browser.getText('css selector', 'ul[id=flight-result-list-revised] li[data-trip-index="' + i + '"] div[class="flight-connection-container"]', function (stops) {
                            browser.getText('css selector', 'ul[id=flight-result-list-revised] li[data-trip-index="' + i + '"] div[class="flight-summary-bottom"]', function (duration) {
                                browser.getText('css selector', 'ul[id=flight-result-list-revised] li[data-trip-index="' + i + '"] div[class*="fare-option-eco-basic"] div[class*="use-roundtrippricing"]', function (price) {

                                    flightData.Depart = depart.value.slice(9)
                                    flightData.Arrive = arrive.value.slice(8)
                                    flightData.Stops = stops.value.slice(15)
                                    flightData.Duration = duration.value
                                    flightData.Price = price.value

                                    //ii. Collect Depart, Arrive, Stops, Duration, Price (Economy (Most Restricted) price only) data in a json object.
                                    let data = Object.values(flightData)

                                    //iii. If the flight is not available for Price criteria: (Economy (Most Restricted), filter the flight data out of the json object
                                    if (data.indexOf('Not available') < 0) {
                                        let convertData = JSON.stringify(data)

                                        //iv. Print the final json object in the console.
                                        console.log(convertData)
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
        browser.end();
    }
};
