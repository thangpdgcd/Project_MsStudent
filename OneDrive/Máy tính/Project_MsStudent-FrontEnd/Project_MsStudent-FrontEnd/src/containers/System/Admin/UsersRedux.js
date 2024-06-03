import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as action from "../../../store/actions";
class UsersRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      gender: "",
      position: "",
      role: ""
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();

  }
  toggle = () => { };
  //chỗ dựa trước đó, trạng thái trước đó,ảnh chụp nhanh
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState
    })
  }
  // componentDidupdate(prevProps, prevState, snapshot) {}

  render() {
    let genders = this.state.genderArr;
    console.log("genders", this.state.genderArr);
    //gender array end

    //languge start
    let language = this.props.language;
    console.log("log language", language);
    //languge end
    let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state
    return (
      <div className="user-redux-container">
        <div className="title">Lear React-Redux whith senior</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manager-user.add" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
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
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.firstname" />
                </label>
                <input
                  type="firstname"
                  className="form-control"
                  placeholder="firstname"
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.lastname" />
                </label>
                <input
                  type="lastname"
                  className="form-control"
                  placeholder="lastname"
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.Phone-number" />
                </label>
                <input
                  type="Phonenumber"
                  className="form-control"
                  placeholder="Phonenumber"
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="1234 Main St"
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.gender" />
                </label>
                <select className="form-control" onChange={(event) => this.onChangeInput(event, "gender")} value={gender} >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index}>
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
                  <FormattedMessage id="manager-user.position" />
                </label>
                <select id="inputPosition" className="form-control">
                  <option>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.role" />
                </label>
                <select id="inputState" className="form-control">
                  <option>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manager-user.image" />
                </label>
                <select id="inputState" className="form-control">
                  <option>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-12 mt-3">
                <button type="submit" className="btn btn-primary">
                  <FormattedMessage id="manager-user.save" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //truy cap den key cua action ban muon thuc thi
    getGenderStart: () => dispatch(action.fetchGenderStart),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => {
    //   dispatch(actions.changeLanguageApp(language));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersRedux);
