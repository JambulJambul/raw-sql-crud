const { error } = require('joi/lib/types/lazy');
const _ = require('lodash');
const MySQL = require('promise-mysql2');

const fileName = 'server/services/database.js';
const player_table = 'players';
const club_table = 'club';
const position_table = 'positions';
const pprelation_table = 'player_position_relation';

const ConnectionPool = MySQL.createPool({
  host: process.env.MYSQL_CONFIG_HOST || 'localhost',
  user: process.env.MYSQL_CONFIG_USER || 'root',
  password: process.env.MYSQL_CONFIG_PASSWORD || '',
  database: process.env.MYSQL_CONFIG_DATABASE || 'football_players_phincon',
  port: process.env.MYSQL_CONFIG_PORT || '3306',
  connectionLimit: process.env.MYSQL_CONFIG_CONNECTION_LIMIT || '1'
});

/*
 * PRIVATE FUNCTION
 */
const __constructQueryResult = (query) => {
  const result = [];
  if (!_.isEmpty(query[0])) {
    query[0].forEach((item) => {
      const key = Object.keys(item);

      // Reconstruct query result
      const object = {};
      key.forEach((data) => {
        object[data] = item[data];
      });

      result.push(object);
    });

  }

  return result;
};

/*
 * PUBLIC FUNCTION
 */

const getPlayersList = async () => {
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    const query = await poolConnection.query(
      `SELECT * FROM ${player_table} WHERE is_deleted = 0;`
    );
    await poolConnection.connection.release();
    const result = __constructQueryResult(query);
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    console.log([fileName, 'Get All Data', 'INFO'], {
      message: { timeTaken }
    });
    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, 'Get All Data', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.reject(`Failed to fetch data from the database.`);
  }
};

const getPlayerById = async (dataObject) => {
  const { player_id } = dataObject;
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    const query = await poolConnection.query(
      `SELECT * FROM ${player_table} WHERE player_id = '${player_id}' AND is_deleted = 0;`
    );
    await poolConnection.connection.release();
    const result = __constructQueryResult(query);
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    console.log([fileName, 'Get Player By Name', 'INFO'], {
      message: { timeTaken }
    });
    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, 'Get Data By Name', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.reject(`Failed to fetch data from the database.`);
  }
};

const getClubById = async (dataObject) => {
  const { club_id } = dataObject;
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    const query = await poolConnection.query(
      `SELECT * FROM ${club_table} WHERE club_id = '${club_id}';`
    );
    await poolConnection.connection.release();
    const result = __constructQueryResult(query);
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    console.log([fileName, 'Get Club By Id', 'INFO'], {
      message: { timeTaken }
    });
    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, 'Get Club By Id', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.reject(`Failed to fetch data from the database.`);
  }
};

const getPositionIdByPlayerId = async (dataObject) => {
  const { player_id } = dataObject;
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    const query = await poolConnection.query(
      `SELECT position_id FROM ${pprelation_table} WHERE player_id = '${player_id}';`
    );
    await poolConnection.connection.release();
    const result = __constructQueryResult(query);
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    console.log([fileName, 'Get position by player Id', 'INFO'], {
      message: { timeTaken }
    });
    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, 'Get position by player Id', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.reject(`Failed to fetch data from the database.`);
  }
};

const getPositionNameById = async (position_id) => {
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    const query = await poolConnection.query(
      `SELECT position_name FROM ${position_table} WHERE position_id = '${position_id}';`
    );
    await poolConnection.connection.release();
    const result = __constructQueryResult(query);
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    console.log([fileName, 'Get position by player Id', 'INFO'], {
      message: { timeTaken }
    });
    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, 'Get position by player Id', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.reject(`Failed to fetch data from the database.`);
  }
};

const addPlayer = async (dataObject) => {
  const { player_name, club_id } = dataObject;
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    await poolConnection.query(
      `INSERT INTO ${player_table} (player_name, club_id) VALUES ('${player_name}', '${club_id}');`
    );

    await poolConnection.connection.release();

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

    console.log([fileName, 'Add Data', 'INFO'], {
      message: { timeTaken }
    });

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'Add Data', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.resolve(false);
  }
};

