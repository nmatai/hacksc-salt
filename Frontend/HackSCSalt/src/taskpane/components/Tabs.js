import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import { Button } from '@mui/material';

export default function CustomTabs({summary, correction, refinement}) {
    const [index, setIndex] = React.useState(0);
    const updateIndex = (e, newIndex) => {
        setIndex(newIndex);
    }
    return (
        <div>
            <div>
                <Tabs value={index} 
                onChange={updateIndex}
                variant="fullWidth">
                    <Tab label="Summary"/>
                    <Tab label="Corrections"/>
                    <Tab label="Refinements"/>
                </Tabs>
            </div>
            <TabPanel currIndex={index} index={0}>
                {summary}
            </TabPanel>
            <TabPanel currIndex={index} index={1}>
                {correction}
            </TabPanel>
            <TabPanel currIndex={index} index={2}>
                {refinement}
            </TabPanel>
        </div>
    );
}

