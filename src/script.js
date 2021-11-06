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
  //if tag ist gekommen
  let elem = document.getElementById(event.currentTarget.id);

  if (elem && Array.from(elem.classList).includes("close")) {
    elem.classList.add("open");
    elem.classList.remove("close");

    let picture = Array.from(elem.children).find((htmlElem) =>
      htmlElem.className.includes("picture")
    );

    if (picture) {
      picture.classList.remove("hidden");
      picture.classList.add("visible");
    }
  } else if (elem && Array.from(elem.classList).includes("open")) {
    elem.classList.add("close");
    elem.classList.remove("open");

    let picture = Array.from(elem.children).find((htmlElem) =>
      htmlElem.className.includes("picture")
    );

    if (picture) {
      picture.classList.remove("visible");
      picture.classList.add("hidden");
    }
  }
  // else tag ist nicht richtig
  //
};

const createCalendar = () => {
  const parent = document.getElementById("content");
  const days = [
    5, 13, 17, 9, 1, 24, 19, 10, 4, 8, 22, 18, 20, 3, 21, 16, 14, 12, 7, 2, 15,
    11, 23, 6,
  ];

  for (let i = 0; i < 24; i++) {
    let door = document.createElement("div");
    door.classList.add("door");
    door.classList.add("container");
    door.classList.add("close");
    let doorText = document.createTextNode(days[i]);
    door.id = days[i];

    let transform =
      "scale(" +
      (Math.random() * (110 - 75) + 75) / 100 +
      ") rotate(" +
      (Math.random() * (5 + 5) - 5) +
      "deg)";

    door.style.backgroundColor = getRandomBackgroundColor();
    door.style.fontFamily = getRandomFont();
    door.style.fontSize = Math.random() * (54 - 42) + 42 + "pt";
    door.style.color = getRandomFontColor();
    door.style.transform = transform;
    door.onclick = onDoorClicked;

    let pictureDiv = document.createElement("div");
    pictureDiv.classList.add("container");
    pictureDiv.classList.add("picture");
    pictureDiv.classList.add("hidden");
    let img = document.createElement("img");
    img.src = "./img/cat2.jpeg";

    pictureDiv.appendChild(img);
    door.appendChild(pictureDiv);
    door.appendChild(doorText);

    parent.appendChild(door);
  }
};
