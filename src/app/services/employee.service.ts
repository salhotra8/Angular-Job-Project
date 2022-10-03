import { EmployeeData } from './../model/employee-data';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  collectionData: AngularFirestoreCollection<EmployeeData>;
  items: Observable<EmployeeData[]>;
  itemDoc!: AngularFirestoreDocument<EmployeeData>;

  constructor(private afs: AngularFirestore) {
    this.collectionData = this.afs.collection<EmployeeData>('employeeDetails/');


    this.items  = this.collectionData.snapshotChanges().pipe(map((changes:any) => {
      return changes.map((a:any) => {
        const data = a.payload.doc.data() as EmployeeData;
        data.id = a.payload.doc.id;
        return data;  
      });
    }));

  }

  addEmployee(empData: EmployeeData) {
    empData.id = this.afs.createId();
    return this.collectionData.add(empData);

  }

  getAllEmployee() {
    return this.items;
  }

  updateEmployee(empData: EmployeeData) {
    this.itemDoc = this.afs.doc('employeeDetails/'+empData.id);
    return this.itemDoc.update(empData);
  }


  deleteEmployee(empData: EmployeeData) {
    this.itemDoc = this.afs.doc('employeeDetails/'+empData.id);
    return this.itemDoc.delete();
  }

}
