// Description text code
let jsonObj = {};
fetch('https://portfolio-t9u7.onrender.com/jsondata', {
// fetch('http://localhost:3200/jsondata', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
}).then(json => {
  console.log("hii")
  console.log(json.json().then((json) => {
    console.log(json)

    // console.log(response.body) 

    // .then((response) => response.json())
    // .then((json) => {
    //   console.log(json)
    //   json = JSON.parse(json)
    // fetch('http://localhost:3200/api/upload', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json; charset=utf-8' },
    //     body: JSON.stringify({ "file": "data2.json" })
    // }).then(response => {
    //     return response.json();
    // }).catch(err => { console.log(err); });
    // console.log(json.description)
    let description = json.description
    let desc = document.getElementById("descriptionText");
    desc.innerHTML = `
      <p>${description}</p>
      `;


    // function func() {
    //   fetch('./data.json')
    //     .then((response) => response.json())
    //     .then((json) => {
    //       let descText = document.getElementById("descText");
    //       console.log(descText.value);
    //       json['description'] = descText.value;
    //       console.log(json.description)
    //     });
    // }



    // Skills Code
    let skills = document.getElementById("skillsContainer");
    let skillsData = json.skillsData;

    skillsData.forEach((skill) => {
      skills.innerHTML += `<div class="progress-label">${skill.skillName}</div>
    <div class="progress-outer mb-4">
        <div class="progress">
            <div class="progress-bar progress-bar-info progress-bar-striped active"
                style="width:${skill.percent}%; background-color: #000;>
            </div>
            <div class="progress-value">${skill.percent}%</div>
        </div>
    </div>
    `;
    });


    // Project Code
    let projects = document.getElementById("projectsContainer");
    let projectsData = json.projectsData;
    projectsData.forEach((project) => {
      projects.innerHTML += `<div class="project-container">
    <p class="project-name">${project.Name}</p>
    <p class="project-desc">${project.description}</p>
    <a href="${project.link}" class="project-link" target="_blank">Project Link</a>
</div>
    `;
    });


    // Awards Code
    let awards = document.getElementById("awardsData");
    let awardsData = json.awardsData;
    awardsData.forEach((award) => {
      awards.innerHTML += `<div class="column">
  <img src="${award.url}" alt="${award.text}" height="75px" width="auto" style="object-fit: cover;" onclick="showImage(this);">
</div>
  `;
    });


    // Reviews Code
    let reviews = document.getElementById("reviewsData");
    let reviewsData = json.reviewsData;
    reviewsData.forEach((review) => {
      reviews.innerHTML += `<div class="p-4 md:w-1/2 w-full">
  <div class="h-full bg-gray-100 p-8 rounded">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
    </svg>
    <p class="leading-relaxed mb-6">${review.text}</p>
    <a class="inline-flex items-center">
      <span class="flex-grow flex flex-col">
        <span class="title-font font-medium text-gray-900">${review.name}</span>
      </span>
    </a>
  </div>
</div>
  `;
    });
  }))
});