import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import { HOST } from "./host-name";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

constructor() { }

}
