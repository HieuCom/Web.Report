import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TranslateModule } from "@ngx-translate/core";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { EditorModule, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { UtilityService } from "src/app/core/services/utility.service";
import { DataService } from "src/app/core/services/data.service";
import { UploadService } from "src/app/core/services/upload.service";
import { inventoryRouter } from "./Inventory.routes";
import { CommonpipeModule } from "../pipe/commonpipe.module";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { SelectTonKhoComponent } from "./SelectTonKho/selecttonkho.component";
import { TheoDoiChungTuComponent } from "./TheoDoiChungTu/theodoichungtu.component";
import { HoaDongListComponent } from "./BaoCaoTaiChinh/HoatDongSanXuatKinhDoanh/hoatdongsanxuatkinhdoanh.component";
import { PrintCanDoiKeToanComponent } from "./PrintCDKT/CanDoiKeToan/TheoDoiChungTu/print-candoiketoan.component";
import { ColuminfoService } from "src/app/core/services/columinfo.service";
import { CanDoiKeToanComponent2 } from "./BaoCaoTaiChinh/CanDoiKeToan/cdkt.component";
import { LuuChuyenTienTeListComponent2 } from "./BaoCaoTaiChinh/LuuChuyenTienTe/lctt.component";
import { PrintTKComponent } from "./PrintTonKho/printtk.component";
import { SoNhatKyChungComponent } from "./BaoCaoNhatKyChung/TheoDoiHoatDong/sonhatkychung.component";
import { PreviewComponent } from "./Preview/preview.component";
import { SoChiTietTKComponent } from "./BaoCaoNhatKyChung/SoChiTietTaiKhoan/sochitiettk.component";
import { SoQuyTienGuiNHComponent } from "./BaoCaoNganHang/SoTienGuiNH/soquytienguinh.component";
import { PreviewSQTNHComponent } from "./BaoCaoNganHang/SoTienGuiNH/preview-sqnh.component";
import { SoQuyTongHopComponent } from "./BaoCaoNganHang/SoTienGuiNH/tonghop.component";
import { TongHopBaoCaoComponent } from "./TongHopBaoCao/tonghopbaocao.component";
import { TheKhoComponent } from "./BaoCaoHangHoa/TheKho/thekho.component";
import { PreviewTheKhoComponent } from "./BaoCaoHangHoa/TheKho/preview-thekho.component";
import { HoaDonMuaVaoComponent } from "./BaoCaoThue/HoaDonMuaVao/hoadonmuavao.component";
import { PreviewHDMVComponent } from "./BaoCaoThue/HoaDonMuaVao/preview-hoadonmuavao.component";
import { HoaDonBanRaComponent } from "./BaoCaoThue/HoaDonMuaVao/hoadonbanra.component";
import { SoChiTietKhoComponent } from "./BaoCaoHangHoa/SoChiTietKho/sochitietkho.component";
import { PreviewSCTKComponent } from "./BaoCaoHangHoa/SoChiTietKho/preview-sochitietkho.component";
import { SoChiTietCongNoComponent } from "./BaoCaoCongNo/SoChiTietCongNo/sochitietcongno.component";
import { PreviewSCCNComponent } from "./BaoCaoCongNo/SoChiTietCongNo/preview-sochitietcongno.component";
import { SoQuyTienMatComponent } from "./BaoCaoTienMat/SoQuyTienMat/soquytienmat.component";
import { PreviewSQTMComponent } from "./BaoCaoTienMat/SoQuyTienMat/preview-sqtm.component";
import { BangKeChungTuComponent } from "./BaoCaoNhatKyChung/BanKeChungTu/bangkechungtu.component";
import { PreviewBKCTComponent } from "./BaoCaoNhatKyChung/BanKeChungTu/preview-bkct.component";
import { BaoCaoLaiLoComponent } from "./BaoCaoBanHang/BaoCaoLaiLo/baocaolailo.component";
import { PreviewBCLLComponent } from "./BaoCaoBanHang/BaoCaoLaiLo/preview-baocaolailo.component";
import { BangKeBanHangComponent } from "./BaoCaoBanHang/BangKeBanHang/bangkebanhang.component";
import { PreviewBKBHComponent } from "./BaoCaoBanHang/BangKeBanHang/preview-bangkebanhang.component";
import { PreviewToKhaiThueComponent } from "./BaoCaoThue/ToKhaiThue/preview-tokhaithue.component";
import { ToKhaiThueComponent } from "./BaoCaoThue/ToKhaiThue/tokhaithue.component";
import { PreViewNoGr } from "./PreviewNoGr/previewnogr.component";
import { SharedDataService } from "src/app/core/services/shared-data.service";
import { KhoDialogComponent } from "./Dialog/Kho/kho-dialog.component";
import { NguonLucDialogComponent } from "./Dialog/NguonLuc/nguonluc-dialog.component";
import { TaiKhoanDialogComponent } from "./Dialog/TaiKhoan/taikhoan-dialog.component";
import { TaiKhoanCNDialogComponent } from "./Dialog/TaiKhoan/taikhoanCN-dialog.component";
import { NhapXuatTonComponent } from "./BaoCaoHangHoa/NhapXuatTon/nhapxuatton.component";
import { PreviewNXTComponent } from "./BaoCaoHangHoa/NhapXuatTon/preview-nhapxuatton.component";
import { SoCaiTKComponent } from "./BaoCaoNhatKyChung/SoCaiTaiKhoan/socaitk.component";
import { CanDoiCongNoComponent } from "./BaoCaoCongNo/BangCanDoiCongNo/cdcn.component";
import { VuViecDialogComponent } from "./Dialog/VuViec/vuviec-dialog.component";
import { SanPhamDialogComponent } from "./Dialog/SanPham/sanpham-dialog.component";
import { DoiTuongDialogComponent } from "./Dialog/DoiTuong/doituong-dialog.component";
import { KhoanMucDialogComponent } from "./Dialog/KhoanMuc/khoanmuc-dialog.component";
import { NhomDoiTuongDialogComponent } from "./Dialog/NhomDoiTuong/nhomdoituong-dialog.component";
import { NhomSanPhamDialogComponent } from "./Dialog/NhomSanPham/nhomsanpham-dialog.component";
import { NhomNguonLucDialogComponent } from "./Dialog/NhomNguonLuc/nhomnguonluc-dialog.component";
import { YeuToPhiDialogComponent } from "./Dialog/YeuToPhi/yeutophi-dialog.component";
import { TienTeDialogComponent } from "./Dialog/TienTe/tiente-dialog.component";
import { ReportFilterComponent } from "src/app/shared/FormBaoCaoChung/ReportFilterComponent.component";

@NgModule({
  imports: [
    CommonModule,
    TabsModule,
    TranslateModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    inventoryRouter,
    SharedModule,
    EditorModule,
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    CommonpipeModule,
    TypeaheadModule.forRoot(),
  ],
  declarations: [
    SelectTonKhoComponent,
    TheoDoiChungTuComponent,
    CanDoiKeToanComponent2,
    HoaDongListComponent,
    LuuChuyenTienTeListComponent2,
    NhapXuatTonComponent,
    SoNhatKyChungComponent,
    SoChiTietTKComponent,
    SoQuyTienMatComponent,
    SoQuyTienGuiNHComponent,
    TongHopBaoCaoComponent,
    SoQuyTongHopComponent,
    TheKhoComponent,
    HoaDonMuaVaoComponent,
    HoaDonBanRaComponent,
    SoChiTietKhoComponent,
    SoChiTietCongNoComponent,
    BangKeChungTuComponent,
    BaoCaoLaiLoComponent,
    BangKeBanHangComponent,
    ToKhaiThueComponent,
    CanDoiCongNoComponent,
    SoCaiTKComponent,

    KhoDialogComponent,
    NguonLucDialogComponent,
    SanPhamDialogComponent,
    DoiTuongDialogComponent,
    VuViecDialogComponent,
    KhoanMucDialogComponent,
    NhomDoiTuongDialogComponent,
    NhomSanPhamDialogComponent,
    NhomNguonLucDialogComponent,
    YeuToPhiDialogComponent,
    TienTeDialogComponent,
    TaiKhoanDialogComponent,
    TaiKhoanCNDialogComponent,

    PreviewSQTMComponent,
    PrintTKComponent,
    PrintCanDoiKeToanComponent,
    PreviewComponent,
    PreviewSQTNHComponent,
    PreviewTheKhoComponent,
    PreviewHDMVComponent,
    PreviewSCTKComponent,
    PreviewSCCNComponent,
    PreviewBKCTComponent,
    PreviewBCLLComponent,
    PreviewBKBHComponent,
    PreviewToKhaiThueComponent,
    PreViewNoGr,
    PreviewNXTComponent,
    // SimpleTinyComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: "tinymce/tinymce.min.js" },
    DataService,
    UtilityService,
    UploadService,
    ColuminfoService,
    SharedDataService,
  ],
})
export class inventoryModule {}
