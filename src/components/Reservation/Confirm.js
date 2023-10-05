import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
  const selectedList = JSON.parse(localStorage.getItem('reservations'))
  const navigate = useNavigate();
  const handleClickNavigate = () => {
    navigate('/');
  }
  const handleClickAllDel = () => {
    alert('예약 취소되었습니다.')
    localStorage.clear();
    window.location.reload();
    
  }
  return (
    <div className="problem-layout-01" >
      <div className="problem-rec-layout">
        <div className="problem-rec-left">
          <h3 style={{color:'black'}}>예약 확인</h3>
          <br />
          <span>지금까지</span>
          <br />
          <br />
          <span>예약한 목록을 </span>
          <br />
          <br />
          <span>보여줍니다.</span>
          <br />
          <button className="rec-more-btn" onClick={handleClickNavigate}>
            추가 예약 +
          </button>
          <button className="rec-clear-btn" onClick={handleClickAllDel}>
            예약 취소 -
          </button>
        </div>

        <>
        <div className='problem-rec-right'>
          <div className='prInfo'>
            <div className='info-icon'>
              <HiOutlineInformationCircle size={21}/>
            </div>
            <span>예약한 식당, 날짜, 인원</span>
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
                // console.log(restaurant);
                console.log(pr);
                return (
                  <SwiperSlide className='problem-rec-swiperslide'>
                    {/* onClick={() => window.open(`https://www.acmicpc.net/problem/${problem.number}`, '_blank')} */}
                    {/* <div className='problem-item' onClick={() => showModal(restaurant.rsName)}> */}
                    <div className='problem-item'>
                      <div className='card-top' style={{justifyContent:'center'}}>
                        <div className='problem-item-title'>{pr.rsName}</div>
                        {/* <div className='problem-item-num font-PreR'>예약하기</div> */}
                      </div>

                      <div className='card-bottom font-PreR'>
                        {/* <div className='problem-item-tier'>
                          <img src={`https://static.solved.ac/tier_small/${problem.level}.svg`} alt="bronze5"></img>
                          <span>{problem.tier}</span>
                        </div> */}
                          <div className='problem-item-info1'>
                            <span>날짜:</span>
                            <br/>
                            <span>인원:</span>
                            <br/>
                            <span>시간:</span>
                          </div>
                          <div className='problem-item-info2'>
                            <span>{pr.date}</span>
                            <br/>
                            <span>{pr.number}</span>
                            <br/>
                            <span>{pr.time.hour}시 {pr.time.minute}분</span>
                          </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            }
          </Swiper>
        </div>
        {/* <ReserveModal visible={isModalVisible} onCancel={handleCancel} rsName={rsName} /> */}
        </>
      </div>
      {/* <Reservation selectedList={selectedList}></Reservation> */}
    </div>
  )
}

export default Confirm