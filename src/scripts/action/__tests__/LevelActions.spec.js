import * as actions from '../../action/LevelActions'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.,
      text
    }
    expect(actions.addTodo(text)).toEqual(expectedAction)
  })
})