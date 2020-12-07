
module.exports = {
  url: 'https://united.com',
  elements: {
    flightRoot: {
      selector: '//span[contains(text(),"One-way")]',
      locateStrategy: 'xpath'

    },
    clearBrn: {
      selector : 'button[class*=clearButton]',
    },
    clearDateBtn: {
      selector : 'button[class*=clearDate]',
    },
    arriveTo: {
      selector : 'input[id=bookFlightDestinationInput]',
    },
    departureFrom: {
      selector : 'input[id="bookFlightOriginInput"]',
    },
    departDate: {
      selector : 'input[id=DepartDate]',
    },
    submit: {
      selector: 'button[type=submit]',
    },
    tableWithFlights: {
      selector : 'div[id="flight-result-elements"]',
    },
    sortEconomFlights: {
      selector : 'div[id="flight-result-elements"] a[id="column-ECO-BASIC"] i[class="icon-sorter"]',
    }
  }
};