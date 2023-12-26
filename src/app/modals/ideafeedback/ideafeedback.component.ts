import { Component, Input,OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ideafeedback',
  templateUrl: './ideafeedback.component.html',
  styleUrls: ['./ideafeedback.component.scss']
})
export class IdeafeedbackComponent implements OnInit { 
  @Input() fromParent;
  pardata :any = {};
  public recordType = [
    {
      rtype : 'Yes'
    },
    {
      rtype : 'No'
   }];
  public ratingType = [
    {
      rtype : 'Delighted'
    },
    {
      rtype : 'Very Good'
    },
    {
    rtype : 'Good'
   },
  {
    rtype : 'Poor'
   },


    {
      rtype : 'Very Poor'
    }]
//  developedby: any = '';
//  testtedby: any = '';
//  savedhrs: any = '';
//  campid: any = '';
//  rtype: any='';
//  rattype: any = '';
//  feedback: any = '';
mail_status: any = '';
  constructor( public activeModal: NgbActiveModal) { }

  ngOnInit(): void {  
    this.pardata.developedBy = '';
    this.pardata.testedby = '';
    this.pardata.savTime = '';
    this.pardata.campid = '';
    this.pardata.meets = '';
    this.pardata.rating = '';
    this.pardata.remarks = '';
    this.pardata.proposed_hrs = '';
    this.pardata.status = 1;
    this.pardata.justification = '';

    console.log(this.fromParent['rowind'])
    if(this.fromParent['rowind'].Developedby != null && this.fromParent['rowind'].Developedby != '')
        this.pardata.developedBy = this.fromParent['rowind'].Developedby;
    if(this.fromParent['rowind'].emp_name != null && this.fromParent['rowind'].emp_name != '')
        this.pardata.testedby = this.fromParent['rowind'].emp_name;
    this.pardata.reqno = this.fromParent['rowind'].ReqNo;
    this.pardata.proposed_hrs = this.fromParent['rowind'].proposed_hrs;
    this.pardata.mail_status = this.fromParent['rowind'].mail_status;
    console.log( this.pardata.mail_status )
  }

  closeModal(bnttyp) {
    if(bnttyp == 'save')
    {
      console.log(this.pardata)
      var per = (this.pardata.proposed_hrs * 10) / 100;
      console.log(per)
      var perval = this.pardata.proposed_hrs - per;
      console.log(perval)
      if(this.pardata.savTime < perval)
        this.pardata.status = 0;

      else
        this.pardata.status = 1;
      console.log(this.pardata)
      //return
      this.activeModal.close(this.pardata);
    }else{
      this.activeModal.close('');
    }
  }

}
