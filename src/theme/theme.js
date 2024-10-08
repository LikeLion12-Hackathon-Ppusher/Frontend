// src/theme/theme.js

const smokeTheme = {
  // Home.jsx의 버튼
  color: "black",
  main: "#000000",
  background: "#272A30",
  font: "#F7F152",
  imgColor: "#B1AD3A",
  borderColor: "#000000",
  NavborderColor: "#F7F152",
  // HomeNav.jsx의 버튼
  Navbackground: "#000000",
  // 제보하기
  reportBackground: "#FFFEEE",
  reportTextBox: "#FEFBB1",
  reportTextBoxPlaceholder: "#000000",
  reportBorderColor: "#FFF100",
  placeholder: "#F5F5F5",
  reportfont: "black",
  // 인포 패널 화면
  infoBoxColor: "#FFFEEE",
  infoFontBorderColor: "#000000",
  infoBorderColor: "#FFF100",
  infoCleanback: "#F7F152",
  // 버튼 활성화
  btnActiveback: "#F7F152",
  btnActivefont: "black",
  btnActiveborder: "#F7F152",
};

const nonSmokeTheme = {
  // Home.jsx의 버튼
  color: "yellow",
  main: "#F7F152",
  background: "#FFFCC3",
  font: "#000000",
  imgColor: "#4c490e",
  borderColor: "#F7F152",
  NavborderColor: "#F7F152",
  // HomeNav.jsx의 버튼
  Navbackground: "#FFFEEE",
  // 제보하기
  reportBackground: "#FEFBB1",
  reportTextBox: "#FFFEEE",
  reportTextBoxPlaceholder: "8F8F8F",
  reportBorderColor: "#FFF100",
  placeholder: "#8f8f8f",
  reportfont: "black",
  // 인포 패널 화면
  infoBoxColor: "#FFFEEE",
  infoFontBorderColor: "#000000",
  infoBorderColor: "#FFF100",
  infoCleanback: "white",
  // 버튼 활성화
  btnActiveback: "#F7F152",
  btnActivefont: "black",
  btnActiveborder: "#F7F152",
};

export const theme = {
  smokeTheme,
  nonSmokeTheme,
};
