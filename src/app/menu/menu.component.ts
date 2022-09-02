import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public isMenuCollapsed = true;
  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
  }


  @HostListener("window:keyup.Shift.n", ["$event"])
  onKeydownCadastra(event: KeyboardEvent) {
    this.router.navigateByUrl('/form-pessoa');
  }

  @HostListener("window:keyup.Shift.l", ["$event"])
  onKeydownLista(event: KeyboardEvent) {
    this.router.navigateByUrl('/pessoa');
  }


  atalho(content: any) {
    this.modalService.open(content, { size: 'sm' });

  }
}
