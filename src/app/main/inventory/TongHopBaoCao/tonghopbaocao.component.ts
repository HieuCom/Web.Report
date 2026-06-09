import { Component } from "@angular/core";

@Component({
    selector: 'app-tonghopbaocao',
    templateUrl: './tonghopbaocao.component.html',
    styleUrls: ['./tonghopbaocao.component.css']
    })


export class TongHopBaoCaoComponent {

  showMainReports: boolean = true;
  showMoneyReports: boolean = false;
  showBankReports: boolean = false;
  showJournalReports: boolean = false;
  showFinancialReports: boolean = false;
  showInventoryReports: boolean = false;

  toggleReports(reportType: string) {
    this.showMainReports = false;
    if (reportType === 'money') {
      this.showMoneyReports = true;
      this.showBankReports = false;
      this.showJournalReports = false;
      this.showFinancialReports = false;
    } else if (reportType === 'bank') {
      this.showMoneyReports = false;
      this.showBankReports = true;
      this.showJournalReports = false;
      this.showFinancialReports = false;
    }else if (reportType === 'journal') {
      this.showJournalReports = true;
      this.showMoneyReports = false;
      this.showBankReports = false;
      this.showFinancialReports = false;
    }
    else if (reportType === 'financial') {
      this.showFinancialReports = true;
      this.showJournalReports = false;
      this.showMoneyReports = false;
      this.showBankReports = false;
    } else if (reportType === 'inventory') {
      this.showInventoryReports = true;
      this.showFinancialReports = false;
      this.showJournalReports = false;
      this.showMoneyReports = false;
      this.showBankReports = false;
    }
    
  }

  goBack() {
    this.showMainReports = true;
    this.showInventoryReports = false;
    this.showFinancialReports = false;
    this.showJournalReports = false;
    this.showMoneyReports = false;
    this.showBankReports = false;
  }

   

   
}