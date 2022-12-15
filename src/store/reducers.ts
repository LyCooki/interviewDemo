// initial state
const store = {
  userName:'',
  password:''
}

// reducer
export default function(state = store, action:any) {
  switch(action.type) {
    case 'COUNT_ADD':
      return {
        userName:action.value.username,
        password:action.value.password
      }
    default:
      return state
  }
}
