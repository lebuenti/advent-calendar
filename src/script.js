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
      return "ChristmasBig3";
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

const createCalendar = () => {
  const parent = document.getElementById("content");
  const days = [
    5, 13, 17, 9, 1, 24, 19, 10, 4, 8, 22, 18, 20, 3, 21, 16, 14, 12, 7, 2, 15,
    11, 23, 6,
  ];

  for (let i = 0; i < 24; i++) {
    var newDiv = document.createElement("div");
    newDiv.classList.add("door");
    newDiv.classList.add("container");
    var newContent = document.createTextNode(days[i]);

    newDiv.style.fontFamily = getRandomFont();
    newDiv.style.fontSize = Math.random() * (54 - 42) + 42 + "pt";
    newDiv.style.color = getRandomFontColor();
    newDiv.style.transform =
      "scale(" +
      (Math.random() * (110 - 75) + 75) / 100 +
      ") rotate(" +
      (Math.random() * (7 + 7) - 7) +
      "deg)";

    newDiv.appendChild(newContent);
    parent.appendChild(newDiv);
  }
};
