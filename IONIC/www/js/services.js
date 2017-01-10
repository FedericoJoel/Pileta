angular.module('starter.services', [])

.factory('Places', function () {
  var places = [
    {
      name: "Centro de diagnostico",
      address: "Av 9 de julio 123",
      distance: 1
    },
    {
      name: "Madero Center",
      address: "Bouchard 123",
      distance: 1.2
    },
    {
      name: "Plaza Arenales",
      address: "Nueva York 123",
      distance: 1.3
    },
   
  ];

  var recent = [
    {
      name: "Hospital Velez sarfield",
      address: "Av Francisco Beiro 123",
      distance: 1.4
    },
    {
      name: "Centro cultural recoleta",
      address: "Av Independencia 123",
      distance: 1.5
    }
  ];

  return {
    all: function () {
      return places;
    },
    remove: function (post) {
      places.splice(places.indexOf(post), 1);
    },
    get: function (postId) {
      for (var i = 0; i < places.length; i++) {
        if (places[i].id === parseInt(postId)) {
          return places[i];
        }
      }
      return null;
    },
    recent: function () {
      return recent;
    }
  };
})

.factory('Drivers', function () {
  var drivers = [
    {
      id: 1,
      name: "Pedro Picapiedras",
      plate: "FEM891",
      brand: "Chevrolet Corsa",
      distance: 0.6,
      status: "Solicitando"
    },
    {
      id: 2,
      name: "Pablo Marmol",
      plate: "FEM891",
      brand: "Chevrolet Corsa",
      distance: 0.6,
      status: "Conectando"
    },
    {
      id: 3,
      name: "Homero Simpson",
      plate: "FEM891",
      brand: "KChevrolet Corsa",
      distance: 0.6,
      status: "Conectando"
    },
    {
      id: 4,
      name: "Barney Gomez",
      plate: "FEM891",
      brand: "Chevrolet Corsa",
      distance: 0.6,
      status: "Conectando"
    },
  ];

  return {
    all: function () {
      return drivers;
    },
    remove: function (driver) {
      drivers.splice(drivers.indexOf(driver), 1);
    },
    get: function (driverId) {
      for (var i = 0; i < drivers.length; i++) {
        if (drivers[i].id === parseInt(driverId)) {
          return drivers[i];
        }
      }
      return null;
    }
  };
})

.factory('Trips', function() {
    var trips = [
      {
        id: 1,
        from: 'Royal City',
        to: 'Vietnam - France hospital',
        time: '2016-01-02'
      },
      {
        id: 2,
        from: 'BigC',
        to: 'Phao Dai Lang',
        time: '2015-12-11'
      },
      {
        id: 3,
        from: 'Royal City',
        to: '784 Lang',
        time: '2015-11-10'
      },
      {
        id: 4,
        from: 'Royal City',
        to: 'Vietnam - France hospital',
        time: '2015-11-10'
      }
    ];

    return {
      all: function () {
        return trips;
      }
    };
})

.factory('Notifications', function () {
  var notifications = [
    {
      id: 1,
      title: "New price from Jan 2016",
      content: "",
      createdAt: "2016-02-14 12:00:00",
      read: true
    },
    {
      id: 2,
      title: "New version 1.1.1",
      content: "",
      createdAt: "2016-02-13 12:00:00",
      read: false
    },
    {
      id: 3,
      title: "New version 1.1.0",
      content: "",
      createdAt: "2016-02-12 12:00:00",
      read: false
    }
  ];

  return {
    all: function () {
      return notifications;
    },
    remove: function (notification) {
      notifications.splice(notifications.indexOf(notification), 1);
    },
    get: function (notificationId) {
      for (var i = 0; i < notifications.length; i++) {
        if (notifications[i].id === parseInt(notificationId)) {
          return notifications[i];
        }
      }
      return null;
    }
  };
})

