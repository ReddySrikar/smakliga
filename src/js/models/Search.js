  // Food2fork API key: e2bdc0b574b4cfc54c0767f6c8a6fdc1
  // http://food2fork.com/api/search
import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const apiKey = 'e2bdc0b574b4cfc54c0767f6c8a6fdc1';
    try {
      const result = await axios.get(`${proxy}http://food2fork.com/api/search?key=${apiKey}&q=${this.query}`);
      this.recipes = result.data.recipes;
      this.recipes.map((a) => console.log(a.title));
    } catch (e) {
      alert(e);
    }
  }
}
