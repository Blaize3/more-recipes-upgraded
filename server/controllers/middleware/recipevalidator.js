class RecipeInputValidators {
    static addRecipeValidators(recipeObject) {
        let errorCount = 0;
        let errorMessage = 'Input error: \n';
        let hasFailed = false;
        let isValidResult;
        const ingredients = [];
        const instruction = [];

        // Validate Recipe userId field
        if (typeof(recipeObject.userId) !== 'number') {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe creator's id field must be a number,\n`
        } else if (recipeObject.userId === '') {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe creator's id field cannot be empty,\n`
        } else if (recipeObject.userId === null) {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe creator's id field cannot be null,\n`
        } else if (recipeObject.userId === undefined) {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe creator's id field was ommitted,\n`
        }

        console.log('This is recipe ' + recipeObject.userId);


        // Validate Recipe name field
        if (typeof(recipeObject.name) !== 'string') {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe's name field must be a string,\n`
        } else if (recipeObject.name === '') {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe's name field cannot be empty,\n`
        } else if (recipeObject.name === null) {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe's name field cannot be null,\n`
        } else if (recipeObject.name === undefined) {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe's name field was ommitted,\n`
        }

        // Validate Recipe origin field
        if (typeof(recipeObject.origin) !== 'string') {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe's origin field must be a string,\n`
        } else if (recipeObject.origin === '') {
            recipeObject.origin = "";
        } else if (recipeObject.origin === null) {
            recipeObject.origin = "";
        } else if (recipeObject.origin === undefined) {
            recipeObject.origin = "";
        }

        // Validate Recipe description field
        if (typeof(recipeObject.description) !== 'string') {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe's description field must be a string,\n`
        } else if (recipeObject.description === '') {
            recipeObject.description = "";
        } else if (recipeObject.description === null) {
            recipeObject.description = "";
        } else if (recipeObject.description === undefined) {
            recipeObject.description = "";
        }

        // Validate Recipe ingredients field
        if (typeof(recipeObject.ingredients) !== 'string') {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe's ingredients field must be a string,\n`
        } else if (recipeObject.ingredients === '') {
            recipeObject.ingredients = [];
        } else if (recipeObject.ingredients === null) {
            recipeObject.ingredients = [];
        } else if (recipeObject.ingredients === undefined) {
            recipeObject.ingredients = [];
        } else {
            recipeObject.ingredients = recipeObject.ingredients.split(',');
        }

        // Validate Recipe instructions field
        if (typeof(recipeObject.instructions) !== 'string') {
            hasFailed = true;
            errorCount = errorCount + 1;
            errorMessage = errorMessage + `recipe's ingredients field must be a string,\n`
        } else if (recipeObject.instructions === '') {
            recipeObject.instructions = [];
        } else if (recipeObject.instructions === null) {
            recipeObject.instructions = [];
        } else if (recipeObject.instructions === undefined) {
            recipeObject.instructions = [];
        } else {
            recipeObject.instructions = recipeObject.instructions.split(',');
        }

        isValidResult = {
            isNotValid: hasFailed,
            errorCount,
            errorMessage
        };

        return isValidResult;
    }

    // static signupValidators(recipeObject) {}
}

export default RecipeInputValidators;