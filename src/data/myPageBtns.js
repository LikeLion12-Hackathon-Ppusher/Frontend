// 마이페이지 하단의 버튼 내용에 해당하는 데이터입니다.
export const myPageBtns = (handleLogout, navigate) => [
  { text: "카카오 계정 관리", onClick: () => navigate("/home/account") },
  { text: "사용자 유형 변경", onClick: () => navigate("/home/type") },
  { text: "알림 설정", onClick: () => navigate("/home/notify") },
  { text: "내 제보 내역", onClick: () => navigate("/home/report") },
  { text: "로그아웃", onClick: handleLogout },
];
