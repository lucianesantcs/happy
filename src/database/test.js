const Database = require('./db');
const saveOrphanage = require('./saveOrphanage');

Database.then(async (db) => {
  // inserir dados na tabela
  await saveOrphanage(db, {
    name: 'Lar das meninas',
    lat: '-27.222633',
    lng: '-49.6455874',
    about:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi reprehenderit neque ut consequatur ullam.',
    whatsapp: '132135531',
    images: [
      'https://images.unsplash.com/photo-1600952996314-8e4fdcd88802?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',

      'https://images.unsplash.com/photo-1602126282340-9f597c2f31ab?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    ].toString(),
    instructions:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi reprehenderit neque ut consequatur ullam.',
    opening_hours: 'Horário de visitas Das 18h até 8h',
    open_on_weekends: '1',
  });

  // consultar todos dados da tabela
  const selectedOrphanages = await db.all('SELECT * FROM orphanages');
  console.log(selectedOrphanages);

  // // consultar somente 1 orphanage pelo id
  const orphanage = await db.all("SELECT * FROM orphanages WHERE id = '1'");
  console.log(orphanage);

  // // deletar dado da tabela
  // console.log(await db.run("DELETE FROM orphanages WHERE id = '2'"));
});
