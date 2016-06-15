import React from 'react';
import { connect } from 'react-redux'

const DevPanelDiv = ({state}) => (
    <pre>
        {JSON.stringify(state, undefined, 4)}
    </pre>
)

/*DevPanelDiv.propTypes = {
    state: React.PropTypes.object
}*/

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

const DevPanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(DevPanelDiv)
 
export default DevPanel;