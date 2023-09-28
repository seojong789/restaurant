import React from 'react';
import { Modal } from 'antd';

const ReserveModal = ({ visible, onCancel }) => {
  return (
    <Modal
      title="예약 정보 입력"
      visible={visible}
      onCancel={onCancel}
      footer={null} // footer를 비워서 기본 닫기 버튼을 숨김
    >
      {/* 예약 정보 입력 폼 등의 내용을 추가 */}
      {/* 예약 정보 입력 폼 예시: */}
      <form>
        <label>예약 날짜:</label>
        <input type="date" />

        <label>인원 수:</label>
        <input type="number" />

        <button type="submit">예약하기</button>
      </form>
     
    </Modal>
  );
};

export default ReserveModal;
