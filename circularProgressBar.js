fetch('https://portfolio-g6y2.onrender.com/jsondata', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
}).then(json => {
  console.log("hii")
  console.log(json.json().then((json) => {
    console.log(json)

    const cirularProgressContainer = document.querySelector(".cirularProgressContainer");

    const courses = json.qualificationsData

    courses.forEach((course) => {
      cirularProgressContainer.innerHTML += `
  <div class="progess-group mt-5">
  <div class="circular-progress" >
    <span class="course-value" style="color:${course.color}">0%</span>
  </div>
  <label class="text" style="color:${course.color}">${course.course}</label>
</div>
  `;
    });

    style = "  background: conic-gradient(${course.color} ${3.6 * course.percent}deg, #fff 0deg);"

    const progressGroups = document.querySelectorAll(".progess-group");

    progressGroups.forEach((progress, index) => {
      let progressStartValue = 0;
      let progressStartEnd = courses[index].percent;
      let speed = 50;
      let progessTimer = setInterval(() => {
        progressStartValue++;
        if (progressStartValue == progressStartEnd) {
          clearInterval(progessTimer);
        }
        progress.querySelector(".circular-progress").style.background = `
    conic-gradient(${courses[index].color} ${3.6 * progressStartValue}deg, #fff 0deg)`;

        progress.querySelector(".course-value").innerHTML = progressStartValue + "%";
      }, speed);
    });
  }))
});