import React from 'react';
import { year, monthDayYear } from '@cleverbeagle/dates';
import { Link } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import './Footer.scss';

const copyrightYear = () => {
  const date = monthDayYear()
  return date
};

const Footer = () => (
  <div className="Footer">
    <Grid>
      <p className="pull-left">&copy; {copyrightYear()} Rafael Lage Tavares</p>
      <ul className="pull-right">
        <li><Link to="/terms">Terms<span className="hidden-xs"> of Service</span></Link></li>
        <li><Link to="/privacy">Privacy<span className="hidden-xs"> Policy</span></Link></li>
      </ul>
    </Grid>
  </div>
);

Footer.propTypes = {};

export default Footer;
