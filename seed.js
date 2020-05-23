var User = require('./models/user');
var CounterModel = require('./models/counter');

var seedData = [
    {
        firstName: "albert",
        lastName: "einstein",
        email: "ae@relativity.com"
    },
    {
        firstName: "marie",
        lastName: "curie",
        email: "mc@radiation.com"
    },
    {
        firstName: "issac",
        lastName: "newton",
        email: "in@gravity.com"
    },
    {
        firstName: "galileo",
        lastName: "galilei",
        email: "gg@astronomy.com"
    }

];

var seedUsers = async () => {
    try {
        /** check if already populated */
        const usersCollection = await User.find()
        if (usersCollection.length > 0) {
            return
        } else {
            seedData.forEach(user => {
                User.create(user)
            })
            console.log('Users Collection has been Populated!');
        }

    } catch (error) {
        console.log(error)
    }
}


var seedConterData =
    { "_id": "userid", "sequence_value": 1 }


exports.seedCounterUsers = async () => {
    try {
        /** check if already populated */
        const counterCollection = await CounterModel.find()
        console.log("counterCollection", counterCollection);
        if (counterCollection.length > 0) {
            return
        } else {
          await  CounterModel.create(seedConterData)
          seedUsers();
            console.log('Users Counter Collection has been Populated!');
        }

    } catch (error) {
        console.log(error)
    }
}