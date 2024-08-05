import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserImg from "../assets/UserIcon.png";
import smokeImg from "../assets/제보흡연구역.png";
import smokeImg2 from "../assets/상습흡연구역.png";
import reportIcon from "../assets/reportIcon.png";
import reportImg from "../assets/reportImg.png";
import clustererMarkerImg from "../assets/투명.png";
import noSmokingZone from "../assets/금연구역경고아이콘.png";
import indirectSmokingZone from "../assets/간접흡연경고아이콘.png";
import publicSmokingZone from "../assets/publicSmokingZone.png";
import selectedPublicSmokingZone from "../assets/selectedpublicSmokingZone.png";
import publicSmokingZoneImg from "../assets/publicSmokingZoneImg.png";
import { ThemeColorContext } from "../Context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import selectClean from "../assets/selectImg.png";
import nonSelectClean from "../assets/nonSelect.png";
import smokerReportImg from "../assets/smokerReportImg.png";
import nonSmokerReportImg from "../assets/nonSmokerReportImg.png";
import axios from "axios";
import NoSmokingZoneChecker from "./NoSmokingZoneChecker";
import { getDistance } from "../apis/distance";
import { smokerReportAPI } from "../apis/api";
import { nonSmokerReportAPI } from "../apis/api";

const { kakao } = window;

