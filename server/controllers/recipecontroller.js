import { Recipe } from '../models';

class HandleRecipeRequest {
    static addRecipe(request, response, next) {
        const recipeObject = {
            userId: request.decoded.userID,
            name: request.body.name,
            origin: request.body.origin,
            description: request.body.description,
            ingredients: null,
            instructions: null,
            review: null,
            voteCount: 0
        };

        return Recipe
            .create(recipeObject)
            .then((recipe) => {
                return response.status(200).send({
                    message: 'Recipe was created successfully',
                    data: recipe
                });
            })
            .catch((error) => {
                next(new Error(error.name));
            });
    }

    static modifyRecipe(request, response, next) {

    }

    static deleteRecipe(request, response, next) {

    }

    static getAllRecipes(request, response, next) {
        if ((request.query.sort === 'upvotes') && (request.query.order === 'decs')) {

        } else {

        }
    }
}