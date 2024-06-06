import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Filters from './components/Filters';
import { FilmLayout } from './components/FilmList';
import { AddEditFilmLayout } from './components/FilmForm';
import { Container, Collapse, Row, Col } from "react-bootstrap/";
import dayjs from 'dayjs';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import PageNotFound from './components/PageNotFound';

function App() {

  const [isSidebarExpanded, setIsSidebarExpended] = useState(false);

  const filters = {
    'filter-all': {label: 'All', id: 'filter-all'},
    'filter-favorite': {label: 'Favorites', id: 'filter-favorite'},
    'filter-best': {label: 'Best Rated', id: 'filter-best'},
    'filter-lastmonth': {label: 'Seen Last Month', id: 'filter-lastmonth'},
    'filter-unseen': {label: 'Unseen', id: 'filter-unseen'}
  };

  const [activeFilter, setActiveFilter] = useState('filter-all');

  const [mode, setMode] = useState('view');

  const handleMode = (mode) => {
    setMode(mode);
  }

  /**
   * AddNewFilm : /films/new
   * EditFilm : /films/filmId/edit
   * FilterAll : /films
   * FilterFavorite : /films/filter/favorite
   * FilterBest : /films/filter/best
   * FilterLastMonth : /films/filter/lastmonth
   * FilterUnseen : /films/filter/unseen
   * 404NotFound : *
   */
  return (
      <Routes>
        <Route element={
                        <div className="min-vh-100 d-flex flex-column">
                          <Header isSidebarExpanded={isSidebarExpanded} setIsSidebarExpended={setIsSidebarExpended}></Header>
                          <Container fluid className="flex-grow-1 d-flex flex-column">
                            <Row className="flex-grow-1">
                              <Collapse id="films-filters" in={isSidebarExpanded} className="col-md-3 bg-light d-md-block">
                                <div className="py-4">
                                  <h5 className="mb-3">Filters</h5>
                                  <Filters items={filters} selected={activeFilter} onSelect={setActiveFilter}></Filters>
                                </div>
                              </Collapse>
                              <Col md={9} className="pt-3">
                                <Outlet/>        
                              </Col>
                            </Row>
                            {/*Button*/}
                            {mode === 'view' && <Link className="btn btn-primary rounded-circle fixed-right-bottom"
                                                      to='/films/new'>
                                                  <i className="bi bi-plus"></i>
                                                </Link>}
                            </Container>
                        </div>
                      }>
              
              <Route path='*' element={<PageNotFound/>}/>
              <Route path='/films/filter/all' 
                     element={<FilmLayout handleMode={handleMode} filter={filters['filter-all']}/>} />
              <Route path='/films/filter/favorite' 
                     element={<FilmLayout handleMode={handleMode} filter={filters['filter-favorite']}/>} />
              <Route path='/films/filter/best' 
                     element={<FilmLayout handleMode={handleMode} filter={filters['filter-best']}/>} />
              <Route path='/films/filter/lastmonth' 
                     element={<FilmLayout handleMode={handleMode} filter={filters['filter-lastmonth']}/>} />
              <Route path='/films/filter/unseen' 
                     element={<FilmLayout handleMode={handleMode} filter={filters['filter-unseen']}/>} />
              <Route path='/films/new' 
                     element={<AddEditFilmLayout handleMode={handleMode} m='add' />}/>
              <Route path='/films/:id/edit' 
                     element={<AddEditFilmLayout handleMode={handleMode} m='edit' />}/>
        </Route>
      </Routes>
);
}

export default App