const Map = () => {
  const BaseUrl = "https://bbuhackathon.p-e.kr";
  const access_Token = localStorage.getItem("access_token");

  const mapRef = useRef(null); // 지도 DOM 요소를 참조하는 ref
  const markerRef = useRef(null);
  const reportingMarkerRef = useRef(null);

  // 지도 객체 상태 추가
  // 여걸로 modal창의 handleSumbit에서의 마커 생성함수에 mapInstance를 넣는다
  // mapInstance가 그냥 카카오 맵임
  const [mapInstance, setMapInstance] = useState(null);
  const [markers, setMarkers] = useState([]);
  // selectedMarkerInfo 가 존재해야 InfoPanel이 보인다
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);

  // public 마커 전용 INFOPANEL만들자..
  const [selectedPublicMarkerInfo, setSelectedPublicMarkerInfo] =
    useState(null);

  // 모달창 true면 보이게
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [title, setTitle] = useState("");
  // 지도 클릭한 위치 주소 변환 상태 변수
  const [address, setAddress] = useState("");

  // 백엔드에서 get한 report정보에서의 어드레스 저장 상태변수
  const [reportAddress, setreportAddress] = useState("");
  const [isReporting, setIsReporting] = useState(false);

  const [showThankYouModal, setShowThankYouModal] = useState(false); // 감사 모달 상태 추가

  const [cleanlinessRating, setCleanlinessRating] = useState(0); // 청결도

  const handleRatingChange = (rating) => {
    setCleanlinessRating(rating);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [userType, setUserType] = useState("");
  // 상태로 관리
  // 이후 로그인 api와 정보를 저장할 수 있는 경우에는 다르게 useEffect에다가 axios.get으로 가져오거나 애초에
  // 로그인 할때 받은 res 데이터 정보에 담겨있는 option에서의 값을 여기다가 갔다놓자 (로그인 했을 때 받은 데이터 객체를 어디다가 저장해야 됨)

  const [hasAshtray, setHasAshtray] = useState(true);
  const [indoorOutdoor, setIndoorOutdoor] = useState(false); // 실내외 구분 상태 추가

  // Home이 최상위라 home에서 바꿔야 한다
  // const [mode, setMode] = useState(context.nonSmokeTheme);
  const mode = useContext(ThemeColorContext);

  const [noSmokingZones, setNoSmokingZones] = useState([]); // 금연구역을 저장할 상태입니다.
  const [showNoSmokingModalSY, setShowNoSmokingModalSY] = useState(false); // 금연구역 알림 모달의 표시 여부를 상태로 관리합니다.
  const [showNoSmokingModalSN, setShowNoSmokingModalSN] = useState(false); // 간접 흡연구역 알림 모달의 표시 여부를 상태로 관리합니다.

  // 좋아요 카운트
  const [likeCount, setLikeCount] = useState(0);
  const [isClikced, setIsClikced] = useState(false);

  useEffect(() => {
    initializeMap();

    setUserType(localStorage.getItem("userType"));
    // setUserType(state.userType);
    // console.log(mode);
    // setUserType(state.userType);

    // 여기 그냥 home/map 컴포넌트가 호출될때 단 1회 실행 의존 배열이 없으므로 근데 일단 로컬스토리지에 있는 유저타입 내용 가져옴
    console.log(userType);
  }, []);

  useEffect(() => {}, [selectedMarkerInfo]);

  useEffect(() => {
    // 여거는 로케이션 변경 있을때 => URL에 reprot가 있을떄 없을때 실행되는 useEffect
    // console.log(location);
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("report") === "true") {
      setSelectedMarkerInfo(null);
      setIsReporting(true);
    } else {
      setIsReporting(false);
    }

    // 현위치 누르면 밑에 함수 실행 그리고 새로고침 을 없애고 그냥 좌표를 측정해서 다시 좌표를 찍음
    if (queryParams.get("currentLocation") === "true") {
      handleCloseModal();

      // 제보 모달창이 열린 상태로 현위치를 누르면 모달창이 사라지게 함
      moveToCurrentLocation();

      // ture확인하면 그 queryParams을 delete로 삭제해서 다시 url이 home/map이 되게 함
      // console.log(queryParams.get("currentLocation"));
      // console.log("Moving to current location");
      queryParams.delete("currentLocation");
      navigate({
        search: queryParams.toString(),
      });
    }

    console.log(userType);
  }, [location.search]);

  // isReporting이 true이고 mapInstance가 존재하면 startReporting 함수를 호출하여 제보기능 호출
  useEffect(() => {
    if (isReporting && mapInstance) {
      startReporting();
    }
  }, [isReporting, mapInstance]);

  const initializeMap = async () => {
    // useRef훅을 사용하여 mapRef를 생성함(참조 객체) => 지도를 가르키게 될 예정
    // mapRef.current은 실제 DOM 요소를 가르키게 됨 => 카카오 지도 API는 이 DOM 요소를 사용하여 지도를 렌더링합니다.
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(33.4507, 126.570667),
      level: 3,
    };

    // 지도를 생성하는 카카오 맵 api 함수
    const map = new kakao.maps.Map(container, options);

    // 지도 클릭 이벤트 리스너 추가 지도를 클릭하면 화면에 보이던 Info, 제보 모달창 사라지게 함
    kakao.maps.event.addListener(map, "click", () => {
      setSelectedMarkerInfo(null);
      setSelectedPublicMarkerInfo(null);
      handleCloseModal();
    });

    // useRef훅의 set을 통해 mapInstance에 생성된 카카오 map을 넣는다
    setMapInstance(map);

    // 제보된 간접 흡연 장소 가져오기
    const reportIndirectSmokingZone = await axios.get(
      "https://bbuhackathon.p-e.kr/place/shsmoking/"
    );

    console.log(reportIndirectSmokingZone);

    reportIndirectSmokingZone.data.forEach(async (reportData) => {
      // console.log(reportData);
      const nowUserType = localStorage.getItem("userType");

      // const userId = localStorage.getItem("userId");
      // const access_Token = localStorage.getItem("access_token");

      const reportIndirectSmokingZoneData = await axios.get(
        `https://bbuhackathon.p-e.kr/place/shsmoking/${reportData.placeId}/`
      );

      // console.log(reportIndirectSmokingZoneData.status);
      console.log(reportIndirectSmokingZoneData.data);

      const isclickedData = reportIndirectSmokingZoneData.data.isLike;
      console.log(isclickedData);

      // console.log(reportData.likesCount);
      if (nowUserType === "SY") {
        if (reportIndirectSmokingZoneData.likesCount >= 3) {
          if (reportIndirectSmokingZoneData.isLike === true) {
            // 공감이 눌린 경우
            createMarker(
              map,
              new kakao.maps.LatLng(reportData.latitude, reportData.longitude),
              reportData.name,
              reportImg,
              reportData.address,
              "SN", // 비흡연자
              0,
              false,
              true,
              "nonSmokerReport", // 비흡연자 제보
              reportData.likesCount,
              reportData.placeId,
              true,
              "indirect"
            );
            setIsClikced(isclickedData);
          } else {
            // 공감이 눌리지 경우
            createMarker(
              map,
              new kakao.maps.LatLng(reportData.latitude, reportData.longitude),
              reportData.name,
              reportImg,
              reportData.address,
              "SN", // 비흡연자
              0,
              false,
              true,
              "nonSmokerReport", // 비흡연자 제보
              reportData.likesCount,
              reportData.placeId,
              isclickedData,
              "indirect"
            );
          }
          setIsClikced(isclickedData);
        }
      } else {
        if (reportIndirectSmokingZoneData.isLike === true) {
          // 공감이 눌린 경우
          createMarker(
            map,
            new kakao.maps.LatLng(reportData.latitude, reportData.longitude),
            reportData.name,
            reportImg,
            reportData.address,
            "SN", // 비흡연자
            0, // 청결도
            false, // 재떨이
            true, // 실내외
            "nonSmokerReport", // 비흡연자 제보
            reportData.likesCount,
            reportData.placeId,
            isclickedData,
            "indirect"
          );
          setIsClikced(isclickedData);
        } else {
          // 공감이 눌리지 경우
          createMarker(
            map,
            new kakao.maps.LatLng(reportData.latitude, reportData.longitude),
            reportData.name,
            reportImg,
            reportData.address,
            "SN", // 비흡연자
            0,
            false,
            true,
            "nonSmokerReport", // 비흡연자 제보
            reportData.likesCount,
            reportData.placeId,
            isclickedData,
            "indirect"
          );
          setIsClikced(isclickedData);
        }
      }
    });

    // 제보된 간접흡연 가져오기 => 원 클러스터

    // 제보된 흡연 장소 가져오기
    const reportSmokingZone = await axios.get(
      "https://bbuhackathon.p-e.kr/place/reportsmoking/"
    );

    console.log(reportSmokingZone);

    reportSmokingZone.data.forEach((reportData) => {
      createMarker(
        map,
        new kakao.maps.LatLng(reportData.latitude, reportData.longitude),
        reportData.name,
        reportImg,
        reportData.address,
        "SY",
        reportData.rate,
        reportData.ashtray,
        reportData.isIndoor,
        "smokerReport",
        0,
        reportData.placeId,
        true,
        "direct"
      );
    });

    // 나라 지정 흡연 장소 가져오기
    const publicSmokingZone = await axios.get(
      "https://bbuhackathon.p-e.kr/place/smoking/"
    );

    console.log(publicSmokingZone);

    publicSmokingZone.data.forEach((markerData) => {
      // const markerImageSrc =
      //   markerData.userType === "smoker" ? smokeImg : smokeImg2;
      createPublickSmokingZoneMarker(
        map,
        new kakao.maps.LatLng(markerData.latitude, markerData.longitude),
        markerData.name,
        publicSmokingZoneImg,
        markerData.name,
        markerData.userType,
        markerData.cleanlinessRating,
        markerData.hasAshtray,
        markerData.type,
        markerData.reportType
      );
    });

    //나라 지정 금연장소 가져오기
    const publicNoSmokingZone = await axios.get(
      "https://bbuhackathon.p-e.kr/place/nosmoking/"
    );

    console.log(publicNoSmokingZone);

    // 원을 저장할 배열
    const circles = [];

    // 금연 구역 위치 일단 제보된 흡연장소로 시험 테스트
    publicNoSmokingZone.data.forEach((markerData) => {
      var circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(
          markerData.latitude,
          markerData.longitude
        ), // 원의 중심좌표 입니다
        radius: 50, // 미터 단위의 원의 반지름입니다
        strokeWeight: 1.5, // 선의 두께니다
        strokeColor: "red", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "", // 선의 스타일 입니다
        fillColor: "red", // 채우기 색깔입니다
        fillOpacity: 0.3, // 채우기 불투명도 입니다
      });

      // 지도에 원을 표시합니다
      circle.setMap(map);

      // 배열에 원을 추가합니다
      circles.push(circle);
    });

    // 지도 레벨 변경 이벤트를 감지합니다
    kakao.maps.event.addListener(map, "zoom_changed", () => {
      const level = map.getLevel();

      // 특정 레벨 이하에서는 원을 숨기고, 그 이상에서는 원을 표시합니다
      circles.forEach((circle) => {
        if (level > 4) {
          // 레벨 4 이상일 때 숨기기
          circle.setMap(null);
        } else {
          circle.setMap(map);
        }
      });
    });

    const clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 5, // 클러스터 할 최소 지도 레벨
    });

    // 클러스터용 마커 (투명 이미지 + 크기를 0으로 설정)
    const nonSmokeZoneimageSrc = clustererMarkerImg;
    const nonSmokeZoneimageSize = new kakao.maps.Size(0, 0);
    const nonSmokeZoneimageOption = { offset: new kakao.maps.Point(0, 0) };

    const nonSmokeZoneMarkerImage = new kakao.maps.MarkerImage(
      nonSmokeZoneimageSrc,
      nonSmokeZoneimageSize,
      nonSmokeZoneimageOption
    );

    const newMarkers = publicNoSmokingZone.data.map((markerData) => {
      return new kakao.maps.Marker({
        position: new kakao.maps.LatLng(
          markerData.latitude,
          markerData.longitude
        ),
        image: nonSmokeZoneMarkerImage,
      });
    });

    clusterer.addMarkers(newMarkers);

    // 현재 위치 가져오기 position에 경도 위도 있음
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLatLng = new kakao.maps.LatLng(latitude, longitude);

        // 지도이 중심좌표 설정(처음에 보이는 지도의 중심이 이게 되겠지) 그래서 위의 처음 맵 생성을 할 때 옵션에 제주도 좌표가 있으니
        // 제주도 좌표를 보였다가 이동할듯?
        map.setCenter(userLatLng);

        // 유저의 현 위치를 표현할 이미지
        const imageSrc = UserImg;
        const imageSize = new kakao.maps.Size(24, 30);
        const imageOption = { offset: new kakao.maps.Point(12, 15) };

        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // markerRef.current는 현재 가르키는 markerRef가 가르키는 DOM요소(div같은거) 통해 새 마커를 생성
        // markerRef.current는 카카오 지도 API의 Marker 객체를 참조 (markerRef.current === 생성된 마커)
        // 이 객체는 지도 위에 표시될 마커를 나타냄
        markerRef.current = new kakao.maps.Marker({
          position: userLatLng,
          image: markerImage,
          map,
        });

        // 실시간 추적 이동이 감지되면 그 이동된 좌표로 markerRef를 움직인다
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newLatLng = new kakao.maps.LatLng(latitude, longitude);

            // 만약 이미 마커가 존재할 경우 마커의 위치를 옮긴다
            if (markerRef.current) {
              markerRef.current.setPosition(newLatLng);
            }

            map.setCenter(newLatLng);

            checkUserInNoSmokingZone(newLatLng);
          },
          (error) => {
            console.error("위치 정보를 가져오는 데 실패했습니다.", error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000,
          }
        );

        let isModalVisibleSY = false; // 모달 창이 보이는지 여부를 추적하는 플래그 변수
        let hasShownModalSY = false; // 금연 구역을 벗어나기 전까지 모달을 다시 보여주지 않도록 하는 플래그 변수

        let isModalVisibleSN = false; // 모달 창이 보이는지 여부를 추적하는 플래그 변수
        let hasShownModalSN = false; // 금연 구역을 벗어나기 전까지 모달을 다시 보여주지 않도록 하는 플래그 변수

        const checkUserInNoSmokingZone = (userLatLng) => {
          const userType = localStorage.getItem("userType");
          // 유저가 선택한 알림 거리
          const userDistance = localStorage.getItem("distance");

          if (userType === "SY") {
            publicSmokingZone.data.forEach((zone) => {
              const zoneLatLng = new kakao.maps.LatLng(
                zone.latitude,
                zone.longitude
              );

              const distance = getDistance(
                userLatLng.La,
                userLatLng.Ma,
                zoneLatLng.La,
                zoneLatLng.Ma
              );

              if (distance <= 50) {
                // 금연구역 지정 거리 안에 있을때

                if (!isModalVisibleSY) {
                  // 모달이 보이지 않는 경우에만 모달을 띄움
                  setShowNoSmokingModalSY(true);
                  isModalVisibleSY = true;

                  // 2초 뒤에 모달 창을 숨기고 플래그를 초기화
                  setTimeout(() => {
                    setShowNoSmokingModalSY(false);
                    isModalVisibleSY = false;
                  }, 5000);
                }
              } else {
                console.log("금연구역에 위치하지 않는다");
                // 금연구역을 벗어났을 때 플래그를 초기화
                isModalVisibleSY = false;
              }
            });
          } else {
            reportSmokingZone.data.forEach((zone) => {
              const zoneLatLng = new kakao.maps.LatLng(
                zone.latitude,
                zone.longitude
              );

              const distance = getDistance(
                userLatLng.La,
                userLatLng.Ma,
                zoneLatLng.La,
                zoneLatLng.Ma
              );

              if (distance <= userDistance) {
                // 금연구역 지정 거리 안에 있을때

                if (!isModalVisibleSN) {
                  // 모달이 보이지 않는 경우에만 모달을 띄움
                  setShowNoSmokingModalSN(true);
                  isModalVisibleSN = true;

                  // 2초 뒤에 모달 창을 숨기고 플래그를 초기화
                  setTimeout(() => {
                    setShowNoSmokingModalSN(false);
                    isModalVisibleSN = false;
                  }, 5000);
                }
              } else {
                console.log("간접 흡연구역에 위치하지 않는다");
                // 금연구역을 벗어났을 때 플래그를 초기화
                isModalVisibleSN = false;
              }
            });
          }
        };
      },
      (error) => {
        console.error("현재 위치를 가져오는 데 실패했습니다.", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );
  };

  const moveToCurrentLocation = () => {
    if (!mapInstance || !markerRef.current) return;

    const userLatLng = markerRef.current.getPosition();
    mapInstance.setCenter(userLatLng);
  };

  const startReporting = () => {
    const map = mapInstance;
    // const smokeImageSrc = userType === "smoker" ? smokeImg : smokeImg2;
    const smokeImageSize = new kakao.maps.Size(24, 36);
    const smokeImageOption = { offset: new kakao.maps.Point(12, 18) };

    const smokeMarkerImage = new kakao.maps.MarkerImage(
      reportIcon,
      smokeImageSize,
      smokeImageOption
    );

    const reportingMarker = new kakao.maps.Marker({
      position: map.getCenter(),
      image: smokeMarkerImage,
      map,
    });

    reportingMarkerRef.current = reportingMarker;
    setNewMarker(reportingMarker.getPosition());
    getAddressFromCoords(reportingMarker.getPosition());

    kakao.maps.event.addListener(map, "dragend", function () {
      const latlng = map.getCenter();
      console.log(latlng);
      reportingMarker.setPosition(latlng);
      getAddressFromCoords(latlng);
      setNewMarker(latlng);
    });

    setIsModalOpen(true);
  };

  // 좌표를 주소로 변환
  const getAddressFromCoords = (latlng) => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(
      latlng.getLng(),
      latlng.getLat(),
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const detailAddr = result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;
          setAddress(detailAddr);
        }
      }
    );
  };

  let clickedMarker = null; // 클릭된 마커를 저장하는 변수
  let firstClickedMarkerType = null; // 클릭된 마커를 저장하는 변수
  let nextClickedMarkerType = null; // 클릭된 마커를 저장하는 변수

  function createMarker(
    map,
    position,
    title,
    img,
    address,
    userType,
    cleanlinessRating = 0,
    hasAshtray = false, // 전달된 인수가 없을 떄 기본값
    isindoor = true, // 전달된 인수가 없을 떄 기본값
    reportType = "smokerReport", // Default to smokerReport
    likesCount = 0,
    placeId,
    isClikced = false,
    isDirect
  ) {
    const smokeImageSize = new kakao.maps.Size(16, 16);
    const smokeImageOption = { offset: new kakao.maps.Point(8, 8) };

    const smokeImageSrc = userType === "SY" ? smokeImg : smokeImg2;

    const smokeMarkerImage = new kakao.maps.MarkerImage(
      smokeImageSrc,
      smokeImageSize,
      smokeImageOption
    );

    const smokeReportMarkerImage = new kakao.maps.MarkerImage(
      smokeImg,
      smokeImageSize,
      smokeImageOption
    );

    const nonSmokeReportMarkerImage = new kakao.maps.MarkerImage(
      smokeImg2,
      smokeImageSize,
      smokeImageOption
    );

    const publicSmokingZoneMarkerImageSize = new kakao.maps.Size(16, 24);
    const publicSmokingZoneMarkerImageOption = {
      offset: new kakao.maps.Point(8, 12),
    };

    const publicSmokingZoneMarkerImage = new kakao.maps.MarkerImage(
      publicSmokingZone,
      publicSmokingZoneMarkerImageSize,
      publicSmokingZoneMarkerImageOption
    );

    let marker;
    if (reportType === "public") {
      marker = new kakao.maps.Marker({
        position,
        map,
        image: publicSmokingZoneMarkerImage,
      });
    } else {
      marker = new kakao.maps.Marker({
        position,
        map,
        image: smokeMarkerImage,
      });
    }

    // 이 자체는 마커를 만들 때 적용시키므로
    // 마커 클릭 이벤트 설정
    kakao.maps.event.addListener(marker, "click", async function () {
      // 제보 화면이 있을때 마커를 클릭하면 제보화면 모달창 없애기
      handleCloseModal();

      // 이전에 클릭된 마커가 있으면 원래 이미지로 변경
      // 없으면 그냥 이미지는 null로 바꾸고 clicked에 저장

      if (isDirect === "indirect") {
        const checkedClickedIndirectSmokingZone = await axios.get(
          `https://bbuhackathon.p-e.kr/place/shsmoking/${placeId}/`
        );

        console.log(checkedClickedIndirectSmokingZone.data);

        const tempLikeCount = checkedClickedIndirectSmokingZone.data.likesCount;
        const tempIslike = checkedClickedIndirectSmokingZone.data.isLike;

        setLikeCount(tempLikeCount);
        setIsClikced(tempIslike);
        console.log("tempLikeCount", tempLikeCount);
        console.log("tempIslike", tempIslike);
      } else if (isDirect === "direct") {
      }

      if (clickedMarker) {
        if (nextClickedMarkerType === null) {
          if (firstClickedMarkerType === "smokerReport") {
            clickedMarker.setImage(smokeReportMarkerImage);
          } else if (firstClickedMarkerType === "nonSmokerReport") {
            clickedMarker.setImage(nonSmokeReportMarkerImage);
          } else {
            clickedMarker.setImage(publicSmokingZoneMarkerImage);
          }
          marker.setImage(null);
          nextClickedMarkerType = reportType;
        } else {
          if (nextClickedMarkerType === "smokerReport") {
            clickedMarker.setImage(smokeReportMarkerImage);
          } else if (firstClickedMarkerType === "nonSmokerReport") {
            clickedMarker.setImage(nonSmokeReportMarkerImage);
          } else {
            clickedMarker.setImage(publicSmokingZoneMarkerImage);
          }
          marker.setImage(null);
          nextClickedMarkerType = reportType;
        }
      } else {
        firstClickedMarkerType = reportType;
        marker.setImage(null);
      }

      // 클릭된 마커를 갱신
      clickedMarker = marker;

      setSelectedPublicMarkerInfo(null);

      // setLikeCount(likesCount);

      // 선택된 마커 정보 설정
      setSelectedMarkerInfo(null);
      setSelectedMarkerInfo({
        title,
        img,
        address,
        userType,
        cleanlinessRating,
        hasAshtray,
        isindoor,
        reportType,
        likeCount,
        placeId,
        isClikced,
      });
    });

    return marker;
  }

  let clickedPublicMarker = null; // 클릭된 마커를 저장하는 변수

  function createPublickSmokingZoneMarker(
    map, // 존재
    position, // 존재근데 위도,경도 합쳐서 보냄
    title, // 존재 (name)
    img, // 존재 ?
    address, // 존재 (address)
    userType, // 필요없음
    cleanlinessRating = 0,
    hasAshtray = false, // 전달된 인수가 없을 떄 기본값
    isindoor = false, // 전달된 인수가 없을 떄 기본값
    reportType = "public" // Default to smokerReport
  ) {
    const publicSmokingZoneMarkerImageSize = new kakao.maps.Size(16, 24);
    const publicSmokingZoneMarkerImageOption = {
      offset: new kakao.maps.Point(8, 12),
    };

    const publicSmokingZoneMarkerImage = new kakao.maps.MarkerImage(
      publicSmokingZone,
      publicSmokingZoneMarkerImageSize,
      publicSmokingZoneMarkerImageOption
    );

    const selectedPublicSmokingZoneMarkerImage = new kakao.maps.MarkerImage(
      selectedPublicSmokingZone,
      publicSmokingZoneMarkerImageSize,
      publicSmokingZoneMarkerImageOption
    );

    const marker = new kakao.maps.Marker({
      position,
      map,
      image: publicSmokingZoneMarkerImage,
    });

    // 이 자체는 마커를 만들 때 적용시키므로
    // 마커 클릭 이벤트 설정
    kakao.maps.event.addListener(marker, "click", function () {
      console.log(clickedPublicMarker);
      if (clickedPublicMarker) {
        marker.setImage(selectedPublicSmokingZoneMarkerImage);
        clickedPublicMarker.setImage(publicSmokingZoneMarkerImage);
      } else {
        marker.setImage(selectedPublicSmokingZoneMarkerImage);
      }

      // marker.setImage(selectedPublicSmokingZoneMarkerImage);

      // 클릭된 마커를 갱신
      clickedPublicMarker = marker;

      setSelectedMarkerInfo(null);
      setSelectedPublicMarkerInfo({
        title,
        img,
        address,
        userType,
        cleanlinessRating,
        hasAshtray,
        isindoor,
        reportType,
      });
    });

    return marker;
  }

  // 제보 제출
  const handleSubmit = async () => {
    if (newMarker && title && address) {
      const newMarkerData = {
        position: {
          Ma: newMarker.getLat(),
          La: newMarker.getLng(),
        },
        title,
        img: reportImg,
        address,
        userType,
        reportType: userType === "SY" ? "smokerReport" : "nonSmokerReport",
        ...(userType === "SY" && {
          cleanlinessRating, // 청결도 평가 추가
          hasAshtray,
          indoorOutdoor,
        }),
      };

      const reportUserType = userType === "SY" ? "SM" : "SH";
      const userId = localStorage.getItem("userId");

      // UserType마다 post로 보낼 데이터 Body가 다름
      let reportPlaceId;

      if (reportUserType === "SM") {
        console.log(reportUserType);
        const responseSM = await smokerReportAPI(
          access_Token,
          reportUserType,
          userId,
          newMarker.getLat(),
          newMarker.getLng(),
          address,
          indoorOutdoor,
          hasAshtray,
          cleanlinessRating,
          title
        );
        console.log(responseSM);
        reportPlaceId = responseSM.placeId;
      } else {
        console.log(reportUserType);
        const responseSH = await nonSmokerReportAPI(
          access_Token,
          reportUserType,
          userId,
          newMarker.getLat(),
          newMarker.getLng(),
          address,
          title
        );
        console.log(responseSH);
        reportPlaceId = responseSH.placeId;
      }

      console.log(reportPlaceId);

      createMarker(
        mapInstance,
        new kakao.maps.LatLng(newMarker.getLat(), newMarker.getLng()),
        title,
        userType === "SY" ? smokerReportImg : nonSmokerReportImg,
        address,
        userType,
        cleanlinessRating,
        hasAshtray,
        indoorOutdoor,
        newMarkerData.reportType,
        0,
        reportPlaceId,
        false
      );

      handleCloseModal();

      // 감사 모달 창 설정
      setShowThankYouModal(true); // 감사 모달 상태 변경

      setTimeout(() => {
        setShowThankYouModal(false); // 3초 후 감사 모달 숨기기
      }, 3000);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setNewMarker(null);
    setAddress("");
    setIsReporting(false);
    setHasAshtray(false);
    setCleanlinessRating(0);
    setLikeCount(likeCount);
    if (reportingMarkerRef.current) {
      reportingMarkerRef.current.setMap(null); // 마커를 지도에서 제거
      reportingMarkerRef.current = null; // 레퍼런스를 초기화
    }
    navigate("/home/map");
  };

  const handleLikeBtn = async (
    img,
    hasAshtray,
    isindoor,
    reportType,
    placeId
  ) => {
    // console.log(selectedMarkerInfo.placeId);
    // console.log(selectedMarkerInfo.isClikced);
    // console.log(selectedMarkerInfo.likeCount);
    const userId = localStorage.getItem("userId");
    const access_Token = localStorage.getItem("access_token");

    const clickLikeBtn = await axios.post(
      `https://bbuhackathon.p-e.kr/place/shsmoking/${selectedMarkerInfo.placeId}/likes/`,
      {
        userId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${access_Token}`,
        },
      }
    );

    const getNewData = await axios.get(
      `https://bbuhackathon.p-e.kr/place/shsmoking/${selectedMarkerInfo.placeId}/`
    );

    console.log(getNewData);

    console.log("클릭한 버튼 정보 clickLikeBtn", clickLikeBtn);
    console.log("클릭한 버튼 정보 clickLikeBtn.data", clickLikeBtn.data);
    console.log(
      "클릭한 버튼 정보의 clickLikeBtn.data.likesCount",
      clickLikeBtn.data.likesCount
    );

    const newLikeCount = clickLikeBtn.data.likesCount;

    console.log("newLikeCount", newLikeCount);

    console.log("반영 전 likeCount", likeCount);
    console.log("반영 전 selectedMarkerInfo", selectedMarkerInfo);
    console.log(
      "반영 전 selectedMarkerInfo.likeCount",
      selectedMarkerInfo.likeCount
    );

    setLikeCount(newLikeCount);
    console.log("반영 후 likeCount", likeCount);
    if (clickLikeBtn.status === 201) {
      // useState로 newLikeCount와 IsClicked 업데이트
      setIsClikced(true);
      setSelectedMarkerInfo({
        title,
        img,
        address,
        userType,
        cleanlinessRating,
        hasAshtray,
        isindoor,
        reportType,
        likeCount,
        placeId,
        isClikced,
      });
    } else {
      setIsClikced(false);
      setSelectedMarkerInfo({
        title,
        img,
        address,
        userType,
        cleanlinessRating,
        hasAshtray,
        isindoor,
        reportType,
        likeCount,
        placeId,
        isClikced,
      });
    }

    // selectedMarkerInfo 에 반영 됬는지 확인
    console.log("반영 후 selectedMarkerInfo", selectedMarkerInfo);
    console.log(
      "반영 후 selectedMarkerInfo.likeCount",
      selectedMarkerInfo.likeCount
    );

    // window.location.reload();
  };

  // selectedMarkerInfo 이게 null이 아닐때 이 InfoPanel이 보이는 것임
  return (
    <Container>
      <MapDiv ref={mapRef}></MapDiv>
      {selectedPublicMarkerInfo && (
        <InfoPanel
          infoboxcolor={mode.infoBoxColor}
          infofontbordercolor={mode.infoFontBorderColor}
          infobordercolor={mode.infoBorderColor}
        >
          <InfoBox>
            <Box>
              <SmokerPublicReportBox>
                <SmokerPublicReportBoxDiv>
                  <h4>지정 흡연 제보구역</h4>
                  <h3>주소</h3>
                  <h5>{selectedPublicMarkerInfo.address}</h5>
                  <PlusInfo>
                    <InfosmokerBox
                      infofontbordercolor={mode.infoFontBorderColor}
                    >
                      {selectedPublicMarkerInfo.indoorOutdoor}
                    </InfosmokerBox>
                  </PlusInfo>
                </SmokerPublicReportBoxDiv>
              </SmokerPublicReportBox>
            </Box>
          </InfoBox>

          <ImgBox>
            {<img src={selectedPublicMarkerInfo.img} alt="Uploaded content" />}
          </ImgBox>
        </InfoPanel>
      )}
      {selectedMarkerInfo && (
        <InfoPanel
          infoboxcolor={mode.infoBoxColor}
          infofontbordercolor={mode.infoFontBorderColor}
          infobordercolor={mode.infoBorderColor}
        >
          <InfoBox>
            <Box>
              {/* 여기서 보이는 박스가 다름 흡연자 리포트 or 비흡연자 리포트*/}
              {selectedMarkerInfo.reportType === "smokerReport" ? (
                <SmokerReportBox>
                  <SmokerReportBoxDiv>
                    {" "}
                    <h4>
                      {selectedMarkerInfo.reportType === "smokerReport"
                        ? "제보 흡연 제보구역"
                        : "상습 흡연 제보구역"}
                    </h4>
                    <h3>주소</h3>
                    <h5>{selectedMarkerInfo.address}</h5>
                    <h4>{selectedMarkerInfo.title}</h4>
                    {selectedMarkerInfo.userType === "SY" && (
                      <>
                        <CleanBox
                          infocleanback={mode.infoCleanback}
                          fontcolor={mode.infoCleanback}
                        >
                          <h5>청결도&nbsp;&nbsp;</h5>
                          <StarContainer>
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                src={
                                  index < selectedMarkerInfo.cleanlinessRating
                                    ? selectClean
                                    : nonSelectClean
                                }
                                alt={`Cleanliness star ${index + 1}`}
                              />
                            ))}
                          </StarContainer>
                        </CleanBox>
                        <PlusInfo>
                          <InfosmokerBox
                            infofontbordercolor={mode.infoFontBorderColor}
                          >
                            재떨이{" "}
                            {selectedMarkerInfo.hasAshtray ? "있음" : "없음"}
                          </InfosmokerBox>
                          <InfosmokerBox
                            infofontbordercolor={mode.infoFontBorderColor}
                          >
                            {selectedMarkerInfo.isindoor ? "실내" : "실외"}
                          </InfosmokerBox>
                        </PlusInfo>
                      </>
                    )}
                  </SmokerReportBoxDiv>
                </SmokerReportBox>
              ) : (
                <NonSmokerReportContainer>
                  <h4>상습 흡연 제보구역</h4>
                  <NonSmokerReportBox>
                    <h3>
                      현재 위치는 상습 흡연으로<br></br> 제보된 구역입니다.
                    </h3>
                    <div>근처 흡연구역을 이용해주세요</div>
                    {selectedMarkerInfo.isClikced ? (
                      <LikeButtonIsClicked
                        onClick={() =>
                          handleLikeBtn(
                            selectedMarkerInfo.img,
                            selectedMarkerInfo.hasAshtray,
                            selectedMarkerInfo.isindoor,
                            selectedMarkerInfo.reportType,
                            selectedMarkerInfo.placeId
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faThumbsUp} size="2x" />
                        &nbsp; 공감 &nbsp; {likeCount}개
                      </LikeButtonIsClicked>
                    ) : (
                      <LikeButton
                        onClick={() =>
                          handleLikeBtn(
                            selectedMarkerInfo.img,
                            selectedMarkerInfo.hasAshtray,
                            selectedMarkerInfo.isindoor,
                            selectedMarkerInfo.reportType,
                            selectedMarkerInfo.placeId
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faThumbsUp} size="2x" />
                        &nbsp; 공감 &nbsp; {likeCount}개
                      </LikeButton>
                    )}
                  </NonSmokerReportBox>
                </NonSmokerReportContainer>
              )}
            </Box>
          </InfoBox>{" "}
          {selectedMarkerInfo.reportType === "smokerReport" && (
            <ImgBox>
              {<img src={selectedMarkerInfo.img} alt="Uploaded content" />}
            </ImgBox>
          )}
        </InfoPanel>
      )}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent
            modalboxcolor={mode.reportBackground}
            fontcolor={mode.reportfont}
            bordercolor={mode.reportBorderColor}
          >
            <h4>제보하기</h4>
            <Form>
              <h4>{address}</h4>
              {/* <Label>
                이미지 업로드:
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Label>
              {img && <ImagePreview src={img} alt="Preview" />} */}
              {userType === "SY" && (
                <>
                  <Label>
                    <RatingContainer>
                      <StarBox>
                        {" "}
                        *청결도&nbsp;
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <RatingStar
                            key={rating}
                            onClick={() => handleRatingChange(rating)}
                            isActive={cleanlinessRating >= rating}
                          >
                            ●
                          </RatingStar>
                        ))}
                      </StarBox>
                    </RatingContainer>
                  </Label>
                  <ModalBtnBox>
                    <Label>
                      *재떨이
                      <Button
                        active={hasAshtray === true}
                        onClick={() => setHasAshtray(true)}
                      >
                        유
                      </Button>
                      <Button
                        active={hasAshtray === false}
                        onClick={() => setHasAshtray(false)}
                      >
                        무
                      </Button>
                    </Label>
                    <Label>
                      *실내외
                      <Button
                        active={indoorOutdoor === true}
                        onClick={() => setIndoorOutdoor(true)}
                      >
                        실내
                      </Button>
                      <Button
                        active={indoorOutdoor === false}
                        onClick={() => setIndoorOutdoor(false)}
                      >
                        실외
                      </Button>
                    </Label>
                  </ModalBtnBox>
                </>
              )}

              <TextConatiner>
                <Input
                  type="text"
                  value={title}
                  placeholder="상세 위치(최대 20자)"
                  placeholdercolor={mode.placeholder}
                  textboxcolor={mode.reportTextBox}
                  textboxplaceholder={mode.reportTextBoxPlaceholder}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={20}
                  row={4}
                />
              </TextConatiner>
              <ButtonBox>
                <Button2 onClick={handleSubmit}>제출</Button2>
                <Button2 onClick={handleCloseModal}>취소</Button2>
              </ButtonBox>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
      <ThankYouModal isvisible={showThankYouModal}>
        <IconBox>
          <FontAwesomeIcon icon={faThumbsUp} size="3x" />
        </IconBox>
        {userType === "SY" && (
          <>
            <h3>흡연구역 제보 완료</h3>
            <div>
              비흡연자들의 간접흡연 위험을 줄이기 위해
              <br />
              지정된 흡연구역에서 흡연해주세요:&#41;
            </div>
          </>
        )}
        {userType === "SN" && (
          <>
            <h3>상습 흡연구역 제보 완료</h3>
            <div>간접흡연 방지를 위해 힘써주셔서 감사합니다!</div>
          </>
        )}
      </ThankYouModal>
      {showNoSmokingModalSY && (
        <NonSmokingZoneModalSY>
          <div>
            <NonSmokingZoneImgBoxSY>
              <img
                src={noSmokingZone}
                alt="asdf
              "
              ></img>{" "}
              <h2>금연구역</h2>
            </NonSmokingZoneImgBoxSY>{" "}
            <p>
              현재 금연구역에 머물고 있습니다. <br></br>
              <strong>담배생각</strong>이 나신다면 가까운{" "}
              <strong>흡연구역</strong>을 이용해주세요.
            </p>
          </div>
        </NonSmokingZoneModalSY>
      )}
      {showNoSmokingModalSN && (
        <NonSmokingZoneModalSN>
          <div>
            <NonSmokingZoneImgBoxSN>
              <img
                src={indirectSmokingZone}
                alt="asdf
              "
              ></img>
              <h2>간접흡연 위험 지역</h2>
            </NonSmokingZoneImgBoxSN>
            <p>
              현재 <strong>간접흡연 위험 지역</strong>에 들어와 있습니다.{" "}
              <br></br>
              간접흡연은 다양한 건강문제를 일으킬 수 있으니<br></br>
              <strong>주의</strong>해주시기 바랍니다.
            </p>
          </div>
        </NonSmokingZoneModalSN>
      )}
    </Container>
  );
};

