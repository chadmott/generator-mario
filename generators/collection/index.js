'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var model = {};
model.className = '';
model.path = '';

module.exports = DirBase.extend({
  constructor: function () {
    DirBase.apply(this, arguments);
    this.option('model', {alias:'m', desc: 'specify a model name to use with the collection (they have to be in the same directory)'});
  },
  initializing: function () {
    this.options.model = this.options.model || this.options.m;
    //check for model option
    if(this.options.model) {
      model.path = utils.amd(this.options.model, utils.type.model);
      model.className = utils.className(this.options.model, utils.type.model);
    } else {
      model.path = utils.amd(this.name, utils.type.model);
      model.className = utils.className(this.name, utils.type.model);
      this.composeWith('aowp-marionette:model', {options: {directory: this.options.directory}, args: [this.name]});
    }
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('collection.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory , this.name, utils.type.collection)),
      {
        modelPath: model.path,
        modelNameCamelCase: model.className
      }
    );
    this.fs.copyTpl(
      this.templatePath('collection-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.collection)),
      {
        collectionPath: utils.amd(this.name, utils.type.collection),
        collectionNameCamelCase: utils.className(this.name, utils.type.collection)
      }
    );
  }
});