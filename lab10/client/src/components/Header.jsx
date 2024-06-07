import {Button, Col, Container, Row, Alert} from "react-bootstrap/";
import PropTypes from 'prop-types';
import { LogoutButton } from "./Auth";

function Header({isSidebarExpanded, setIsSidebarExpended, logout, message}) {
    return <header className="py-1 py-md-3 border-bottom bg-primary">
    <Container fluid className="gap-3 align-items-center">
        <Row>
            <Col xs={3} className="d-md-none">
                <Button 
                        onClick={() => setIsSidebarExpended(p => !p)}
                        aria-expanded={isSidebarExpanded} 
                        aria-controls="films-filters">
                    <i className="bi bi-list"></i>
                </Button>

            </Col>
            <Col xs={6} md={4}>
                <div className="d-flex align-items-center">
                    <a href="/films/filter/all"
                    className="d-flex align-items-center justify-content-center justify-content-md-start link-light text-decoration-none">
                        <i className="bi bi-collection-play me-2 flex-shrink-0"></i>
                        <span className="h5 mb-0">Film Library</span>
                    </a>
                    {message 
                    && 
                    <p className="mb-0 ms-2 link-light text-decoration-none">{message}</p>}
                </div>
            </Col>
            <Col xs={3} md={8} className="d-flex align-items-center justify-content-end">
                <form className="d-none d-md-block w-100 me-3">
                    <input type="search" className="form-control" placeholder="Search..." aria-label="Search"></input>
                </form>

                {/* <a href="#" className="d-block link-light text-decoration-none">
                    <i className="bi bi-person-circle"></i>
                </a> */}
                <div className="d-flex justify-content-center">
                    <LogoutButton logout={logout}></LogoutButton>
                </div>
            </Col>
        </Row>
    </Container>
</header>;
}

Header.propTypes = {
    isSidebarExpanded: PropTypes.bool,
    setIsSidebarExpanded: PropTypes.func
}

export default Header;