import * as moment from "moment-jalaali";

declare global {
    interface Window {
        Calendar: any;
    }
}


class Calendar {
    public element: string;
    public months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
    constructor(element: string = '') {
        if (!document.querySelector(element)) {
            console.log(new Error("Element not found!"));
        }
        this.element = element;
    }
    async make(options: any = {
        year: null,
        month: null,
        labels: { '1': [{ text: '1th', class: 'blue' }] },
        on: {
            day: (day: string) => { return day; },
            label: (label: object) => { return label; }
        }
    }) {
        let
            months = this.months,
            currentDate = await moment().locale('fa'), // today date
            year = options['year'] || currentDate.jYear(), // today year in jalali
            month = (options['month'] && typeof options['month']=='number' && 1 <= options['month'] && options['month'] <= 12)?options['month'] : currentDate.jMonth() + 1, // today month in jalali
            day = currentDate.jDate(), // today date in jalali
            last_day = moment(`${year}/${month}/1`, 'jYYYY/jMM/jDD').endOf('jMonth').jDate(), // 30 or 31
            start_index = moment(`${year}/${month}/1`, 'jYYYY/jMM/jDD').weekday() + 1, // first day of month start is sunday, monday or ..
            end_index = moment(`${year}/${month}/${last_day}`, 'jYYYY/jMM/jDD').weekday() + 2, // last day of month (30 or 31) is sunday, monday or ..
            weeks = 5,
            day_index = 1;

        if (start_index >= 5 && ((start_index == 6 && last_day >= 30) || (start_index == 5 && last_day == 31))) { // if first day of month start in 5th or 6th day of week change weeks in a month
            weeks = 6;
        }

        let div = document.createElement('div');
        div.classList.add('month');
        function setWeek(index = 0) {
            let array = Array(7);
            if (index == 0) {
                for (let i = 0; i < start_index; i++) {
                    array[i] = '';
                }
            } else if (index == weeks - 1) {
                for (let i = end_index; i < 7; i++) {
                    array[i] = '';
                }
            }
            for (let i = 0; i < 7; i++) {
                if (array[i] != '' && day_index <= last_day) {
                    array[i] = day_index;
                    day_index++;
                } else {
                    array[i] = '';
                }
            }
            div.appendChild(createWeek(array));
            return array;
        }

        function createWeek(days: any[] = []) {
            let div = document.createElement('div');
            div.classList.add('week');
            for (let i in days) {
                div.appendChild(createDay(days[i]));
            }
            return div;
        }

        function createDay(day: string = '') {
            let div = document.createElement('div');
            div.classList.add('day');
            if (day == '') {
                div.classList.add('disable');
                div.innerText = day;
            } else {
                if (options.on && options.on.day && typeof options.on.day == 'function') {
                    div.onclick = () => { options.on.day(day); };
                }
                let span = document.createElement('span');
                span.innerText = day;
                div.appendChild(span);
                if (options['labels'] && typeof options['labels'] == 'object' && options['labels'][day] != null) {
                    let label = options['labels'][day];
                    let labels = document.createElement('div');
                    labels.classList.add('labels');
                    if (Array.isArray(label) == true) {
                        for (let i in label) {
                            labels.appendChild(createLabel(label[i]))
                        }
                    } else if (typeof label == 'string' || typeof label == 'object') {
                        labels.appendChild(createLabel(label))
                    }
                    div.appendChild(labels);
                }
            }
            return div;
        }

        function createLabel(label: any) {
            let div = document.createElement('div');
            div.classList.add('label');
            if (typeof label == 'string') {
                div.innerText = label;
            }
            else if (typeof label == 'object') {
                div.innerText = label['text'] || '';
                div.className += ' ' + label['class'];
                if (label['value']) div.setAttribute('value', label['value']);
            }
            if (options.on && options.on.label && typeof options.on.label == 'function') {
                div.onclick = () => {
                    options.on.label(label);
                }
            }
            return div;
        }

        let array2D = Array(weeks).fill([]);
        for (let i = 0; i < array2D.length; i++) {
            array2D[i] = setWeek(i);
        }

        if (document.querySelector(this.element)) {
            (<HTMLElement>document.querySelector(this.element)).innerHTML = '';
            (<HTMLElement>document.querySelector(this.element)).appendChild(div);
        }
        return {
            labels: options.labels || {},
            for: { year, month, Month: months[month - 1] || 'undefined', index: { first: start_index, last: end_index }, weeks, length: last_day },
            today: { year: currentDate.jYear(), month: currentDate.jMonth() + 1, Month: months[currentDate.jMonth()] || 'undefined', day },
            martix: { array: array2D, dom: div }
        };
    }
}

window.Calendar = Calendar;
export default Calendar;