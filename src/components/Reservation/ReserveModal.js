import React, { useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const ReserveModal = ({ visible, onCancel, rsName }) => {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState({
    date: '',
    number: 0,
    time: '00:00'
  })

  const handleDateChange = (e) => {
    setReservationData({...reservationData, date:e.target.value});
  }

  const handleNumberChange = (e) => {
    setReservationData({...reservationData, number:parseInt(e.target.value, 10)});
  }

  const handleTimeChange = (e) => {
    setReservationData({
      ...reservationData,
      time: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const [hour, minute] = reservationData.time.split(':');
    const newReservation = {
      rsName: rsName,
      date: reservationData.date,
      number: reservationData.number,
      time: {
        hour: parseInt(hour, 10),
        minute: parseInt(minute, 10)
      }
    };
    const updatedReservations = [...existingReservations, newReservation];
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    navigate('/confirm')
  }
  return (
    <Modal
      title="예약 정보 입력"
      visible={visible}
      onCancel={onCancel}
      footer={null} // footer를 비워서 기본 닫기 버튼을 숨김\
    >
      <form onSubmit={handleSubmit}>
        <label>{rsName}</label>
        <br/>

        <label>예약 날짜:</label>
        <input type="date" onChange={handleDateChange} required/>
        <br/>

        <label>인원 수:</label>
        <input type="number" onChange={handleNumberChange} required/>
        <br/>

        <label>시간:</label>
        <input type="time" onChange={handleTimeChange} required/>
        <br/>

        <button type="submit">예약하기</button>
      </form>
    </Modal>
  );
};

export default ReserveModal;
