export class Publisher {
    name?: string;
    static fromJSON(json: any): Publisher {
      return {
        name: json.name,
      };
    }
  }