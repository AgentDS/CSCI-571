import {
  Component,
  OnInit,
  OnChanges,
  Output,
  Input,
  EventEmitter
} from "@angular/core";
import { FavoriteService } from "../services/favorite.service";
import { DetailsService } from "../services/details.service";
import { SearchService } from "../services/search.service";

@Component({
  selector: "app-favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.css"]
})
export class FavoriteComponent implements OnInit {
  @Output() slide = new EventEmitter<any>();
  nextPage: boolean = false;
  prevPage: boolean = false;
  favorites: any;
  @Input("place") selectedPlace: any;
  private curPage = 1;

  constructor(
    private fService: FavoriteService,
    private dService: DetailsService,
    private sService: SearchService
  ) {
    this.fService.favorite.subscribe(data => {
      this.favorites = data["allFav"];
      if (!data["flag"]) {
        this.nextPage = true;
      } else {
        this.nextPage = false;
      }
    });
    this.sService.isClear.subscribe(data => {
      console.log(data);
    })
  }

  highLightRow(placeId) {
    this.selectedPlace = placeId;
  }

  showDetails() {
    this.slide.emit({ slide: "left", place: this.selectedPlace });
  }

  getDetails(key) {
    if (this.selectedPlace != key) {
      this.dService.getDetails(key);
    }
    this.highLightRow(key);
    this.slide.emit({ slide: "left", place: key });
  }

  removeFavorite(key) {
    this.fService.removeFavorite(key);
  }

  getNextPage() {
    this.fService.getAllFavorite(this.curPage + 1);
    this.curPage++;
    if (this.curPage > 1) {
      this.prevPage = true;
    }
  }

  getPrevPage() {
    this.fService.getAllFavorite(this.curPage - 1);
    this.curPage--;
    if (this.curPage == 1) {
      this.prevPage = false;
    }
  }

  loadFavorite() {
    this.fService.getAllFavorite(this.curPage);
  }

  ngOnInit() {
    this.loadFavorite();
  }
}
