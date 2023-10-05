import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { HiOutlineInformationCircle } from "react-icons/hi";

import './Rec.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import ReserveModal from './ReserveModal';
import Reservation from './Reservation';

const Rec = () => {
  const location = useLocation();
  const [rsName, setRsName] = useState();
  const {category} = location.state || {};
  const [westernList] = useState([
    {
      restaurant: {
        name: '식당1',
        main: '로제 스파게티',
        detail: '추가설명',
        category: '양식'
      }
    },
    {
      restaurant: {
        name: '식당2',
        main: '스테이크',
        detail: '추가설명',
        category: '양식'
      }
    },
    {
      restaurant: {
        name: '식당3',
        main: '맥앤치즈',
        detail: '추가설명',
        category: '양식'
      }
    },
    {
      restaurant: {
        name: '식당4',
        main: '감바스',
        detail: '추가설명',
        category: '양식'
      }
    },
  ]);
  
  const [chineseList] = useState([
    {
      restaurant: {
        name: '식당1',
        main: '마라탕',
        detail: '추가설명',
        category: '중식'
      }
    },
    {
      restaurant: {
        name: '식당2',
        main: '깐풍새우',
        detail: '추가설명',
        category: '중식'
      }
    },
    {
      restaurant: {
        name: '식당3',
        main: '삼선짜장',
        detail: '추가설명',
        category: '중식'
      }
    },
    {
      restaurant: {
        name: '식당4',
        main: '유산슬',
        detail: '추가설명',
        category: '중식'
      }
    },
  ]);

  const [koreanList] = useState([
    {
      restaurant: {
        name: '식당1',
        main: '통삼겹살',
        detail: '추가설명',
        category: '한식'
      }
    },
    {
      restaurant: {
        name: '식당2',
        main: '무쌈말이',
        detail: '추가설명',
        category: '한식'
      }
    },
    {
      restaurant: {
        name: '식당3',
        main: '소불고기',
        detail: '추가설명',
        category: '한식'
      }
    },
    {
      restaurant: {
        name: '식당4',
        main: '골뱅이무침',
        detail: '추가설명',
        category: '한식'
      }
    },
  ]);

  const [japaneseList] = useState([
    {
      restaurant: {
        name: '식당1',
        main: '라멘',
        detail: '추가설명',
        category: '일식'
      }
    },
    {
      restaurant: {
        name: '식당2',
        main: '스키야키',
        detail: '추가설명',
        category: '일식'
      }
    },
    {
      restaurant: {
        name: '식당3',
        main: '스시',
        detail: '추가설명',
        category: '일식'
      }
    },
    {
      restaurant: {
        name: '식당4',
        main: '덴푸라',
        detail: '추가설명',
        category: '일식'
      }
    },
  ]);

  const [desertList] = useState([
    {
      restaurant: {
        name: '식당1',
        main: '타르트',
        detail: '추가설명',
        category: '디저트'
      }
    },
    {
      restaurant: {
        name: '식당2',
        main: '휘낭시에',
        detail: '추가설명',
        category: '디저트'
      }
    },
    {
      restaurant: {
        name: '식당3',
        main: '다쿠아즈',
        detail: '추가설명',
        category: '디저트'
      }
    },
    {
      restaurant: {
        name: '식당4',
        main: '크렘 브륄레',
        detail: '추가설명',
        category: '디저트'
      }
    },
  ]);

  // 카테고리에 따른 리스트 데이터를 선택
  let selectedList = [];
  switch (category) {
    case '양식':
      selectedList = westernList;
      break;
    case '중식':
      selectedList = chineseList;
      break;
    case '한식':
      selectedList = koreanList;
      break;
    case '일식':
      selectedList = japaneseList;
      break;
    case '디저트':
      selectedList = desertList;
      break;
    default:
      selectedList = [];
      break;
  }

  const [isModalVisible, setIsModalVisible] = useState(false); // Modal의 가시성 상태
  // 예약하기 버튼을 클릭했을 때 Modal을 열기 위한 함수
  const showModal = (restaurantName) => {
    setIsModalVisible(true);
    setRsName(restaurantName);
  };
  // Modal을 닫기 위한 함수
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate('/');
  }

  return (
    <div className="problem-layout-01">
      <div className="problem-rec-layout">
        <div className="problem-rec-left">
          <h3 style={{color:'black'}}>식당 추천</h3>
          <br />
          <span>선택한 카테고리({category})를</span>
          <br />
          <br />
          <span>바탕으로 추천하는 </span>
          <br />
          <br />
          <span>식당입니다.</span>
          <br />
          <button className="rec-more-btn" onClick={handleClickHome}>
            홈으로 ...
          </button>
        </div>

        <>
        <div className='problem-rec-right'>
          <div className='prInfo'>
            <div className='info-icon'>
              <HiOutlineInformationCircle size={21}/>
            </div>
            <span>선택한 카테고리 기준 추천</span>
          </div>
          
          <Swiper
            className='problem-rec-swiper'
            modules={[Navigation]}
            slidesPerView={3}
            spaceBetween={0}
            navigation
          >
            {
              selectedList && selectedList.map(pr => {
                const { restaurant } = pr

                return (
                  <SwiperSlide className='problem-rec-swiperslide'>
                    {/* onClick={() => window.open(`https://www.acmicpc.net/problem/${problem.number}`, '_blank')} */}
                    <div className='problem-item' onClick={() => showModal(restaurant.name)}>
                      <div className='card-top'>
                        <div className='problem-item-title'>{restaurant.name}</div>
                        <div className='problem-item-num font-PreR'>예약하기</div>
                      </div>

                      <div className='card-bottom font-PreR'>
                        {/* <div className='problem-item-tier'>
                          <img src={`https://static.solved.ac/tier_small/${problem.level}.svg`} alt="bronze5"></img>
                          <span>{problem.tier}</span>
                        </div> */}
                          <div className='problem-item-info1'>
                            <span>메인메뉴:</span>
                            <br/>
                            <span>카테고리:</span>
                            <br/>
                            <span>추가설명:</span>
                          </div>
                          <div className='problem-item-info2'>
                            <span>{restaurant.main}</span>
                            <br/>
                            <span>{restaurant.category}</span>
                            <br/>
                            <span>{restaurant.detail}</span>
                          </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            }
          </Swiper>
        </div>
        <ReserveModal visible={isModalVisible} onCancel={handleCancel} rsName={rsName} />
        </>
      </div>
      <Reservation selectedList={selectedList}></Reservation>
    </div>
  )
}

export default Rec