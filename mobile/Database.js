import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('MaGardeRobe.db');

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY NOT NULL, uri TEXT NOT NULL, category TEXT);'
    );
  });
};

export const insertImage = (uri, category) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO images (uri, category) VALUES (?, ?);',
      [uri, category],
      (_, { insertId }) => {
        console.log(`Image insérée avec l'ID ${insertId}`);
      },
      (_, error) => {
        console.error('Erreur lors de l\'insertion de l\'image :', error);
      }
    );
  });
};

export const getImagesByCategory = (category) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM images WHERE category = ?;',
          [category],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

export const deleteAllImages = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM images;',
        [],
        (_, result) => {
          console.log('Toutes les images ont été supprimées');
          resolve(result);
        },
        (_, error) => {
          console.error('Erreur lors de la suppression de toutes les images :', error);
          reject(error);
        }
      );
    });
  });
};
  