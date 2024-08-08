import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./UsersRedux.scss";
import LightBox from "react-image-lightbox";
import TableManageUser from "./TableManageUser";
import CommonUtils from "../../../utils/CommonUtils";
class UsersRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderarr: [],
      positionarr: [],
      rolearr: [],
      previewImgURL: "",
      isOpen: false,
      isLoadingGender: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      image: "",
      avatar: "",
      action: "",
      actions: "",
      id: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  //cap nhat props khi choose options
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderarr: this.props.genderRedux,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionarr: this.props.positionRedux,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        rolearr: this.props.roleRedux,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    //after create new user , the system will restart and update after setstate -> from create new user null
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrPosition = this.props.positionRedux;
      let arrRole = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phonenumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        positionId:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        avatar: "",
        previewImgURL: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  };

  handleOnchangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file)
      console.log("get base 64", base64)
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = async () => {
    //after create new function validate ->send from function handleSaveUser
    let isValid = this.checkValidateInput();
    if (isValid === false) {
      return;
    }

    console.log("check submit ", this.state);
    //fire redux create 

    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
      avatar: this.state.avatar,
    });


    //create new user from TableManagerUser
    //test
    await this.props.fetchUserRedux();
  };
  handleEditUser = async () => {
    //after create new function validate ->send from function handleSaveUser
    let isValid = this.checkValidateInput();
    if (isValid === false) {
      return;
    }
    let { action } = this.props;

    //fire redux edit user
    this.props.editUserRedux({
      id: this.state.userEditId,
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
      avatar: this.state.avatar,
    });

    //create new user from TableManagerUser
    await this.props.fetchUserRedux();
  };

  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState }, () => {
      console.log("check this state on changeinput", this.state);
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrValidateCheck = [
      "email",
      "lastName",
      "firstName",
      "phonenumber",
      "address",
    ];

    for (let i = 0; i < arrValidateCheck.length; i++) {
      if (!this.state[arrValidateCheck[i]]) {
        isValid = false;
        alert("this input is the required" + arrValidateCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = '';
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary')
    }
    console.log("Check handleEditUserFromParet", user);
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phonenumber: user.phoneNumber,
      gender: user.gender,
      roleId: user.roleId,
      positionId: user.positionId,
      avatar: '',
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };
  render() {
    //gender
    let genders = this.state.genderarr;
    //position
    let positions = this.state.positionarr;
    //role
    let roles = this.state.rolearr;
    let language = this.props.language;
    //check valid gender
    let isGetGender = this.props.isLoadingGender;

    //value user
    let {
      email,
      firstName,
      lastName,
      password,
      phonenumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">Lear React-Redux whith senior</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manager-user.add" />
              </div>
              <div className="col-12 my-3">
                {isGetGender == true ? "Loading Gender " : ""}
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    this.onChangeInput(e, "email");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    this.onChangeInput(e, "password");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.firstname" />
                </label>
                <input
                  type="firstName"
                  className="form-control"
                  placeholder="firstname"
                  value={firstName}
                  onChange={(e) => {
                    this.onChangeInput(e, "firstName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.lastname" />
                </label>
                <input
                  type="lastName"
                  className="form-control"
                  placeholder="lastname"
                  value={lastName}
                  onChange={(e) => {
                    this.onChangeInput(e, "lastName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.Phone-number" />
                </label>
                <input
                  type="phonenumber"
                  className="form-control"
                  placeholder="Phonenumber"
                  value={phonenumber}
                  onChange={(e) => {
                    this.onChangeInput(e, "phonenumber");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.address" />
                </label>
                <input
                  type="address"
                  className="form-control"
                  placeholder="1234 Main St"
                  value={address}
                  onChange={(e) => {
                    this.onChangeInput(e, "address");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "gender");
                  }}
                >
                  {/* {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })} */}
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {
                            language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn
                          }
                        </option>
                      )
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.position" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "position");
                  }}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.role" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "role");
                  }}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 mt-4">
                <label>
                  <FormattedMessage id="manager-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(e) => {
                      this.handleOnchangeImage(e);
                    }}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    <FormattedMessage id="manager-user.IMAGE" />
                    <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => {
                    if (this.state.action === CRUD_ACTIONS.EDIT) {
                      this.handleEditUser();
                    } else {
                      this.handleSaveUser();
                    }
                  }}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manager-user.edit" />
                  ) : (
                    <FormattedMessage id="manager-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParentKey={this.handleEditUserFromParent}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <LightBox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,

    //listuser from TableManagerUser
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //truy cap den key cua action ban muon thuc thi
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    //dispatch from to TableManagerUser
    fetchUserRedux: (data) => dispatch(actions.fetchAllUsersStart(data)),
    editUserRedux: (data) => dispatch(actions.EditUser(data)),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => {
    //   dispatch(actions.changeLanguageApp(language));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersRedux);
