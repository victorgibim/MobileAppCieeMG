import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
  <>
  <StatusBar hidden={true} barStyle="light-content" backgroundColor="#0000ff"/>
  <Routes />
  </>
  
  )
}
