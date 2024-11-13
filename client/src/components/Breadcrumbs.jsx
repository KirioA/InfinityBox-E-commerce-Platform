// src/components/Breadcrumbs.jsx
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ paths }) => {
    return (
        <Breadcrumb>
            {paths.map((path, index) => (
                <Breadcrumb.Item key={index} active={index === paths.length - 1}>
                    {index === paths.length - 1 ? (
                        path.name
                    ) : (
                        <Link to={path.path}>{path.name}</Link>
                    )}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
