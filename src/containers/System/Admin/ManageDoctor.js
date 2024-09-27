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
      addressClinic: "",
      note: "",
    };
  }
  componentDidMount = () => {
    this.props.fetchAllDoctorRedux();
    this.props.getRequiredDoctorInforRedux();
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.lastName} ${item.firstName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }

    console.log("check result data", result);
    return result;
  };
  //update state
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    // all list doctor
    if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctorRedux,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    // các thuộc tính giá, thanh toán,tỉnh thành
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE"); //truyền type vào
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    //thêm 3 thuộc tính  giá, thanh toán, tỉnh thành vào đoạn if này để sử lý nn
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctorRedux,
        "USERS"
      );
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE"); //truyền type vào
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
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

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
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

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
    console.log("check mew select onchange", selectedOption, name);
  };

  handleOnChangeOnText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    console.log("check state", this.state);
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
                options={this.state.listDoctors}
                placeholder={
                  <FormattedMessage id="more-infor.content-left.label-left" />
                }
                name={"selectedOption"}
              />
            </div>
            <div className="content-right form-group">
              <label>
                <FormattedMessage id="more-infor.content-right.label-right" />
              </label>
              <textarea
                className="form-control"
                row="4"
                onChange={(event) =>
                  this.handleOnChangeOnText(event, "description")
                }
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
                value={this.state.selectedPrice}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listPrice}
                placeholder={<FormattedMessage id="more-infor-extra.price" />}
                name="selectedPrice"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="more-infor-extra.payment" />
              </label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listPayment}
                placeholder={<FormattedMessage id="more-infor-extra.payment" />}
                name="selectedPayment"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="more-infor-extra.privince" />
              </label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listProvince}
                placeholder={
                  <FormattedMessage id="more-infor-extra.privince" />
                }
                name="selectedProvince"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="more-infor-extra.clinic" />
              </label>
              <input
                onChange={(event) =>
                  this.handleOnChangeOnText(event, "nameClinic")
                }
                value={this.state.nameClinic}
                placeholder={<FormattedMessage id="more-infor-extra.clinic" />}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="more-infor-extra.addressClinic" />
              </label>
              <input
                onChange={(event) =>
                  this.handleOnChangeOnText(event, "addressClinic")
                }
                value={this.state.addressClinic}
                placeholder={
                  <FormattedMessage id="more-infor-extra.addressClinic" />
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="more-infor-extra.note" />
              </label>
              <input
                onChange={(event) => this.handleOnChangeOnText(event, "note")}
                value={this.state.note}
                placeholder={
                  <FormattedMessage id="more-infor-extra.addressClinic" />
                }
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
