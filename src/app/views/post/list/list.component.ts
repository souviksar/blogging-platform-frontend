import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  // toastr: ToastrService = inject(ToastrService);
  // dialog: MatDialog = inject(MatDialog);
  // fb: FormBuilder = inject(FormBuilder);
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // loaderService: LoaderService = inject(LoaderService);
  // displayedColumns: string[] = ['name', 'email', 'employeeId', 'passcode', 'action'];
  // dataSource = new MatTableDataSource<any>();
  // totalCount: number = 0;
  // pageSize: number = 10;
  // currentPage: number = 1;
  // firestore: Firestore = inject(Firestore);
  // staffData: any;
  // ngOnInit() {
  //   this.getStaffData(this.currentPage - 1, this.pageSize);
  // }
  // async getStaffData(pageIndex: number = 0, pageSize: number = 10) {
  //   const staffCollection = collection(this.firestore, EFirestoreCollectionName.Staff_Master);
  //   const teamQuery = query(staffCollection, orderBy('createdAt', 'desc'));
  //   try {
  //     const snapshot = await getDocs(teamQuery);
  //     const staffData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     // Calculate the start and end index for the current page
  //     const startIndex = pageIndex * pageSize;
  //     const endIndex = startIndex + pageSize;
  //     // Slice the staffData to get the data for the current page
  //     this.dataSource.data = staffData.slice(startIndex, endIndex);
  //     this.totalCount = staffData.length; // Update total count
  //   } catch (error) {
  //     this.toastr.error('Error fetching staff data.');
  //   }
  // }
  // addStaff() {
  //   this.dialog
  //     .open(AddEditComponent, {
  //       width: '60%',
  //       // height: '60%',
  //       data: { mode: EMode.ADD }
  //     })
  //     .afterClosed()
  //     .subscribe({
  //       next: (data) => {
  //         if (data === 'Yes') this.getStaffData();
  //       }
  //     });
  // }
  // editStaff(staffdata: any) {
  //   this.dialog
  //     .open(AddEditComponent, {
  //       width: '60%',
  //       // height: '60%',
  //       data: { mode: EMode.EDIT, staffdata }
  //     })
  //     .afterClosed()
  //     .subscribe({
  //       next: (data) => {
  //         if (data === 'Yes') this.getStaffData();
  //         this.paginator.pageIndex = 0;
  //       }
  //     });
  // }
  // async deleteStaff(id: string) {
  //   const docRef = doc(this.firestore, EFirestoreCollectionName.Staff_Master, id); // Reference to the document you want to delete
  //   try {
  //     await deleteDoc(docRef); // Delete the document
  //     this.toastr.success('Staff deleted successfully.'); // Show success message
  //     this.getStaffData(); // Refresh the staff data to reflect changes
  //     this.paginator.pageIndex = 0;
  //   } catch (error) {
  //     this.toastr.error('Error deleting staff.'); // Show error message
  //   }
  // }
  // showDeleteConfirmation(id: string) {
  //   const message = `You want to delete Staff`;
  //   this.dialog
  //     .open(ConfirmationComponent, {
  //       data: { message },
  //       height: '368px',
  //       width: '500px'
  //     })
  //     .afterClosed()
  //     .subscribe({
  //       next: (data) => {
  //         if (data === 'Yes') this.deleteStaff(id);
  //       }
  //     });
  // }
  // pageChange(event: PageEvent) {
  //   this.pageSize = event.pageSize;
  //   this.currentPage = event.pageIndex + 1;
  //   // Fetch staff data for the current page
  //   this.getStaffData(event.pageIndex, event.pageSize);
  // }
}
