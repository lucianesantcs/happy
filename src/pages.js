const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');

module.exports = {
  index(request, response) {
    // return response.sendFile(path.join(__dirname, 'views', 'index.html'));
    return response.render('index');
  },

  async orphanage(request, response) {
    const id = request.query.id;
    try {
      const db = await Database;
      const results = await db.all(`SELECT * from orphanages WHERE id = "${id}" `);
      const orphanage = results[0];
      orphanage.images = orphanage.images.split(',');
      orphanage.firstImage = orphanage.images[0];

      orphanage.open_on_weekends == '0'
        ? (orphanage.open_on_weekends = false)
        : (orphanage.open_on_weekends = true);

      return response.render('orphanage', { orphanage });
    } catch (error) {
      return response.send('Erro no banco de dados');
    }
  },

  async orphanages(request, response) {
    try {
      const db = await Database;
      const orphanages = await db.all('SELECT * FROM orphanages');
      return response.render('orphanages', { orphanages });
    } catch (error) {
      return response.send('Erro no banco de dados');
    }
  },

  createOrphanage(request, response) {
    return response.render('create-orphanage');
  },

  async orphanages(req, res) {
    try {
      const db = await Database;
      const orphanages = await db.all('SELECT * FROM orphanages');
      return res.render('orphanages', { orphanages });
    } catch (error) {
      console.log(error);
      return res.send('Erro no banco de dados!');
    }
  },

  createOrphanage(req, res) {
    return res.render('create-orphanage');
  },

  async saveOrphanage(request, response) {
    const fields = request.body;

    // validar se todos os campos estao preenchidos
    if (Object.values(fields).includes('')) {
      return response.send('Todos os campos devem ser preenchidos!');
    }

    try {
      //salvar um orfanato
      const db = await Database;
      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      });

      // redirecionamento
      return response.redirect('/orphanages');
    } catch (error) {
      console.log(error);
      return response.send('Erro no banco de dados!');
    }
  },
};