export default Map;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const MapDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const InfoPanel = styled.div`
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  width: 80%;
  opacity: 95%;
  background-color: ${(props) => props.infoboxcolor};
  color: ${(props) => props.infofontbordercolor};
  border: 2px solid ${(props) => props.infobordercolor};
  border-radius: 0.6rem;
  text-align: start;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 5%;

  display: flex;
  justify-content: center;
  align-items: center;

  h4 {
    margin-top: 0;
  }
`;

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Box = styled.div`
  text-align: start;
  flex: 1;

  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
`;

const PlusInfo = styled.div`
  display: flex;
  align-items: center;
`;

const InfosmokerBox = styled.div`
  border: 2px solid ${(props) => props.infofontbordercolor};
  color: ${(props) => props.infofontbordercolor};
  border-radius: 0.2rem;
  padding: 0.2rem 0.3rem;
  margin-right: 0.5rem;
  font-weight: bold;
`;

const SmokerPublicReportBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    text-align: start;
    margin-bottom: 1rem;
  }
  h5 {
    margin-bottom: 1rem;
  }
`;

const SmokerPublicReportBoxDiv = styled.div`
  width: 100%;
`;

const SmokerReportBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    text-align: start;
    margin-bottom: 1rem;
  }
`;

const SmokerReportBoxDiv = styled.div`
  width: 100%;
`;

