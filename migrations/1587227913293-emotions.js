require('../services/mongoose');

const Emotion = require('../models/emotion');

async function up () {

  const emotions = [
    new Emotion({ _id: 1, name: 'Depressed' }),
    new Emotion({ _id: 2, name: 'Bored' }),
    new Emotion({ _id: 3, name: 'happy' }),
    new Emotion({ _id: 4, name: 'Optimistic' })
  ];
  
  try {
    const res = await Emotion.create(emotions)
    
    if(!res) throw 'Failed to insert Emotions';

    console.log('Inserted All emotions');

  } catch(err) {
    console.log('Failed inserting Emotions', err)
  }

}

async function down () {
  try {
    await Emotion.collection.drop();
    
    console.log('Dropped emotions');

  } catch(err) {
      console.log('Failed to Drop Emotions', err)
  }
}

module.exports = { up, down };
