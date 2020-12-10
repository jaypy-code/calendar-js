# Calendar-JS (version 0.0.3)
You can make simple calendar for jalali and able to choose years and months and a event emiter when user click on a day on the calander. It is free and opensource and please improve this library. You can use [demo](https://jaypy-code.github.io/calendar-js/example).

# How to use
First you should call calendar-js script file.

```
Browsers:
<script src="https://raw.githubusercontent.com/jaypy-code/calendar-js/master/dist/bundle.js"></script>
```

In your codes you must make a variable and equils with new calendar class and say which element (Like calling in css).

```
...
const calender = new Calendar('YOUR-ELEMENT');
let options = { };
calander.make(options).then(function(result){
    // Do some things with result.
});
...
```

# What is options?
You have many options and features to make a calendar; this is what is options:

```
{
    year: number,
    month: number, // 1-12
    on: {
        day: function(day=''){
            // On a day clicked and do some things with day.
        },
        label: function(label){
            // On a label clicked and do some things with label.
        }
    },
    labels: {
        'DAY-NUMBER': 'EVENT-TEXT',
        '1': 'First day of month',
        'DAY-NUMBER': { text: 'EVENT-TEXT', class: 'ELEMENT-CSS-CLASS', VALUE: 'ELEMENT-ATTRABUTE-VALUE' },
        '2': { text: 'Second day of month', class: 'red', 'value': '_fj439ug1f1f3h183hr081h3' },
        'DAY-NUMBER': [ARRAY OF EVENTS],
        '3': ['Third day of month', { text: 'New event', class: 'blue' }]
    }
}
```

# What is returned?
You can use returned values in .then function; this is what is returned:

```
{
    for: { 
        year: number,
        month: number,
        Month: string, 
        index: {
            first: number, // First day of a month in a week is sunday or monday or ..
            last: number // Last day of a month in a week is sunday or monday or ..
        },
        weeks: number, // 4 or 5 or 6 weeks are in a month
        length: number // 29 or 30 or 31 days in a month
    },
    today: { 
        year: number, 
        month: number, 
        Month: string,
        day: number
    },
    martix: { 
        array: array[], // 2D array
        dom: [Object HTMLElements],
    },
    labels: {}, // Object of labels in options
}
```

# Changelogs
[6 Nov 2019] Set labels for days.

[5 Nov 2019] Make simple calendar-js for jalali.

[10 Dec 2020] Bug fixed 

# Dependencies
```moment-jalaali^0.9.1```

```webpack^4.41.2```

```typescript^3.6.4```
