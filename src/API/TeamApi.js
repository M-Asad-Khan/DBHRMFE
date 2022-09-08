import axios from "axios";
class TeamApi {
    addTeamApi = async(team) => {

        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/teams`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    teamName: team.teamName,
                    teamLead: team.teamLead,
                    startDate: team.startDate,
                    clientId: team.clientId,
                    manager: team.manager,
                    members: team.members,
                    project: team.project,
                },
            })
            .then((result) => {

                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {

                return {
                    error: true,
                    data: err,
                };
            });
    };

    deleteTeamsApi = async(id) => {

        return axios({
                method: "delete",
                url: `https://dbhrmbee.herokuapp.com/teams/${id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
            })
            .then((result) => {

                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {

                return {
                    error: true,
                    data: err,
                };
            });
    };

    updateTeamApi = async(team) => {

        return axios({
                method: "patch",
                url: `https://dbhrmbee.herokuapp.com/teams/${team.id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    teamName: team.teamName,
                    teamLead: team.teamLead,
                    startDate: team.startDate,
                    manager: team.manager,
                    project: team.project,
                },
            })
            .then((result) => {

                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {

                return {
                    error: true,
                    data: err,
                };
            });
    };

    getTeamsApi = async() => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/teams`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                return {
                    error: true,
                    data: err,
                };
            });
    };
}

export let teamRequests = new TeamApi();