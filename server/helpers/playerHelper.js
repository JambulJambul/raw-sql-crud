const Database = require('../../services/database')
const _ = require('lodash');

const fetchAllPlayers = async () => {
    try {
        const response = await Database.getPlayersList();
        if (_.isEmpty(response)) {
            const message = "No player found in the database.";
            res = { message };
            return Promise.resolve(res);
        }
        const message = "Get all players successful.";
        res = { message, response };
        return Promise.resolve(res);
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const getPlayerDetails = async (dataObject) => {
    const { player_id } = dataObject
    try {
        const playerData = await Database.getPlayerById({ player_id });
        if (_.isEmpty(playerData)) {
            const message = "No player found with the inserted Id.";
            res = { message };
            return Promise.resolve(res);
        }
        const playerPositionId = await Database.getPositionIdByPlayerId({ player_id })
        const playerPositions = [];
        if (!_.isEmpty(playerPositionId)) {
            playerPositionId.map(async (item) => {
                let positionData = await Database.getPositionNameById(item.position_id)
                if (!_.isEmpty(positionData)) {
                    playerPositions.push(positionData[0].position_name)
                }
            })
        }
        const club_id = playerData[0].club_id
        const clubData = await Database.getClubById({ club_id })
        const playerDetailObject = {
            playerName: playerData[0].player_name,
            clubName: !_.isEmpty(clubData) ? clubData[0].club_name : "-",
            positions: !_.isEmpty(playerPositions) ? playerPositions : "-"
        }
        const message = "Get player details successful.";
        res = { message, playerDetailObject };
        return Promise.resolve(res);
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const addNewPlayer = async (dataObject) => {
    const { player_name, club_id } = dataObject
    try {
        const isAdded = await Database.addPlayer({ player_name, club_id });
        if (isAdded == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        const message = `The player ${player_name} has been added to the database.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const addPlayerPosition = async (dataObject) => {
    const { player_id, position_id } = dataObject
    try {
        const isAdded = await Database.addPlayerPosition({ player_id, position_id });
        if (isAdded == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        const message = `The position for player id = ${player_id} has been added to the database.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const addClub = async (dataObject) => {
    const { club_name, club_location } = dataObject
    try {
        const isAdded = await Database.addClub({ club_name, club_location });
        if (isAdded == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        const message = `The club ${club_name} has been added to the database.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const editPlayer = async (dataObject) => {
    const { player_id, player_name, club_id } = dataObject
    try {
        const isEdited = await Database.editPlayer({ player_id, player_name, club_id });
        if (isEdited == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        const message = `The player with id = ${player_id} information has been edited.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const deletePlayer = async (dataObject) => {
    const { player_id } = dataObject
    try {
        const isEdited = await Database.deletePlayer({ player_id });
        if (isEdited == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        const message = `The player with id = ${player_id} information has been deleted.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const deletePlayerPosition = async (dataObject) => {
    const { player_id, position_id } = dataObject
    try {
        const isEdited = await Database.deletePlayerPosition({ player_id, position_id });
        if (isEdited == false) {
            const message = 'Operation was unsucessful'
            const res = { message }
            return Promise.resolve(res)
        }
        const message = `The player with id = ${player_id} position has been deleted.`
        const res = { message }
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

const getClubList = async () => {
    try {
        const response = await Database.getClubList();
        if (_.isEmpty(response)) {
            const message = "No player found in the database.";
            res = { message };
            return Promise.resolve(res);
        }
        const message = "Get all players successful.";
        res = { message, response };
        return Promise.resolve(res);
    } catch (error) {
        console.log(error)
        throw new error
    }
}

module.exports = {
    fetchAllPlayers,
    getPlayerDetails,
    addNewPlayer,
    addPlayerPosition,
    addClub,
    editPlayer,
    deletePlayer,
    deletePlayerPosition,
    getClubList
}
