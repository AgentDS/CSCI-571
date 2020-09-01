import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class FavoriteService {
  private _favorite = new Subject();
  favorite = this._favorite.asObservable();

  private _isStorageChange = new Subject();
  isStorageChange = this._isStorageChange.asObservable();

  page = 1;

  constructor() {}

  saveFavorite(
    name: string,
    vicinity: string,
    place_id: string,
    icon_url: string,
    key: string
  ) {
    let timestamp = new Date();
    let favJson = {
      name: name,
      address: vicinity,
      placeId: place_id,
      icon: icon_url,
      timestamp: timestamp.getTime()
    };
    localStorage.setItem(key, JSON.stringify(favJson));
    this.getAllFavorite(this.page);
  }

  getAllFavorite(page) {
    this.page = page;
    let favPerPage = 20;
    let allFavorite = [];
    let flag = favPerPage;
    let localStorageArray = new Array(localStorage.length);
    for (let i = 0; i < localStorage.length; i++) {
      localStorageArray[i] = JSON.parse(
        localStorage.getItem(localStorage.key(i))
      );
    }

    localStorageArray.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return 1;
      } else {
        return -1;
      }
    });
    if ((page - 1) * favPerPage == localStorage.length) {
      // last item
      this.page--;
      page--;
      if (this.page == 0) {
        this.page = 1;
        this._favorite.next({ allFav: null, flag: null });
        this._isStorageChange.next(true);
        return;
      }
    }

    for (
      let i = (page - 1) * favPerPage;
      i < localStorage.length && i < page * favPerPage;
      i++, flag--
    ) {
      // let key = localStorage.key(i);
      let value = localStorageArray[i];
      allFavorite.push(value);
    }

    // return allFavorite;
    let returnJson = {
      allFav: allFavorite,
      flag: flag
    };
    this._favorite.next(returnJson);
    this._isStorageChange.next(true);
  }

  removeFavorite(key: string) {
    localStorage.removeItem(key);
    this.getAllFavorite(this.page);
  }

  isFavorited(place_id_arr: Array<string>) {
    let result = [];
    for (let place_id of place_id_arr) {
      if (!localStorage.getItem(place_id)) {
        result.push(false);
      } else {
        result.push(true);
      }
    }
    return result;
  }
}
