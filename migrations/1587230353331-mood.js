require('../services/mongoose');

const Mood = require('../models/mood');

async function up () {

  const Moods = [
    new Mood({ _id: 1, name: 'Crying', color: '#357DED' }),
    new Mood({ _id: 2, name: 'Angry', color: '#7EACF3' }),
    new Mood({ _id: 3, name: 'Sad', color: '#B5CFF8' }),
    new Mood({ _id: 4, name: 'Meh', color: '#F8AA39' }),
    new Mood({ _id: 5, name: 'Okay', color: '#5AC746' }),
    new Mood({ _id: 6, name: 'Happy', color: '#00C71E' }),
    new Mood({ _id: 7, name: 'Ecstatic', color: '#06b120' })
  ];
  
  try {
    const res = await Mood.create(Moods)
    
    if(!res) throw 'Failed to insert Moods';

    console.log('Inserted All Moods');

  } catch(err) {
    console.log('Failed inserting Moods', err)
  }

}

async function down () {
  try {
    await Mood.collection.drop();
    
    console.log('Dropped Moods');

  } catch(err) {
      console.log('Failed to Drop Moods', err)
  }
}

module.exports = { up, down };

