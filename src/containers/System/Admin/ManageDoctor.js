import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it/index.js";
import MdEditor from "react-markdown-editor-lite";
import 'react-markdown-editor-lite/lib/index.css';
// import React from 'react';
// import Select from 'react-select';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];



// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
    //create new object

    //log ->get data in function contructor
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOptionL: '',
            description: '',
        };
    }
    componentDidMount = () => {
        this.props.fetchUserRedux();
    };
    //update state
    componentDidUpdate = (prevProps, prevState, snapshot) => {

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
                                options={options}
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
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        DeleteUsersRedux: (id) => dispatch(actions.DeleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
