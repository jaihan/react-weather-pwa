import React from 'react';
import './styles.css';

const Header = ({ refresh, toggleAddDialog }) => {
  return (
    <section className='header'>
      <span className='title'>Weather PWA</span>
      <button
        id="btn-refresh"
        className="header-btn"
        aria-label="Refresh"
        onClick={refresh}
      />
      <button
        id="btn-add"
        className="header-btn"
        aria-label="Add"
        onClick={toggleAddDialog}
      />
    </section>
  )
};

export default Header;
