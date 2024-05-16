import {Button, Col, Container, Row, Nav} from "react-bootstrap/";
import PropTypes from 'prop-types';

function Filters(props) {
    const {items, selected, onSelect} = props;

    const filterArray = Object.entries(items);

    return (
    <Nav className="flex-column gap-2 mb-auto">
        {
            filterArray.map(([filterName, {label}]) =>{
                return(
                    <Nav.Item key={filterName}>
                        <Nav.Link href={"#" + filterName}
                            onClick={() => onSelect(filterName)}
                            className={selected == filterName ? '' : 'link-dark'}
                            active={selected == filterName}
                        >
                            {label}
                        </Nav.Link>
                    </Nav.Item>
                )
            })
        }
    </Nav>
    );
}

Filters.propTypes = {
    items: PropTypes.object,
    selected: PropTypes.string,
    onSelect: PropTypes.func
}

export default Filters;