require('regenerator/runtime')
import * as utils from './utils'

export default class {

  constructor(config = {}) {
      this.modelName = "Model"
      this.modelNamePlural = this.modelNamePlural + "s"
      this.urlBase = config.urlBase
    }
    /**
     GET
     */
  async exists(id) {
    return await utils.request({
        method: 'GET',
        url: this.urlBase + this.modelNamePlural + '/' + id
      })
      .then(utils.successHandle)
      .catch(utils.errorHandle)
  }

  async findById(id) {
    return await utils.request({
        method: 'GET',
        url: this.urlBase + this.modelNamePlural + '/' + id
      })
      .then(utils.successHandle)
      .catch(utils.errorHandle)
  }

  async findById() {
    return await utils.request({
        method: 'GET',
        url: this.urlBase + this.modelNamePlural
      })
      .then(utils.successHandle)
      .catch(utils.errorHandle)
  }

  async findOne() {
    return await utils.request({
        method: 'GET',
        url: this.urlBase + this.modelNamePlural + '/findOne'
      })
      .then(utils.successHandle)
      .catch(utils.errorHandle)
  }

  async count() {
      return await utils.request({
          method: 'GET',
          url: this.urlBase + this.modelNamePlural + '/count'
        })
        .then(utils.successHandle)
        .catch(utils.errorHandle)
    }
    /**
     POST
     */
  async create(data) {
    return await utils.request({
        method: 'POST',
        url: this.urlBase + this.modelNamePlural,
        body: data
      })
      .then(utils.successHandle)
      .catch(utils.errorHandle)
  }

  async updateAll(data) {
    return await utils.request({
        method: 'POST',
        url: this.urlBase + this.modelNamePlural + '/update',
        body: data
      })
      .then(utils.successHandle)
      .catch(utils.errorHandle)
  }


  async update(data) {
    return this.updateAll(data)
  }


  async createChangeStream(id) {
    return await utils.request({
        method: 'POST',
        url: this.urlBase + this.modelNamePlural + '/change-stream'
      })
      .then(utils.successHandle)
      .catch(utils.errorHandle)
  }

  /**
   PUT
   */
  async upsert(data) {
    return await utils.request({
        method: 'PUT',
        url: this.urlBase + this.modelNamePlural,
        body: data
      })
      .then(utils.successHandle)
      .catch(utils.errorHandle)
  }

  async updateOrCreate(data) {
    return this.upsert(data)
  }

  async updateAttributes(id) {
    return await utils.request({
        method: 'PUT',
        url: this.urlBase + this.modelNamePlural + '/' + id
      })
      .then(utils.successHandle)
      .catch(utils.errorHandle)
  }

  /**
   DELETE
   */
  async deleteById(id) {
    return await utils.request({
        method: 'DELETE',
        url: this.urlBase + this.modelNamePlural + '/' + id
      })
      .then(utils.successHandle)
      .catch(utils.errorHandle)
  }

  async destroyById(id) {
    return this.deleteById(id)
  }

  async removeById(id) {
    return this.deleteById(id)
  }
}