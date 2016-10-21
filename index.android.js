"use strict";

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, AsyncStorage
} from 'react-native';

var Camdio = require('./MainScreen');
AppRegistry.registerComponent('Camdio', () => Camdio);
