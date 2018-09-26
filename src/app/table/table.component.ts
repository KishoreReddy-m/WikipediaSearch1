/*
  # this component used to render the  wikipedia search result based search value
*/
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { WikipediaService } from '../_services/wikipedia.service';
import { SearchResult } from '../_models/searchResults';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  displayedColumns: string[] = ['pageid', 'title', 'wordcount', 'snippet', 'size'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator; // pagination
  @ViewChild(MatSort) sort: MatSort; // sort
  constructor(private wikipediaService: WikipediaService) { }

  // to search a word in wikipedia
  searchArticle(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    if (filterValue.length > 5) {
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.wikipediaService.searchArticle({
        term: filterValue, // search text
      }).subscribe((data: SearchResult) => {
        this.dataSource = new MatTableDataSource(data.query.search);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }
  // parse the wikipedia link
  getUrl(title) {
    return `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
  }

}
