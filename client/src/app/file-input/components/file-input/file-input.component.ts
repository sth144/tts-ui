import { Component, OnInit } from '@angular/core';
import { FileInputService } from '../../file-input.service';

interface FileInputEvent {
  target: {
    files: File[];
  };
}

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent implements OnInit {
  // TODO: show staged files and allow user to edit paths

  public files: File[] = [];

  constructor(private fileInputService: FileInputService) {}

  ngOnInit(): void {}

  public onFilesSelected(event: Event) {
    const eventCast = event as unknown as FileInputEvent;

    if ('target' in eventCast && 'files' in eventCast.target) {
      this.files = Array.from(eventCast.target.files);
    }
  }

  public onFilePathChanged(idx: number, event: Event) {
    this.files[idx] = this.renameFile(
      this.files[idx],
      (event.target as unknown as { value: string }).value
    );
  }

  public deleteStagedFile(index: number): void {
    this.files = this.files.splice(index, 1);
  }

  public uploadFiles() {
    console.log(this.files);
    this.fileInputService.uploadFilesForConversion(this.files);
  }

  private renameFile(originalFile: File, newName: string) {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }
}
