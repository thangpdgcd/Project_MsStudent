import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it/index.js";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
  //create new object

  //log ->get data in function contructor
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      AllDoctor: {},
      hasOldData: false,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressclinic: "",
      note: "",
    };
  }
  componentDidMount = () => {
    this.props.fetchAllDoctorRedux();
    this.props.getRequiredDoctorInforRedux();
  };

  buildDataInputSelect = (inputData, types) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          types === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueVi;
        let labelEn =
          types === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueEn;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    console.log("check result data", result);
    return result;
  };
  //update state
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctorRedux,
        "USER"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor);
    let { resPayment, resPrice, resProvince } =
      this.props.allRequiredDoctorInfor;
    let dataSelectPayment = this.buildDataInputSelect(resPayment);
    let dataSelectPrice = this.buildDataInputSelect(resPrice);
    let dataSelectProvince = this.buildDataInputSelect(resProvince);
    console.log(
      "check required",
      dataSelectPrice,
      dataSelectPayment,
      dataSelectProvince
    );
    this.setState({
      listPrice: dataSelectPrice,
      listPayment: dataSelectPayment,
      listProvince: dataSelectProvince,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
    console.log("handleEditorChange", html, text);
  };

  //check handle to prop
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.fetchSaveDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      doctorId: this.state.selectedOption.value,
      description: this.state.description,
      actions: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
    console.log("Check prop handle ", this.state);
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };
  handleOnChangeOnDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    // let { listPrice, listPayment, listProvince } = this.props;
    let { hasOldData } = this.state;
    console.log("Check all Doctor", this.props.SaveDoctorsRedux);
    return (
      <React.Fragment>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <FormattedMessage id="manage-doctor.title" />
          </div>
          <div className="more-infor">
            <div className="content-left form-group">
              <label>
                <FormattedMessage id="more-infor.content-left.label-left" />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listPrice}
                placeholder={"Chọn Bác Sĩ"}
              />
            </div>
            <div className="content-right form-group">
              <label>
                <FormattedMessage id="more-infor.content-right.label-right" />
              </label>
              <textarea
                className="form-control"
                row="4"
                onChange={(event) => this.handleOnChangeOnDesc(event)}
                value={this.state.description}
                placeholder={"Thông Tin Bác Sĩ"}
              ></textarea>
            </div>
          </div>

          <div className="more-infor-extra row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="more-infor-extra.price" />
              </label>
              <Select
                onChange={this.handleChangeSelect}
                options={this.state.listPayment}
                placeholder={"Chọn Giá"}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="more-infor-extra.payment" />
              </label>
              <Select
                onChange={this.handleChangeSelect}
                options={this.state.listProvince}
                placeholder={"Phương Thức Thanh Toán"}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="more-infor-extra.privince" />
              </label>
              <Select
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
                placeholder={"Chọn Tỉnh Thành"}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="more-infor-extra.clinic" />
              </label>
              <Select
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
                placeholder={"Tên Phòng Khám"}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="more-infor-extra.addressClinic" />
              </label>
              <Select
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
                placeholder={"Địa Chỉ Phòng Khám"}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="more-infor-extra.note" />
              </label>
              <Select
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
                placeholder={"Ghi Chú"}
              />
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <button
            onClick={() => this.handleSaveContentMarkdown()}
            className={
              hasOldData === true
                ? "create-content-doctor"
                : "save-content-doctor"
            }
          >
            {hasOldData === false ? (
              <span>
                <FormattedMessage id="button.create" />
              </span>
            ) : (
              <span>
                <FormattedMessage id="button.save" />
              </span>
            )}
          </button>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
    language: state.app.language,
    allDoctorRedux: state.admin.allDoctors,
    SaveDoctorsRedux: state.admin.SaveDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: (id) => dispatch(actions.fetchAllDoctorsStart(id)),
    fetchSaveDoctorRedux: (data) => dispatch(actions.SaveDoctorDetail(data)),
    getRequiredDoctorInforRedux: () =>
      dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
