import React, { useEffect, useState } from 'react';
import Rec from './Rec';

const { kakao } = window;

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [infowindows, setInfowindows] = useState({}); // 정보 창 관리를 위한 상태 추가
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    // 사용자의 현재 위치를 가져오는 함수
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3,
          };
          var map = new kakao.maps.Map(container, options);
          setMap(map);

          // 사용자의 현재 위치에 기본 마커 표시
          var userMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(latitude, longitude),
            map: map,
          });

          // 주변 식당 정보 데이터 (예제 데이터)
          var restaurantData = [
            {
              name: '식당 1',
              latlng: new kakao.maps.LatLng(latitude + 0.001, longitude + 0.001),
              address: '식당 1 주소',
              description: '식당 1 설명',
            },
            {
              name: '식당 2',
              latlng: new kakao.maps.LatLng(latitude - 0.001, longitude - 0.001),
              address: '식당 2 주소',
              description: '식당 2 설명',
            },
          ];

          setRestaurantList(restaurantData); // 테이블로 표시할 데이터

          // 마커와 정보 창 생성 (식당에만 이미지 마커 적용)
          restaurantData.forEach((restaurant) => {
            var restaurantMarkerImage = new kakao.maps.MarkerImage(
              '/restaurant-marker.png', // 이미지 파일 경로
              new kakao.maps.Size(30, 30), // 마커 이미지의 크기
              { offset: new kakao.maps.Point(15, 15) } // 마커 이미지의 중심을 나타내는 좌표
            );

            var marker = new kakao.maps.Marker({
              position: restaurant.latlng,
              map: map,
              image: restaurantMarkerImage, // 식당 마커에 이미지 적용
            });

            var infowindow = new kakao.maps.InfoWindow({
              content: `
                <div>
                  <h3>${restaurant.name}</h3>
                  <p>주소: ${restaurant.address}</p>
                  <p>설명: ${restaurant.description}</p>
                  <div style="text-align: right;">
                    <button data-latlng="${restaurant.latlng.toString()}">X</button>
                  </div>
                </div>
              `,
            });

            // 마커 클릭 이벤트 처리
            kakao.maps.event.addListener(marker, 'click', function () {
              // 클릭된 마커의 위도, 경도 정보를 데이터 속성으로 가져와서 정보 창을 닫을 때 사용
              const latlngString = restaurant.latlng.toString();
              infowindows[latlngString] = infowindow; // 정보 창을 관리하기 위해 상태 업데이트
              infowindow.open(map, marker);
            });
          });

          // 정보 창 닫기 버튼 클릭 이벤트 처리
          container.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
              const latlngString = e.target.getAttribute('data-latlng');
              const infowindow = infowindows[latlngString];
              if (infowindow) {
                infowindow.close();
              }
            }
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    };

    getCurrentLocation(); // getCurrentLocation 함수 호출

  }, [infowindows]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div id="map" style={{ width: '1100px', height: '500px', marginTop:'5%'}}></div>

      <Rec></Rec>
    </div>
  );
};

export default KakaoMap;
