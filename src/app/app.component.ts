import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Person } from './model/person';
import { PersonService } from './service/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  people: Person[];
  search: string;
  totalRecords: number;
  loading: boolean = true;
  id: any;
  showForm: boolean = false;
  @ViewChild('dt') dt: Table;

  constructor(private personService: PersonService) {}

  new() {
    this.id = null;
    this.showForm = true;
  }

  edit(id) {
    this.id = id;
    this.showForm = true;
  }

  loadPeople(event: LazyLoadEvent) {
    this.loading = true;

    this.personService
      .getAll(event.first, event.rows, event.globalFilter)
      .subscribe(
        (res: any) => {
          this.people = res.data.data;
          this.totalRecords = res.data.totalRecords;
          this.loading = false;
        },
        (err: any) => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  delete(id) {
    this.personService.delete(id).subscribe(
      () => {
        alert('Successful operation.');
        this.dt.reset();
      },
      (err) => alert('Failed operation')
    );
  }

  closeForm() {
    this.showForm = false;
    this.dt.reset();
  }
}
