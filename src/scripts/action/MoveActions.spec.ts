import * as actions from '../../action/MoveActions'
import * as types from '../../constants/ActionTypes'

describe('action/MoveActions', () => {

  it('should create an action to move forward', () => {
    const expectedAction = {
      type: types.MOVE_FORWARD
    }
    expect(actions.moveForward()).toEqual(expectedAction)
  })

  it('should create an action to move backward', () => {

  });
  it('should create an action to rotate left', () => {

  });
  it('should create an action to rotate right', () => {

  });

});