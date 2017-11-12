import { Recipe } from '../models';
import RecipeInputValidator from './middleware/recipevalidator';

class HandleRecipeRequest {
    static addRecipe(request, response, next) {

        const recipeObject = {
            userId: request.decoded.userID,
            name: request.body.name,
            origin: request.body.origin,
            description: request.body.description,
            ingredients: request.body.ingredients,
            instructions: request.body.instructions,
            review: [],
            voteCount: 0
        };
        console.log('this is ' + request.decoded.userID);
        const isValidInput = RecipeInputValidator.addRecipeValidators(recipeObject);
        if (isValidInput.isNotValid) {
            console.log(validateAccountCreateObject.isNotValid);
            return response.status(400).send({
                message: `${validateAccountCreateObject.errorCount} input fields data are not properly set`,
                data: validateAccountCreateObject.errorMessage
            });
        } else {
            return Recipe
                .create(recipeObject)
                .then((recipe) => {
                    return response.status(200).send({
                        message: 'Recipe was created successfully',
                        data: recipe
                    });
                })
                .catch((error) => {
                    // next(new Error(error.name));
                    return response.status(500).send({
                        error
                    });
                });
        }
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

export default HandleRecipeRequest;