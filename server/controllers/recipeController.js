const Recipe = require('../schemas/recipeSchema');

const recipeController = {}

// create cookie with session ID
recipeController.getAllRecipes = async (req, res, next) => {
  console.log('try get recipies')
  // create cookie with the user's ID
  try {
    // finds all recipes, sroting them by upvotes and downvotes
    const all = await Recipe.find().sort( { "aggregate": -1, 'votes': -1}); // maybe sort by aggregate instead?
    console.log('all recipes found:', all);
    res.locals.recipes = all;
  }
  catch {
    next({
      log: 'error: recipeController.getAllRecipes',
      status: 500,
      message: {err: 'error in recipeController.getAllRecipes'}
    })
  }
  return next();
}

// chooses a recipe to serve
recipeController.serveRecipe = async (req, res, next) => {
  console.log('trying to find a recipe to serve...')
  try {
    // only gets the 3 least raited recipies.. this should be more dynamic
    const topChoices = await Recipe.find().sort({'votes':1}).limit(3);
    if (topChoices.length > 0) {
      // choose one at random from this list
      res.locals.serve = topChoices[Math.floor(Math.random() * topChoices.length)];
    }
    // if there are no recipies, return an empty array
    else {
      res.locals.serve = false;
    }
    return next();
  }
  catch {
    next({
      log: 'error: recipeController.serveRecipe',
      status: 500,
      message: {err: 'error in recipeController.serveRecipe'}
    })
  }
}

recipeController.vote = async (req, res, next) => {
  try {
    console.log('req id:', req.params.id);
    console.log('to update', req.body);

    const update = { 
      up: req.body.up,
      down: req.body.down,
      aggregate: req.body.aggregate,
      votes: req.body.votes,
    };

    const result = await Recipe.findByIdAndUpdate(req.params.id, update);

    console.log('updated recipe to:', update, ' prev:', result);
    return next();
  }
  catch {
    next({
      log: 'error: recipeController.vote',
      status: 500,
      message: {err: 'error in recipeController.vote'}
    })
  }
}

// gets a single recipe by id
recipeController.getRecipe = async (req, res, next) => {
  try {
    console.log('req id:', req.params.id)

    const recipe = await Recipe.findById(req.params.id);
    res.locals.recipe = recipe;

    console.log('found recipe:', recipe);
    return next();
  }
  catch {
    next({
      log: 'error: recipeController.serveRecipe',
      status: 500,
      message: {err: 'error in recipeController.serveRecipe'}
    })
  }
}

// delete recipe
recipeController.deleteRecipe = async (req, res, next) => {
  console.log('TRY DELETE');
  try {
    console.log('delete resipe by id:', req.params.id)

    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    res.locals.recipe = deletedRecipe;
    return next();
  }
  catch (err) {
    next({
      log: 'error: recipeController.deleteRecip',
      status: 500,
      message: {err: 'error in recipeController.deleteRecip'}
    })   
  }
}

// check if logged in by looking at cookie
recipeController.submitRecipe = async (req, res, next) => {
  const r = req.body;
  console.log('submission: ', r);

  try {
    await Recipe.create({
      name: req.body.name,
      type: req.body.type,
      ingrediants: req.body.ingrediants,
      instructions: req.body.instructions,
      notes: req.body.notes,
      creator: res.locals.username,
      creatorID: req.cookies.ssid,
      up: 0,
      down: 0,
      aggregate: 0,
      votes: 0
    })
    return next();
  }
  catch (err) {
    return next({
      log: 'userController.createUser failure',
      status: 400,
      message: {err:`userController.createUser fail ${err}`}
    });
  };
}


module.exports = recipeController;