// Initialize
let list = document.getElementById("list") as HTMLElement;
list.style.display = "none";

let day = document.getElementById("day") as HTMLInputElement;
let month = document.getElementById("month") as HTMLInputElement;

let active_list: string = "";

let date: Date = new Date();

let year_list = document.getElementById("year-list") as HTMLElement;
let year = document.getElementById("year") as HTMLInputElement;
let left_year = document.getElementById("years-left") as HTMLElement;
let right_year = document.getElementById("years-right") as HTMLElement;

let colors: Array<string> = [
  "##DFFF00",
  "#FFBF00",
  "#FF7F50",
  "#DE3163",
  "#9FE2BF",
  "#40E0D0",
  "#6495ED",
  "#CCCCFF",
];

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function randomChoice(arr: Array<string>): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

year_list.innerHTML = String(date.getFullYear());
year_list.style.color = randomChoice(colors);

left_year.onclick = function (): false {
  let current_year: number = Number(year_list.innerHTML);
  year_list.innerHTML = String(current_year - 1);

  return false;
};

right_year.onclick = function (): false {
  let current_year: number = Number(year_list.innerHTML);
  year_list.innerHTML = String(current_year + 1);

  return false;
};

let output = document.getElementById("output-block-item") as HTMLElement;

// Lists of days, months, years
function createList(
  items_value: number,
  div_id: string,
  span_id: string,
  list_id: string
): false {
  let days_or_months_list: HTMLDivElement = document.createElement("div");

  for (let i: number = 1; i <= items_value; i++) {
    let div: HTMLDivElement = document.createElement("div");
    let span: HTMLSpanElement = document.createElement("span");
    let textSpan: Node = document.createTextNode(String(i));

    days_or_months_list.id = list_id;
    div.id = div_id;
    span.id = span_id;
    span.style.color = randomChoice(colors);
    span.onclick = function (): false {
      if (list_id === "days-list") {
        let max_days_in_month: number = daysInMonth(
          Number(year_list.innerHTML),
          Number(month.placeholder)
        );
        if (Number(span.innerHTML) > max_days_in_month) {
          day.placeholder = String(max_days_in_month);
        } else {
          day.placeholder = span.innerHTML;
        }
      } else {
        month.placeholder = span.innerHTML;

        let max_days_in_month: number = daysInMonth(
          Number(year_list.innerHTML),
          Number(span.innerHTML)
        );

        if (
          day.placeholder !== "Day" &&
          Number(day.placeholder) > max_days_in_month
        ) {
          day.placeholder = String(max_days_in_month);
        }
      }

      year.placeholder = year_list.innerHTML;

      output.innerHTML = `${day.placeholder}th ${month.placeholder} ${year.placeholder}`;

      active_list = "";
      list.removeChild(days_or_months_list);
      list.style.display = "none";

      return false;
    };

    span.appendChild(textSpan);
    div.appendChild(span);
    days_or_months_list.appendChild(div);
  }

  document.getElementById("list")?.appendChild(days_or_months_list);

  return false;
}

// List events
day.onclick = function (): false {
  if (!active_list || active_list === "month") {
    if (active_list === "month") {
      let months_list = document.getElementById("months-list") as HTMLElement;
      list.removeChild(months_list);
    }

    createList(31, "days-list-block", "days-list-block-item", "days-list");

    active_list = "day";
    list.style.display = "block";
  }

  return false;
};

month.onclick = function (): false {
  if (!active_list || active_list === "day") {
    if (active_list === "day") {
      let days_list = document.getElementById("days-list") as HTMLElement;
      list.removeChild(days_list);
    }

    createList(
      12,
      "months-list-block",
      "months-list-block-item",
      "months-list"
    );

    active_list = "month";
    list.style.display = "block";
  }

  return false;
};
