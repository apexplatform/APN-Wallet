/**
 *
 * Profile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import makeSelectProfile from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Image from '../../components/uiStyle/Images';

import UserImage from '../../images/author/user-image-big.jpg';
import cookie from 'js-cookie';

import './style.scss';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class Profile extends React.Component {
  render() {
   
    let userProfile = JSON.parse(cookie.get(cookie.get('userEmail')));
    const { classes } = this.props;
    return (
      <Grid>
        <Grid className={classes.root} container spacing={32}>
          <Grid item sm={4} xs={12} className="userProfile">
            <Grid className="userThumb">
              <Image src={UserImage} />
            </Grid>
            <Typography component="h5">{userProfile.FirstName} {userProfile.LastName}</Typography>
            <Typography component="p">{userProfile.email}</Typography>
            <Typography component="p">United States</Typography>
          </Grid>
          <Grid item sm={8} xs={12} className="userInfo">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>

                  <TableCell className="colon">
                    <span>:</span>
                  </TableCell>

                  <TableCell>
                    <strong>{userProfile.firstName} {userProfile.lastName}</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Role</TableCell>

                  <TableCell className="colon">
                    <span>:</span>
                  </TableCell>

                  <TableCell>
                    <strong>user</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>

                  <TableCell className="colon">
                    <span>:</span>
                  </TableCell>

                  <TableCell>
                    <strong>{userProfile.email}</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email varification</TableCell>

                  <TableCell className="colon">
                    <span>:</span>
                  </TableCell>

                  <TableCell>
                    <strong className="danger">Pending</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contact</TableCell>

                  <TableCell className="colon">
                    <span>:</span>
                  </TableCell>

                  <TableCell>
                    <strong>{userProfile.phoneNumber}</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mobile varification</TableCell>

                  <TableCell className="colon">
                    <span>:</span>
                  </TableCell>

                  <TableCell>
                    <strong>Active</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>

                  <TableCell className="colon">
                    <span>:</span>
                  </TableCell>

                  <TableCell>
                    <strong>Active</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'profile', reducer });
const withSaga = injectSaga({ key: 'profile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(Profile));
