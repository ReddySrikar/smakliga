  // Food2fork API key: e2bdc0b574b4cfc54c0767f6c8a6fdc1
  // http://food2fork.com/api/search
import axios from 'axios';
import * as urlData from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const result = await axios.get(`${urlData.proxy}http://food2fork.com/api/search?key=${urlData.apiKey}&q=${this.query}`);
      this.results = result.data.recipes;
    } catch (e) {
      alert(e);
    }
  }
}
