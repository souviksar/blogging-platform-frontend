import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { collection, doc, Firestore, getDocs, query, setDoc, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { EFirestoreCollectionName, EErrors, EMode } from 'src/app/constants';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { emailValidator, noWhitespaceValidator } from 'src/app/validators';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, MaterialModule],
  providers: [provideNgxMask()],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit {
  toastr: ToastrService = inject(ToastrService);
  firestore: Firestore = inject(Firestore);
  mode = EMode;
  addSkillForm: FormGroup;
  errors = EErrors;

  addForm = this.fb.group({
    name: ['', [noWhitespaceValidator(), Validators.pattern(/^[A-Za-z\s]+$/)]],
    email: ['', [emailValidator()]],
    employeeId: ['', [noWhitespaceValidator()]],
    passcode: ['', [Validators.required]],
    point: [null, Validators.required]
  });
  staffUpdateForm = this.fb.group({
    name: ['', [noWhitespaceValidator(), Validators.pattern(/^[A-Za-z\s]+$/)]],
    email: ['', [emailValidator()]],
    employeeId: ['', [noWhitespaceValidator()]],
    passcode: ['', [Validators.required]],
    point: [null, Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const staffData = this.data.staffdata;

    if (this.data.mode === 'EDIT') {
      // Patch existing staff data for edit mode
      this.staffUpdateForm.patchValue({
        name: staffData.name,
        email: staffData.email,
        employeeId: staffData.employeeId,
        passcode: staffData.passcode,
        point: staffData.point
      });

      // Disable email and passcode fields
      this.staffUpdateForm.get('email')?.disable();
      this.staffUpdateForm.get('passcode')?.disable();
    }
  }

  async addStaff() {
    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      return;
    }
    try {
      const staffCollection = collection(this.firestore, EFirestoreCollectionName.Staff_Master);
      const newDocRef = doc(staffCollection);
      const emailQuery = query(staffCollection, where('email', '==', this.addForm.value.email));
      const passcodeQuery = query(staffCollection, where('passcode', '==', this.addForm.value.passcode));
      const emailSnapshot = await getDocs(emailQuery);
      const passcodeSnapshot = await getDocs(passcodeQuery);

      // Check if email or passcode exists
      if (!emailSnapshot.empty && !passcodeSnapshot.empty) {
        this.toastr.error('Both Email and Passcode already exist');
        return;
      } else if (!emailSnapshot.empty) {
        this.toastr.error('Email already exists');
        return;
      } else if (!passcodeSnapshot.empty) {
        this.toastr.error('Passcode already exists');
        return;
      }

      // Proceed to add the new user if no conflicts are found
      const staffDoc = {
        id: newDocRef.id,
        name: this.addForm.value.name.trim(),
        email: this.addForm.value.email.trim(),
        employeeId: this.addForm.value.employeeId,
        passcode: this.addForm.value.passcode,
        point: this.addForm.value.point,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      await setDoc(newDocRef, staffDoc);
      this.toastr.success('Staff added successfully');
      this.dialogRef.close('Yes');
    } catch (err) {
      this.toastr.error('Something went wrong while adding staff');
    }
  }

  async updateStaff() {
    if (!this.staffUpdateForm.valid) {
      this.staffUpdateForm.markAllAsTouched();
      return;
    }
    try {
      const staffCollection = collection(this.firestore, EFirestoreCollectionName.Staff_Master);
      const staffDocRef = doc(staffCollection, this.data.staffdata.id); // Assuming you are passing the document ID in `data`
      // Update the staff document
      await updateDoc(staffDocRef, {
        name: this.staffUpdateForm.value.name.trim(),
        // email: this.staffUpdateForm.value.email.trim(),
        employeeId: this.staffUpdateForm.value.employeeId,
        // passcode: this.staffUpdateForm.value.passcode,
        point: this.staffUpdateForm.value.point,
        updatedAt: Timestamp.now()
      });
      this.toastr.success('Staff updated successfully');
      this.dialogRef.close('Yes');
    } catch (err) {
      this.toastr.error('Something went wrong while updating staff');
    }
  }
}
