import * as actions from '../../action/MoveActions'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to move forward', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.ADD_TODO,
      text
    }
    expect(actions.addTodo(text)).toEqual(expectedAction)
  })
  it('should create an action to move backward', () => {

  });
})