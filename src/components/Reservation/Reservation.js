import React, { useEffect, useState } from 'react';

const { kakao } = window;

const Reservation = ({ selectedList }) => {
  const [map, setMap] = useState(null);
  const [infowindows, setInfowindows] = useState({});
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 5,
          };
          var map = new kakao.maps.Map(container, options);
          setMap(map);

          var userMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(latitude, longitude),
            map: map,
          });

          // selectedList를 restaurantData 형식으로 변환
          var restaurantData = selectedList.map((restaurant) => ({
            name: restaurant.restaurant.name,
            main: restaurant.restaurant.main, // restaurant.name와 restaurant.main 추가
            latlng: new kakao.maps.LatLng(
              latitude + Math.random() * 0.01 - 0.005,
              longitude + Math.random() * 0.01 - 0.005
            ),
            address: '식당 주소',
            description: restaurant.restaurant.detail,
          }));

          setRestaurantList(restaurantData);

          restaurantData.forEach((restaurant) => {
            var restaurantMarkerImage = new kakao.maps.MarkerImage(
              '/restaurant-marker.png',
              new kakao.maps.Size(30, 30),
              { offset: new kakao.maps.Point(15, 15) }
            );

            var marker = new kakao.maps.Marker({
              position: restaurant.latlng,
              map: map,
              image: restaurantMarkerImage,
            });

            var infowindow = new kakao.maps.InfoWindow({
              content: `
                <div>
                  <h3 style="color: black;">${restaurant.name}</h3>
                  <p>메인 메뉴: ${restaurant.main}</p> <!-- restaurant.main을 표시 -->
                  <p>설명: ${restaurant.description}</p>
                  <div style="text-align: right;">
                    <button data-latlng="${restaurant.latlng.toString()}">X</button>
                  </div>
                </div>
              `,
            });

            kakao.maps.event.addListener(marker, 'click', function () {
              const latlngString = restaurant.latlng.toString();
              infowindows[latlngString] = infowindow;
              infowindow.open(map, marker);
            });
          });

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

    getCurrentLocation();

  }, [infowindows, selectedList]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div id="map" style={{ width: '1100px', height: '500px', marginTop: '5%' }}></div>
    </div>
  );
};

export default Reservation;
