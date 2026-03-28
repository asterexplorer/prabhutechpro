const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.db');
const db = new Database(dbPath, { verbose: console.log });

// ── Initialize Schema ────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    ip TEXT
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    email TEXT PRIMARY KEY,
    date TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

/**
 * Migration helper from old JSON files if they exist
 */
function migrateFromJson() {
  try {
    const subsPath = path.join(__dirname, 'submissions.json');
    const newsPath = path.join(__dirname, 'subscribers.json');

    if (fs.existsSync(subsPath)) {
      console.log('[DB] Migrating submissions from JSON…');
      const data = JSON.parse(fs.readFileSync(subsPath, 'utf8'));
      const stmt = db.prepare(`REPLACE INTO submissions (id, name, email, phone, subject, message, date, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
      const transaction = db.transaction((rows) => {
        for (const row of rows) stmt.run(row.id, row.name, row.email, row.phone || '', row.subject, row.message, row.date, row.ip || '');
      });
      transaction(data);
      console.log(`[DB] Successfully migrated ${data.length} submissions.`);
    }

    if (fs.existsSync(newsPath)) {
      console.log('[DB] Migrating subscribers from JSON…');
      const data = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
      const stmt = db.prepare(`REPLACE INTO subscribers (email, date) VALUES (?, ?)`);
      const transaction = db.transaction((rows) => {
        for (const row of rows) stmt.run(row.email, row.date);
      });
      transaction(data);
      console.log(`[DB] Successfully migrated ${data.length} subscribers.`);
    }
  } catch (err) {
    console.error('[DB] Migration failed:', err.message);
  }
}

// Run migration on first start
migrateFromJson();

module.exports = db;
