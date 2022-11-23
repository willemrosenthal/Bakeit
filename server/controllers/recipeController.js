const Recipe = require('../schemas/recipeSchema');

const recipeController = {}

// create cookie with session ID
recipeController.getAllRecipes = async (req, res, next) => {
  console.log('try get recipies')
  // create cookie with the user's ID
  try {
    // finds all recipes, sroting them by upvotes and downvotes
    const all = await Recipe.find().sort( { "up": 1, "down": -1}); // maybe sort by aggregate instead?
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

// check if logged in by looking at cookie
recipeController.serveRecipe = async (req, res, next) => {
  try {
    const topChoices = await Recipe.find().sort({'votes':1}).limit(2);
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