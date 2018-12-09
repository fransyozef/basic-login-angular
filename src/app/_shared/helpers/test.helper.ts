import { AppComponent } from 'src/app/app.component';
import { LayoutComponent } from '../ui/layout/layout.component';
import { HeaderComponent } from '../ui/header/header.component';
import { FooterComponent } from '../ui/footer/footer.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/login/login.component';
import { ItemsComponent } from 'src/app/items/items.component';
import { ItemsListComponent } from 'src/app/items/items-list/items-list.component';
import { ItemsListItemComponent } from 'src/app/items/items-list-item/items-list-item.component';
import { ItemEditComponent } from 'src/app/items/item-edit/item-edit.component';
import { ItemAddEditComponent } from 'src/app/items/item-add-edit/item-add-edit.component';

export const TestUiDeclarations = [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
];

export const TestItemsDeclarations = [
    ItemsComponent,
    ItemsListComponent,
    ItemsListItemComponent,
    ItemEditComponent,
    ItemAddEditComponent,
];

export const TestDashboardDeclarations = [
    DashboardComponent,
];

export const TestLoginDeclarations = [
    LoginComponent,
];

export const TestCommonDeclarations = [
    ...TestLoginDeclarations,
    ...TestUiDeclarations,
    ...TestDashboardDeclarations,
    ...TestItemsDeclarations,
];

export const TestAllDeclarations = [
    AppComponent,
    ...TestCommonDeclarations,
];



