var User = require('../models/user');
var express = require('express');

var router = express.Router();

//this api will create new user in DB
router.post('/user', async (req, res) => {
    var jsondata = req.body;
    console.log('-------DATA-----', jsondata);
    try {

        if (jsondata.firstName == null || (typeof jsondata.firstName === 'undefined')) {
            res.status(422).send({
                status: 422,
                message: 'missing parameter firstName'
            });
        } else if (jsondata.lastName == null || (typeof jsondata.lastName === 'undefined')) {
            res.status(422).send({
                status: 422,
                message: 'missing parameter lastName'
            });
        } else if (jsondata.email == null || (typeof jsondata.email === 'undefined')) {
            res.status(422).send({
                status: 422,
                message: 'missing parameter email'
            });
        } else {

            const userAlreadyExists = await User.findOne({
                'email': jsondata.email
            });
            if (userAlreadyExists != null && userAlreadyExists.id != null) {
                res.status(409).send({
                    message: 'User with this email already exists',
                    status: 409
                });

            } else {

                const createUserResult = await User.create(jsondata);

                res.status(200).send({
                    message: 'User Created successfully',
                    status: 200,
                    data: createUserResult
                });


            }
        }


    } catch (error) {
        console.log(error);
        res.send(error);
    } finally {
        console.log('finally block');
    }

})

//this api will retrive specific user details
router.get('/user/:id', async (req, res) => {
    var userid = req.params.id;
    console.log('-------DATA-----', userid);
    try {

        if (userid == null || (typeof userid === 'undefined')) {
            res.status(422).send({
                status: 422,
                message: 'missing parameter id'
            });
        } else {
            const users = await User.findById(userid);
            res.status(200).send({
                message: 'users data retrived success',
                status: 200,
                data: users
            });
        }

    } catch (error) {
        console.log(error);
        res.send(error);
    } finally {
        console.log('finally block');
    }


});

//get all users data
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({
            message: 'All users data retrived success',
            status: 200,
            data: users
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    } finally {
        console.log('finally block');
    }
});

//this api will retrive specific user details
router.get('/user/:id', async (req, res) => {
    var userid = req.params.id;
    console.log('-------DATA-----', userid);
    try {

        if (userid == null || (typeof userid === 'undefined')) {
            res.status(422).send({
                status: 422,
                message: 'missing parameter id'
            });
        } else {
            const users = await User.findById(userid);
            res.status(200).send({
                message: 'users data retrived success',
                status: 200,
                data: users
            });
        }

    } catch (error) {
        console.log(error);
        res.send(error);
    } finally {
        console.log('finally block');
    }


});

//this api will update specific user details
router.put('/user/:id', async (req, res) => {
    var userid = req.params.id;
    var jsondata = req.body;
    console.log('-------DATA-----', userid);
    try {

        if (userid == null || (typeof userid === 'undefined')) {
            res.status(422).send({
                status: 422,
                message: 'missing parameter id'
            });
        } else {
            const users = await User.findById(userid);
            if (users != null && users.id != null) {
                const updateResult = await users.updateOne(jsondata);
                res.status(200).send({
                    message: 'users data update success',
                    status: 200,
                    data: updateResult
                });

            } else {
                res.status(404).send({
                    message: 'users not found',
                    status: 404
                });

            }

        }

    } catch (error) {
        console.log(error);
        res.send(error);
    } finally {
        console.log('finally block');
    }


});

//this api will delete specific user details
router.delete('/user/:id', async (req, res) => {
    var userid = req.params.id;
    console.log('-------DATA-----', userid);
    try {

        if (userid == null || (typeof userid === 'undefined')) {
            res.status(422).send({
                status: 422,
                message: 'missing parameter id'
            });
        } else {
            const users = await User.findById(userid);
            if (users != null && users.id != null) {
                const deleteResult = await User.deleteOne({ _id: userid });
                res.status(200).send({
                    message: 'users deleted success',
                    status: 200,
                    data: deleteResult
                });

            } else {
                res.status(404).send({
                    message: 'users not found',
                    status: 404
                });

            }

        }

    } catch (error) {
        console.log(error);
        res.send(error);
    } finally {
        console.log('finally block');
    }


});

//get all users data
router.get('/typeahead/:input', async (req, res) => {
    try {
        let q = req.params.input;
        let query = {
            "$or": [{
                "firstName": {
                    "$regex": q,
                    "$options": "i"
                }
            }, {
                "lastName": {
                    "$regex": q,
                    "$options": "i"
                }
            },{
                "email": {
                    "$regex": q,
                    "$options": "i"
                }
            }]
        };
        let output = [];

        await User.find(query).limit(6).then(usrs => {
            if (usrs && usrs.length && usrs.length > 0) {
                usrs.forEach(user => {                    
                    let obj = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }
                    output.push(obj);
                });
            }
            res.json(output);
        }).catch(err => {
            res.sendStatus(404);
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    } finally {
        console.log('finally block');
    }
});

router.get('/user/:id', async (req, res) => {
    var userid = req.params.id;
    console.log('-------DATA-----', userid);
    try {

        if (userid == null || (typeof userid === 'undefined')) {
            res.status(422).send({
                status: 422,
                message: 'missing parameter id'
            });
        } else {
            const users = await User.findById(userid);
            res.status(200).send({
                message: 'users data retrived success',
                status: 200,
                data: users
            });
        }

    } catch (error) {
        console.log(error);
        res.send(error);
    } finally {
        console.log('finally block');
    }


});

module.exports = router;