//20 NOUVEAU PROJET avec MONGODB
                    //Création app.js
                    //npm init -y
                    //connection mongodb https://www.mongodb.com/products/platform/cloud
                    //menu en haut à gauche - selectionner organization
                    //Projects -> New Projects -> le nom -> next -> accés -> Create Projects
                    //Build a database - Create Free - Page Cluster - Free/provider/Region Paris/Nom cluster - Create Cluster
                    //QUICKSTART (on peut configurer avec quickstart ou bien aller à gauche dans DATABASE ACCESS)
                    //DATABASE ACCESS - new user
                    //Dans database access - clique connect sur la database - dans password - le nom du user - générer un password automatiquement - build in role/write and read db - clique Add User
                    //NETWORK ACCESS - Add ip adress - Allow access from anywhere - confirm
                    // dans DATABASE - connect - connect your application - on garde l'url du projet de coté
        
                    //npm i mongodb
                    //require
                    //on entre les identifiants dans les variables d'environement (URL avec le mot de passe à méttre à la place de password dans l'url)
                    //on a besoin du module dotenv pour pouvoir utiliser les variables d'environement dans le app (process.env)

//-----------MONGO DB  dans app.js
require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);
                    
                    // on configure la connection à la base de données
async function main() {
    await client.connect();
                    // async obligatoire en début de fonction à chaque fois que l'on veut utiliser await
                    // quand on veut attendre que quelque chose se passe, on utilise await
                    // await : on veut 'attendre' que le client soit connécté avant de passer à la suite

    console.log('Connection OK !');
    const db = client.db('myTask');
                    //on entre un nom à la base de données
    const collection = db.collection('document');
                    //on crée une collection(table pour nosql) que l'on nomme document
    const insertStuff = await collection.insertMany([{a: 1},{b: 2},{c: 3},{d: 4}])
                    //on entre des données dans la collection document
    console.log(`Documents insérés ${insertStuff}`);
                    return 'done';
}

main()
    .then(console.log)
    .catch(console.error)
                    //finally : indique ce que l'on veut faire à la fin de notre promise ou fonction
    .finally(() => client.close());
                    //.close -> termine la connexion à notre client


//-------------------------



//21 UN CRUD AVEC MONGO DB
                    //dans la doc sur site mongo db apidoc - quickstart - toutes sortes de code/requétes etc...
                    ET SURTOUT TOUT CE QUI SE TROUVE DANS LA CLASSE COLLECTION !

require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);
                    
                    // on configure la connection à la base de données
async function main() {
    await client.connect();
                    // !!! si il s'agit d'une promise, il faut obligatoirement un async/await
                    //on utilise en général un try catch avec async await
    console.log('Connection OK !');
    const db = client.db('myTask');
    const collection = db.collection('document');
     
                    //Create
    try {
        const insertData = await collection.insertMany([
            {
                name: 'David',
                age: 65,
                sexe: 'homme',
                hobby: 'brainless'
            },
            {
                name: 'Justine',
                age: 5,
                sexe: 'homme',
                hobby: 'cubes'
            },
            {
                name: 'Romain',
                age: 45,
                sexe: 'homme',
                hobby: 'lessbrain'
            },
            {
                name: 'Jerome',
                age: 65,
                sexe: 'homme',
                hobby: 'brainless'
            }
        ])
        console.log("Docs inséréts" , insertData);
        
    } catch (err) { throw err; }

                    // Read
    try {
        const findData = await collection.findOne({name: 'David'});
        console.log("Docs trouvés", findData); 
                    // Retourne tout l'objet avec le nom contenant David  

        const findMultipleData = await collection.find({age: 65});
        console.log(await findMultipleData.toArray());   
                    //dans le log - c'est une demande de promesse donc l'on met await
                    //la promesse sera retournée en temps qu'objet donc on le converti en array avec la fonction toArray    
    } catch (err) { throw err; }

                    //Update
    try {
            // const updateJerome = collection.updateOne(
            //     {name: 'Jerome'}, {$set: {name: 'Pauline', sexe: 'Femme'}})
            //     console.log(await updateJerome);

            const updateAge = collection.updateMany(
                {age: 65}, {$set: {age: 36}})
                console.log(await updateAge);
        
    } catch (err) { throw err; }

                    //Delete
    try {
        const deletePauline = await collection.deleteOne({name: 'Pauline'})
        console.log(await deletePauline);

        const deleteTout = await collection.deleteMany({age: 65})
        console.log(await deleteTout);
        
    } catch (err) { throw err; }
        
    return 'done';
    }

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());



//22 MONGOOSE
                    // Mongoose est un ODM -> modélise tout ce qui est sur node
                    // Moongose simplifie tout ce qui est validation et creation de modéle de base données pour mongo
                    // par ex -> spécifier la taille, le type... d'une colonne sur une db  

                    //npm i mongoose - require
                    //on établit la connection avec l'url déja fournit par mongo db
require('dotenv').config();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

            //on établit la connection
async function main(){
    await mongoose.connect(process.env.MONGO_URL);

            //on crée un modéle
    const User = mongoose.model('User', {
            //nom du modéle en majuscule - fonction model (nom, callback)
            name: String,
            age: Number
    });


    const firstPeron = new User({
            // on instancie notre modéle pour lui rentrer des données
        name: 'Alvin',
        age: 65 
    })

    const secondPerson = new User({
        name: 'Jaco',
        age: 35 
    });
    console.log(firstPeron, secondPerson);

            //et on envoi les données à mongodb avec save()
    await firstPeron.save();
    await secondPerson.save();

            //ce que l'on retrouve sur mongo db -> il a crée automatiquement une nouvelle collection avec le nom test
            // et il a mis les deux objets (first/secondperson dedans)
}


//23 MONGOOSE CRÉATION D'UNE COLLECTION IDENTIFIANTS/VALIDATION DES DONNÉES
            //npm i validator (pour valider mail et mdp)

