import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it/index.js";
import MdEditor from "react-markdown-editor-lite";
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from "../../../utils";


const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
    //create new object

    //log ->get data in function contructor
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            AllDoctor: {}
        };
    }
    componentDidMount = () => {
        this.props.fetchAllDoctorRedux();
    };

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            });

        }
        console.log("check result data", result)
        return result;
    }
    //update state
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux);
            this.setState({
                listDoctors: dataSelect
            })
        }
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
        console.log('handleEditorChange', html, text);
    }

    //check handle to prop
    handleSaveContentMarkdown = () => {
        this.props.fetchSaveDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            doctorId: this.state.selectedOption.value,
            description: this.state.description,
        });
        console.log("Check prop handle ", this.state)
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    };
    handleOnChangeOnDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        console.log("Check all Doctor", this.props.SaveDoctorsRedux)
        return (
            <React.Fragment>
                <div className="manage-doctor-container">
                    <div className="manage-doctor-title">this is the code</div>
                    <div className="more-infor">
                        <div className="content-left form-group">
                            <label>Choose Doctor</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="content-right" >
                            <label>Introduce information</label>
                            <textarea className="form-control" row="4"
                                onChange={(event) => this.handleOnChangeOnDesc(event)}
                                value={this.state.description}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="manage-doctor-editor">
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} />
                    </div>
                    <button className="save-content-doctor" onClick={() => this.handleSaveContentMarkdown()}>Save</button>
                </div>
            </React.Fragment >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
        language: state.app.language,
        allDoctorRedux: state.admin.allDoctors,
        SaveDoctorsRedux: state.admin.SaveDoctors
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorRedux: (id) => dispatch(actions.fetchAllDoctorsStart(id)),
        fetchSaveDoctorRedux: (data) => dispatch(actions.SaveDoctorDetail(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
