import { Button, IconButton, Card, Paper, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Grid } from '@mui/material';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '90px',
}));

const ItemMore = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '60px',
}));

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

  return (
    <>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper', border: '1px solid black', borderRadius: 2, marginBottom: '20px' }}
        subheader={<ListSubheader>{header}</ListSubheader>}
      >
        <ListItem>
          <Grid container spacing={2}>
            {data.map((v) => (
              <Grid item xs={4}>
                <Item>
                  <span style={{ fontSize: '15px' }}>{v.nickname}</span>
                  <br />
                  <br />
                  <IconButton onClick={onCancel}>
                    <DoDisturbIcon />
                  </IconButton>
                </Item>
              </Grid>
            ))}
          </Grid>
        </ListItem>
        <ListItem>
          <Grid item xs={12}>
            <ItemMore>
              <Button>더보기</Button>
            </ItemMore>
          </Grid>
        </ListItem>
      </List>
    </>
    // <List
    //   style={{ marginBottom: '20px' }}
    //   grid={{ gutter: 4, xs: 2, md: 3 }}
    //   size="small"
    //   header={<div>{header}</div>}
    //   loadMore={
    //     <div style={{ textAlign: 'center', margin: '10px 0' }}>
    //       <Button>더 보기</Button>
    //     </div>
    //   }
    //   bordered
    //   dataSource={data}
    //   renderItem={(item) => (
    //     <List.Item style={{ marginTop: '20px' }}>
    //       <Card actions={[<StopOutlined key="stop" />]}>
    //         <Card.Meta description={item.nickname} />
    //       </Card>
    //     </List.Item>
    //   )}
    // />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
