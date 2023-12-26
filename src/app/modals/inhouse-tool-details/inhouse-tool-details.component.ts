import { Component, Input,OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inhouse-tool-details',
  templateUrl: './inhouse-tool-details.component.html',
  styleUrls: ['./inhouse-tool-details.component.scss']
})
export class InhouseToolDetailsComponent implements OnInit {
  @Input() fromParent;
  toolDetails: any = [];
  constructor( public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.fromParent['rowind']);
    this.toolDetails = this.fromParent['rowind'];
  }

  closeModal() {
   
      this.activeModal.close('');
    
  }
   //Excel Export
   exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'IMS_Dashboard_data.xlsx');
   }

}
