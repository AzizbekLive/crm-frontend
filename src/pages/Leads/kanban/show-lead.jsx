import React, { useState } from 'react';
const ShowLead = ({ lead }) => {
    const [data, setData] = useState(lead);

    return <div>{JSON.stringify(data)}</div>;
};

export default ShowLead;
