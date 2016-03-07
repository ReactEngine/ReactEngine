import Flux, { asyncDispatch } from './redux-rest';

const Apis = {
  users: '/api/users/'
};

const flux = new Flux(Apis);

// Then create a Flux instance. This automatically creates
// action creators and reducers for each endpoint. No boilerplate!
export default flux