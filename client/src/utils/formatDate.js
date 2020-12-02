export default function (date) {
  let [year, month, day] = date.split("-");
  day = day.split("T")[0];

  return `${day}-${month}-${year}`;
}
