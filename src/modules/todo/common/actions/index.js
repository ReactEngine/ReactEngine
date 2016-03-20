const  _ = require('lodash')

import * as countActions from './count'
import * as createActions from './create'
import * as createChangeStreamActions from './createChangeStream'
import * as deleteActions from './delete'
import * as existsActions from './exists'

import * as findActions from './find'
import * as findByIdActions from './findById'
import * as findOneActions from './findOne'
import * as formFieldChangeActions from './formFieldChange'

import * as getChangeStreamActions from './getChangeStream'
import * as routerChangeActions from './routerChange'
import * as updateActions from './update'
import * as updateAttributesActions from './updateAttributes'
import * as upsertActions from './upsert'

export default  _.assign({}
		,countActions
		,createActions
		,createChangeStreamActions
		,deleteActions
		,existsActions
		,findActions
		,findByIdActions
		,findOneActions
		,formFieldChangeActions
		,getChangeStreamActions
		,routerChangeActions
		,updateActions
		,updateAttributesActions
		,upsertActions
		)