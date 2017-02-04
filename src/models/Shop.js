import {observable} from 'mobx'

export class Shop {
  _store
  @observable id = 'a9a76013-6c0f-4881-96ff-06c4ba6c5360'
  @observable duration = null
  name = 'FabCafe Singapore'
  pickupTimes = {
    special: [
      {
        date: '2017-01-30',
        name: 'Chinese New Year Monday',
        startHour: 10,
        startMinute: 0,
        endHour: 19,
        endMinute: 0
      }
    ],
    general: [
      {
        weekdays: [0, 1, 2, 3, 4, 5, 6],
        startHour: 10,
        startMinute: 0,
        endHour: 19,
        endMinute: 0
      }
    ]
  }
  timezone = {
    offset: 8 * 60 * 60 * 1000,
    shortName: 'SGT'
  }
  currency = 'SGD'
  locale = {
    code: 'en-SG',
    language: 'en',
    culture: 'SG'
  }
  hour12 = true
  active = true
  menu = [
    {
      id: 38,
      name: 'Hot Coffee with Milk',
      items: [
        {
          id: 1792,
          name: 'Café Latte',
          price: 600,
          qty: 1,
          modifiers: [
            {
              name: 'Size',
              options: [
                {
                  name: 'Large',
                  price: 700
                },
                {
                  name: 'Small',
                  price: 600,
                  default: true
                }
              ]
            }
          ],
          addons: [
            {
              name: 'Iced',
              price: 100
            },
            {
              name: 'Brown Sugar',
              price: 0
            },
            {
              name: 'White Sugar',
              price: 0
            },
            {
              name: 'Double Shot',
              price: 0,
              default: true
            }
          ]
        },
        {
          id: 8231,
          name: 'Flat White',
          price: 600,
          modifiers: [
            {
              name: 'Size',
              options: [
                {
                  name: 'Large',
                  price: 700
                },
                {
                  name: 'Small',
                  price: 600,
                  default: true
                }
              ]
            }
          ],
          addons: [
            {
              name: 'Iced',
              price: 100
            },
            {
              name: 'Brown Sugar',
              price: 0
            },
            {
              name: 'White Sugar',
              price: 0
            },
            {
              name: 'Double Shot',
              price: 0,
              default: true
            }
          ]
        },
        {
          id: 8230,
          name: 'Mocha',
          price: 600,
          modifiers: [
            {
              name: 'Size',
              options: [
                {
                  name: 'Large',
                  price: 700
                },
                {
                  name: 'Small',
                  price: 600,
                  default: true
                }
              ]
            }
          ],
          addons: [
            {
              name: 'Iced',
              price: 100
            },
            {
              name: 'Brown Sugar',
              price: 0
            },
            {
              name: 'White Sugar',
              price: 0
            },
            {
              name: 'Double Shot',
              price: 0,
              default: true
            }
          ]
        },
        {
          id: 8233,
          name: 'Cappuchino',
          price: 600,
          modifiers: [
            {
              name: 'Size',
              options: [
                {
                  name: 'Large',
                  price: 700
                },
                {
                  name: 'Small',
                  price: 600,
                  default: true
                }
              ]
            }
          ],
          addons: [
            {
              name: 'Iced',
              price: 100
            },
            {
              name: 'Brown Sugar',
              price: 0
            },
            {
              name: 'White Sugar',
              price: 0
            },
            {
              name: 'Double Shot',
              price: 0,
              default: true
            }
          ]
        }
      ]
    },
    {
      id: 81,
      name: 'Straight',
      items: [
        {
          id: 8232,
          name: 'Long Black',
          price: 500,
          modifiers: [
            {
              name: 'Size',
              options: [
                {
                  name: 'Large',
                  price: 600
                },
                {
                  name: 'Small',
                  price: 500,
                  default: true
                }
              ]
            }
          ],
          addons: [
            {
              name: 'Iced',
              price: 100
            },
            {
              name: 'Brown Sugar',
              price: 0
            },
            {
              name: 'White Sugar',
              price: 0
            },
            {
              name: 'Double Shot',
              price: 0,
              default: true
            }
          ]
        },
        {
          id: 8236,
          name: 'Piccolo',
          price: 500,
          modifiers: [],
          addons: [
            {
              name: 'Brown Sugar',
              price: 0
            },
            {
              name: 'White Sugar',
              price: 0
            },
            {
              name: 'Double Shot',
              price: 0,
              default: true
            }
          ]
        },
        {
          id: 8234,
          name: 'Espresso',
          price: 400,
          modifiers: [],
          addons: [
            {
              name: 'Iced',
              price: 100
            },
            {
              name: 'Brown Sugar',
              price: 0
            },
            {
              name: 'White Sugar',
              price: 0
            },
            {
              name: 'Double Shot',
              price: 0,
              default: true
            }
          ]
        }
      ]
    }
  ]
  location = {
    lat: 1.2862791,
    long: 103.8570774,
    zoom: 17
  }
  address = '6 Bayfront Avenue, ArtScience Museum, Singapore 018974'
  country = {
    name: 'Singapore',
    iso: 'sg'
  }
  intro = 'FabCafe Singapore offers you a variety of great espresso beverages made with the highest quality home roasted beans and tasty sweets and cakes to go along. You can order them for pickup right from this website.'
  pickupInfo = 'Proceed directly to the pickup counter'
  logo = '../shared/images/fabcafelogo.png'
  image = '../shared/images/fabcafeimage.jpg'
  theme = 'fab'
  minimumPreperationMin = 15
  maximumOrderAheadMin = 120

  constructor (store, json) {
    this._store = store
    this.set(json)
  }

  isOpen (date = new Date()) {
    let open = 0

    this.pickupTimesOnDate(date).forEach((item) => {
      open += Date.UTC(2000, 1, 1, item.startHour, item.startMinute) <= Date.UTC(2000, 1, 1, date.getHours(), date.getMinutes()) &&
        Date.UTC(2000, 1, 1, item.endHour, item.endMinute) > Date.UTC(2000, 1, 1, date.getHours(), date.getMinutes())
    })
    return open > 0
  }

  pickupTimesOnDate (date = new Date()) {
    let times = []
    this.pickupTimes.special.forEach((item) => {
      if (item.date === date.toJSON().substr(0, 10)) {
        times.push(item)
      }
    })
    if (!times.length) {
      this.pickupTimes.general.forEach((item) => {
        if (item.weekdays.length && item.weekdays.indexOf(date.getDay()) >= 0) {
          times.push(item)
        }
      })
    }
    return times
  }

  requestDuration (origin, mode = 'walking', language = 'en', callback = () => {}) {
    const options = {
      origin: origin,
      mode: mode,
      destination: this.location.lat + ',' + this.location.long,
      language: language
    }
    const params = Object.keys(options).map((k) => k + '=' + options[k]).join('&')
    window.fetch('https://bu30yg2cnc.execute-api.us-east-1.amazonaws.com/location?' + params, {
      mode: 'cors'
    })
    // TODO: Google Error // .then(this.error.handleResponse)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.duration = data.rows[0].elements[0].duration.text
      callback(null, data)
    })
    .catch(callback)
  }

  set (json = {}) {
    Object.assign(this, json)
  }

  load (callback) {
    this.store.loadShop(callback)
  }
}
