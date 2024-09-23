import { Publisher } from './publisher';
import { Playlist } from './playlist';
import { Song } from './song';


export class GetAlbumSongsModel {
    GetAlbumSongsSuccessModel = class {
      status?: number;
      songs?: Song[];
    };
  }
  
  export class DeleteAlbumModel  {
    DeleteAlbumSuccessModel = class {
      status?: number;
    };
  }
  

  export class UploadAlbumSuccessModel {
    status?: number;
    albumID?: string;
    albumData?: Album; 
    url?: string;
  
    
    static fromJSON(json: any): UploadAlbumSuccessModel {
      return {
        status: json.status,
        albumID: json.album_id,
        albumData: Album.fromJSON(json.album_data), 
        url: json.url,
      };
    }
  }
  export class UploadAlbumModel  {
    UploadAlbumSuccessModel = class {
      status?: number;
      albumID?: string;
      albumData?: Album;
      url?: string;
  
      static fromJSON(json: any): UploadAlbumSuccessModel {
        return {
          status: json.status,
          albumID: json.album_id,
          albumData: Album.fromJSON(json.album_data),
          url: json.url,
        };
      }
    };
    
    JSONNull = class {
      static decode(value: any): JSONNull | null {
        if (value === null) {
          return new JSONNull();
        }
        return null;
      }
  
      encode(): null {
        return null;
      }
    };
  
    JSONCodingKey = class {
      key: string;
  
      constructor(key: string) {
        this.key = key;
      }
  
      static fromString(value: string): JSONCodingKey {
        return new JSONCodingKey(value);
      }
    };
  
    JSONAny = class {
      value: any;
  
      constructor(value: any) {
        this.value = value;
      }
  
      static decode(value: any): any {
        if (typeof value === "boolean") return value;
        if (typeof value === "number") return value;
        if (typeof value === "string") return value;
        if (value === null) return new JSONNull();
        if (Array.isArray(value)) return value.map((item) => this.decode(item));
        if (typeof value === "object") {
          const obj: any = {};
          for (const key in value) {
            obj[key] = this.decode(value[key]);
          }
          return obj;
        }
        throw new Error("Cannot decode JSONAny");
      }
  
      encode(): any {
        if (this.value === null) return null;
        if (Array.isArray(this.value)) return this.value.map((item) => item.encode());
        if (typeof this.value === "object") {
          const obj: any = {};
          for (const key in this.value) {
            obj[key] = this.value[key].encode();
          }
          return obj;
        }
        return this.value;
      }
    };
  }
  
  export class PurchaseAlbumModel {
    PurchaseAlbumSuccessModel = class {
      status?: number;
      message?: string;
    };
  }

  // Déclaration de la classe AlbumData avec une méthode fromJSON
export class Album {
    id?: number;
    albumID?: string;
    userID?: number;
    title?: string;
    albumDataDescription?: string;
    categoryID?: number;
    thumbnail?: string;
    time?: number;
    registered?: string;
    price?: number;
    purchases?: number;
    thumbnailOriginal?: string;
    publisher?: Publisher; // Assurez-vous que Publisher est défini ou importé correctement
    timeFormatted?: string;
    url?: string;
    categoryName?: string;
    isPurchased?: number;
    isOwner?: boolean;
    songs?: any[]; // Vous pouvez définir un type spécifique pour les chansons si possible
    countSongs?: number;
  
    // Méthode statique pour créer une instance de AlbumData à partir d'un objet JSON
    static fromJSON(json: any): Album {
      return {
        id: json.id,
        albumID: json.album_id,
        userID: json.user_id,
        title: json.title,
        albumDataDescription: json.description,
        categoryID: json.category_id,
        thumbnail: json.thumbnail,
        time: json.time,
        registered: json.registered,
        price: json.price,
        purchases: json.purchases,
        thumbnailOriginal: json.thumbnail_original,
        publisher: Publisher.fromJSON(json.publisher), // Assurez-vous que Publisher a une méthode fromJSON
        timeFormatted: json.time_formatted,
        url: json.url,
        categoryName: json.category_name,
        isPurchased: json.is_purchased,
        isOwner: json.IsOwner,
        songs: json.songs,
        countSongs: json.count_songs,
      };
    }
  }
  

  export class JSONNull {
    static decode(value: any): JSONNull | null {
      if (value === null) {
        return new JSONNull();
      }
      return null;
    }
  
    encode(): null {
      return null;
    }
  }
  

  export class JSONCodingKey {
    key: string;
  
    constructor(key: string) {
      this.key = key;
    }
  
    static fromString(value: string): JSONCodingKey {
      return new JSONCodingKey(value);
    }
  }
  

  export class JSONAny {
    value: any;
  
    constructor(value: any) {
      this.value = value;
    }
  
    static decode(value: any): any {
      if (typeof value === "boolean") return value;
      if (typeof value === "number") return value;
      if (typeof value === "string") return value;
      if (value === null) return new JSONNull();
      if (Array.isArray(value)) return value.map((item) => this.decode(item));
      if (typeof value === "object") {
        const obj: any = {};
        for (const key in value) {
          obj[key] = this.decode(value[key]);
        }
        return obj;
      }
      throw new Error("Cannot decode JSONAny");
    }
  
    encode(): any {
      if (this.value === null) return null;
      if (Array.isArray(this.value)) return this.value.map((item: any) => item.encode());
      if (typeof this.value === "object") {
        const obj: any = {};
        for (const key in this.value) {
          obj[key] = this.value[key].encode();
        }
        return obj;
      }
      return this.value;
    }
  }

  