import { Component, ViewEncapsulation } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HomeService } from './home.service';
import { Files } from './home.types';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
interface FoodNode {
    name: string;
    children?: FoodNode[];
  }
  
  const TREE_DATA: FoodNode[] = [
    {
      name: 'Fruit',
      children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
    },
    {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
        },
        {
          name: 'Orange',
          children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
        },
      ],
    },
  ];
  interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
  }
  
@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent
{
  folderList: FormGroup;
  fileList:FormGroup;
  files;
    public Editor = ClassicEditor;
    showFiller = true;
    private _transformer = (node: Files, level: number) => {
        return {
          expandable: !!node.children && node.children.length > 0,
          id: node.id,
          parentid: node.parentid,
          name: node.name,
          type: node.type,
          level: level,
        };
      };
      constructor(private homeService: HomeService, private fb: FormBuilder) {
      }

      treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level,
        node => node.expandable,
      );
    

      treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children,
      );
    
      dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
      addFolder(){
        
        this.homeService.addFolder(this.folderList.value).subscribe()
        
      }
      addFolderChild(id){
        
        this.folderList.get('parentid').setValue(id);
        
        this.homeService.addFolder(this.folderList.value).subscribe()
        
      }
      updateFile(data,e){
        
        
        this.fileList.addControl('id', new FormControl(data.id));
        this.fileList.get('id').setValue(data.id);
        this.fileList.get('parentid').setValue(data.parentid);

        this.fileList.get('name').setValue(e.target.value);
        
        this.homeService.updateFile(this.fileList.value).subscribe()
      }
      updateFolder(data,e){
        console.log(data.id);
        
        this.folderList.addControl('id', new FormControl(data.id));
        this.folderList.get('id').setValue(data.id);
        this.folderList.get('parentid').setValue(data.parentid);
        this.folderList.get('name').setValue(e.target.value);
        this.homeService.updateFile(this.folderList.value).subscribe()
      }
      addFile(id){
        
        this.fileList.get('parentid').setValue(id);
        
        this.homeService.addFolder(this.fileList.value).subscribe()
        
      }
    ngOnInit(): void {
      this.folderList = this.fb.group({
        name: ['New Folder'],
        type: ['folder'],
        parentid: 0,
        
    });
    this.fileList = this.fb.group({
      name: ['New File'],
      type: ['file'],
      parentid: 0,
      
  });
      this.homeService.getFile().subscribe()
      this.homeService.files$.subscribe((result)=>{
        this.files = nest(result)
        
        this.dataSource.data = this.files
        
      })
     
      
      const nest = (items, id = '', link = 'parentid') => items.filter(item => item[link] == id).map(item => ({
        ...item,
        children: nest(items, item.id)
    }));
    }

}
