import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpEventType,HttpRequest } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ApiService } from '../../Api/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-process-improvements',
  templateUrl: './process-improvements.component.html',
  styleUrls: ['./process-improvements.component.scss']
})
export class ProcessImprovementsComponent implements OnInit {
  workstreamData: any; walotServices: any; walotBatches: any; selectedWrkStrm: any = '';
  walotRegions: any = ''; chkdata: any = []; n: number = 1; revdata: any = []; isShown: boolean = false; isUpalodShown: boolean = false;
  isDesShown: boolean = false; isCollapsed = true; userInfo : any; UserName:any; UploadFileName: any = "";  TotalFiles: any
  enableOne: any = false;enableTwo: any = false; enableThree: any = false; enableFour: any = false; enablezero: any = true;
  yetToApproveData: any = [];
  userObj:any = [];
  selecteduser: any='';

  public userCustomGrid: any;
  // public requestedby: any;
  procdata: any = {};
  reportType: any = '';
  forBatchs: any;
  forServices: any;
  progress: number;
  currdate: any;
  requesteddate: any = ''; 
  requireddate: any = '';
  requestedby: any = ''; 
  priority: any = ''
  application: any = ''; 
  workstream: any = ''
  service: any = ''; 
  proposed_hrs: any = ''
  painarea: any = ''; 
  description: any = ''
  category: any = ''
  implement_idea: any = ''; 
  others: any = ''
  req_input_doc: any = ''
  selectedRecord: any = [];

  

  submitted = false;
 
  constructor(public globalConst: GlobalConstants, private spinner: NgxSpinnerService, public router: Router, private Apiservice: ApiService, private fb: FormBuilder, private http: HttpClient) {
    // myDate = new Date();
    //this.checkListColumns = ["Workstream","Service","State","Record","RecordType","ReceivedDate","Time","Status","Remarks","Chk"];
    const temp = new Date();
    this.currdate = {
    year: temp.getFullYear(),
    month: temp.getMonth() + 1,
    day: temp.getDate()
  };
 
 
  }

  ngOnInit(): void {
    this.spinner.show();
    this.procdata.priority = '';
    this.procdata.application = '';
    this.procdata.workstream = '';
    this.procdata.service = '';
    this.procdata.category = '';
    this.procdata.implement_idea = '';
    this.procdata.others = '';
    this.getYetToStartDetails();
    
    if(this.currdate.day < 10)
        {
          this.procdata.requesteddate = this.currdate.year + '-' + this.currdate.month + '-' + '0' + this.currdate.day;
          this.procdata.requireddate = this.currdate;
        }
          else
        {
          this.procdata.requesteddate = this.currdate.year + '-' + this.currdate.month + '-'  + this.currdate.day;
          this.procdata.requireddate = this.currdate;
        }

    // var loginfo = localStorage.getItem('CorpId')
    this.procdata.requestedby = localStorage.getItem('Name')
    // this.selectedWrkStrm = localStorage.getItem('selectedWrkStrm');
    // if (loginfo == '' || loginfo == null || loginfo == 'null') {
    //   this.router.navigate(['/pages/login']);
    // }
  
    // if (this.selectedWrkStrm == '' || this.selectedWrkStrm == null) {
    //   this.swapAlerts('Please select Workstream.!')
    // }
  console.log(this.procdata)
    this.GetWorkstream();
    this.spinner.hide();

    this.userInfo = {
      'UserName' : localStorage.getItem('Name'),
      'corpId' : localStorage.getItem('CorpId'),
      'designation' : localStorage.getItem('Role'),
    }
  
  }
  GetWorkstream() {
    // this.workstreamData = JSON.parse(localStorage.getItem('WorkStreams'));;
    let id = localStorage.getItem('LoginId');
    this.Apiservice.get('WorkAllotment/GetWorkStream?id=' + id).subscribe((data: any) => {
      console.log(data);
      this.globalConst.checkOriginAccess(data);
      
      this.workstreamData = data;

    });
  }