const NonSmokerReportContainer = styled.div`
  color: black;
  text-align: center;
  h4 {
    text-align: start;
    margin-bottom: 1rem;
  }
`;

const NonSmokerReportBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    color: gray;
    margin-top: 1rem;
  }
`;

const CloseButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  margin-bottom: 0.8rem;

  h4 {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  // color: ${(props) => props.infofontbordercolor};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const ImgBox = styled.div`
  width: 40%;
  img {
    width: 90%;
    height: auto;
  }
`;

const LikeButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: green;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LikeButtonIsClicked = styled.button`
  width: 100%;
  padding: 1rem;
  background: black;
  color: yellow;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled.div`
  position: absolute;
  bottom: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  h4,
  h3,
  h5,
  h6 {
    margin: 0;
  }
  h4 {
    margin-bottom: 0.2rem;
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.modalboxcolor};
  border: 3px solid ${(props) => props.bordercolor};
  color: ${(props) => props.fontcolor};

  @media (max-width: 600px) {
    width: 70%;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  // margin-bottom: 1rem;
  font-weight: bold;
`;
const TextConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 95%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${(props) => props.textboxcolor};

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.textboxplaceholder};
  }
`;

const ModalBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.4rem 0;
`;

const ThankYouModal = styled.div`
  position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // 투명으로 전환 박스쉐도우 일단 주석처리
  background: transparent;
  padding: 2rem;

  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
  border-radius: 0.5rem;
  text-align: center;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  opacity: ${({ isvisible }) => (isvisible ? "1" : "0")};
  visibility: ${({ isvisible }) => (isvisible ? "visible" : "hidden")};
  display: block;
`;

