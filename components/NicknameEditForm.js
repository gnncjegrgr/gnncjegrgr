import { FormGroup as Form, InputBase, Button, Grid } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  display: 'flex',
  marginLeft: 40,
  color: 'black',
  '& .MuiInputBase-input': {
    borderBottom: '1px solid grey',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em+ ${theme.spacing(10)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '90ch',
    },
  },
}));

const NicknameEditForm = () => {
  return (
    <Form style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px', paddingRight: '50px' }}>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <StyledInputBase sx={{ ml: 1, flex: 1 }} placeholder="닉네임 변경하기" inputProps={{ 'aria-label': 'search google maps' }} />
        </Grid>
        <Grid item xs={1}>
          <Button>수정</Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default NicknameEditForm;