  getServiceslist() {
    this.spinner.show();
    const walotwid = this.procdata.workstream;
    this.Apiservice.get('WorkAllotment/GetAreaList?wid=' + walotwid).subscribe((data: any) => {
      console.log('Services-->', data);
      this.globalConst.checkOriginAccess(data);

      this.spinner.hide();
      this.walotServices = data;

    });
  }

  swapAlerts(msg) {
    return Swal.fire({
      icon: 'error', title: 'Oops...', text: msg,
      customClass: {
        confirmButton: 'btn btn-danger'
      },
      buttonsStyling: false
    }).then(function () {
      return false;
    });
  }
  saveProcessIdea(){ 
    var org = ''
    var userId = localStorage.getItem('LoginId');
    this.procdata.requestedby = userId
    this.procdata.requireddate = this.formatDate2(this.procdata.requireddate)
    this.procdata.status = 'PEND'; 
    this.procdata.prmdone = '';
    this.procdata.approve =  "Yet to Approve";
    console.log(this.procdata);
    var samp = [];
    samp.push(this.procdata)
    console.log(samp)
    if(this.procdata.attachment){
      const ext = this.procdata.attachment.split('.').pop();
      const fordate = new Date();
      org = this.procdata.category + '_'  + fordate.getTime() + '.' + ext;
    
    this.procdata.attachment = org;
    
    const formData = new FormData();
    for (const file of this.TotalFiles) {
      formData.append(file.name, file);
      formData.append('attachment', org);
    }
    const uploadReq = new HttpRequest('POST', this.Apiservice.fullUrl + 'Reports/upload', formData, {
      reportProgress: true,
    });
    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      };
    });
  }else
    this.procdata.attachment = '';
    this.Apiservice.postmethod('Reports/UpdateProcessImprovement', samp).subscribe((data: any) => {
      console.log('Time entry Resp-->', data);
      this.globalConst.checkOriginAccess(data);
      var resp = data;
       if (data.Item1 == true) {
        this.resetall()
        this.getYetToStartDetails();
      
        this.spinner.hide();
        Swal.fire({ text: "Data Inserted! Please find above Request No", icon: 'success', title: data.Item2 }).then(function () {
        
        });
         }
      if (data.Item1 == false) {
        this.spinner.hide();
        Swal.fire({ text: "Failed to Insert Record!!", icon: 'warning' });
      }
    });

  }
  formatDate2(date) {
    console.log(date)
    var year = date.year;
    var month = date.month;
    var day = date.day;
    if(day < 10)
      day = '0' + day;
    if(month < 10)
     month = '0' + month;
    return year + "-" + month + "-" + day;
  }
  getfilename(files: FileList){
    console.log(files);
    this.TotalFiles = files;
    this.procdata.attachment = files.item(0).name;

  }
  getValue(par){
     
    if(par == 1)
      {
        this.enableOne = true;
        this.enableTwo = false;
        this.enableThree = false;
        this.enableFour = false;
        this.enablezero = false;
      }
    if(par == 2){
        this.enableOne = false;
        this.enableTwo = true;
        this.enableThree = false;
        this.enableFour = false;
        this.enablezero = false;
      }
    if(par == 3){
        this.enableOne = false;
        this.enableTwo = false;
        this.enableThree = true;
        this.enableFour = false;
        this.enablezero = false;
        this.gettingUsersinfo();
      }   
      if(par == 4){
        this.enableOne = false;
        this.enableTwo = true;
        this.enableThree = false;
        this.enableFour = true;
        this.enablezero = false;
       }     
    }
    getYetToStartDetails(){
      this.spinner.show();
      this.Apiservice.get('Reports/getProcessimp').subscribe((data: any) => {
        //console.log('Services-->', data[0]['jsonResp']);
        if(data[0]['jsonResp'])
        this.yetToApproveData = data[0]['jsonResp'];
        this.yetToApproveData.forEach(e=>{
          e.chk = false;
        });
        console.log(this.yetToApproveData)
        this.globalConst.checkOriginAccess(data);
          this.spinner.hide();
       
       });

    }
    resetall(){
      this.procdata = {};
      this.procdata.priority = '';
      this.procdata.application = '';
      this.procdata.workstream = '';
      this.procdata.service = '';
      this.procdata.category = '';
      this.procdata.implement_idea = '';
      this.procdata.others = '';
      this.procdata.description = '';
      this.procdata.painarea = '';
    }
    changeStatus(par,item){
    var obj = [];
    var ideastatus = '';
    if(par == 'A')
      ideastatus = 'Approved';
    if(par == 'R')
      ideastatus = 'Rejected';
    console.log(this.selectedRecord)
     for(var i=0; i< this.selectedRecord.length; i++){
      var obj1 = {};
      obj1['reqno'] = this.selectedRecord[i]['ReqNo'];
      if(par == 'A')
        obj1['ideastatus'] = 'Approved';
      if(par == 'R')
        obj1['ideastatus'] = 'Rejected';
      obj.push(obj1)
      
     }
     console.log(obj)
      return
    this.spinner.show();
    this.Apiservice.get('Reports/UpdateIdeaStatus?reqno=' + item.ReqNo + '&ideastatus=' + ideastatus).subscribe((data: any) => {
      console.log('Idea Statu-->', data[0]['jsonResp'][0]['Column1']);
      this.spinner.hide();
      const re = data[0]['jsonResp'][0]['Column1'];
      
      if(re == 1 && ideastatus == 'Approved')
     {
      Swal.fire({ text: "Idea Approved! ", icon: 'success', title: item.ReqNo }).then(function () {
      
      });
       }
       if(re == 1 && ideastatus == 'Rejected')
        {
         Swal.fire({ text: "Idea Rejected! ", icon: 'warning', title: item.ReqNo }).then(function () {
      
      });
    
    }
      this.globalConst.checkOriginAccess(data);
      this.spinner.hide();
      
    }); 
      
    }
    gettingUsersinfo(){
       this.Apiservice.get('WorkAllotment/GetAssociateNames?wid='+ 7 +'&sid='+ 66 +'&ssid='+1455).subscribe((data: any) => {
        console.log('User Info-->',data);
        this.globalConst.checkOriginAccess(data);

        this.userObj = data;
      });
     }
     isSelected(par,ind){
      console.log(par)
      this.selectedRecord = [];
      this.yetToApproveData.forEach(e=>{
        e.chk = false;
      });
      this.yetToApproveData[ind].chk = true;
      this.selectedRecord = par;
     }
     isApprovalSelected(item,ind){
        console.log(item)
        this.selectedRecord.push(item)
        console.log(this.selectedRecord)
       }
     saveAllotment(){
      this.spinner.show();
      var reqNo = '';
      var loginID = localStorage.getItem('LoginId')
      console.log(this.selectedRecord)
      console.log(this.selecteduser)
      return

        if(this.selectedRecord.chk == true)
          reqNo = this.selectedRecord.ReqNo;
          
      console.log(reqNo,'-',this.selecteduser,'-',loginID)
      // return
      this.Apiservice.get('Reports/GetProcessImpAllotment?reqNo='+ reqNo +'&assocID='+ this.selecteduser +'&loginID='+loginID).subscribe((data: any) => {
        console.log('User Info-->',data);
        this.globalConst.checkOriginAccess(data);
        if(data.length == 0)
          {
          Swal.fire({ text: "Alloted Successfylly! ", icon: 'success' }).then(function () {
          this.spinner.hide();
          });
        } else
        {
          Swal.fire({ text: "Alloted Failed!! ", icon: 'warning' }).then(function () {
          this.spinner.hide();
          });
        }
        
      });
     }
  }
