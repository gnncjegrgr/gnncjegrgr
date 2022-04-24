import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from 'react-redux';

import React, { useCallback } from 'react';

import { logoutAction } from '../reducers/user';

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutAction);
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'grey' }} aria-label="recipe">
            {user.nickname[0]}
          </Avatar>
        }
        action={
          <Button sx={{ marginTop: '6px' }} onClick={onLogout}>
            로그아웃
          </Button>
        }
        title={user.nickname}
        // subheader="September 14, 2016"
      />

      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if
          you like.
        </Typography>
      </CardContent> */}
      <hr />
      <CardActions disableSpacing>
        <Grid container>
          <Grid item xs={4}>
            <Button>
              게시글
              <br />
              {user.Posts.length}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button>
              팔로잉
              <br />
              {user.Followings.length}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button>
              팔로워
              <br />
              {user.Followers.length}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default UserProfile;
