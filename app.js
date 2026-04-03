function generate() {
  const subjects = document.getElementById("subjects").value.split(",");
  const periods = Number(document.getElementById("periods").value);
  const days = Number(document.getElementById("days").value);

  const output = document.getElementById("output");
  output.innerHTML = "";

  for (let d = 1; d <= days; d++) {
    let dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.innerHTML = `<h3>Day ${d}</h3>`;

    for (let p = 1; p <= periods; p++) {
      let subject = subjects[Math.floor(Math.random() * subjects.length)];

      let span = document.createElement("span");
      span.className = "period";
      span.innerText = subject;

      dayDiv.appendChild(span);
    }

    output.appendChild(dayDiv);
  }
}
