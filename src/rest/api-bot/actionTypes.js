export class ActionTypes {
  constructor(endpointName,methods = ['list', 'retrieve', 'create', 'update']) {
    this.endpointName = endpointName;
    methods.forEach(action => {
      //mehtod
      this[`${action}`] = this.getConstant(action);
      //mehtod_result
      ['success', 'failure'].forEach(result => {
        this[`${action}_${result}`] = this.getConstant(action, result);
      });
    });
  }

  getConstant(action, result) {
    //endpointName_method
    let constant = `${this.endpointName}_${action}`;
    if (result) {
      //endpointName_method_result
      constant = `${constant}_${result}`;
    }
    return constant;
  }
}
