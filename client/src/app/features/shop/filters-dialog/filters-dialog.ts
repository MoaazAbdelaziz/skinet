import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop-service';
import { MatDivider } from '@angular/material/divider';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filters-dialog',
  imports: [FormsModule, MatDivider, MatSelectionList, MatListOption, MatButton],
  templateUrl: './filters-dialog.html',
  styleUrl: './filters-dialog.scss'
})
export class FiltersDialog {
  protected shopService = inject(ShopService);
  protected dialogRef = inject(MatDialogRef<FiltersDialog>);
  data = inject(MAT_DIALOG_DATA);

  selectedBrands = this.data.selectedBrands;
  selectedTypes = this.data.selectedTypes;

  applyFilters() {
    this.dialogRef.close({
      selectedBrands: this.selectedBrands,
      selectedTypes: this.selectedTypes
    });
  }
}
