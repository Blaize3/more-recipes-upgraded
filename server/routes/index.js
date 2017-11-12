// import express from 'express';
import HandleUserRequests from '../controllers/usercontroller';
import HandleRecipeRequest from '../controllers/recipecontroller';

import AuthenticatedUser from '../controllers/middleware/isauthenticated';

// const router = express.Router();

// router.get('/', (request, response) => {
//     response.status(200).send({
//         message: 'Welcome to more recipes!!!'
//     });
// });

// router.post('/users/signup', HandleUserRequests.signup);


export default (app) => {
    app.get('/', (request, response) => {
        response.status(200).send({
            message: 'Welcome to more recipes!!!'
        });
    });

    app.post('/api/v1/users/signup', HandleUserRequests.signup);

    app.post('/api/v1/users/signin', HandleUserRequests.signin);

    app.put('/api/v1/users/password', HandleUserRequests.password);

    app.post('/api/v1/recipes', AuthenticatedUser.isAuthenticated, HandleRecipeRequest.addRecipe);
};