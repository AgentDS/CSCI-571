import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from "./details/details.component";
import { WatchlistComponent } from "./watchlist/watchlist.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { SearchFormComponent } from "./search-form/search-form.component";

const routes: Routes = [
  { path: '', component: SearchFormComponent },
  { path: 'details/:ticker', component: DetailsComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'portfolio', component: PortfolioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
