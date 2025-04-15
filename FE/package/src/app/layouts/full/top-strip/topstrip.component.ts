import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
    selector: 'app-topstrip',
    imports: [TablerIconsModule, MatButtonModule, MatMenuModule,FormsModule,RouterModule],
    templateUrl: './topstrip.component.html',
})
export class AppTopstripComponent {
    constructor() { }

}
