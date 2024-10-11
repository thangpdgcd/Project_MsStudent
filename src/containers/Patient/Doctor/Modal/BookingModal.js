import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import { MdHeight } from "react-icons/md";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    render() {
        let { isOpenModalBooking, closeBookingClose, dataTime } = this.props
        //toggle={}
        return (
            //isOpenModalBooking
            <Modal

                isOpen={isOpenModalBooking}
                className={"booking-modal-container"}
                size="lg"
                centered

            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left"></span>
                        <span
                            className="right"
                            onClick={closeBookingClose}
                        >
                            <i className="fas fa-times"></i></span>
                        Thông Báo Lịch Hẹn Khám Bệnh
                    </div>
                    <div className="booking-modal-body">
                        {/* using javascrip JSON */}
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-infor"></div>
                        <div className="prices">
                            exam price 50
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Họ Tên
                                </label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Số Điện Thoại
                                </label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Địa Chỉ Email
                                </label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Địa Chỉ Liên Hệ
                                </label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-12 form-group">
                                <label>Lý Do Khám
                                </label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Đặt Cho Ai
                                </label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Giới Tính
                                </label>
                                <input className="form-control"></input>
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm"> Xác Nhận</button>
                        <button className="btn-booking-cancel"> Hủy </button>
                    </div>
                </div>
            </Modal >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
