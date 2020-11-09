import * as actions from './LevelActions'
import * as types from '../constants/ActionTypes'

describe('action/LevelActions', () => {
  it('should create an action to generate a level', () => {
    const payload = {
      width: 64,
      height: 64
    }
    const expectedAction = {
      type: types.GENERATE_LEVEL,
      payload
    }
    expect(actions.generateLevel(payload)).toEqual(expectedAction)
  })
})