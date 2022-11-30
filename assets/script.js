if (localStorage.getItem("adventCalendarToken") != null) {
  fetch("assets/partials/calendar.html")
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      let div = document.createElement("div");
      div.innerHTML = result;
      document.body.appendChild(div);
      createCalendar();
    });
} else {
  history.pushState({ page: 1 }, "advent calendar", "login");
  fetch("assets/partials/login.html")
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      let div = document.createElement("div");
      div.innerHTML = result;
      document.body.appendChild(div);
    });
}

const onSubmit = () => {
  var payload = {
    username: document.getElementById("inputUsername").value,
    password: document.getElementById("inputPassword").value,
  };

  fetch("/signin", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: new Headers({ "content-type": "application/json" }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("adventCalendarToken", data.auth);
      history.pushState({ page: 1 }, "advent calendar", "/");
      location.reload();
    })
    .catch((error) => {
      alert("Wrong username or wrong password");
      location.reload();
    });
};

const getRandomFont = () => {
  let r = Math.floor(Math.random() * 11);

  switch (r) {
    case 0:
      return "ChristmasBig6";
    case 1:
      return "ChristmasSmall3";
    case 2:
      return "ChristmasBig5";
    case 3:
      return "ChristmasBubble";
    case 4:
      return "ChristmasBig4";
    case 5:
      return "verdana";
    case 6:
      return "ChristmasBig2";
    case 7:
      return "ChristmasSmall2";
    case 8:
      return "Candy";
    case 9:
      return "ChristmasBig1";
    case 10:
      return "ChristmasSmall1";
  }
};

const getRandomFontColor = () => {
  let r = Math.floor(Math.random() * 5);

  switch (r) {
    case 0:
      return "white";
    case 1:
      return "#FDECCA";
    case 2:
      return "#FCE2AF";
    case 3:
      return "#F7BAB1";
    case 4:
      return "#FFFBF4";
  }
};

const getRandomBackgroundColor = () => {
  let r = Math.floor(Math.random() * 3);

  switch (r) {
    case 0:
      return "#BB2528";
    case 1:
      return "#ea4630";
    case 2:
      return "#6B1445";
  }
};

const onDoorClicked = (event) => {
  let clickedDay = event.currentTarget.id;

  if ( new Date().getMonth() + 1 !== 12 || new Date().getDate() < clickedDay) {
    return;
  }

  let elem = document.getElementById(event.currentTarget.id);

  let door = Array.from(elem.children).find((htmlElem) =>
    htmlElem.className.includes("door")
  );
  let picture = Array.from(elem.children).find((htmlElem) =>
    htmlElem.className.includes("picture")
  );

  if (!door || !picture) {
    console.error("No door or picture found");
  }

  if (Array.from(door.classList).includes("close")) {
    const token = localStorage.getItem("adventCalendarToken");

    fetch("/image/" + clickedDay, {
      headers: new Headers({ auth: token }),
    })
      .then((response) => {
        return response.blob();
      })
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        let img = picture.querySelector("img");
        img.src = imageObjectURL;
      })
      .catch(error => {
        alert("You are not logged in.");
        console.error(error);
      }) ;

    door.classList.add("open");
    door.classList.remove("close");

    picture.classList.add("visible");
    picture.classList.remove("hidden");
  } else if (Array.from(door.classList).includes("open")) {
    door.classList.add("close");
    door.classList.remove("open");

    picture.classList.add("hidden");
    picture.classList.remove("visible");
  }
};

const createCalendar = () => {
  const parent = document.getElementById("content");
  const days = [
    5, 13, 17, 9, 1, 24, 19, 10, 4, 8, 22, 18, 20, 3, 21, 16, 14, 12, 7, 2, 15,
    11, 23, 6,
  ];

  for (let i = 0; i < 24; i++) {
    let container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("doorAndPictureContainer");
    container.onclick = onDoorClicked;
    container.id = days[i];

    container.style.transform =
      "scale(" +
      (Math.random() * (110 - 75) + 75) / 100 +
      ") rotate(" +
      (Math.random() * (5 + 5) - 5) +
      "deg)";

    let door = document.createElement("div");
    door.classList.add("container");
    door.classList.add("door");
    door.classList.add("close");
    door.style.fontFamily = getRandomFont();
    door.style.fontSize = Math.random() * (54 - 42) + 42 + "pt";
    door.style.color = getRandomFontColor();
    door.style.backgroundColor = getRandomBackgroundColor();

    const para = document.createElement("p");
    let doorText = document.createTextNode(days[i]);
    para.appendChild(doorText);
    door.appendChild(para);

    let pictureDiv = document.createElement("div");
    pictureDiv.classList.add("container");
    pictureDiv.classList.add("picture");
    pictureDiv.classList.add("hidden");
    let img = document.createElement("img");

    pictureDiv.appendChild(img);

    container.appendChild(door);
    container.appendChild(pictureDiv);

    parent.appendChild(container);
  }
};
