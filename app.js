//countdown to the wedding date
const countdown = () => {
  const countDate = new Date("September 05, 2026 19:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  //time calculations
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  //calculate
  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  //display
  document.getElementById("days").innerText = textDay + " days";
  document.getElementById("hour").innerText = textHour + " hours";
  document.getElementById("minuts").innerText = textMinute + " minutes";
  document.getElementById("secound").innerText = textSecond + " seconds";
};

setInterval(countdown, 1000);
countdown();
