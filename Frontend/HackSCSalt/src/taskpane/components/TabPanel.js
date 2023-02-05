import * as React from "react";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TabPanel({currIndex, index, children}) {
    return(
        <div role="tab-panel"
        hidden={currIndex != index}
        id={index}
        >
            {index === currIndex && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    currIndex: PropTypes.number.isRequired,
  };