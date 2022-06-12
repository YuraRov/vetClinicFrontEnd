import { Component, OnInit } from '@angular/core';
import {Specialization} from "../../../models/Specialization";

@Component({
  selector: 'app-specialization-list',
  templateUrl: './specialization-list.component.html',
  styleUrls: ['./specialization-list.component.sass']
})
export class SpecializationListComponent implements OnInit {

  specializations: Specialization[] = [
    {id: 0, name: "doctor"},
    {id: 1, name: "surgeon"},
    {id: 2, name: "manager"},
    {id: 3, name: "cleaner"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
