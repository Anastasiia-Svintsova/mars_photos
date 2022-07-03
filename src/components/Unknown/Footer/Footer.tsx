import { AppBar, Typography, Toolbar } from '@mui/material'
import React from 'react'

export const Footer = () => (
  <AppBar position="relative" sx={{ top: 'auto', bottom: 0 }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography
        component="a"
        href='/'
        sx={{ textDecoration: 'none' }}
        color="#fff"
        textAlign="center"
      >
        © 2022 Anastasiia Svintsova
      </Typography>
    </Toolbar>
  </AppBar>
)
