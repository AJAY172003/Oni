import { open } from 'react-native-nitro-sqlite';

export const db = open({
  name: 'records.db',
  location: 'default',
});

export const initDB = () => {
  db.execute(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recordedAt INTEGER NOT NULL,
      duration INTEGER NOT NULL
    );
  `);
};

export const insertRecord = (duration) => {
  const recordedAt = Date.now();

  db.execute(
    `INSERT INTO records (recordedAt, duration)
     VALUES (?, ?)`,
    [recordedAt, duration]
  );
};

export const fetchRecords = () => {
  return db.execute(
    `SELECT * FROM records
     ORDER BY recordedAt DESC`
  ).rows;
};
export const formatDateLabel = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();

  const isToday = date.toDateString() === today.toDateString();

  const weekday = date.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const fullDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return isToday
    ? `Today · ${fullDate}`
    : `${weekday} · ${fullDate}`;
};

