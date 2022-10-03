import { EmployeeData } from './../model/employee-data';
import { EmployeeService } from './../services/employee.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  // employeeList: EmployeeData[] = [];
  displayedColumns: string[] = ['Id','Name', 'Email', 'Action'];
  employeeList!: MatTableDataSource<EmployeeData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(
    public dialog: MatDialog,
    private empService: EmployeeService) {

  }

  ngOnInit() {

    this.getAllEmployee();
  }

  openDialog() {
    this.dialog.open(AddEmployeeComponent);
  }

  openEditDialog(row: any) {
    this.dialog.open(AddEmployeeComponent, {
      data: row
    });
  }


  getAllEmployee() {
    return this.empService.getAllEmployee().subscribe((emplist: any) => {
      // this.employeeList = emplist;
      this.employeeList = new MatTableDataSource(emplist);
      this.employeeList.paginator = this.paginator;
    })
  }


  deleteEmployee(empData: EmployeeData) {
    if (window.confirm('Are yout sure you want to delete ' + empData.name + ' ?'))
      this.empService.deleteEmployee(empData);

  }


}