const addPlayerPosition = async (dataObject) => {
  const { player_id, position_id } = dataObject;
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    await poolConnection.query(
      `INSERT INTO ${pprelation_table} (player_id, position_id) VALUES ('${player_id}', '${position_id}');`
    );

    await poolConnection.connection.release();

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

    console.log([fileName, 'Add Data', 'INFO'], {
      message: { timeTaken }
    });

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'Add Data', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.resolve(false);
  }
};

const addClub = async (dataObject) => {
  const { club_name, club_location } = dataObject;
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    await poolConnection.query(
      `INSERT INTO ${club_table} (club_name, club_location) VALUES ('${club_name}', '${club_location}');`
    );

    await poolConnection.connection.release();

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

    console.log([fileName, 'Add Data', 'INFO'], {
      message: { timeTaken }
    });

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'Add Data', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.resolve(false);
  }
};

const editPlayer = async (dataObject) => {
  const { player_id, player_name, club_id } = dataObject;
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    let isDataExist = false
    if (player_name) {
      const updateResult = await poolConnection.query(
        `UPDATE ${player_table} SET player_name = '${player_name}' WHERE ${player_table}.player_id = ${player_id} AND is_deleted = 0;`
      );
      const okPacket = updateResult[0];
      if (okPacket && okPacket.affectedRows > 0) {
        isDataExist = true;
      } else {
        isDataExist = false;
      }
    }
    if (club_id) {
      const updateResult = await poolConnection.query(
        `UPDATE ${player_table} SET club_id = '${club_id}' WHERE ${player_table}.player_id = ${player_id} AND is_deleted = 0;`);
      const okPacket = updateResult[0];
      if (okPacket && okPacket.affectedRows > 0) {
        isDataExist = true;
      } else {
        isDataExist = false;
      }
    }
    await poolConnection.connection.release();
    if (isDataExist == false) {
      return Promise.resolve(false);
    }
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    console.log([fileName, 'Add Data', 'INFO'], {
      message: { timeTaken }
    });

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'Add Data', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.resolve(false);
  }
};

const deletePlayer = async (dataObject) => {
  const { player_id } = dataObject;
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    await poolConnection.query(
      `UPDATE ${player_table} SET is_deleted = 1 WHERE ${player_table}.player_id = ${player_id}`
    );
    await poolConnection.connection.release();

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

    console.log([fileName, 'Add Data', 'INFO'], {
      message: { timeTaken }
    });

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'Add Data', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.resolve(false);
  }
};

const deletePlayerPosition = async (dataObject) => {
  const { player_id, position_id } = dataObject;
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    await poolConnection.query(
      `DELETE FROM ${pprelation_table} WHERE player_id = ${player_id} and position_id = ${position_id}`
    );
    await poolConnection.connection.release();

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

    console.log([fileName, 'Add Data', 'INFO'], {
      message: { timeTaken }
    });

    return Promise.resolve(true);
  } catch (err) {
    console.log([fileName, 'Add Data', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.resolve(false);
  }
};

const getClubList = async () => {
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    const query = await poolConnection.query(
      `SELECT * FROM ${club_table}`
    );
    await poolConnection.connection.release();
    const result = __constructQueryResult(query);
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    console.log([fileName, 'Get All Data', 'INFO'], {
      message: { timeTaken }
    });
    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, 'Get All Data', 'ERROR'], {
      message: { info: `${err}` }
    });
    return Promise.reject(`Failed to fetch data from the database.`);
  }
};


module.exports = {
  getPlayersList,
  getPlayerById,
  getClubById,
  getPositionIdByPlayerId,
  getPositionNameById,
  addPlayer,
  addPlayerPosition,
  addClub,
  editPlayer,
  deletePlayer,
  deletePlayerPosition,
  getClubList
};