const IconBox = styled.div`
  display: flex;
  width: 20%;
  margin: 0 auto;
  justify-content: center;
  background-color: #f7f152;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  border: 2px solid black;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: ${(props) => (props.active ? "black" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#000000")};
  border: 2px solid black;
  padding: 0.1rem 0.5em;
  margin: 0rem 0.3rem;
  border-radius: 4px;
  cursor: pointer;
`;

const Button2 = styled.button`
  background-color: black;
  color: white;
  border: 2px solid black;
  padding: 0.1rem 0.5em;
  margin: 0rem 0.3rem;
  border-radius: 4px;
  cursor: pointer;
`;

// 청결도 관련
const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const RatingStar = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? "#fffa85" : "white")};
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarBox = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  border-radius: 0.3rem;
  padding: 0 0.5rem;
  color: white;
`;

const Star = styled.img`
  width: 0.9rem; // 아이콘 크기 조정
  height: 0.9rem;
  margin-right: 0.2rem;
`;

const CleanBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
  background-color: white;
  border-radius: 0.3rem;
  margin: 0.3rem 0;
  background-color: ${(props) => props.infocleanback};
  color: black;
  @media (max-width: 600px) {
    width: 70%;
  }
`;

const NonSmokingZoneModalSY = styled.div`
  position: absolute;
  width: 80%;
  z-index: 100;
  padding: 2rem;

  opacity: 80%;
  text-align: center;
  background-color: black;
  border-radius: 0.5rem;
  border: 2px solid #fff100;
  h2 {
    color: #fff100;
  }
  p {
    color: gray;
  }
`;

const NonSmokingZoneImgBoxSY = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 2.5rem;
    margin-right: 0.5rem;
  }
`;

const NonSmokingZoneModalSN = styled.div`
  position: absolute;
  width: 80%;
  z-index: 100;
  padding: 2rem;

  opacity: 80%;
  text-align: center;
  background-color: #fff100;
  border-radius: 0.5rem;
  border: 2px solid yellow;
  h2 {
    color: black;
  }
  p {
    color: black;
  }
`;

const NonSmokingZoneImgBoxSN = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 2.5rem;
    margin-right: 0.5rem;
  }
`;
