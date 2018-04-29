export const UPDATE_SKILL = 'golfer/UPDATE_SKILL';
export const UPDATE_LOCATION = 'golfer/UPDATE_LOCATION';
export const UPDATE_TIME = 'golfer/UPDATE_TIME';
export const SAVE_SCHEDULE = 'golfer/SAVE_SCHEDULE';
export const UPDATE_PHOTO = 'golfer/UPDATE_PHOTO';
export const UPDATE_NAME = 'golfer/UPDATE_NAME';
export const UPDATE_EMAIL = 'golfer/UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'golfer/UPDATE_PASSWORD';
export const UPDATE_AGE = 'golfer/UPDATE_AGE';
export const UPDATE_GENDER = 'golfer/UPDATE_GENDER';
export const UPDATE_FACEBOOK_CREDENTIALS = 'golfer/UPDATE_FACEBOOK_CREDENTIALS';

const initialState = {
  golferPhoto: 'not_set',
  golferName: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  skill: 'INTERMEDIATE',
  facebookCredentials: {
    id: null,
    token: null,
  },
  weeklySchedule: {
    SUNDAY: {},
    MONDAY: {},
    TUESDAY: {},
    WEDNESDAY: {},
    THURSDAY: {},
    FRIDAY: {},
    SATURDAY: {},
  },
  schedule: {
    'JANUARY': {},
    'FEBRUARY': {},
    'MARCH': {},
    'APRIL': {},
    'MAY': {},
    'JUNE': {},
    'JULY': {},
    'AUGUST': {},
    'SEPTEMBER': {},
    'OCTOBER': {},
    'NOVEMBER': {},
    'DECEMBER': {},
  }
};

export default (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_SKILL:
    console.log('REDUX STATE: ', state);
      return {
        ...state,
        skill: action.payload,
      };

    case UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload,
      }

    case UPDATE_TIME:
      const schedule = { ...state.weeklySchedule };
      if (schedule[action.payload.day.toUpperCase()][action.payload.time]) {
        delete schedule[action.payload.day.toUpperCase()][action.payload.time];
      } else {
        schedule[action.payload.day.toUpperCase()][action.payload.time] = true;
      }
      return {
        ...state,
        weeklySchedule: schedule,
      }

    case SAVE_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      }

    case UPDATE_PHOTO:
      return {
        ...state,
        golferPhoto: action.payload,
      }

    case UPDATE_NAME:
      return {
        ...state,
        golferName: action.payload,
      }

    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      }

    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }

    case UPDATE_AGE:
      return {
        ...state,
        age: action.payload,
      }

    case UPDATE_GENDER:
      return {
        ...state,
        gender: action.payload,
      }

    case UPDATE_FACEBOOK_CREDENTIALS:
      return {
        ...state,
        facebookCredentials: {
          token: action.payload.token,
          id: action.payload.id,
        },
      }

    default:
      return state;
  }
}

export const updateSkill = (skill) => {
  return dispatch => {
    dispatch({
      type: UPDATE_SKILL,
      payload: skill,
    });
  }
}

export const updateLocation = (text) => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOCATION,
      payload: text,
    });
  }
}

export const updateTime = (day, time) => {
  return dispatch => {
    dispatch({
      type: UPDATE_TIME,
      payload: { day, time },
    });
  }
}

export const saveSchedule = (schedule) => {
  return dispatch => {
    dispatch({
      type: SAVE_SCHEDULE,
      payload: schedule,
    });
  }
}

export const updateName = (name) => {
  return dispatch => {
    dispatch({
      type: UPDATE_NAME,
      payload: name,
    });
  }
}

export const updatePhoto = (photo) => {
  return dispatch => {
    dispatch({
      type: UPDATE_PHOTO,
      payload: photo,
    });
  }
}

export const updateEmail = (email) => {
  return dispatch => {
    dispatch({
      type: UPDATE_EMAIL,
      payload: email,
    });
  }
}

export const updatePassword = (password) => {
  return dispatch => {
    dispatch({
      type: UPDATE_PASSWORD,
      payload: password,
    });
  }
}

export const updateAge = (age) => {
  return dispatch => {
    dispatch({
      type: UPDATE_AGE,
      payload: age,
    });
  }
}

export const updateGender = (gender) => {
  return dispatch => {
    dispatch({
      type: UPDATE_GENDER,
      payload: gender,
    });
  }
}

export const updateFacebookCredentials = (creds) => {
  return dispatch => {
    dispatch({
      type: UPDATE_FACEBOOK_CREDENTIALS,
      payload: creds,
    });
  }
}
