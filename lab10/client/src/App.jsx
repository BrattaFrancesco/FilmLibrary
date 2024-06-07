import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Filters from './components/Filters';
import { FilmLayout } from './components/FilmList';
import { AddEditFilmLayout } from './components/FilmForm';
import { Container, Collapse, Row, Col } from "react-bootstrap/";
import API from './API.mjs';
import { Routes, Route, Outlet, Link, Navigate } from 'react-router-dom';

import PageNotFound from './components/PageNotFound';
import { LoginForm } from './components/Auth';

function App() {

  const [isSidebarExpanded, setIsSidebarExpended] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo();
      setMessage("Welcome, " + user.name);
      setLoggedIn(true);
      setUser(user);
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try{
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUser(user);
      setMessage("Welcome, " + user.name);
    }catch(err){
      setMessage({msg: err, type: 'danger'});
    }
  }

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser('');
    setMessage('');
  };

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
                          <Header isSidebarExpanded={isSidebarExpanded} 
                                  setIsSidebarExpended={setIsSidebarExpended}
                                  logout={handleLogout}
                                  message={message}></Header>
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
                     element={loggedIn === true ? <FilmLayout userId={user.id} handleMode={handleMode} filter={filters['filter-all']}/>
                                       : <Navigate replace to='/login' />} />
              <Route path='/films/filter/favorite' 
                     element={loggedIn === true ? <FilmLayout userId={user.id} handleMode={handleMode} filter={filters['filter-favorite']}/> 
                                       : <Navigate replace to='/login' />} />
              <Route path='/films/filter/best' 
                     element={loggedIn === true ? <FilmLayout userId={user.id} handleMode={handleMode} filter={filters['filter-best']}/>
                                       : <Navigate replace to='/login' />} />
              <Route path='/films/filter/lastmonth' 
                     element={loggedIn === true ? <FilmLayout userId={user.id} handleMode={handleMode} filter={filters['filter-lastmonth']}/>
                                       : <Navigate replace to='/login' />} />
              <Route path='/films/filter/unseen' 
                     element={loggedIn === true ? <FilmLayout userId={user.id} handleMode={handleMode} filter={filters['filter-unseen']}/>
                                       : <Navigate replace to='/login' />} />
              <Route path='/films/new' 
                     element={loggedIn === true ? <AddEditFilmLayout handleMode={handleMode} m='add' userId={user.id} />
                                       : <Navigate replace to='/login' />}/>
              <Route path='/films/:id/edit' 
                     element={loggedIn === true ? <AddEditFilmLayout handleMode={handleMode} m='edit' userId={user.id}/>
                                       : <Navigate replace to='/login' />}/>
        </Route>
        <Route path='/login' element={
                loggedIn === true ? <Navigate replace to='/films/filter/all'/> : <LoginForm login={handleLogin} message={message}/>
              }/>
      </Routes>
);
}

export default App
