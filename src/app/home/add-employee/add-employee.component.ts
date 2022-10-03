import { EmployeeData } from './../../model/employee-data';
import { EmployeeService } from './../../services/employee.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;

  name = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  id = new FormControl();


  constructor(
    private empService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public editEmployee: EmployeeData,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private formBuilder: FormBuilder
  ) { }



  ngOnInit() {

    this.employeeForm = this.formBuilder.group({
      name: this.name,
      id: this.id,
      email: this.email

    });


    if (this.editEmployee) {
      this.employeeForm.controls['name'].setValue(this.editEmployee.name),
        this.employeeForm.controls['email'].setValue(this.editEmployee.email)
      this.employeeForm.controls['id'].setValue(this.editEmployee.id)
    }
  }

  onSubmit() {

    if (this.employeeForm.valid) {
      this.empService.addEmployee(this.employeeForm.value).then(() => {
        this.resetForm();
        this.closeDialog();

        alert('Submitted Successfully')

      })
    }

    else alert('Please fill the details')

  }

  updateEmployee() {
    if (this.employeeForm.valid) {
      this.empService.updateEmployee(this.employeeForm.value).then(() => {

        this.resetForm();
        this.closeDialog();

        alert('Updated sucessfully');
      })
    }
    else alert("something went wrong")
  }

  resetForm() {
    this.employeeForm.reset();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}



