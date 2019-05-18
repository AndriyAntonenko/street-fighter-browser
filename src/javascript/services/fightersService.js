/* eslint-disable class-methods-use-this */
import { callApi } from "../helpers/apiHelper";

class FighterService {
  async getFighters() {
    try {
      const apiUrl =
        "https://api.github.com/repos/sahanr/street-fighter/contents/fighters.json";
      const apiResult = await callApi(apiUrl, "GET");
      const fighters = JSON.parse(atob(apiResult.content));

      return fighters;
    } catch (error) {
      throw error;
    }
  }

  async getFigterInfo(fighterId) {
    const apiUrl = `https://raw.githubusercontent.com/binary-studio-academy/stage-2-es6-for-everyone/master/resources/api/details/fighter/${fighterId}.json`;
    const fighterDetails = await callApi(apiUrl, "GET");

    return fighterDetails;
  }
}

export const fighterService = new FighterService();
