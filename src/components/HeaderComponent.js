import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const HeaderComponent = () => {
    const [cryptoData, setCryptoData] = useState({});

    // Fetch cryptocurrency data on component mount
    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
                const data = await response.json();
                setCryptoData(data);
            } catch (error) {
                console.error('Error fetching cryptocurrency data:', error);
            }
        };

        fetchCryptoData();
    }, []);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Finance Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {cryptoData.bitcoin && (
                        <Nav.Item>
                            <Nav.Link href="#">Bitcoin: ${cryptoData.bitcoin.usd}</Nav.Link>
                        </Nav.Item>
                    )}
                    {cryptoData.ethereum && (
                        <Nav.Item>
                            <Nav.Link href="#">Ethereum: ${cryptoData.ethereum.usd}</Nav.Link>
                        </Nav.Item>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeaderComponent;
