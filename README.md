# Calendar-JS (version 0.0.1)
You can make simple calendar for jalaali and able to choose years and months and a event emiter when user click on a day on the calander. It is free and opensource and please improve this library. You can use [demo](https://jaypy-code.github.io/calendar-js).

# How to use
First you should call calendar-js script file.

```
Browsers:
<script src="path/to/go/dist/bundle.js"></script>
```

In your codes you must make a variable and equils with new calendar class and say which element (Like calling in css).

```
...

const calender = new Calendar('YOUR-ELEMENT');
calander.make({ year: 1398, month: 8 }, function onDaySelect(day){
    let selectedDay = day;
    // Do somethings with day.
}).then(function(result){
    let SelectedMonthInfo = result['for'];
    let CurrentMonthInfo = result['today'];
    let MatrixResult = result['matrix'];
});
...
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
    }
}
```

# Changelogs
[5 Nov 2019] Make simple calendar-js for jalaali.

# Dependencies
```moment-jalaali^0.9.1```

```webpack^4.41.2```

```typescript^3.6.4```
