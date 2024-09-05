
import { Routes, RouterModule } from '@angular/router';
import { TheoDoiChungTuComponent } from './TheoDoiChungTu/theodoichungtu.component';
import { HoaDongListComponent } from './TheoDoiHoatDong/hoatdong-list.component';
import { PrintCanDoiKeToanComponent } from './PrintCDKT/CanDoiKeToan/TheoDoiChungTu/print-candoiketoan.component';
import { LuuChuyenTienTeListComponent2 } from './TheoDoiHoatDong/lctt.component';
import { CanDoiKeToanComponent2 } from './TheoDoiHoatDong/cdkt.component';
import { PrintTKComponent } from './PrintTonKho/printtk.component';
import { SoNhatKyChungComponent } from './TheoDoiHoatDong/sonhatkychung.component';
import { PreviewComponent } from './Preview/preview.component';
import { SoChiTietTKComponent } from './TheoDoiHoatDong/sochitiettk.component';

import { PreviewSQTNHComponent } from './SoTienGuiNH/preview-sqnh.component';

import { SoQuyTienGuiNHComponent } from './SoTienGuiNH/soquytienguinh.component';
import { SoQuyTongHopComponent } from './SoTienGuiNH/tonghop.component';
import { TongHopBaoCaoComponent } from './TongHopBaoCao/tonghopbaocao.component';
import { TheKhoComponent } from './TheKho/thekho.component';
import { PreviewTheKhoComponent } from './TheKho/preview-thekho.component';
import { HoaDonMuaVaoComponent } from './HoaDonMuaVao/hoadonmuavao.component';
import { PreviewHDMVComponent } from './HoaDonMuaVao/preview-hoadonmuavao.component';
import { HoaDonBanRaComponent } from './HoaDonMuaVao/hoadonbanra.component';
import { SoChiTietKhoComponent } from './SoChiTietKho/sochitietkho.component';
import { PreviewSCTKComponent } from './SoChiTietKho/preview-sochitietkho.component';
import { SoChiTietCongNoComponent } from './SoChiTietCongNo/sochitietcongno.component';
import { PreviewSCCNComponent } from './SoChiTietCongNo/preview-sochitietcongno.component';
import { SoQuyTienMatComponent } from './SoQuyTienMat/soquytienmat.component';
import { PreviewBKCTComponent } from './BanKeChungTu/preview-bkct.component';
import { BangKeChungTuComponent } from './BanKeChungTu/bangkechungtu.component';
import { BaoCaoLaiLoComponent } from './BaoCaoLaiLo/baocaolailo.component';
import { PreviewBCLLComponent } from './BaoCaoLaiLo/preview-baocaolailo.component';
import { BangKeBanHangComponent } from './BangKeBanHang/bangkebanhang.component';
import { PreviewBKBHComponent } from './BangKeBanHang/preview-bangkebanhang.component';
import { PreviewToKhaiThueComponent } from './ToKhaiThue/preview-tokhaithue.component';
import { ToKhaiThueComponent } from './ToKhaiThue/tokhaithue.component';
import { PreViewNoGr } from './PreviewNoGr/previewnogr.component';
import { KhoDialogComponent } from './Dialog/kho-dialog.component';
import { NguonLucDialogComponent } from './Dialog/nguonluc-dialog.component';
import { TaiKhoanDialogComponent } from './Dialog/taikhoan-dialog.component';
import { TaiKhoanCNDialogComponent } from './Dialog/taikhoanCN-dialog.component';
import { NhapXuatTonComponent } from './NhapXuatTon/nhapxuatton.component';
import { PreviewNXTComponent } from './NhapXuatTon/preview-nhapxuatton.component';

const routes: Routes = [
    { path: 'baocao', component: TheoDoiChungTuComponent },
    { path: 'candoi', component: CanDoiKeToanComponent2 },
    { path: 'hoatdong', component: HoaDongListComponent },
    { path: 'luuchuyentt', component: LuuChuyenTienTeListComponent2 },
    { path: 'nhapxuatton', component: NhapXuatTonComponent },
    { path: 'sonhatky', component: SoNhatKyChungComponent },
    { path: 'sochitiettk', component: SoChiTietTKComponent },
    { path: 'soquytienmat', component: SoQuyTienMatComponent },
    { path: 'sotienguinh', component: SoQuyTienGuiNHComponent },
    { path: 'soquytonghop', component: SoQuyTongHopComponent },
    { path: 'tonghopbaocao', component: TongHopBaoCaoComponent },
    { path: 'thekho', component: TheKhoComponent },
    { path: 'hoadonmuavao', component: HoaDonMuaVaoComponent },
    { path: 'hoadonbanra', component: HoaDonBanRaComponent },
    { path: 'sochitietkho', component: SoChiTietKhoComponent },
    { path: 'sochitietcongno', component: SoChiTietCongNoComponent },
    { path: 'bangkechungtu', component: BangKeChungTuComponent },
    { path: 'baocaolailo', component: BaoCaoLaiLoComponent },
    { path: 'bangkebanhang', component: BangKeBanHangComponent },
    { path: 'tokhaithue', component: ToKhaiThueComponent },
    { path: 'nhapxuaton', component: NhapXuatTonComponent },



    { path: 'printCDKT', component: PrintCanDoiKeToanComponent },
    { path: 'printTK', component: PrintTKComponent },
    { path: 'print', component: PreviewComponent },
    { path: 'prinSQTM', component: PreviewBKCTComponent },
    { path: 'printSQTGNH', component: PreviewSQTNHComponent },
    { path: 'printTheKho', component: PreviewTheKhoComponent },
    { path: 'printHDMV', component: PreviewHDMVComponent },
    { path: 'printSCTK', component: PreviewSCTKComponent },
    { path: 'printSCCN', component: PreviewSCCNComponent },
    { path: 'printBKCT', component: PreviewBKCTComponent },
    { path: 'printBCLL', component: PreviewBCLLComponent },
    { path: 'printBKBH', component: PreviewBKBHComponent },
    { path: 'printTKT', component: PreviewToKhaiThueComponent },
    { path: 'printNXT', component: PreviewNXTComponent },
    { path: 'previewnogr', component: PreViewNoGr },
    // test layout
    { path: 'kho', component: KhoDialogComponent },
    { path: 'nguonluc', component: NguonLucDialogComponent },
    { path: 'taikhoan', component: TaiKhoanDialogComponent },
    { path: 'taikhoanCN', component: TaiKhoanCNDialogComponent },



];
export const inventoryRouter = RouterModule.forChild(routes);