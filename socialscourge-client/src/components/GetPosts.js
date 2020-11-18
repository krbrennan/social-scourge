import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllPosts } from "../redux/actions/dataActions.js";

async function GetPosts() {
    useEffect(() => {
        this.props.getAllPosts();
    })
}

GetPosts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps, { getAllPosts })(GetPosts);
