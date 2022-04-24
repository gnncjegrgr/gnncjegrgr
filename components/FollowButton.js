import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const FollowButton = ({ post }) => {
  return <Button>팔로우</Button>;
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
