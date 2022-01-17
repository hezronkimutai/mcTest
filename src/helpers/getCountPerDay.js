const start = new Date();
const end = start.setDate(start.getDate() - 30);
const startDate = new Date();

const getDaysArray = function (s, e) {
  const a = [];
  const d = new Date(s);
  while (d <= e) {
    a.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return a;
};
export const daylist = getDaysArray(end, startDate).map((v) => v.toString().slice(0, 15));

export default (dataArray) =>
  daylist
    .map((day) =>
      dataArray.filter(
        (message) => new Date(message.createdAt).toString().slice(0, 15) === day
      )
    )
    .map((item) => item.length);
