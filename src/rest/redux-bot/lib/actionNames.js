import _ from 'lodash'

function addGroup(resource, actionTypes, group) {
  const upperResource = _.snakeCase(resource).toUpperCase()
  const upperGroup    = group.toUpperCase()

  const start        = upperResource + '_' + upperGroup + '_START'
  const success      = upperResource + '_' + upperGroup + '_SUCCESS'
  const error        = upperResource + '_' + upperGroup + '_ERROR'
  const startAlias   = group + 'Start'
  const successAlias = group + 'Success'
  const errorAlias   = group + 'Error'

  actionTypes[start]   = start
  actionTypes[success] = success
  actionTypes[error]   = error
  actionTypes[startAlias] = start
  actionTypes[successAlias] = success
  actionTypes[errorAlias] = error
}

module.exports = function(resource, groupList = ['fetch','create','update','delete']) {
  if (resource == null) throw new Error('Expected resource')
  resource = _.trim(resource)
  if (resource == '')   throw new Error('Expected resource')

  const actionTypes = {}
  _.each(groupList,()=>{
    addGroup(resource, actionTypes, group)
  })

  return actionTypes
}
