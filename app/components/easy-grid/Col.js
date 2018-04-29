'use strict';

import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import computeProps from './Utils';


export default class ColumnNB extends Component {
    prepareRootProps() {

        var type = {
        	flexDirection: 'column',
        	flex: (this.props.size) ? this.props.size : (this.props.style && this.props.style.width) ? 0 : 1,
        }

        var defaultProps = {
            style: type
        }
        // console.log(this.props, defaultProps);
        return defaultProps;
        // return computeProps(this.props, defaultProps);

    }

    setNativeProps(nativeProps) {
      this._root.setNativeProps(nativeProps);
    }

  render() {
    if(this.props.onPress){
      return(
        <TouchableOpacity onPress={this.props.onPress}
        {...this.prepareRootProps()}>
    <View
      ref={component => this._root = component}
      {...this.props}
      {...this.prepareRootProps()}
    >{this.props.children}</View>
      </TouchableOpacity>
    );
    }
    else{
      return(
        <View
      ref={component => this._root = component}
      {...this.props}
      {...this.prepareRootProps()}
    >{this.props.children}</View>
    );
    }
  }

}