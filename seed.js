const { db, Gardener, Plot, Vegetable } = require('./models');

db.sync({ force: true })
  .then(() => {
    console.log('Database synced!');
    //one return for 5 veggies
    //promise.all
    const carrotP = Vegetable.create({
      name: 'Carrot',
      color: 'purple',
      planted_on: Date.now()
    });
    const pepperP = Vegetable.create({
      name: 'Pepper',
      color: 'green',
      planted_on: Date.now()
    });
    const kaleP = Vegetable.create({
      name: 'Kale',
      color: 'purple / green',
      planted_on: Date.now()
    });
    const veggiesP = [carrotP, pepperP, kaleP];
    console.log('Veggies created');
    return Promise.all(veggiesP);
  })
  .then(createdVegetables => {
    const adilP = Gardener.create({ name: 'Adil', age: 30 });
    const gittieP = Gardener.create({ name: 'Gittie', age: 25 });
    const tessP = Gardener.create({ name: 'Tess', age: 28 });
    const gardenersP = [adilP, gittieP, tessP];
    console.log('Gardeners created');
    return Promise.all(gardenersP);
  })
  .then(createdGardeners => {
    const plot1P = Plot.create({ size: 25, shaded: false });
    const plot2P = Plot.create({ size: 1, shaded: true });
    const plot3P = Plot.create({ size: 100, shaded: true });
    const plotsP = [plot1P, plot2P, plot3P];
    console.log('Plots created');
    return Promise.all(plotsP);
  })
  .catch(err => {
    console.log('Disaster! Something went wrong! ');
    console.log(err);
  })
  .finally(() => {
    // only if using a version of node WITH `finally`
    console.log('Database closed!');
    db.close();
  });
