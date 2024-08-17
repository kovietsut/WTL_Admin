import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import UpdateForm from './_section/UpdateForm';
import ProfileDetail from './_section/ProfileDetail';
import { ProfileData } from './Profile.state';
import Iconify from '@/components/atoms/Iconify';
import UploadAvatarModal from './_section/UploadAvatarModal';

const AdminPage = () => {
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setEditing(!editing);
    }, 2000);
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1a1a2e',
        minHeight: '100vh',
        padding: '20px',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h6">Hello, {ProfileData.fullname}</Typography>
        <Box>
          {!editing ? (
            <Button
              onClick={handleEdit}
              sx={{ marginRight: '30px' }}
              variant="contained"
              color="primary"
            >
              Edit profile
            </Button>
          ) : (
            <>
              <Button
                disabled={submitting}
                onClick={handleEdit}
                variant="text"
                sx={{ color: 'red', marginRight: '30px' }}
              >
                Cancel
              </Button>
              <Button
                disabled={submitting}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{ width: 150, marginRight: '30px' }}
                startIcon={submitting ? <CircularProgress size={24} /> : null}
              >
                {submitting ? 'Saving' : 'Publish changes'}
              </Button>
            </>
          )}
          <IconButton color="primary" aria-label="more option">
            <Iconify icon={'pepicons-pop:dots-x'} color={'gray'} />
          </IconButton>
        </Box>
      </Box>
      <Card
        sx={{
          backgroundColor: '#2a2a3e',
          padding: '30px',
          marginBottom: '20px',
        }}
      >
        <Card sx={{ display: 'flex', backgroundColor: '#2a2a3e', boxShadow: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Box>
              <Avatar
                alt="Remy Sharp"
                src="https://scontent.fhan3-2.fna.fbcdn.net/v/t31.18172-8/475968_279662528836934_2112013266_o.jpg?_nc_cat=107&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFp0L3cR0qsh18rJ2siAIKtNljnvx9So482WOe_H1Kjj99gDnfF8Ws8PcPetotQpDUfy2e3_-GUrCZWGTMA0-Y8&_nc_ohc=YaidAB-1N_4Q7kNvgHKjjMW&_nc_ht=scontent.fhan3-2.fna&oh=00_AYDjZs6BUwdbe2JDbDJQhNzQtV2008ocZx1NwFgJqzB5WA&oe=66E0E191"
                sx={{ width: 150, height: 150 }}
              />
              <UploadAvatarModal />
            </Box>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h4" gutterBottom>
                {ProfileData.fullname}
              </Typography>
              <Typography variant="h5" color="text.secondary" component="div" gutterBottom>
                {ProfileData.role}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div" gutterBottom>
                Bio: I am the head administrator of Webtruyenlo
              </Typography>
            </CardContent>
            {/* <Box
              sx={{
                justifyContent: 'flex-end',
                justifySelf: 'flex-end',
              }}
            >
              <Button variant="outlined" color="primary">
                Upload photo
              </Button>
            </Box> */}
          </Box>
        </Card>
      </Card>
      {!editing ? <ProfileDetail /> : <UpdateForm isSubmitting={submitting} />}
    </Box>
  );
};

export default AdminPage;
