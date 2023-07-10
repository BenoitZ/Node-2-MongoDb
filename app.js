// MONGO DB-------------------------------------------------------

// require('dotenv').config();
// const { MongoClient } = require('mongodb');
// const client = new MongoClient(process.env.MONGO_URL);
                    
//                     // on configure la connection à la base de données
// async function main() {
//     await client.connect();
//                     // !!! si il s'agit d'une promise, il faut obligatoirement un async/await
//                     //on utilise en général un try catch avec async await
//     console.log('Connection OK !');
//     const db = client.db('myTask');
//     const collection = db.collection('document');
     
//                     //Create
//     try {
//         const insertData = await collection.insertMany([
//             {
//                 name: 'David',
//                 age: 65,
//                 sexe: 'homme',
//                 hobby: 'brainless'
//             },
//             {
//                 name: 'Justine',
//                 age: 5,
//                 sexe: 'homme',
//                 hobby: 'cubes'
//             },
//             {
//                 name: 'Romain',
//                 age: 45,
//                 sexe: 'homme',
//                 hobby: 'lessbrain'
//             },
//             {
//                 name: 'Jerome',
//                 age: 65,
//                 sexe: 'homme',
//                 hobby: 'brainless'
//             }
//         ])
//         console.log("Docs inséréts" , insertData);
        
//     } catch (err) { throw err; }

//                     // Read
//     try {
//         const findData = await collection.findOne({name: 'David'});
//         console.log("Docs trouvés", findData); 
//                     // Retourne tout l'objet avec le nom contenant David  

//         const findMultipleData = await collection.find({age: 65});
//         console.log(await findMultipleData.toArray());   
//                     //dans le log - c'est une demande de promesse donc l'on met await
//                     //la promesse sera retournée en temps qu'objet donc on le converti en array avec la fonction toArray    
//     } catch (err) { throw err; }

//                     //Update
//     try {
//             // const updateJerome = collection.updateOne(
//             //     {name: 'Jerome'}, {$set: {name: 'Pauline', sexe: 'Femme'}})
//             //     console.log(await updateJerome);

//             const updateAge = collection.updateMany(
//                 {age: 65}, {$set: {age: 36}})
//                 console.log(await updateAge);
        
//     } catch (err) { throw err; }

//                     //Delete
//     try {
//         const deletePauline = await collection.deleteOne({name: 'Pauline'})
//         console.log(await deletePauline);

//         const deleteTout = await collection.deleteMany({age: 65})
//         console.log(await deleteTout);
        
//     } catch (err) { throw err; }
        
//     return 'done';
//     }

// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());


//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------



// MONGOOSE-------------------------------------------------------

require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(process.env.MONGO_URL);

    const User = mongoose.model('User', {
        // name: {
        //     type: String,
        //     required: true
        //         //required -> obligatoire
        // },
        // age: {
        //     type: Number,
        //     required: true,
        //     validate(v) {
        //         if (v < 0) {throw new Error('age doit étre positif')}}   
        //         // on crée une grosse condition avec validate pour plus de controle sur la colonne age
        // }

        email: {
            type: String,
            required: true,
            validate(v){
                if(!validator.isEmail(v)){throw new Error('Email non valide')};
                        //!!!! sur la page npm validator, de trés nombreuses options avec validaor
            }
        },
        password: {
            type: String,
            required: true, 
            validate(v){
                if(!validator.isLength(v, {min:4, max: 20}))
                        {throw new Error('Le mot de passe doit étre entre 4 et 20 caractére')};
            }
        }

    });

    const firstPeron = new User({
        email: 'Alvin@gmail.com',
        password: 'passsss' 
    })

    const secondPerson = new User({
        email: 'Aalvin@gmail.com',
        password: 'paassss' 
    });
    
    const firstSave = await firstPeron.save();
    const secondSave = await secondPerson.save();
    
    console.log(firstPeron, secondPerson);
}


//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------