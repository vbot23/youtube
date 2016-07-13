import { Component, OnInit } from '@angular/core';
import {SearchResult} from "../search-result.model";

@Component({
  moduleId: module.id,
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.css'],
  inputs: ['result']
})
export class SearchResultComponent implements OnInit {
  result: SearchResult;
  constructor() {}

  ngOnInit() {
  }

}
