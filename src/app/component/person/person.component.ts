import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  @Input() id: number;
  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();

  titleCard: string;
  personForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private fb: FormBuilder, private personService: PersonService) {
  }
  
  ngOnInit(): void {
    this.titleCard = this.id ? 'Edit' : 'Create';
    this.createForm();
    if(this.id){
      this.load();
    }
  }

  get f() {
    return this.personForm.controls;
  }

  createForm() {
    this.personForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birth_date: ['', Validators.required],
    });
  }

  load() {
    this.personService.getById(this.id).subscribe(
      (res) => this.myPacthValue(res.data),
      (err) => this.onFailure(err)
    );
  }

  myPacthValue(resp) {
    this.loading = false;
    this.personForm.patchValue(resp);    
    this.personForm.get('birth_date').patchValue(this.formatDate(resp.birth_date));
  }

  onSave() {
    this.submitted = true;

    if (this.personForm.invalid) {
      return;
    }
    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.personService.create(this.personForm.value).subscribe(
      () => {
        this.onSuccess();
        this.close();
      },
      (err) => {
        this.onFailure(err);
      }
    );
  }

  onSuccess() {
    alert('Successful operation...');
  }

  onFailure(err) {
    alert('Failed operation...');
    //err.error.errors,
  }

  resetForm() {
    this.personForm.reset();
    this.personForm.patchValue({
      active: true,
    });
  }

  update() {
    this.personService.update(this.id, this.personForm.value).subscribe(
      () => {
        this.onSuccess();
        this.close();
      },
      (err) => {
        this.onFailure(err);
      }
    );
  }

  close() {
    this.closeForm.emit();
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
