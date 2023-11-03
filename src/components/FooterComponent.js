import React from 'react';
import { Container } from 'react-bootstrap';

const FooterComponent = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <Container className="p-4">
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2023 Finance Tracker
                </div>
            </Container>
        </footer>
    );
};

export default FooterComponent;
