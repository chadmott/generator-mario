# generator-mario

> [Yeoman](http://yeoman.io) generator

## Table of Contents

- Getting Started
  - Requirements
  - Installation Process
    - Tools
    - Marionette Generator
- Usage
  - Naming conventions
  - Output Directory
  - Option Flags
- Sub-generators
  - Model
  - Collection
  - Item View
  - Collection View
  - Composite View
  - Layout View
  - Router
  - Controller
  - CRUD
- Task Runner
- ECMAScript 2015(6)
- Simple Example
  - Scaffold Initial Project Structure
  - Additional Scaffolding

## Getting Started

### Requirements

In order to install and use this generator there are several requirements you need to meet. This is a yeoman generator therefore you'll need [yeoman](http://yeoman.io/). Yeoman runs on NodeJS therefore you'll need to install node (version 0.12 or above) and npm (version 2.0 or above).

### Installation Process

#### Tools
After having a working node & npm you'll need to install couple of tools including yeoman's scaffolding tool **Yo**, front-end package manager [Bower](http://bower.io) and build tool [Grunt](http://gruntjs.com).

Use npm for that as follows:

```bash
# install yeoman scaffolding tool
$ npm install -g yo

# install bower
$ npm install -g bower

# install grunt cmd line tool
$ npm install -g grunt-cli
```

#### Marionette Generator

To install generator-mario via npm, run:

```bash
$ npm install -g generator-mario
```

For more information on how to use these tools check out [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started) on Yeoman website.

## Usage

Once the marionette generator is installed you can invoke it using the *yo* command.

```bash
# Invoke mario generator
yo mario
```

After naming your application you will be asked for build tool option. You can choose from Grunt, Gulp and Webpack. **Webpack is in experimental state for now so it's not working properly in every way.** Grunt will also offer you if you want to build your application with ECMAScript 5 or ECMAScript 2015(6) version. Gulp supports only ECMAScript 5 version for now.

However all three build tools can be used with both combinations of test files. If you want to save test files in separate directory `/test/apps` or within your files with code `app/scripts/apps`.

```bash
# appcode directory option
project-root/
  |- test/
  |- app/
    |- scripts/
      |- apps/
        |- home/                         # feature folder
          |- home-controller.js          # actual file
          |- home-controller-test.js     # actual test file
          ...
```

```bash
# separate directory option
project-root/
  |- test/
    |- apps/
      |- home/
        |- home-controller-test.js       # actual test file
  |- app/
    |- scripts/
      |- apps/
        |- home/                         # feature folder
          |- home-controller.js          # actual file
          ...
```

Last option you will face is whether you want to use Arcanist config files or not.

Appart from invoking the main generator. Marionette generator comes with couple of sub-generators that helps you scaffold not only the initial project structure but additional parts of the code in a *feature* structured way. List of available sub-generators can be found in the sub-generators section.

### Naming Conventions

Marionette generator comes with baked in code style guides and naming conventions. It is important that you know what some these conventions are before you start using the generator to keep the code consistent.

The most important is the difference between the **file naming conventions** and the **variable naminng coventions**. **Files** follow the **hypen case** (my-file-model.js) where **variables/contructors** follow the **camel case** (MyModel, MyCollection) conventions.

Note: In order for the generator to work properly each **sub-generator expects the file names  to be hyphen case** so it can automatically convert the name into the camel case when needed.

Templates (-t, --template) are also important. Generator is expecting from you that your custom template file will be in form `name-template.hbs` or `name-view-type-template.hbs`. Which means `name.hbs` will not work.

### Output Directory

All sub-generators place the generated output in the `app/scripts/apps` folder by default.
If the `--directory` option is not specified an empty directory will be created (named after the generated component).

```
$ yo mario:model my-model
```

will create a my-model folder as follows:

```bash
project-root/
  |- test/
  |- app/
    |- scripts/
      |- apps/
        |- my-model/              # feature folder
          |- my-model.js          # actual file
          |- my-model-test.js     # actual test file
```

### Option Flags

It is possible to change the default behavior of a sub-generator by specifying one or more of the following option flags.

- **--directory**, **-d** Outputs the generated content in an custom directory (can be non existent)
- **--model**, **-m** Takes an existing model (skips the model generation phase)
- **--itemview**, **--itv** Takes an existing item view (skips the item view generation phase)
- **--template**, **-t** Takes an existing template (skips the template generation phase)

**Controller sub-generator only:**

- **--collectionview**, **--clv** Takes an existing collection view (skips the collection view generation phase)
- **--compositeview**, **--cmv** Takes an existing composite view (skips the composite view generation phase)
- **--collection**, **-c** Takes an existing collection (skips the collection generation phase)

**Router sub-generator only:**

- **--controller**, **-c** Takes an existing controller (skips controller generation phase)

All these options have a *path* parameter. There are 2 ways you can specify a path to a file that mario generator accepts:

- relative to *project root* (in form of `app/scripts/apps/my-model/my-model.js`)
- relative to *feature folder* (`my-model.js` or `my-nested-folder/my-model.js`)

Note: Invoking sub-generators with path parameters only work from the project root folder. Otherwise it will mix the paths. It is also not possible to create files outside the *apps* folder. Invoking with path `app/scripts/my-custom/folder` will result in a custom `app/scripts/my-custom/folder` inside the *apps* directory.

## Sub-generators
All supported sub-generators with their descriptions can be found below:

- mario:model
- mario:collection
- mario:itemview
- mario:collectionview
- mario:compositeview
- mario:layoutview
- mario:router
- mario:controller
- mario:crud
- mario:widget

### Model
Model is generated via command:

`yo mario:model <model-name> [--directory <folder-name>]`

Generated file structure:

```
 <folder-name>/
      |- <model-name>-model.js
      |- <model-name>-model-test.js
```
### Collection
Collection is generated via command:

`yo mario:collection <collection-name> [--directory <folder-name> --model <model-name>]`

This command will generate only collection and collection test and it uses specified existed model.

Generated file structure:

```
 <folder-name>/
      |- <collection-name>-collection.js
      |- <collection-name>-collection-test.js
```

If you want to create also model to this collection, use the command:

`yo mario:collection <collection-name> [--directory <folder-name>]`

Generating collection with this command will cause also generating new model and its test.

Generated file structure:

```
 <folder-name>/
      |- <collection-name>-collection.js
      |- <collection-name>-collection-test.js
      |- <model-name>-model.js
```
### Item View
Item view is generated via command:

`yo mario:itemview <item-view-name> [--directory <folder-name> --template <itemview-template-name>]`

The <itemview-template-name> should be full name of already existing template. This will generate item view and reuse the specified template.

Generated file structure:

```
 <folder-name>/
      |- <item-view-name>-item-view.js
      |- <item-view-name>-item-view-test.js
```

Typing command without template flag will cause generating item view with new template.

`yo mario:itemview <item-view-name> [--directory <folder-name>]`

Generated file structure:

```
 <folder-name>/
      |- <item-view-name>-item-view.js
      |- <item-view-name>-item-view-test.js
      |- <item-view-name>-template.hbs
```
### Collection View
Collection view is generated via command:

`yo mario:collectionview <collection-view-name> [--directory <folder-name> --itemview <item-view-name>]`

This command will generate only collection-view and its test. As a child view there will be used specified item view.

Generated file structure:

```
 <folder-name>/
      |- <collection-view-name>-collection-view.js
      |- <collection-view-name>-collection-view-test.js
```

Collection view can be also generated without flags for child view and template:

`yo mario:collectionview <collection-view-name> [--directory <folder-name>]`

This command will generate also new item view as a child view and new template.

Generated file structure:

```
 <folder-name>/
      |- <collection-view-name>-collection-view.js
      |- <collection-view-name>-collection-view-test.js
      |- <item-view-name>-item-view.js
      |- <item-view-name>-item-view-test.js
      |- <item-view-name>-item-view-template.hbs
```
### Composite View
Collection view is generated via command:

`yo mario:compositeview <composite-view-name> [--directory <folder-name> --itemview <item-view-name> --template <compositeview-template-name>]`

The <compositeview-template-name> and <itemview-template-name> should be full names of already existing templates for composite view and for item view. This command will generate only collection-view and its test. As a child view there will be used specified item view, the for the template it will be used specified composite view template.

Generated file structure:

```
 <folder-name>/
      |- <composite-view-name>-composite-view.js
      |- <composite-view-name>-composite-view-test.js
```

Collection view can be also generated without flags for reusing item view and without reusing composite view template:

`yo mario:collectionview <collection-view-name> [--directory <folder-name>]`

This command will generate new item view, new item view template and new composite view template.

Generated file structure:

```
 <folder-name>/
      |- <composite-view-name>-composite-view.js
      |- <composite-view-name>-composite-view-test.js
      |- <composite-view-name>-composite-view-template.hbs
      |- <item-view-name>-item-view.js
      |- <item-view-name>-item-view-test.js
      |- <item-view-name>-template.hbs
```

### Layout View
Layout view is generated via command:

`yo mario:layoutview <layout-view-name> [--directory <folder-name> --template <layoutview-template-name>]`

Generated file structure:

```
 <folder-name>/
      |- <layout-view-name>-layout-view.js
      |- <layout-view-name>-layout-view-test.js
```

Layout view can be also generated without flag for reusing layout view template:

`yo mario:layoutview <layout-view-name> [--directory <folder-name>]`

This command will generate new item view, new item view template and new composite view template.

Generated file structure:

```
 <folder-name>/
      |- <layout-view-name>-layout-view.js
      |- <layout-view-name>-layout-view-test.js
      |- <layout-view-name>-layout-view-template.hbs
```

### Router
Router is generated via command:

`yo mario:router <router-name> [--directory <folder-name> --controller <controller-name>]`

This will generate only router and as a controller there will be used specified controller.

Generated file structure:

```
 <folder-name>/
      |- <router-name>-router.js
```

Second command for generation of router:

`yo mario:router <router-name> [--directory <folder-name>]`

This will generate router and also new controller.

Generated file structure:

```
 <folder-name>/
      |- <router-name>-router.js
      |- <controller-name>-controller.js
```
### Controller
A controller contains the logic behind your application. It controls views and data sent into and from the views. Controller is also responsible for communicating with other components of your application via the channeling system (Backbone.Radio).

A controller sub-generator is capable of generating template controller file. Using additional flags it enables you to import and initialize various views (item view, collection view, composite view) and feed them with appropriate data class (model or collection).

Controller is generated via command:

`yo mario:controller <controller-name> [--directory <folder-name>] [[-m <path-to-model> --itv <path-to-item-view] | [-c <path-to-collection> --clv <path-to-collectionview>] | [-m <path-to-model> -c <path-to-collection> --cmv <path-to-composite-view>]]`

Generated file structure:

```
 <folder-name>/
      |- <controller-name>-controller.js
```
### Crud

Generate crud feature with:
`yo mario:crud <crud-name> [--directory <folder-name>]`

CRUD stands for
- create
- read
- update
- delete

This sub-generator will generate:
- model (to hold single item)
- item view (to display a single item - model)
- item template
- collection (to hold multiple items)
- composite view (to display items in the list - collection)
- composite template
- create item view (holds the form for creating new items - models)
- create item template
- detail item view (holds the form for editing/deleting existing items)
- detail item template
- router (to define routes for various operations eg. create, list, detail)
- controller (to wire up all the previous components)

This sub-generator will also take care of registering the controller(that handles all its dependencies) inside the *app.js* file (amd/import, instantiation).

The newly generated feature will have its name a route prefix.

`yo mario:crud projects`

will result in

`your-domain/projects/(list | create | detail)`

routes.

### Widget
Generate widget feature with:
`yo mario:widget <widget-name> [--directory <folder-name>]`

Widget is mix of several backbone and marionette building blocks.
 
 This sub-generator will generate:
- model (to hold single item)
- collection (to hold multiple items)
- composite view (to display items in the list - collection)
- composite template
- item view (to display a single item in a list )
- item view template
- controller (to wire up all the previous components)
- router (to define route to access widget)
  
In additional to that it links those blocks together but it doesn't register router in app.js (as crud subgenerator) so you have to do it manually together with model and collection fetching.



## Task Runner

The Marionette generator offers you Grunt and Gulp. Project skeleton generated by invoking `yo mario` contains a pre-configured *Gruntfile* or *Gulpfile* (depending on your choice) with several stages. The Webpack option utilizes Grunt as its task runner and delegates most of the tasks to Webpack. Those are listed below:

- *serve* (launches http-server, opens browser and setups live reload for development)
- *test* (run a pre-configured karma runner)
- *beautify* (beautifies the code and checks for jscs and jshint errors)
- *verify* (checks for formatting, jscs and jshint errors)
- *analyze* (checks only for jscs and jshint errors)
- *build* (builds the project into a dist/ folder)

## ECMAScript 2015(6)

The Marionette generator has option to build your project skeleton with ECMAScript 2015(6) by choosing Grunt as your Task Runner. Gulp and Webpack don't have this option for now. Every configuration file in skeleton is adjusted so you are free to use it with no worries. Besides skeleton every sub-generator can generate component in ES6 version. For this purpose it's using Babel transpiler.

## A Simple Example

Whenever you are starting a project from scratch it is a good idea to scaffold the project skeleton to speed up the initial phase of the project as well as to enforce some best practices, standards and conventions.

Using JavaScript and its tool ecosystem can produce a code with lots of boiler plate code. Marionette generator allows you to generate the boilerplate code therefore speeding up the development.

Marionette generator does this in an opinionated way that we think is a way for creating large scalable enterprise applications.

### Scaffolding Initial Project Structure

We start with creating a empty directory where all of out generated code will be placed. Lets say that the project's base folder will be called *Fruit Project*. The generator expects us to use hypen-case naming convention for files, so to stay consistent, we'll use *frunt-project* as the name for the folder:

```bash
# create a empty folder
$ mkdir fruit-project

# change current directory to our newly created folder
$ cd fruit
```

Now we are ready to make the initial scaffold of the project.

```bash
# start the base generator
$ yo mario
```

The generator now asks several questions like the app name etc.

```
? How would you like to name your application? (mario-app) fruit-app
fruit-app
? What build tool would you like to use? grunt
? Which version of ECMAScript Standard would you like to use? ECMAScript 5 (ES5)
? Where would you like to store your test files? Separately
? Would you like to include Arcanist config files? No
create bower.json
create package.json
create Gruntfile.js
create karma.conf.js
create .jsbeautifyrc
create .gitignore
create .bowerrc
...

I'm all done. Running npm install & bower install for you to install the required dependencies. If this fails, try running the command yourself.
```

Base generator is done generating and initiated dependency download (you can skip the download by invoking the *yo* command with a *--skip-install* flag). After the installation completes you'll have a initial project skeleton ready.

### Additional Scaffolding
Now that we have our project base we can start writing code. The initial scaffold saved us some effort, the project is structured in a nice way and we have enforced some coding standards and conventions from the beginning. But what will happen from now on. Developers can start writing the code they want to and the whole "enforcing" standards thing has gone to waste.

This is where the sub-generators come in play. We can use various sub-generators to continue enforcing the standards and convention even skipping the development of boilerplate code.

Let us start with a simple model
```bash
$ yo mario:model fruit

create app\scripts\apps\fruit\fruit-model.js
create app\scripts\apps\fruit\fruit-model-test.js
```

The model sub-generator generated 2 files, model and a dummy test for the model. We did not specify directory in which the generator should put the files, so it created an empty directory with the same name as the model a put the stuff there. Also notice that the generator automatically added *-model* suffix to the file name.

Next lets create a collection that will use our *fruit-model*.

```bash
$ yo mario:collection fruit -m fruit-model

create app\scripts\apps\fruit\fruit-collection.js
create app\scripts\apps\fruit\fruit-collection-test.js
```

Again we got 2 new files a collection and a test for the collection. Notice that the collection is generated in the same directory as the model. This is because we did not specify the directory and the names (for the model and the collection) are the same e.g. *fruit*.

We could have specified the model in collection sub-generator in multi ways.
```bash
# generate a collection named fruit in the default directory (fruit in this case)
$ yo mario:collection fruit -m fruit
$ yo mario:collection fruit -m fruit-model
$ yo mario:collection fruit -m fruit-model.js
$ yo mario:collection fruit -m app/scripts/apps/fruit/fruit-model
$ yo mario:collection fruit -m app/scripts/apps/fruit/fruit-model.js
```

All of the above are equivalent for the particular case with name *fruit*.

OK, so we have the model and collection that uses the model. This is all great but, as we need to display the data somehow, we are going to create a item view for single model and then a collection view which will allow us to display an entire collection of models.


```bash
$ yo mario:itemview fruit
create app\scripts\apps\fruit\fruit-item-view.js
create app\scripts\apps\fruit\fruit-item-view-template.hbs
create app\scripts\apps\fruit\fruit-item-view-test.js
```

This time we got 3 files out of the generator. This is because item view creates a dummy template when there is no template specified as the option flag (-t).

Just for the sake of demonstration, we'll put the collection view in a separate directory. Keep in mind that it is encouraged to have all feature related files in the same flat directory, as long as possible (you may end up refactoring the feature code into several directories when the complexity / number of files grows).

```bash
$ yo mario:collectionview fruit -d fruit/list --itv fruit/fruit-item-view
create app\scripts\apps\fruit\list\fruit-collection-view.js
create app\scripts\apps\fruit\list\fruit-collection-view-test.js
```

Again we got component file and a test for it. And once more we could have specified the directory & view option paths multiple ways. Here are some equivalent notations:

```bash
# generate collection view with name fruit (collection postfix gets added automatically), in fruit/list directory with item view name fruit(-item-view) from the fruit directory
$ yo mario:collectionview fruit -d app/scripts/apps/fruit/list --itv fruit/fruit

$ yo mario:collectionview fruit -d fruit/list --itv fruit/fruit
$ yo mario:collectionview fruit -d fruit/list --itv fruit/fruit-item-view
$ yo mario:collectionview fruit -d fruit/list --itv fruit/fruit-item-view.js
```

Now that we have all the boiler code generated we want to put all these components together and display a list of fruits. We need to modify app.js file to be able to do that.

Import both collection and collection view.

*app/scripts/app.js*:
```javascript
define([
    ...
    'apps/fruit/list/fruit-collection-view',
    'apps/fruit/fruit-collection'
], function (
    ...
    FruitCollectionView,
    FruitCollection
) {
```

Fill the collection with some sample data and feed the collection into a new collection view, *app/scripts/app.js*:

```javascript
var initializeUI = function () {
        var rootView = new MainLayoutView();
        rootView.render();

        var collection = new FruitCollection([{id: 1, name: 'apple'}, {id:2, 'name': 'banana'}]);
        rootView.contentRegion.show(new FruitCollectionView({collection: collection}));
    };
```

The last thing to do is to modify the fruit template to show the name of the fruit, *app/scripts/apps/fruit-item-view-template*:
```html
<div>
  <h2>{{id}} - {{name}}</h2>
</div>
```

Now run the **grunt serve** task and you should be able to see a list of 2 items (apple & banana) in it.

You can edit the code further to add more functionality like forms, event handling etc. Ideally we would have created a controller an instantiated all our feature related components inside of it so *app.js* would not have to care about the implementation details, but for the demo it is enough.

## License

MIT
=======
Comming soon. Stay tuned.
>>>>>>> 534b506801dd223698da04bfe1fb1836378d15b5
