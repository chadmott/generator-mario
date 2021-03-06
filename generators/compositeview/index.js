'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var path = require('path');
var itemview = {};
itemview.path = '';
itemview.class = '';

module.exports = DirBase.extend({
  constructor: function(/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('itemview', {alias: 'itv', desc: 'creates itemView within specified directory'});
    this.option('template', {alias: 't', desc: 'reuse existing template for composite view'});
    this.option('skipcheck', {alias: 'f', desc: 'Force to ignore (turn off) checking of paths to referenced files'});
  },
  initializing: function() {
    // load config
    DirBase.prototype.initializing.call(this);

    this.itemview = this.options.itemview || this.options.itv;
    this.template = this.options.template || this.options.t;
    this.templateExists = false;

    //item view
    this.customView = {
      path: '',
      class: ''
    };

    var pathFractions = {};

    if (this.itemview) {
      this.itemview = utils.truncateBasePath(this.itemview);
      pathFractions = path.parse(this.itemview);
      var customViewName = pathFractions.name;
      var customViewDir = pathFractions.dir;

      if (!this.options.skipcheck) {
        utils.verifyPath(utils.fileNameWithPath(pathFractions.dir, pathFractions.name, utils.type.itemview));
      }

      this.customView.path = utils.amd(customViewName, utils.type.itemview, customViewDir);
      this.customView.class = utils.className(customViewName, utils.type.itemview);
    } else {
      this.customView.path = utils.amd(this.name, utils.type.itemview);
      this.customView.class = utils.className(this.name, utils.type.itemview);
    }

    //template
    this.customTplDir = this.options.directory || this.name;
    this.customTplName = this.name;

    if (this.template) {
      this.templateExists = true;
      this.template = utils.truncateBasePath(this.template);

      pathFractions = path.parse(this.template);
      this.customTplName = pathFractions.base;

      if (pathFractions.dir) {
         this.customTplDir = pathFractions.dir;
      }
      if (!this.options.skipcheck) {
        utils.verifyPath(utils.templateNameWithPath(this.customTplDir, pathFractions.name, utils.type.compositeview));
      }

    }
  },
  writing: function() {
    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_composite-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
      {
        childPath: this.customView.path,
        childItemView: this.customView.class,
        template: utils.templateNameWithPath(this.customTplDir, this.customTplName, utils.type.compositeview),
        templateExists: this.templateExists
      }
    );

    if (!this.template) {
      this.fs.copyTpl(
        this.templatePath('_composite-view-template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.compositeview))
      );
    }

    if (!this.itemview) {
      this.composeWith('mario:itemview', {options: {directory: this.options.directory}, args: [this.name]});
    }

    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_composite-view-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.compositeview, this.testBaseDir)),
      {
        compview: utils.amd(this.name, utils.type.compositeview, this.options.directory),
        viewName: utils.className(this.name, utils.type.compositeview),
        templateExists: this.templateExists,
        assert: utils.assert[this.testFramework]
      }
    );
  }
});
