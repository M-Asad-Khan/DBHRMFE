import axios from "axios";

class TeamMembersApi {
  getTeamMembersApi = async (teamId) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams-member/${teamId}`,
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

  deleteTeamMemberApi = async (teamId, memberId) => {
           
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams-member`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        teamId: teamId,
        members: [memberId],
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

  addTeamMembersApi = async (team) => {
           
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams-member/`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        teamId: team.id,
        members: team.members,
        clientId: team.clientId,
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
export let teamMembersRequests = new TeamMembersApi();
