import { Nav, NavItem, NavLink } from "react-bootstrap/";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Filters(props) {
    const {items, selected, onSelect} = props;

    const filterArray = Object.entries(items);

    return (
    <Nav className="flex-column gap-2 mb-auto">
        {
            filterArray.map(([filterName, {label}]) =>{
                return(
                    <NavItem key={filterName}>
                        <NavLink onClick={onSelect}
                                active={selected == filterName}>
                        <Link style={{textDecoration : 'none', width : '100%', justifyContent : 'start'}} 
                              className={selected == filterName ? 'btn' : 'btn link-dark'}
                              to={`/films/filter/${filterName.split('-')[1]}`}>{label}</Link>
                        </NavLink>
                    </NavItem>
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