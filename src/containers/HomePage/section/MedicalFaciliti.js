import React, { Component } from 'react';

import { connect } from 'react-redux';

import './MedicalFaciliti.scss';
import Slider from "react-slick";

import { FormattedMessage } from 'react-intl';
class MedicalFaciliti extends Component {

    render() {

        return (
            <div className="medicalFaciliti-facility  section-share">
                <div className="medicalFaciliti-container">
                    <div className="medicalFaciliti-header">
                        <span className="title-section"><FormattedMessage id="facility.OutstandingMedicalFacility" /></span>
                        <button className="btn-section"><FormattedMessage id="facility.SeeMore" /></button>
                    </div>
                    <div className="medicalFaciliti-body">
                        {/*props get from homepage */}
                        <Slider {...this.props}>
                            <div className="medicalFaciliti-customize">
                                <div className="bg-image" />
                                <div><FormattedMessage id="facility.VietDuc" /></div>
                            </div>
                            <div className="medicalFaciliti-customize">
                                <div className="bg-image-2" />
                                <div><FormattedMessage id="facility.DoctorCheck" /></div>
                            </div>
                            <div className="medicalFaciliti-customize">
                                <div className="bg-image-3" />
                                <div><FormattedMessage id="facility.MEDLATEC" /></div>
                            </div>
                            <div className="medicalFaciliti-customize">
                                <div className="bg-image-4" />
                                <div><FormattedMessage id="facility.ChoRay" /></div>
                            </div>
                            <div className="medicalFaciliti-customize">
                                <div className="bg-image-5" />
                                <div><FormattedMessage id="facility.HungViet" /></div>
                            </div>
                            <div className="medicalFaciliti-customize">
                                <div className="bg-image-6" />
                                <div><FormattedMessage id="facility.Diag" /></div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFaciliti);
