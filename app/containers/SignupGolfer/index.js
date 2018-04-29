import React, { Component } from 'react';
import { Grid, Col, Row } from '../../components/easy-grid';
import { View, Text, TouchableOpacity, Switch, ScrollView, Image, StyleSheet, Button } from 'react-native';
import Skills from './skills';
// import { Form, Item, Label, Input, Button } from 'native-base';
// import { Dropdown } from 'react-native-material-dropdown';
// import GolfAnimation from '../components/GolfAnimation';

// import Expo, { ImagePicker } from 'expo';

import { bindActionCreators } from 'redux';
// import { signupGolferAsync } from '../actions/auth';
import {
  updateSkill,
  updateLocation,
  updateTime,
  saveSchedule,
  updatePhoto,
  updateName,
  updateEmail,
  updatePassword,
  updateAge,
  updateGender,
  updateFacebookCredentials,
} from '../../actions/golfer';
import { connect } from 'react-redux';

import moment from 'moment';

import { SKILLS, DAYS, TIMES, MONTHS, daysInMonth, getMonth, getYear, findFirstDay, parseDay } from '../../constants';

class SignupGolfer extends Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    slideIndex: 0,
    canContinue: true,
    month: getMonth(),
    days: daysInMonth(getMonth(), getYear()),
    firstDay: findFirstDay(getMonth(), getYear()),
  }

  _handleSwitch(idx) {
    if (this.state.skillLevel === idx) {
      this.setState({ canContinue: false });
      this.props.updateSkill(null);
    } else {
      this.setState({ canContinue: true });
      this.props.updateSkill(SKILLS[idx]);
    }
  }

  _handleBack() {
    if (this.state.slideIndex > 0) {
      this.setState({ slideIndex: this.state.slideIndex - 1 });
    } else {
      this.props.navigation.goBack();
    }
  }

  _handleContinue(hasProfile) {
    const { slideIndex, canContinue } = this.state;
    const { weeklySchedule, schedule } = this.props.golfer;
    if (slideIndex === 3) {
      const WS = { ...weeklySchedule };
      const S = { ...schedule }
      const sKeys = Object.keys(schedule);
      const sKeysLength = sKeys.length;

      const newSchedule = {};

      for (var i = 0; i !== sKeysLength; i++) {
        const month = sKeys[i];
        const sDays = daysInMonth(month);
        for (var j = 0; j !== sDays; j++) {
          const stamp = parseDay(month, j);
          const wsKeys = Object.keys(WS[stamp.day]);
          if (wsKeys.length !== 0) {
            newSchedule[stamp.timeStamp] = Object.keys(WS[stamp.day]).map(v => Number(v));
          }
        }
      }

      this.props.saveSchedule(newSchedule);

    }
    if (slideIndex === 5 && hasProfile) {
      console.log(this.props.user);
      // this.props.signupGolferAsync(this.props.user);
      this.props.navigation.navigate('Home');
      this.props.navigation.navigate('DrawerOpen');
      return;
    }
    if (canContinue) {
      if (slideIndex === 2) {
        this.setState({ slideIndex: slideIndex + 1 });
      } else {
        this.setState({ canContinue: false, slideIndex: slideIndex + 1 });
      }
    }
  }

  _renderSkill() {
    const { skillLevel } = this.state;
    return [
      <Row size={2} key="title">
        <Text style={styles.title}>{`SO YOU'RE A\nGOLFER...`}</Text>
      </Row>,
      <Row size={2} key="subtitle">
        <Text style={{fontWeight: 'bold', color: '#EA3350'}}>What's your skill ?</Text>
      </Row>,
      SKILLS.map((value, i) => (
        <Row size={1} style={styles.switchy} key={i}>
          <Switch
            value={SKILLS[i] === this.props.golfer.skill}
            onValueChange={() => this._handleSwitch(i)}
            onTintColor="#EA3350"
          />
        <Text style={styles.switchText}>{value}</Text>
        </Row>
      )),
      <Row size={4} key="space" />,
    ];
  }

  _handleLocationChange(text) {
    if (text.length < 1) {
      this.setState({ canContinue: false });
    }
    this.setState({ location: text, canContinue: text.length > 0 });
    this.props.updateLocation(text);
  }

  _renderLocation() {
    return [
      <Row size={2} key="title">
        <Text style={styles.title}>{`WHERE DO\nYOU PLAY ?`}</Text>
      </Row>,
      <Row key="location">
        <Item stackedLabel style={{width: '100%'}}>
          <Label>YOUR COURSE</Label>
          <Input
            placeholder="Your Course Name"
            onChangeText={(text) => this._handleLocationChange(text)}
            value={this.props.golfer.location}
          />
        </Item>
      </Row>,
      <Row size={4} key="space"/>,
    ];
  }

  _updateTime(day, time) {

    this.props.updateTime(day, time);
    this.setState({ canContinue: true });
  }

  _renderTime() {
    const schedule = this.props.golfer.weeklySchedule;
    return [
      <Row size={2} key="title">
        <Text style={styles.title}>{`WHEN DO\nYOU PLAY ?`}</Text>
      </Row>,
      <Row size={1} key="subtitle">
        <Text style={{fontWeight: 'bold', color: '#EA3350'}}>YOUR WEEKLY SCHEDULE</Text>
      </Row>,
      <Row key="times" size={9}>
        {['', ...DAYS].map((day, dayIndex) => (
          <Col key={dayIndex}>
            <Text>{day.substr(0, 3)}</Text>
            {TIMES.map((time, timeIndex) => (
              <Row key={-timeIndex}>
                {dayIndex === 0 && <Text>{time}</Text>}
                {dayIndex !== 0 && (
                  <TouchableOpacity
                    onPress={() => this._updateTime(day, time)}
                    style={[
                      styles.timeTable,
                      {
                        backgroundColor: schedule[day][time] ? '#FF467E' : '#BE2E47',
                      },
                    ]}>
                  </TouchableOpacity>
                )}
              </Row>
            ))}
          </Col>
        ))}
      </Row>,
    ];
  }

  _handleMonthSelect(value) {
    this.setState({
      month: value,
      days: daysInMonth(value, getYear()),
      firstDay: findFirstDay(value, getYear()),
    });
  }

  _handleDaySelect(value) {
    const result = parseDay(this.state.month, value);
    this.setState({ selectDate: result.date, selectDay: result.day });
  }

  _renderCalendar() {
    const { weeklySchedule } = this.props.golfer;
    const { month, days, firstDay, selectDay, selectDate } = this.state;
    let mapDays = Array.apply(null, {length: days}).map(Number.call, Number);
    const leadSpaces = Array.apply(null, {length: firstDay});
    mapDays = leadSpaces.concat(mapDays);

    return [
      <Row size={1} key="subtitle">
        <Text style={{fontWeight: 'bold', color: '#EA3350'}}>YOUR FULL SCHEDULE</Text>
      </Row>,
      <Row size={2} key="dropdown">
        <View style={{width: '100%'}}>
          <Dropdown
            style={{width: '100%'}}
            label=""
            data={MONTHS}
            value={month}
            onChangeText={(value) => this._handleMonthSelect(value)}
          />
        </View>
      </Row>,
      <Row key={month} size={5}>
        {[...DAYS].map((day, dayIndex) => (
          <Col key={dayIndex}>
            <Row>
              <View style={styles.calDay}>
                <Text>{day.substr(0, 3)}</Text>
              </View>
            </Row>
            {[0,1,2,3,5].map((v, i) => {
              let dd = `${mapDays[(i * 7) + dayIndex] + 1}`;
              if (dd < 10) {
                dd = `0${dd}`;
              }

              return (
                <Row key={-v}>
                  <TouchableOpacity
                    style={[
                      styles.calDay,
                      Number(dd) === selectDate ? { backgroundColor: '#E83350'} :
                      Object.keys(weeklySchedule[day]).length > 0 ? { backgroundColor: '#DEDEE0' } :
                      {},
                      {
                        borderWidth: 1,
                        borderColor: '#F6F6F6',
                      },
                    ]}
                    onPress={() => this._handleDaySelect(dd)}
                  >
                    <Text>{mapDays[(i * 7) + dayIndex] !== undefined && dd}</Text>
                  </TouchableOpacity>
                </Row>
              );
            })}
          </Col>
        ))}
      </Row>,
      <Row key="selections" size={5}>
        {selectDay && (
          <Col>
            <Row style={{height: 40}}>
              <View style={styles.availTitle}>
                <Text>Available</Text>
                <Switch
                  value={true}
                  onValueChange={() => console.log('switches are fun')}
                  onTintColor="#EA3350"
                />
              </View>
            </Row>
            <ScrollView>
              {[...TIMES].map((time, idx) => {
                console.log(typeof time);
                return (
                  <Row key={idx*100} style={{height: 35}}>
                    <View style={styles.availRow}>
                      <Text>{time}</Text>
                      <View
                        style={{
                          width: '90%',
                          height: '100%',
                          borderBottomWidth: 1,
                          borderBottomColor: '#DEDEE0',
                          backgroundColor: weeklySchedule[selectDay][time] ? '#E83350' : 'transparent',
                        }}></View>
                    </View>

                    <Text>{weeklySchedule[selectDay][time] && time}</Text>
                  </Row>
                )
              })}
            </ScrollView>
          </Col>
        )}
      </Row>,
    ];
  }

  async logInFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('195767564366187', {
        permissions: ['public_profile', 'email', 'user_about_me'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      const user = await response.json();
      console.log('FACEBOOK USER: ', user);
      this.props.updateName(user.name);
      this.props.updateFacebookCredentials({id: user.id, token});
      this.setState({ slideIndex: 5 });
    }
  }

  _renderSignupSplash() {
    return [
      <Row size={2} key="title">
        <Text style={[styles.title, { color: 'white' }]}>{`GREAT!\nYOU'RE ALL SET.`}</Text>
      </Row>,
      <Row size={2} key="space"/>,
      <Row key="signupButtons" size={2}>
        <View style={styles.signupButtonContainer}>
          <TouchableOpacity style={[styles.signupButton, { backgroundColor: '#3C5A96'}]} onPress={() => this.logInFacebook()}>
            <Text style={styles.signupButtonText}>Sign-in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.signupButton, { backgroundColor: '#28AE63'}]}>
            <Text style={styles.signupButtonText}>Sign-in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={() => this.setState({ slideIndex: 5 })}>
            <Text style={styles.signupButtonText}>Sign-in with my E-mail</Text>
          </TouchableOpacity>
        </View>
      </Row>,
    ];
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.props.updatePhoto(result.uri);
    }
  }

  _renderEmailSignup() {
    const { image, gender } = this.state;

    return [
      <Row size={3} key="title">
        <View style={styles.imageContainerContainer}>
          <TouchableOpacity style={styles.imageContainer} onPress={this._pickImage}>
            <Image source={{uri: this.props.golfer.golferPhoto}} style={styles.image} />
          </TouchableOpacity>
        </View>
      </Row>,
      <Row size={1} key="pictureButton">
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
          <Button rounded bordered light onPress={this._pickImage}>
            <Text style={{color: '#EA3350', fontWeight: 'bold'}}>{image === 'not set' ? 'add a picture' : 'modify'}</Text>
          </Button>
        </View>
      </Row>,
      <Row key="nameInput" size={1}>
        <Item stackedLabel style={{width: '100%'}}>
          <Input
            placeholder="Name"
            onChangeText={(text) => this.props.updateName(text)}
            value={this.props.golfer.golferName}
          />
        </Item>
      </Row>,
      <Row key="emailInput" size={1}>
        <Item stackedLabel style={{width: '100%'}}>
          <Input
            placeholder="Email"
            onChangeText={(text) => this.props.updateEmail(text)}
            value={this.props.golfer.email}
          />
        </Item>
      </Row>,
      <Row key="passwordInput" size={1}>
        <Item stackedLabel style={{width: '100%'}}>
          <Input
            placeholder="Password"
            onChangeText={(text) => this.props.updatePassword(text)}
            value={this.props.golfer.password}
          />
        </Item>
      </Row>,
      <Row key="infoInput" size={1}>
        <Col>
          <Item stackedLabel style={{width: '80%'}}>
            <Input
              placeholder="Age"
              onChangeText={(text) => this.props.updateAge(text)}
              value={this.props.golfer.age}
            />
          </Item>
        </Col>
        <Col>
          <View style={{width: '100%', height: '100%'}}>
            <Dropdown
              style={{width: '100%', paddingBottom: 15}}
              label={''}
              data={[{value: 'male'}, {value: 'female'}]}
              value={gender ? gender : 'Gender'}
              onChangeText={(value) => {
                this.props.updateGender(value);
                this.setState({ gender: value });
              }}
            />
          </View>
        </Col>
      </Row>,
      <Row size={1} key="space"/>,
    ];
  }

  render() {
    const { slideIndex, canContinue } = this.state;
    const { golferName, golferPhoto, email, password, age, gender } = this.props.golfer;

    const hasProfile = golferName && (golferPhoto !== 'not_set') && email && password && age && gender;

    return (
      <Grid style={{backgroundColor: slideIndex === 4 ? '#EA3350' : '#F6F6F6'}}>
        <Col style={{padding: 30}}>
          <Row size={1}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => this._handleBack()}>
                <Text style={{color: slideIndex === 4 ? 'white' : '#EA3350'}}>back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._handleContinue(hasProfile)} style={slideIndex === 4 ? { display: 'none'} : {}}>
                <Text
                  style={{
                    color: (canContinue || hasProfile) ? '#EA3350' : 'grey',
                  }}>{'continue'}</Text>
              </TouchableOpacity>
            </View>
          </Row>
          { slideIndex === 0 && this._renderSkill() }
          {slideIndex === 1 && this._renderLocation()}
          {slideIndex === 2 && this._renderTime()}
          {slideIndex === 3 && this._renderCalendar()}
          {slideIndex === 4 && this._renderSignupSplash()}
          {slideIndex === 5 && this._renderEmailSignup()}
        </Col>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  auth: state.auth,
  golfer: state.golfer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // signupGolferAsync,
  updateSkill,
  updateLocation,
  updateTime,
  saveSchedule,
  updatePhoto,
  updateName,
  updateEmail,
  updatePassword,
  updateAge,
  updateGender,
  updateFacebookCredentials,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupGolfer);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#393843',
    fontSize: 30,
    fontWeight: '800',
  },
  switchy: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  switchText: {
    paddingLeft: 30
  },
  timeTable: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#E83350',
  },
  calDay: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  availTitle: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEE0',
  },
  availRow: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signupButton: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signupButtonContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageContainerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderWidth: 15,
    borderColor: '#EA3350',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 154,
    height: 154,
    borderRadius: 77,
  },
  inputContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
